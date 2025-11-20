import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedServices from './components/FeaturedServices'
import About from './components/About'
import Features from './components/Features'
import MoreFeatures from './components/MoreFeatures'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CVModal from './components/CVModal'

// Import vendor scripts
declare global {
  interface Window {
    AOS: {
      init: (config: { duration: number; easing: string; once: boolean; mirror: boolean }) => void;
    };
    GLightbox: (config: { selector: string }) => unknown;
    Swiper: unknown;
    bootstrap: {
      Modal: {
        new(element: HTMLElement): { show: () => void; hide: () => void };
        getInstance(element: HTMLElement): { show: () => void; hide: () => void } | null;
      };
    };
  }
}

function App() {
  const [showCVModal, setShowCVModal] = useState(false)

  useEffect(() => {
    // Load vendor scripts
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = resolve
        script.onerror = reject
        document.body.appendChild(script)
      })
    }

    // Load all vendor scripts
    Promise.all([
      loadScript('/assets/vendor/bootstrap/js/bootstrap.bundle.min.js'),
      loadScript('/assets/vendor/aos/aos.js'),
      loadScript('/assets/vendor/glightbox/js/glightbox.min.js'),
      loadScript('/assets/vendor/swiper/swiper-bundle.min.js'),
    ]).then(() => {
      // Initialize AOS
      if (window.AOS) {
        window.AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        })
      }

      // Initialize GLightbox
      if (window.GLightbox) {
        window.GLightbox({
          selector: '.glightbox'
        })
      }
    }).catch(err => {
      console.error('Error loading vendor scripts:', err)
    })

    // Scroll effects
    const handleScroll = () => {
      const selectBody = document.querySelector('body')
      const selectHeader = document.querySelector('#header')
      if (selectHeader && !selectHeader.classList.contains('scroll-up-sticky') && 
          !selectHeader.classList.contains('sticky-top') && 
          !selectHeader.classList.contains('fixed-top')) {
        return
      }
      if (selectBody) {
        if (window.scrollY > 100) {
          selectBody.classList.add('scrolled')
        } else {
          selectBody.classList.remove('scrolled')
        }
      }

      // Scroll top button
      const scrollTop = document.querySelector('.scroll-top')
      if (scrollTop) {
        if (window.scrollY > 100) {
          scrollTop.classList.add('active')
        } else {
          scrollTop.classList.remove('active')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleOpenCVModal = () => {
    setShowCVModal(true)
  }

  const handleCloseCVModal = () => {
    setShowCVModal(false)
  }

  return (
    <>
      <Header onOpenCVModal={handleOpenCVModal} />
      <main className="main">
        <Hero />
        <FeaturedServices />
        <About onOpenCVModal={handleOpenCVModal} />
        <Features />
        <MoreFeatures />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>
      <div id="preloader"></div>
      <CVModal show={showCVModal} onClose={handleCloseCVModal} />
    </>
  )
}

export default App
