import HeroSection from '@/components/home/HeroSection';
import TickerBar from '@/components/home/TickerBar';
import { StatsRow, FeaturesSection, HowItWorks, Testimonials } from '@/components/home/Sections';
import { FAQSection, CTASection } from '@/components/home/FAQandCTA';


export default function Home() {
  return (
    <>

      <HeroSection />
      <TickerBar />
      <StatsRow />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}
