# Setup Google Sheet untuk form GIIAS & Partner (umum)

> **Update:** sheet ini sekarang dipakai BERSAMA oleh 2 landing page —
> `/giias` (khusus event GIIAS) dan `/partner` (umum, tidak terikat event
> apa pun, lihat `app/partner/page.tsx`). Keduanya kirim data ke
> `NEXT_PUBLIC_GIIAS_SHEET_URL` yang SAMA (nama env var-nya masih
> "GIIAS" untuk alasan historis, tapi fungsinya sekarang generik).
> Baris dari 2 sumber ini dibedakan lewat kolom **Source** baru (lihat
> langkah 1 & 2 di bawah, sudah diupdate).

Ada 2 form terpisah di halaman `/giias`, dan cuma SATU yang berhubungan
dengan dokumen ini:

1. **Form klaim customer** ("Choose Your Complimentary Protection") — form
   ini yang dijelaskan di dokumen ini, mengirim data langsung ke Google
   Sheet lewat Google Apps Script Web App (tanpa backend Laravel).
2. **Form "Become a Partner"** (sales dealer daftar jadi partner referral)
   — TIDAK lewat Google Sheet sama sekali, langsung ke `ginnva-api`
   (`POST /api/giias/partner-signup`), yang otomatis bikin akun Partner +
   kode referral real-time. Data ini munculnya di Filament ginnva-api
   (menu **Partnership Referral → Partner** dan **Kemitraan & Sales
   Referral**), bukan di Google Sheet. Lihat `GiiasPartnerSignupController.php`
   di ginnva-api kalau perlu ubah alur ini.

