'use client';

import React, { useEffect, useState } from 'react';

// ─── Data lowongan ───────────────────────────────────────────────────────────
// Lowongan dikelola dari Filament admin panel (menu "Lowongan Kerja") dan
// diambil lewat API. Untuk menambah/edit/hapus lowongan, tidak perlu ubah
// file ini — cukup dari admin panel.

interface JobItem {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time / Part-time / Kontrak
  description: string;
  requirements: string[];
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const APPLY_EMAIL = 'marketing@ginnva.id';
const WA_NUMBER = '628118681678';

// ─── Component ───────────────────────────────────────────────────────────────

export default function CareerContent() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`${baseUrl}/api/job-openings`, { headers: { Accept: 'application/json' } })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok && json.success && !cancelled) {
          setJobs(json.data as JobItem[]);
        }
      })
      .catch(() => {
        // Dibiarkan kosong kalau API gagal — halaman tetap menampilkan
        // empty state + CTA lamaran spontan, sama seperti pola News.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const waFor = (position: string) =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      `Halo, saya ingin melamar posisi ${position} di Ginnva Indonesia.`
    )}`;

  // mailto: hanya bekerja kalau perangkat punya aplikasi email default.
  // Supaya klik selalu memberi hasil, kita salin alamat email ke clipboard
  // dan tampilkan notifikasi — lalu tetap coba buka mail client sebagai
  // bonus (kalau ada). User yang tanpa mail client tetap dapat alamatnya.
  const handleEmailApply = async (subject: string) => {
    try {
      await navigator.clipboard.writeText(APPLY_EMAIL);
      setToast(`Alamat email disalin: ${APPLY_EMAIL}`);
    } catch {
      setToast(`Kirim lamaran ke: ${APPLY_EMAIL}`);
    }
    setTimeout(() => setToast(null), 4000);

    // Coba buka mail client (silent kalau tidak ada — tidak error).
    window.location.href = `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <>
      {/* ===================== INTRO ===================== */}
      <section className="psec">
        <div className="wrap">
          <div className="career-intro">
            <div className="ci-left">
              <div className="head" style={{ textAlign: 'left' }}>
                <div className="t">Tumbuh Bersama Ginnva</div>
                <div className="e">Grow With Us</div>
              </div>
            </div>
            <p className="ci-copy">
              Ginnva Shield Indonesia adalah bagian dari jaringan global Ginnva yang hadir
              di lebih dari 100 negara. Sebagai brand yang baru berekspansi ke Indonesia,
              kami sedang membangun tim terbaik — dan setiap orang yang bergabung hari ini
              akan menjadi fondasi pertumbuhan kami ke depan.
            </p>
          </div>

          <div className="career-values">
            <div className="cv-card">
              <div className="cv-ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="cv-t">Brand Global</div>
              <p>Bagian dari Shanghai Smith Adhesive New Material Co., Ltd. — perusahaan publik yang tercatat di Bursa Efek Shanghai.</p>
            </div>
            <div className="cv-card">
              <div className="cv-ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M23 6l-9.5 9.5-5-5L1 18" />
                  <path d="M17 6h6v6" />
                </svg>
              </div>
              <div className="cv-t">Pertumbuhan Cepat</div>
              <p>Berada di fase ekspansi awal berarti kesempatan berkembang dan naik jenjang jauh lebih terbuka.</p>
            </div>
            <div className="cv-card">
              <div className="cv-ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div className="cv-t">Pelatihan Bersertifikat</div>
              <p>Teknisi dan tim sales mendapatkan pelatihan produk serta sertifikasi resmi berstandar Ginnva.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== LOWONGAN ===================== */}
      <section className="psec psec--alt">
        <div className="wrap">
          <div className="head">
            <div className="t">Posisi yang Tersedia</div>
            <div className="e">Open Positions</div>
          </div>

          {loading ? (
            <p style={{ color: 'var(--muted)', fontSize: '14px', textAlign: 'center' }}>
              Memuat lowongan...
            </p>
          ) : jobs.length === 0 ? (
            <div className="coming-soon-box">
              <div className="coming-soon-title">Belum Ada Lowongan Saat Ini</div>
              <p className="coming-soon-text">
                Kami belum membuka posisi baru. Namun Anda tetap bisa mengirimkan
                lamaran spontan — lihat bagian di bawah halaman ini.
              </p>
            </div>
          ) : (
            <div className="career-jobs">
              {jobs.map((job, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div key={job.id} className={`job-item ${isOpen ? 'open' : ''}`}>
                    <button
                      className="job-head"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <div className="job-head-main">
                        <div className="job-title">{job.title}</div>
                        <div className="job-meta">
                          <span className="job-chip">{job.department}</span>
                          <span className="job-chip">{job.location}</span>
                          <span className="job-chip job-chip--type">{job.type}</span>
                        </div>
                      </div>
                      <span className="job-toggle" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </button>

                    <div className="job-body">
                      <div className="job-body-inner">
                        <p className="job-desc">{job.description}</p>
                        <div className="job-req-t">Kualifikasi:</div>
                        <ul className="job-req">
                          {(job.requirements ?? []).map((req, rIdx) => (
                            <li key={rIdx}>{req}</li>
                          ))}
                        </ul>
                        <div className="job-apply">
                          <button
                            type="button"
                            onClick={() => handleEmailApply(`Lamaran Kerja — ${job.title}`)}
                            className="pill pill--accent job-apply-btn"
                          >
                            Lamar via Email
                          </button>
                          <a
                            href={waFor(job.title)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pill pill--outline job-apply-btn"
                          >
                            Tanya via WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===================== LAMARAN SPONTAN ===================== */}
      <section className="psec">
        <div className="wrap">
          <div className="career-open">
            <div className="co-body">
              <div className="co-t">Tidak menemukan posisi yang cocok?</div>
              <p className="co-p">
                Kami selalu terbuka untuk talenta terbaik. Kirimkan CV dan portofolio Anda —
                kami akan menghubungi ketika ada posisi yang sesuai.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleEmailApply('Lamaran Spontan — Ginnva Indonesia')}
              className="pill pill--accent"
            >
              Kirim CV ke {APPLY_EMAIL}
            </button>
          </div>
        </div>
      </section>

      {/* Toast notifikasi salin email */}
      {toast && (
        <div className="career-toast" role="status">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {toast}
        </div>
      )}
    </>
  );
}