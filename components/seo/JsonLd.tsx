// Menyisipkan data terstruktur (schema.org) sebagai <script type="application/ld+json">. Karakter "<" di-escape supaya isi teks
// (mis. judul berita) tidak bisa menutup tag script lebih awal.
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
