import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    // Initialize AOS and other scripts
    if (window.AOS) {
      window.AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }, []);

  return (
    <div className="index-page">
      <h1>Home Page - Under Construction</h1>
      <p>This will be the converted index.html page</p>
      <p>The full HTML conversion is in progress...</p>
    </div>
  );
}

export default Home;
