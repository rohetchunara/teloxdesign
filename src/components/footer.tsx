import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ReactiveLine } from './ReactiveLine';

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Web Design', to: '/services' },
      { label: 'SaaS Development', to: '/services' },
      { label: 'Branding', to: '/services' },
      { label: 'SEO & Marketing', to: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Work', to: '/work' },
      { label: 'Careers', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

const contactInfo = [
  { icon: <Mail size={16} className="text-muted-foreground" />, text: 'teloxdesign@gmail.com', href: 'mailto:teloxdesign@gmail.com' },
  { icon: <Phone size={16} className="text-muted-foreground" />, text: '9744425158', href: 'tel:+9779744425158' },
  { icon: <MapPin size={16} className="text-muted-foreground" />, text: 'Jhamsikhel, Lalitpur' },
];

export function Footer() {
  return (
    <footer className="relative mt-20">
      <ReactiveLine className="absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md border border-foreground/30 flex items-center justify-center">
                <span className="text-foreground font-display font-medium text-base">T</span>
              </div>
              <span className="text-foreground text-lg font-display font-medium tracking-tight">
                Telox<span className="text-muted-foreground">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              We design and build websites and SaaS platforms that help businesses grow.
              From concept to launch, we handle it all.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-foreground text-sm font-medium mb-5 tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-foreground text-sm font-medium mb-5 tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ReactiveLine className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Telox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
