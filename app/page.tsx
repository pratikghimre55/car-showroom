import HeroSection from '@/components/HeroSection'
import CarList from '@/components/CarList'
import Footer from '@/components/Footer'
import FounderSection from '@/components/FounderSection'
import StatsSection from '@/components/StatsSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import ContactUs from '@/components/ContactUs'


export default function Home() {
  return (
    <main>
      <HeroSection />
      <CarList />
      <FounderSection />
      <StatsSection />
      <HowItWorksSection />
      <ContactUs />
      <Footer />
    </main>
  )
}
