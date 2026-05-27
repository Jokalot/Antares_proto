import HeroSection from '@/components/home/HeroSection';
import ExchangeSection from '@/components/home/ExchangeSection';
import TickerBar from '@/components/home/TickerBar';
import { StatsRow, FeaturesSection, HowItWorks, Testimonials } from '@/components/home/Sections';
import { FAQSection, CTASection } from '@/components/home/FAQandCTA';


export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsRow />
      <ExchangeSection />
      <TickerBar />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}
