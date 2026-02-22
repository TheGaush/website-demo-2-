
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Contact from './components/Contact';
import ChatAssistant from './components/ChatAssistant';
import GlobalBackground from './components/GlobalBackground';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative cursor-none">
      {/* Custom Cursor Follower */}
      <div 
        className="cursor-follower hidden md:block" 
        style={{ left: mousePos.x, top: mousePos.y }}
      ></div>

      {/* Global Spotlight Hover Effect */}
      <div className="spotlight"></div>

      {/* Global Background Animation (Plane India to Europe) */}
      <GlobalBackground />

      {/* Background Blobs */}
      <div className="gradient-blur w-[500px] h-[500px] bg-blue-600 top-[-100px] left-[-100px] rounded-full opacity-20"></div>
      <div className="gradient-blur w-[600px] h-[600px] bg-purple-600 bottom-[-100px] right-[-100px] rounded-full opacity-20"></div>
      <div className="gradient-blur w-[400px] h-[400px] bg-cyan-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"></div>

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Team />
        <Contact />
      </main>

      <footer className="py-12 px-6 glass border-t border-white/10 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-black tracking-tighter uppercase">DEMO<span className="text-amber-500"> WEBSITE.</span></div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Demo Website Services.
          </div>
          <div className="flex gap-6 text-xl">
            <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <ChatAssistant />
    </div>
  );
};

export default App;
