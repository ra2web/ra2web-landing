"use client";

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Banner from '../components/Banner';
import About from '../components/About';
import Features from '../components/Features';
import Community from '../components/Community';
import Media from '../components/Media';
import Sponsors from '../components/Sponsors';
import Support from '../components/Support';
import Footer from '../components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('loaded');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {isLoading && (
        <div id="loader-wrapper" className="fixed top-0 left-0 w-full h-full z-[1000] bg-[#07111d]">
          <div id="loader" className="block relative left-1/2 top-1/2 w-[240px] h-[240px] -ml-[120px] -mt-[120px] rounded-full border-[3px] border-solid border-transparent border-t-[#3498db] animate-spin duration-[2s] z-[1001]"></div>
          <div id="loader-logo" className="absolute top-0 left-0 w-full h-full z-[10000] bg-[url('/img/cd-logo.png')] bg-no-repeat bg-center"></div>
        </div>
      )}

      <div className="design-holder relative block w-full min-h-full">
        <div className="layout-frame m-0 auto w-full block">
          <Navigation />
          <Banner />
          <div className="bgcolor h-[74px] w-full bg-gradient-to-b from-[#06111d] to-[#081522]"></div>
          <div id="container" className="overflow-hidden w-full">
            <About />
            <Features />
            <Community />
            <Media />
            <Sponsors />
            <Support />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
