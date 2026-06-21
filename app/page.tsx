import AboutSection from '@/components/home/AboutSection';
import CaseAndNewsSection from '@/components/home/CaseAndNewsSection';
import HeroSection from '@/components/home/HeroSection';
import ProductSection from '@/components/home/ProductSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <CaseAndNewsSection />
    </main>
  );
}

