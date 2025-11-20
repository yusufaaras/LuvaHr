import { useEffect } from 'react'

interface HeaderProps {
  onOpenCVModal: () => void;
}

function Header({ onOpenCVModal }: HeaderProps) {
  useEffect(() => {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle')
    
    const mobileNavToggle = () => {
      document.querySelector('body')?.classList.toggle('mobile-nav-active')
      mobileNavToggleBtn?.classList.toggle('bi-list')
      mobileNavToggleBtn?.classList.toggle('bi-x')
    }

    mobileNavToggleBtn?.addEventListener('click', mobileNavToggle)

    // Hide mobile nav on same-page/hash links
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToggle()
        }
      })
    })

    // Navmenu scrollspy
    const navmenuScrollspy = () => {
      const navmenulinks = document.querySelectorAll('.navmenu a')
      navmenulinks.forEach(navmenulink => {
        const link = navmenulink as HTMLAnchorElement
        if (!link.hash) return
        const section = document.querySelector(link.hash)
        if (!section) return
        const position = window.scrollY + 200
        if (position >= (section as HTMLElement).offsetTop && 
            position <= ((section as HTMLElement).offsetTop + (section as HTMLElement).offsetHeight)) {
          document.querySelectorAll('.navmenu a.active').forEach(activeLink => 
            activeLink.classList.remove('active')
          )
          link.classList.add('active')
        } else {
          link.classList.remove('active')
        }
      })
    }

    window.addEventListener('scroll', navmenuScrollspy)
    navmenuScrollspy() // Initial call

    return () => {
      mobileNavToggleBtn?.removeEventListener('click', mobileNavToggle)
      window.removeEventListener('scroll', navmenuScrollspy)
    }
  }, [])

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <a href="index.html" className="logo d-flex align-items-center me-auto">
          <h1 className="sitename">LuvaHr</h1>
        </a>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><a href="#hero" className="active">Anasayfa</a></li>
            <li><a href="#about">Hakkımızda</a></li>
            <li><a href="#features">Çözümlerimiz</a></li>
            <li><a href="#contact">İletişim</a></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <a className="btn-getstarted" href="#" onClick={(e) => { e.preventDefault(); onOpenCVModal(); }}>
          Cv Gönder
        </a>
      </div>
    </header>
  )
}

export default Header
