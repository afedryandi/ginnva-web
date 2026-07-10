import React from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FaqItem[];
}

export default function ProductFaq({ faqs }: Props) {
  // Schema FAQPage — supaya Google bisa tampilkan Q&A ini sebagai rich
  // snippet, dan AI search (ChatGPT/Perplexity/AI Overview) lebih mudah
  // mengutip jawabannya langsung.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <section className="psec psec--alt">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="wrap">
        <div className="head">
          <div className="t">Pertanyaan Umum</div>
          <div className="e">Frequently Asked Questions</div>
        </div>
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{faq.q}</h4>
              <p style={{ margin: 0, color: '#666' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}