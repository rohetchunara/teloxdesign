import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'About', to: '/about' },
  { name: 'Work', to: '/work' },
  { name: 'Services', to: '/services' },
  { name: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenNav = () => setMenuOpen(true);
    window.addEventListener('open-telox-nav', handleOpenNav);
    return () => window.removeEventListener('open-telox-nav', handleOpenNav);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled && !menuOpen ? 'nav-solid py-4' : 'bg-transparent py-6'
        )}
      >
        <div className="px-6 md:px-10 flex items-center justify-between">
          {/* Brand mark — top left */}
          <Link to="/" className="group flex items-center gap-2">
             <span className="font-display text-base font-light tracking-[0.02em] text-foreground">
               Telox
             </span>
             <span className="w-1 h-1 rounded-full bg-muted-foreground/60" />
           </Link>

          {/* Hamburger — top right */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-10 h-10 flex flex-col items-end justify-center gap-[6px] z-50 group"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={cn(
                'block h-[2px] bg-white rounded-full transition-all duration-500',
                menuOpen ? 'w-6 rotate-45 translate-y-[8px]' : 'w-6 group-hover:w-7'
              )}
            />
            <span
              className={cn(
                'block h-[2px] bg-white rounded-full transition-all duration-500',
                menuOpen ? 'w-0 opacity-0' : 'w-4 group-hover:w-5'
              )}
            />
            <span
              className={cn(
                'block h-[2px] bg-white rounded-full transition-all duration-500',
                menuOpen ? 'w-6 -rotate-45 -translate-y-[8px]' : 'w-6 group-hover:w-7'
              )}
            />
          </button>
        </div>
      </motion.nav>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-background"
          >
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative h-full flex flex-col justify-center px-6 md:px-20">
              {/* Top label */}
              <div className="absolute top-24 left-6 md:left-20">
                <span className="micro-label">Menu</span>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-2 md:gap-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.08,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      to={link.to}
                      className={cn(
                        'group flex items-baseline gap-4 md:gap-6 font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight transition-colors duration-300',
                        location.pathname === link.to
                          ? 'text-foreground'
                          : 'text-muted-foreground/60 hover:text-foreground'
                      )}
                    >
                      <span className="micro-label opacity-50 group-hover:opacity-100 transition-opacity">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="transition-transform duration-500 group-hover:translate-x-2">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-10 left-6 md:left-20 right-6 md:right-20 flex flex-col md:flex-row justify-between gap-4"
              >
                <div>
                  <span className="micro-label block mb-2">Get in touch</span>
                  <a
                    href="mailto:teloxdesign@gmail.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    teloxdesign@gmail.com
                  </a>
                </div>
                <div className="md:text-right">
                  <span className="micro-label block mb-2">Est. 2026</span>
                  <span className="text-sm text-muted-foreground">Crafting digital experiences</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
