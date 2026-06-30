import HomeClient from '@/components/home/HomeClient';
import TickerBar from '@/components/home/TickerBar';
import { FAQSection } from '@/components/home/FAQandCTA';

export default function Home() {
  return (
    <>
      <HomeClient />
      <TickerBar />
      <FAQSection />
    </>
  );
}