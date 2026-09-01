import { motion } from 'motion/react';
import { ArrowUpRight, Check, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CrosusCaseStudy() {
  return (
    <section className="relative min-h-screen bg-[#0c0a09] text-[#e7e5e4] antialiased">
      {/* Cover Image */}
      <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
        <img
          src="https://i.postimg.cc/BvM285M7/f8941e65-b557-46e1-a6b7-d86fa5e00894.png"
          alt="Crosus homepage hero section with Woven with intention headline"
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-6 -mt-32 relative z-10">
        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 md:mb-32"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#a8a29e] mb-6">
            Case Study — Artisanal E-Commerce
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight text-white mb-8">
            Woven with intention.
          </h1>
          <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed max-w-3xl mb-10">
            Boutique e-commerce platform for a handcrafted crochet brand in Nepal.
          </p>
          <a
            href="https://crosusnepal.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all duration-300"
          >
            <Globe className="w-4 h-4" />
            View Live Project
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Block A: Visual Right, Text Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32 md:mb-40"
        >
          <div className="order-2 lg:order-1">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white mb-6">
              The Brand Vision: Slow Fashion
            </h2>
            <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed">
              The primary goal was to translate the patient, physical craft of crochet into a minimalist digital experience. We focused on a serene, gallery-like feel to elevate handmade products above standard e-commerce clutter.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-[#292524] overflow-hidden">
              <img
                src="https://i.postimg.cc/TPCnyjCt/8da70630-142f-449b-9864-6ae22a92babe.jpg"
                alt="Artisan hands actively crocheting for Crosus"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Block B: Visual Left, Text Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32 md:mb-40"
        >
          <div className="order-1">
            <div className="rounded-2xl border border-[#292524] overflow-hidden">
              <img
                src="https://i.postimg.cc/1zJDg0JJ/00e84cc9-fcdf-4007-af22-e2b0055296cc.jpg"
                alt="Crosus product catalog featuring The Maya Slouchy Bag and The Sayapatri Bucket Bag"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="order-2">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white mb-6">
              Seamless Product Discovery
            </h2>
            <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed mb-8">
              We designed a clean, high-fidelity product grid featuring professional photography that highlights texture and detail. Customers can easily view variants, pricing, and add items to their cart instantly.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>High-resolution product photography</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Clear NPR pricing and variant selection</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Instant add-to-cart functionality</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Block C: Visual Right, Text Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32 md:mb-40"
        >
          <div className="order-2 lg:order-1">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white mb-6">
              Intuitive Conversion Flow
            </h2>
            <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed mb-8">
              To maximize sales, the checkout process was streamlined into a clean, non-intrusive modal. This ensures the user journey from browsing to purchase is fast, simple, and localized for Nepal.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>District-based shipping across Nepal</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Minimal form fields for faster completion</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Instant order confirmation</span>
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-[#292524] overflow-hidden">
              <img
                src="https://i.postimg.cc/XvQ9ZKQH/7b782b63-99eb-4f91-99c2-20390131d876.png"
                alt="Crosus checkout modal with customer details and shipping district form"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Results & Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 md:mb-32"
        >
          <div className="rounded-3xl border border-[#292524] bg-[#0c0a09] p-10 md:p-16 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white mb-8">
              Results & Impact
            </h2>
            <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed max-w-2xl mx-auto mb-10">
              The platform successfully launched as a primary revenue channel for the artisan, bridging the gap between patient craftsmanship and digital scale.
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div>
                <div className="font-serif text-4xl md:text-5xl text-white mb-2">Day One</div>
                <div className="text-sm text-[#a8a29e] uppercase tracking-widest">Live Customers</div>
              </div>
              <div>
                <div className="font-serif text-4xl md:text-5xl text-white mb-2">Active</div>
                <div className="text-sm text-[#a8a29e] uppercase tracking-widest">Revenue Channel</div>
              </div>
              <div>
                <div className="font-serif text-4xl md:text-5xl text-white mb-2">Ongoing</div>
                <div className="text-sm text-[#a8a29e] uppercase tracking-widest">Growth</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Work */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center pb-20"
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm text-[#a8a29e] hover:text-white transition-colors duration-300"
          >
            <ArrowUpRight className="w-4 h-4 rotate-180" />
            Back to All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
