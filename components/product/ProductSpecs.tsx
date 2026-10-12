import React from 'react';

interface SpecRow {
  label: string;
  values: string[]; // Kontrak data menggunakan array string dinamis
}

interface SpecsProps {
  columns: string[];
  rows: SpecRow[];
  // Tabel lebar dengan banyak kolom (mis. /ppf): teks sel tidak dipotong ke baris baru, jadi tabel tidak menjadi terlalu
  // tinggi. Jarak dalam sel tetap sama dengan tampilan standar. Halaman lain memakai tampilan standar.
  compact?: boolean;
}

export default function ProductSpecs({ columns, rows, compact = false }: SpecsProps) {
  const pad = '12px';
  const nowrap = compact ? 'nowrap' : undefined;

  return (
    <section className="psec psec--alt">
      <div className="wrap">
        <div className="head">
          <div className="t">Spesifikasi Teknis</div>
          <div className="e">Technical Specifications</div>
        </div>
        
        <div style={{ overflowX: 'auto', marginTop: '24px' }}>
          <table className="specs-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: compact ? '900px' : '600px' }}>
            <thead>
              <tr style={{ backgroundColor: '#111', color: '#fff', textAlign: 'left' }}>
                {columns.map((col, idx) => (
                  <th key={idx} style={{ padding: pad, whiteSpace: nowrap ?? 'pre-line', textAlign: 'center', verticalAlign: 'middle', lineHeight: '1.4' }}>
                    {col.split('\n').map((line, i) => (
                      <span key={i} style={{ display: 'block' }}>{line}</span>
                    ))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: pad, fontWeight: 'bold', whiteSpace: nowrap }}>{row.label}</td>
                  {/* Perbaikan: Map nilai di dalam array values secara dinamis */}
                  {row.values?.map((val, vIdx) => (
                    <td key={vIdx} style={{ padding: pad, textAlign: 'center', verticalAlign: 'middle', lineHeight: '1.4', whiteSpace: nowrap }}>
                      {val.split('\n').map((line: string, i: number) => (
                        <span key={i} style={{ display: 'block' }}>{line}</span>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}