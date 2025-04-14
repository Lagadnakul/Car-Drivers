import React from 'react';
import Hero from '../components/Hero';
import FeaturedPilots from '../components/FeaturedPilots';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Features from '../components/Features';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <div className="space-y-20">
      <Hero />
      <FeaturedPilots />
      <HowItWorks />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;