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
      
      // Force desktop for screens wider than 800px (Chrome mobile desktop mode)
      const isDesktop = width >= 800;
      const isMobile = width < 800;
      
      setScreenSize({
        width,
        height,
        isDesktop,
        isMobile,
      });
      
      // Force desktop layout based on screen size OR user agent
      const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const forceDesktop = isDesktop || (isMobileDevice && width > 800); // Mobile in desktop mode
      
      console.log('🖥️ Screen detection:', { 
        width, 
        height, 
        isDesktop, 
        isMobile, 
        isMobileDevice, 
        forceDesktop,
        userAgent: navigator.userAgent
      });
      
      if (forceDesktop) {
        console.log('✅ Forcing desktop layout');
        document.body.classList.add('force-desktop-layout');
        document.documentElement.style.setProperty('--is-desktop', '1');
        // Remove any existing viewport tag to let mobile use default desktop viewport
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.remove();
          console.log('🔄 Removed viewport meta tag');
        }
      } else {
        console.log('📱 Using mobile layout');
        document.body.classList.remove('force-desktop-layout');
        document.documentElement.style.setProperty('--is-desktop', '0');
        // Add responsive viewport for true mobile
        if (!document.querySelector('meta[name=viewport]')) {
          const viewport = document.createElement('meta');
          viewport.name = 'viewport';
          viewport.content = 'width=device-width, initial-scale=1.0';
          document.head.appendChild(viewport);
          console.log('📱 Added mobile viewport meta tag');
        }
      }
    };

    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return screenSize;
}