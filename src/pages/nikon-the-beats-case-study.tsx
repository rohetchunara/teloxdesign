import { motion } from 'motion/react';
import { ArrowUpRight, Check, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NikonTheBeatsCaseStudy() {
  return (
    <section className="relative min-h-screen bg-[#0c0a09] text-[#e7e5e4] antialiased">
      {/* Cover Image */}
      <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
        <img
          src="https://i.postimg.cc/kGG5jz3x/39928652-86e3-4af4-9469-3ed874612c2e.jpg"
          alt="Nikon the Beats hero section with Your Vision Our Sound tagline"
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
            Case Study — Sonic Architecture & Audio Production Platform
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight text-white mb-8">
            Nikon the Beats
          </h1>
          <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed max-w-3xl mb-10">
            An advanced, atmospheric web application built for a premier music producer and audio engineer based in Nepal, serving global clients.
          </p>
          <a
            href="https://nikonthebeats.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all duration-300"
          >
            <Globe className="w-4 h-4" />
            View Live Website
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
              Atmospheric Customization & Dynamic Themes
            </h2>
            <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed">
              To reflect the emotional range of music production, we engineered an interactive mood engine ("Tune the Atmosphere"). Users can alter the entire aesthetic, color palette, and ambient lighting of the studio interface in real-time.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-[#292524] overflow-hidden">
              <img
                src="https://i.postimg.cc/9MJMYVSq/3aa4d7ee-ecf3-435a-b187-61849b85dc98-(1).jpg"
                alt="Mood selection grid showing options 01 through 04"
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
                src="https://i.postimg.cc/50n0S1GN/45204a54-2c20-4db1-8f12-f87a22220f74-(1).jpg"
                alt="Dark and Void mood state with obsidian and deep crimson resonance theme"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="order-2">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white mb-6">
              Deep Crimson Resonance (Mood 01)
            </h2>
            <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed mb-8">
              Explaining how the UI reacts dynamically to user selection, shifting lighting vectors and filtering the audio reel to match heavy, intense underground hip-hop and dark cinematic vibes.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Obsidian and deep crimson resonance theme</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Dynamic lighting vector shifts</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Optimized for dark cinematic vibes</span>
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
              Emerald Calm & Trust (Mood 02)
            </h2>
            <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed mb-8">
              A smooth transition into organic acoustic tones. Selecting this mood re-architects the layout's atmosphere into a rich darkness with emerald accents, catering to reflective R&D and vocal-driven tracks.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Rich darkness with emerald accents</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Optimized for vocal-driven tracks</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Organic acoustic tone palette</span>
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-[#292524] overflow-hidden">
              <img
                src="https://i.postimg.cc/5yytPTdX/4d955f20-b67e-4cf5-bb70-da8a6e15dd38.jpg"
                alt="Peaceful and Trust mood mode with signature emerald tint"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Block D: Visual Left, Text Right */}
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
                src="https://i.postimg.cc/zB0BF5MB/628a7f73-f2c3-438e-a28b-9a1374c05933.png"
                alt="Form mode interface state with clean elegant violet architecture"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="order-2">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white mb-6">
              Violet Architecture (Mood 03)
            </h2>
            <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed mb-8">
              Showcases the versatility of the engine, shifting the studio lighting into an elegant violet hue optimized for futuristic, experimental soundscapes and modern pop production.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Elegant violet hue lighting</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Futuristic experimental soundscapes</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Modern pop production optimized</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Block E: Visual Right, Text Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32 md:mb-40"
        >
          <div className="order-2 lg:order-1">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white mb-6">
              Warm Bronze Foundation (Mood 04)
            </h2>
            <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed mb-8">
              Concluding the dynamic mood suite with a warm bronze harmonic environment, grounding the listener in a classic, professional audio studio atmosphere.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Warm bronze harmonic environment</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Classic professional studio atmosphere</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Completes the dynamic mood suite</span>
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-[#292524] overflow-hidden">
              <img
                src="https://i.postimg.cc/zB0BF5MB/628a7f73-f2c3-438e-a28b-9a1374c05933.png"
                alt="Resonance mode interface state with warm bronze highlights"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Block F: Visual Left, Text Right */}
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
                src="https://i.postimg.cc/HxBx9HKJ/73562316-7036-45f2-8a18-c3baeb109c44.png"
                alt="Custom audio showcase player interface with track Farwest A-TOWN"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="order-2">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white mb-6">
              Immersive Audio Showcase & Direct Downloads
            </h2>
            <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed mb-8">
              We built a fully responsive, custom-styled audio player layer allowing visitors to audition, shuffle, control volumes, and instantly download high-fidelity production samples directly from the portfolio.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Custom-styled audio player with playback controls</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Instant high-fidelity sample downloads</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Fully responsive across all devices</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Block G: Visual Right, Text Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32 md:mb-40"
        >
          <div className="order-2 lg:order-1">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white mb-6">
              The Producer Profile & Creative Discipline
            </h2>
            <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed mb-8">
              A dedicated artist spotlight presenting Nikon as a multi-disciplinary producer, engineer, and songwriter. It outlines core practices (Production, Engineering, Mix/Master) and bridges local studio roots in Nepal with international standards.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Multi-disciplinary producer, engineer, songwriter</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Core practices: Production, Engineering, Mix/Master</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Bridges local Nepal roots with global standards</span>
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-[#292524] overflow-hidden">
              <img
                src="https://i.postimg.cc/k4f4v9Zg/8f343aff-7136-4132-a043-f241401ea3b0.jpg"
                alt="Black and white producer profile layout section"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Block H: Visual Left, Text Right */}
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
                src="https://i.postimg.cc/x88dshDk/ac203919-ac2b-4dc7-9a85-d7f8af575303.jpg"
                alt="Transparent card-based services and rates layout with tiered pricing"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="order-2">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white mb-6">
              Transparent Services & Tiered Rates
            </h2>
            <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed mb-8">
              Structured transparent pricing cards with clear deliverables, making it frictionless for artists and labels to evaluate packages and initiate collaboration.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Tiered pricing structures in local and global currencies</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Clear deliverables for each package</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Frictionless evaluation for artists and labels</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Block I: Visual Right, Text Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32 md:mb-40"
        >
          <div className="order-2 lg:order-1">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white mb-6">
              Frictionless Project Initiation
            </h2>
            <p className="text-lg md:text-xl text-[#a8a29e] leading-relaxed mb-8">
              Closing the client conversion loop with an elegant project intake form. Capturing names, roles, emails, and deep project briefs to streamline client onboarding.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Elegant project intake form</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Captures names, roles, emails, and project briefs</span>
              </li>
              <li className="flex items-start gap-3 text-[#a8a29e]">
                <Check className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <span>Streamlined client onboarding</span>
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-[#292524] overflow-hidden">
              <img
                src="https://i.postimg.cc/1XXzW2hN/bdad2ced-101d-49b7-a810-7e0e7cc720e9.jpg"
                alt="Initiate Project interactive briefing form interface"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Final Impact & Technical Summary */}
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
              Bridging high-end atmospheric UI with functional audio e-commerce elevated the artist's global digital presence and client acquisition. The platform stands as a testament to how immersive design can transform a local studio into an international brand.
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div>
                <div className="font-serif text-4xl md:text-5xl text-white mb-2">140+</div>
                <div className="text-sm text-[#a8a29e] uppercase tracking-widest">Tracks Produced</div>
              </div>
              <div>
                <div className="font-serif text-4xl md:text-5xl text-white mb-2">8+</div>
                <div className="text-sm text-[#a8a29e] uppercase tracking-widest">Years Active</div>
              </div>
              <div>
                <div className="font-serif text-4xl md:text-5xl text-white mb-2">Global</div>
                <div className="text-sm text-[#a8a29e] uppercase tracking-widest">Remote Delivery</div>
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
