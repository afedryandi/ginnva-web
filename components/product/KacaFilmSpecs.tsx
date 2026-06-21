import React from 'react';

export default function KacaFilmSpecs() {
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
                <th style={{ padding: '12px' }}>Tipe Varian</th>
                <th style={{ padding: '12px' }}>Transmisi Cahaya (VLT)</th>
                <th style={{ padding: '12px' }}>Penolakan Infra Merah (IRR)</th>
                <th style={{ padding: '12px' }}>Pemblokiran UV (UVR)</th>
                <th style={{ padding: '12px' }}>Penolakan Energi Total (TSER)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>Ziwei 70 (Depan)</td>
                <td style={{ padding: '12px' }}>72%</td>
                <td style={{ padding: '12px' }}>95%</td>
                <td style={{ padding: '12px' }}>99%</td>
                <td style={{ padding: '12px' }}>58%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>Ziwei 40 (Samping/Belakang)</td>
                <td style={{ padding: '12px' }}>38%</td>
                <td style={{ padding: '12px' }}>92%</td>
                <td style={{ padding: '12px' }}>99%</td>
                <td style={{ padding: '12px' }}>62%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>Ziwei 20 (Samping/Belakang Gelap)</td>
                <td style={{ padding: '12px' }}>18%</td>
                <td style={{ padding: '12px' }}>95%</td>
                <td style={{ padding: '12px' }}>99%</td>
                <td style={{ padding: '12px' }}>68%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}