// frontend/src/pages/Home.jsx

import Hero from '../components/Hero';
import BookingSearch from '../components/home/BookingSearch';
import FeaturedPilots from '../components/home/FeaturedPilots';
import HowItWorks from '../components/home/HowItWorks';
import ServiceHighlights from '../components/home/ServiceHighlights';
import Features from '../components/Features';
import TestimonialCarousel from '../components/home/TestimonialCarousel';
import StatsShowcase from '../components/home/StatsShowcase';
import EnhancedCTA from '../components/home/EnhancedCTA';
import CallToAction from '../components/home/CallToAction';

const Home = () => {
  return (
    <div>
      <Hero />
      <BookingSearch />
      <ServiceHighlights />
      <HowItWorks />
      <StatsShowcase />
      <FeaturedPilots />
      <Features />
      <TestimonialCarousel />
      <EnhancedCTA />
      <CallToAction />
    </div>
  );
};

export default Home;