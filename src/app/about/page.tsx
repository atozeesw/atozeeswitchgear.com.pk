'use client';

import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import { useEffect } from 'react';
import AOS from 'aos';
// import BannerSection from '../Components/aboutbanner';
// import AboutComponent from '../Components/standard2';
// import TextImageComponent from '@/app/Components/abtop'
// import Clients from '@/app/Components/ourclient';
// import AboutUsSection from '@/app/Components/about'
import FeatureSection from "@/app/Components/standard";
import CeoMissionSection from "@/app/Components/ceo";
import ServicesGrid from '../Components/nc';
import WhyChooseRoyal from '../Components/designandcommitment';
import ExportInquiries from '../Components/industriesserved';
import ScrollToTopButton from '../Components/scroll';
export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* <BannerSection/> */}
      {/* <Clients/> */}
      <CeoMissionSection/>
      {/* <AboutUsSection/>  */}
      <WhyChooseRoyal/>
      <ExportInquiries/>
      <ServicesGrid />
      <FeatureSection/>
      <ScrollToTopButton/>
      {/* <TextImageComponent/>
      <AboutComponent/> */}
      
      <main className="flex-grow">

        
      </main>
      
      <Footer />
    </div>
  );
}