import { useState, useEffect } from 'react';

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 1024 : false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({
        width,
        height,
        isDesktop: width >= 1024,
        isMobile: width < 1024,
      });
      
      // Force desktop layout classes on large screens
      if (width >= 1024) {
        document.body.classList.add('force-desktop-layout');
      } else {
        document.body.classList.remove('force-desktop-layout');
      }
    };

    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}