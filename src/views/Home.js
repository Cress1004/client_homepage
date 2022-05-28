import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesIntro from '../components/sections/FeaturesIntro';
import FeaturesHiring from '../components/sections/FeaturesHiring';
import Events from '../components/sections/Events';

const Home = () => {

  return (
    <>
      <Hero className="illustration-section-01" />
      <FeaturesIntro />
      <FeaturesHiring invertMobile topDivider imageFill className="illustration-section-02" />
      <Events topDivider />
    </>
  );
}

export default Home;