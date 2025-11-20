import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedServices from '../components/FeaturedServices';
import About from '../components/About';
import Features from '../components/Features';
import MoreFeatures from '../components/MoreFeatures';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';
import CVModal from '../components/CVModal';

function Home() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const openCVModal = () => {
    setCvModalOpen(true);
  };

  const closeCVModal = () => {
    setCvModalOpen(false);
  };

  return (
    <div className="index-page">
      <Header onCVModalOpen={openCVModal} />
      <main className="main">
        <Hero />
        <FeaturedServices />
        <About onCVModalOpen={openCVModal} />
        <Features />
        <MoreFeatures />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
      <CVModal isOpen={cvModalOpen} onClose={closeCVModal} />
    </div>
  );
}

export default Home;
