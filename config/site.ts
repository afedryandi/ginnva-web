// config/site.ts

export const MALL_URL = '';

export interface ProductItem {
  id: string;
  name: string;
  sub: string;
  text: string;
  long: string;
  img: string;
  gallery: string[];
}

export const GINNVA_PRODUCTS: ProductItem[] = [
  {
    id: '1',
    name: 'Car Window Film',
    sub: 'WINDOW INSULATION FILM',
    text: 'Penolak panas tinggi dengan kejernihan optimal. Seri Ziwei 70 efektif menahan inframerah dan ultraviolet, menjaga visibilitas sekaligus privasi dan kenyamanan kabin.',
    long: 'Seri kaca film insulasi Ziwei 70 menggunakan proses magnetron sputtering berlapis. Lapisan komposit logam dan keramik memberikan penolakan inframerah yang unggul serta tingkat tembus cahaya yang tinggi, menahan ultraviolet secara jangka panjang, melindungi penumpang, sekaligus menjaga visibilitas jernih dan sinyal yang stabil.',
    img: 'https://www.ginnvafilm.com/uploads/pic/e4/5ad92bf02161255577560bb31dfe87.jpg',
    gallery: [
      'https://www.ginnvafilm.com/uploads/pic/e4/5ad92bf02161255577560bb31dfe87.jpg',
      'https://www.ginnvafilm.com/uploads/pic/23/1b6e9f2d6a983b7b30290d9826d1c2.jpg',
      'https://www.ginnvafilm.com/uploads/pic/15/74ecc81c6d95860a617accb549face.jpg'
    ]
  },
  {
    id: '2',
    name: 'Paint Protection Film',
    sub: 'PAINT PROTECTION FILM',
    text: 'Dengan struktur jaringan tiga dimensi (3D) dan rasio polimer molekul kecil yang presisi, terbentuk lapisan padat bermolekul besar yang sangat bening dan mengkilap, sekaligus anti-noda dan mampu memperbaiki diri (self-healing).',
    long: 'Dengan struktur jaringan tiga dimensi (3D) dan rasio polimer molekul kecil yang presisi, terbentuk lapisan padat bermolekul besar yang sangat bening dan mengkilap, sekaligus anti-noda dan mampu memperbaiki diri (self-healing), melindungi kilau cat kendaraan Anda dalam jangka panjang.',
    img: 'https://www.ginnvafilm.com/static/home/images/indexProduct.jpg',
    gallery: [
      'https://www.ginnvafilm.com/static/home/images/indexProduct.jpg',
      'https://www.ginnvafilm.com/uploads/pic/34/7dad16f6240f15bbd9be88d1f29262.jpg'
    ]
  },
  {
    id: '3',
    name: 'Color Change Film',
    sub: 'COLOR CHANGE FILM',
    text: 'Pilihan warna kaya dengan beragam tekstur (doff, gloss, metalik), mudah diaplikasikan dan dirawat, mewujudkan tampilan bodi yang personal dan menyegarkan gaya kendaraan.',
    long: 'Pilihan warna kaya dengan beragam tekstur (doff, gloss, metalik, electroplating), pemasangan menempel sempurna dan mudah dirawat, mewujudkan ubah warna bodi yang personal dan menyegarkan gaya kendaraan, menonjolkan selera unik Anda.',
    img: 'https://www.ginnvafilm.com/uploads/pic/52/956f5d286e473e75392de4623e3feb.jpg',
    gallery: [
      'https://www.ginnvafilm.com/uploads/pic/52/956f5d286e473e75392de4623e3feb.jpg',
      'https://www.ginnvafilm.com/uploads/pic/c6/34e0b0d58b508c81a04fcd611e9e62.jpg'
    ]
  },
  {
    id: '4',
    name: 'Architectural Window Film',
    sub: 'ARCHITECTURAL FILM',
    text: 'Solusi menyeluruh berupa insulasi panas, perlindungan UV, dan privasi untuk gedung maupun hunian, meningkatkan kenyamanan dan efisiensi energi.',
    long: 'Solusi menyeluruh berupa insulasi panas, perlindungan UV, keamanan anti-pecah, dan privasi untuk gedung maupun hunian, menurunkan konsumsi pendingin udara secara efektif serta meningkatkan kenyamanan tempat tinggal dan kerja.',
    img: 'https://www.ginnvafilm.com/uploads/pic/c6/34e0b0d58b508c81a04fcd611e9e62.jpg',
    gallery: [
      'https://www.ginnvafilm.com/uploads/pic/c6/34e0b0d58b508c81a04fcd611e9e62.jpg',
      'https://www.ginnvafilm.com/uploads/pic/7b/19673c96eff1d8bc8772a3ea4dd706.jpg'
    ]
  }
];

export const NAV_ITEMS = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Tentang',
    href: '/brand',
    sub: [
      { label: 'Profil Brand', href: '/brand' },
      { label: 'Berita', href: '/news' },
      { label: 'Kontak', href: '/contact' }
    ]
  },
  {
    label: 'Produk',
    href: '/product?id=1',
    sub: GINNVA_PRODUCTS.map(p => ({ label: p.name, href: `/product?id=${p.id}` }))
  },
  {
    label: 'Layanan',
    href: '/warranty',
    sub: [
      { label: 'Cek Garansi', href: '/warranty' },
      { label: 'Lokasi Dealer', href: '/dealers' },
      { label: 'Estimasi Harga', href: '/quote' }
    ]
  },
  { label: 'Toko Online', href: MALL_URL, blank: true }
];
