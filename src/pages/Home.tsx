import Hero from '../components/Hero';
import TravelPackages from '../components/TravelPackages';
import TopCategories from '../components/TopCategories';
import TopLocations from '../components/TopLocations';
import ContactBranch from '../components/ContactBranch';
import ReviewsSection from '../components/Reviews';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Hero />
      <TravelPackages />
      <TopCategories />
      <TopLocations />
      <ContactBranch />
      <ReviewsSection />
      <Footer />
    </div>
  );
}