Ikuti langkah berikut sekali saja untuk setup form klaim customer (#1):

## 1. Buat Google Sheet baru

Buat sheet baru (nama bebas, mis. "GIIAS Leads"), beri header di baris 1:

```
Timestamp | Nama | WhatsApp | Merek | Model | Status Pembelian | Estimasi Delivery | Benefit | Lead Score | Referral Code | Sales Advisor | Brand (Referral) | Dealer | Source
```

Kolom **Source** (baru, kolom terakhir) berisi `giias` atau `partner` —
menandai form ini disubmit dari halaman mana. Kalau sheet-nya sudah ada
dari sebelumnya, cukup tambah 1 header baru di kolom terakhir yang masih
kosong, tidak perlu bikin sheet baru.

Semua kolom terakhir (**Referral Code**, **Sales Advisor**, **Brand
(Referral)**, **Dealer**) terisi **OTOMATIS PENUH oleh script** setiap kali
customer submit form dengan referral code di URL-nya — TIDAK perlu rumus
VLOOKUP, tab Master, atau cek manual ke Filament sama sekali. Detail cara
kerjanya di langkah 2.

Kolom **Benefit** isinya beda tergantung `Source`-nya:

- Baris dengan `Source = giias`: KOMBINASI 2 dari 3 perlindungan (bukan 1
  item), value-nya salah satu dari: `interior_sunroof`, `interior_panoramic`,
  `sunroof_panoramic`.
- Baris dengan `Source = partner`: SELALU `interior_ppf` (nilai tetap,
  bukan pilihan customer — landing page `/partner` cuma menawarkan 1
  benefit yaitu Interior PPF, jadi tidak ada dropdown pilihan kombinasi
  seperti di `/giias`). Kalau bikin laporan/filter dari kolom ini,
  perlakukan `interior_ppf` sebagai nilai terpisah, bukan bagian dari 3
  kombinasi di atas.

## 2. Tempel Apps Script

Di sheet tsb: **Extensions → Apps Script**, hapus isi default, tempel kode ini:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  var score = scoreLead(data.purchaseStatus, data.delivery);
  var partner = lookupPartner(data.referralCode);

  sheet.appendRow([
    new Date(),
    data.name,
    data.whatsapp,
    data.brand,
    data.model,
    data.purchaseStatus,
    data.delivery,
    data.benefit,
    score,
    data.referralCode || '',
    partner.name,
    partner.car_brand,
    partner.dealer_name,
    data.source || 'giias', // form /giias lama belum kirim field ini — default 'giias' supaya data lama tetap benar kalau di-resubmit
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function scoreLead(purchaseStatus, delivery) {
  if (purchaseStatus === 'sudah_spk' && (delivery === 'lt_30_hari' || delivery === 'sudah_terima')) {
    return 'HOT';
  }
  if (purchaseStatus === 'sudah_spk' && delivery === '1_3_bulan') {
    return 'WARM';
  }
  return 'COLD';
}

// Tanya langsung ke ginnva-api: kode referral ini milik sales/partner
// siapa, merek & dealer apa — supaya kolom Sales Advisor/Brand/Dealer
// di sheet terisi otomatis saat itu juga tanpa VLOOKUP atau cek manual.
// Kalau kode kosong atau API gagal dihubungi, kembalikan string kosong
// (bukan bikin submit form gagal) — data customer tetap harus tersimpan
// walau lookup-nya gagal.
function lookupPartner(code) {
  var empty = { name: '', car_brand: '', dealer_name: '' };
  if (!code) return empty;

  try {
    var res = UrlFetchApp.fetch(
      'https://api.ginnva.id/api/giias/partner-lookup/' + encodeURIComponent(code),
      { muteHttpExceptions: true }
    );
    if (res.getResponseCode() !== 200) return empty;

    var json = JSON.parse(res.getContentText());
    if (!json.success) return empty;

    return {
      name: json.data.name || '',
      car_brand: json.data.car_brand || '',
      dealer_name: json.data.dealer_name || '',
    };
  } catch (err) {
    return empty;
  }
}
```

## 3. Deploy sebagai Web App

1. Klik **Deploy → New deployment**.
2. Pilih tipe **Web app**.
3. "Execute as": **Me**. "Who has access": **Anyone**.
4. Klik **Deploy**, izinkan akses saat diminta.
5. Salin URL yang muncul (bentuknya `https://script.google.com/macros/s/XXXXX/exec`).

Kalau script ini sebelumnya SUDAH pernah di-deploy (versi lama tanpa
`lookupPartner`), jangan buat deployment baru — cukup **Deploy → Manage
deployments → Edit (pensil) → New version** supaya URL yang sudah dipasang
di `.env.local`/Vercel tetap valid dan otomatis pakai kode terbaru.

## 4. Set environment variable di ginnva-web

Tambahkan ke `.env.local` (dev) dan ke Vercel project settings (production):

```
NEXT_PUBLIC_GIIAS_SHEET_URL=https://script.google.com/macros/s/XXXXX/exec
```

Setelah redeploy, form di `/giias` akan otomatis menulis ke sheet ini, dan
kolom **Lead Score** akan terisi otomatis HOT/WARM/COLD sesuai draft dari
Pak Gunawan — 2 Sales + 1 CS tinggal filter/sort kolom itu untuk tahu siapa
yang harus dihubungi lebih dulu.

## 5. Link/QR unik per partner

Partner dapat kode referral OTOMATIS lewat tombol **"Become a Partner"**
di halaman `/giias` — sales dealer isi Nama/WA/Email/Merek/Dealer, dan
LANGSUNG dapat kode + link + gambar QR (bisa diunduh saat itu juga) tanpa
perlu tim Ginnva bikinkan (lihat `BecomePartnerBar.tsx` /
`GiiasPartnerSignupController.php`).

Kalau perlu bikin partner secara manual dari admin (tanpa lewat form),
bisa lewat Filament ginnva-api → menu **Partner** → tombol tambah. Partner
yang dibuat begini juga otomatis bisa di-lookup oleh Apps Script (langkah
2) — kolom **Sales Advisor** akan terisi dari nama partner-nya, tapi
**Brand (Referral)** dan **Dealer** akan tetap kosong karena data itu
cuma diisi lewat form Become a Partner. Untuk cetak QR-nya: buka baris
partner tsb di Filament → tombol **"Unduh QR"** (1 partner) atau centang
beberapa baris → **"Unduh QR (PDF Massal)"** — sudah tersedia langsung di
admin panel, tidak perlu tool QR generator eksternal lagi.

Alur lengkapnya jadi: partner daftar sendiri lewat Become a Partner (atau
dibuatkan manual oleh admin) → dapat link/QR → share ke customer →
customer isi form klaim → Apps Script otomatis tanya ke ginnva-api saat
submit → sheet langsung terisi lengkap termasuk siapa sales-nya, tanpa
langkah manual apapun dari tim Ginnva.

## Catatan

- Setiap kali script di Apps Script diedit, harus **Deploy → Manage deployments → Edit → New version** supaya perubahan aktif di URL yang sama.
- Testimonial di halaman (bagian "Social Proof" dari draft asli) sengaja **belum dibuat** di kode ini — draft menyarankan testimonial customer asli (BYD Sealion 7, BMW X3, dst). Tambahkan setelah ada testimoni nyata dari customer, supaya tidak menampilkan review palsu.
- Kalau ada leads yang masuk TANPA kode referral (customer buka link master `/giias` langsung, bukan link partner), kolom Referral Code, Sales Advisor, Brand, dan Dealer akan kosong semua — itu wajar, bukan bug.
- Kalau kode referral ADA tapi 3 kolom itu tetap kosong, kemungkinan: (a) `ginnva-api` sedang down/tidak bisa diakses saat submit terjadi, atau (b) kode referral-nya tidak valid/salah ketik. Data customer & kode referral mentahnya tetap tersimpan di kolom Referral Code walau lookup gagal, jadi tidak ada data yang hilang — cukup cek manual ke Filament kalau ini terjadi.
- Header/Footer/ChatWidget situs utama sengaja disembunyikan di `/giias` (lihat `components/layout/SiteChrome.tsx`) — landing page ini berdiri sendiri, bukan bagian navigasi ginnva.id biasa.
- Section FAQ, foto sertifikasi, dan tombol "Book a Free Consultation" sudah dihapus dari halaman per revisi terakhir — kalau perlu dikembalikan, cek riwayat git `app/giias/page.tsx`.