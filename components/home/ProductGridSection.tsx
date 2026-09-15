import Image from 'next/image';
import Link from 'next/link';
import { GINNVA_PRODUCTS } from '@/config/site';

const WA_URL = `https://wa.me/628118681678?text=${encodeURIComponent('Halo, saya ingin bertanya lebih lanjut tentang produk Ginnva.')}`;

export default function ProductGridSection() {
  return (
    <section className="product-grid-sec" id="product-grid">
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="sec-title">Produk Kami</div>
          <div className="sec-sub">Our Products</div>
        </div>

        <div className="product-grid">
          {GINNVA_PRODUCTS.map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`} className="product-grid-item">
              <div className="thumb">
                <Image src={p.img} alt={p.name} fill sizes="(max-width: 560px) 50vw, (max-width: 980px) 50vw, 25vw" />
              </div>
              <div className="label">
                <div className="name">{p.name}</div>
                <div className="sub">{p.sub}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="product-grid-cta">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="pill pill--accent">
            Selengkapnya
          </a>
        </div>
      </div>
    </section>
  );
}
