import Hero from '../components/Hero';
import TravelPackages from '../components/TravelPackages';
import TopCategories from '../components/TopCategories';
import TopLocations from '../components/TopLocations';
import OfferAndTestimonials from '../components/Offerandtestimonials';
import ContactBranch from '../components/ContactBranch';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Hero />
      <TravelPackages />
      <TopCategories />
      <TopLocations />
      <OfferAndTestimonials />
      <ContactBranch />
      <Footer />
    </div>
  );
}
