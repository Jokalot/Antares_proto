import HomeClient from '@/components/home/HomeClient';
import TickerBar from '@/components/home/TickerBar';
import { StatsRow, FeaturesSection, HowItWorks, Testimonials } from '@/components/home/Sections';
import { FAQSection, CTASection } from '@/components/home/FAQandCTA';

export default function Home() {
  return (
    <>
      <HomeClient />
      <StatsRow />
      <TickerBar />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}