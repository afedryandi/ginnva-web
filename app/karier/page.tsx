import type { Metadata } from 'next';
import { seoDefaults, canonical, SITE_URL } from '@/config/seo';
import JsonLd from '@/components/seo/JsonLd';
import CareerContent from './CareerContent';

export const metadata: Metadata = {
  ...seoDefaults,
  ...canonical('/karier'),
  title: 'Karier — Ginnva Shield Indonesia',
  description: 'Bergabunglah bersama tim Ginnva Shield Indonesia. Lihat lowongan kerja terbaru di bidang instalasi PPF, kaca film, sales, dan operasional.',
  openGraph: {
    ...seoDefaults.openGraph,
    title: 'Karier — Ginnva Shield Indonesia',
    description: 'Bergabunglah bersama tim Ginnva Shield Indonesia.',
  },
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.ginnva.id';

interface JobItem {
  id: number;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  posted_at: string | null;
  valid_through: string | null;
}

// Pemetaan tipe lowongan di panel ke nilai employmentType schema.org; tipe yang tidak dikenal tidak dikirim.
const EMPLOYMENT_TYPE: Record<string, string> = {
  'Full-time': 'FULL_TIME',
  'Part-time': 'PART_TIME',
  Kontrak: 'CONTRACTOR',
  Magang: 'INTERN',
};

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Hanya lowongan yang masih berlaku yang dikirim API (lowongan kedaluwarsa hilang dari sini, jadi hilang juga dari data terstruktur,
// sesuai syarat Google Jobs).
async function getJobs(): Promise<JobItem[]> {
  try {
    const res = await fetch(`${API_BASE}/api/job-openings`, { headers: { Accept: 'application/json' }, next: { revalidate: 300 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.success && Array.isArray(json.data) ? (json.data as JobItem[]) : [];
  } catch {
    return [];
  }
}

function jobPosting(job: JobItem): Record<string, unknown> {
  const description =
    `<p>${escapeHtml(job.description)}</p>` +
    (job.requirements.length ? `<ul>${job.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>` : '');

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description,
    ...(job.posted_at && { datePosted: job.posted_at.slice(0, 10) }),
    ...(job.valid_through && { validThrough: job.valid_through }),
    ...(EMPLOYMENT_TYPE[job.type] && { employmentType: EMPLOYMENT_TYPE[job.type] }),
    hiringOrganization: {
      '@type': 'Organization',
      name: 'PT Ginnva Shield Indonesia',
      sameAs: SITE_URL,
      logo: `${SITE_URL}/image/ginnva-logo-red.webp`,
    },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: job.location, addressCountry: 'ID' },
    },
    url: `${SITE_URL}/karier`,
  };
}

export default async function KarierPage() {
  const jobs = await getJobs();

  return (
    <main>
      {jobs.length > 0 && <JsonLd data={jobs.filter((j) => j.posted_at).map(jobPosting)} />}
      <section className="page-banner">
        <div className="bg" style={{ backgroundImage: `url('/image/building-image.webp')` }} />
        <div className="inner">
          <h1>Karier</h1>
          <div className="en">JOIN OUR TEAM</div>
        </div>
      </section>
      <CareerContent />
    </main>
  );
}
