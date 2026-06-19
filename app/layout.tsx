import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Ginnva Shield Indonesia',
  description: 'Official Warranty System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0, height: '100%' }} className="antialiased">
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          <Header />
          
          <main style={{ flex: '1 0 auto' }}>
            {children}
          </main>
          
          <Footer />
          
        </div>
      </body>
    </html>
  );
}