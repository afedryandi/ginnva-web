import React from 'react';

interface SpecRow {
  label: string;
  values: string[]; // Kontrak data menggunakan array string dinamis
}

interface SpecsProps {
  columns: string[];
  rows: SpecRow[];
}

export default function ProductSpecs({ columns, rows }: SpecsProps) {
  return (
    <section className="psec psec--alt">
      <div className="wrap">
        <div className="head">
          <div className="t">Spesifikasi Teknis</div>
          <div className="e">Technical Specifications</div>
        </div>
        
        <div style={{ overflowX: 'auto', marginTop: '24px' }}>
          <table className="specs-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ backgroundColor: '#111', color: '#fff', textAlign: 'left' }}>
                {columns.map((col, idx) => (
                  <th key={idx} style={{ padding: '12px', whiteSpace: 'pre-line', textAlign: 'center', verticalAlign: 'middle', lineHeight: '1.4' }}>
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
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{row.label}</td>
                  {/* Perbaikan: Map nilai di dalam array values secara dinamis */}
                  {row.values?.map((val, vIdx) => (
                    <td key={vIdx} style={{ padding: '12px', textAlign: 'center', verticalAlign: 'middle', lineHeight: '1.4' }}>
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