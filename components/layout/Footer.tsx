import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-slate-50 text-slate-600">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
        {/* Info PT & Alamat */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-slate-900">PT Ginnva Shield Indonesia</h3>
          <p className="text-sm leading-relaxed">
            Grand Slipi Tower, Lantai 5<br />
            Jl. Letjen S. Parman, Palmerah,<br />
            Jakarta Barat, DKI Jakarta 11480
          </p>
        </div>

        {/* Navigasi Link Ringkas */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Navigation</h4>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <Link href="/warranty" className="hover:text-slate-900">Warranty Check</Link>
            <Link href="/privacy" className="hover:text-slate-900">Privacy Policy</Link>
          </nav>
        </div>

        {/* Sosial Media */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Connect With Us</h4>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} PT Ginnva Shield Indonesia. All rights reserved.
      </div>
    </footer>
  );
}