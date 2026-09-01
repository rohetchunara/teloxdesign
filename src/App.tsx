import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { HomePage } from '@/pages/home';
import { ServicesPage } from '@/pages/services';
import { WorkPage } from '@/pages/work';
import { AboutPage } from '@/pages/about';
import { ContactPage } from '@/pages/contact';
import Demo from '@/pages/demo';
import { CrosusCaseStudy } from '@/pages/crosus-case-study';
import { NikonTheBeatsCaseStudy } from '@/pages/nikon-the-beats-case-study';
import { CustomCursor } from '@/components/CustomCursor';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <header>
        <Navbar />
      </header>
      {isHome && <Hero />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/crosus" element={<CrosusCaseStudy />} />
          <Route path="/work/nikon-the-beats" element={<NikonTheBeatsCaseStudy />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CustomCursor />
      <Layout />
    </BrowserRouter>
  );
}

export default App;
