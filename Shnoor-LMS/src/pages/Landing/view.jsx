import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, Zap, Globe, BarChart3,
  ArrowRight, CheckCircle2, Layout, Users,
  Mail, Phone, MapPin, Menu, X, Play, Terminal, Code2
} from 'lucide-react';
import markLogo from '../../assets/image.png';

const LandingView = ({ onLogin, onRegister }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const NavLink = ({ target, label }) => (
    <button
      onClick={() => scrollToSection(target)}
      className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors tracking-wide"
    >
      {label}
    </button>
  );

  const BrandLogo = ({ titleColor = 'text-slate-900', subtitleColor = 'text-slate-500' }) => (
    <div className="flex items-center">
      <img
        src={markLogo}
        alt="Shnoor International"
        className="rounded-xl"
        style={{ width: '60px', height: '62px', objectFit: 'cover' , borderRadius: '50%',marginRight: '10px' }}
      />
      <div>
        <h1 className={`brand-logo ${titleColor} text-xl md:text-2xl font-semibold mb-1 tracking-tight leading-tight`}>
          SHNOOR International
        </h1>
        <p className={`text-xs md:text-sm ${subtitleColor} font-medium tracking-[0.18em] uppercase`}>
          Learning Platform
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-slate-500 selection:text-white overflow-x-hidden">

      {/* --- BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-slate-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* --- NAV BAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <BrandLogo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 bg-white/50 px-6 py-2 rounded-full border border-white/50 backdrop-blur-sm">
            <NavLink target="home" label="Home" />
            <NavLink target="features" label="Features" />
            <NavLink target="about" label="Mission" />
            <NavLink target="contact" label="Contact" />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={onLogin} className="text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors px-4">
              Log In
            </button>
            <button onClick={onRegister} className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-900/25">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-6 flex flex-col gap-6 shadow-xl absolute w-full animate-fade-in-up">
            <NavLink target="home" label="Home" />
            <NavLink target="features" label="Features" />
            <NavLink target="about" label="Mission" />
            <NavLink target="contact" label="Contact" />
            <hr className="border-slate-100" />
            <button onClick={onLogin} className="w-full h-12 border border-slate-200 rounded-xl font-bold text-slate-900">Log In</button>
            <button onClick={onRegister} className="w-full h-12 bg-slate-900 text-white rounded-xl font-bold">Get Started</button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative pt-36 pb-20 px-6 lg:pt-48 lg:pb-32 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column: Text */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-900">Platform AV</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]">
              Mastery Is Not <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">
                An Accident.
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              The all-in-one learning operating system. Train your workforce, validate skills with code-native exams, and certify compliance in real-time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button onClick={onRegister} className="h-14 px-8 bg-slate-900 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xl hover:shadow-slate-900/30 hover:-translate-y-1">
                Start Learning Now <ArrowRight size={18} />
              </button>
              <button onClick={() => scrollToSection('features')} className="h-14 px-8 bg-white border border-slate-200 text-slate-700 rounded-full font-bold text-sm uppercase tracking-widest hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50 transition-all">
                Explore Platform
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-slate-400 grayscale opacity-70">
              {/* Logos could go here, using text for now */}
              <span className="font-bold text-xl">ACME Corp</span>
              <span className="font-bold text-xl">GlobalTech</span>
              <span className="font-bold text-xl">Nebula</span>
              <span className="font-bold text-xl">Vertex</span>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="relative hidden lg:block perspective-1000">
            {/* Main Floating Card */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 animate-float transform rotate-y-12 rotate-z-2 w-full max-w-lg mx-auto">

              {/* Header Mockup */}
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100"></div>
                  <div>
                    <div className="h-2.5 w-24 bg-slate-800 rounded mb-1.5"></div>
                    <div className="h-2 w-16 bg-slate-300 rounded"></div>
                  </div>
                </div>
                <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-900">
                  <BarChart3 size={16} />
                </div>
              </div>

              {/* Chart Mockup */}
              <div className="flex gap-2 items-end h-32 mb-6 px-2">
                {[40, 70, 45, 90, 60, 75, 50].map((h, i) => (
                  <div key={i} className="flex-1 bg-slate-50 rounded-t-sm relative group overflow-hidden">
                    <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-slate-900 rounded-t-sm transition-all duration-500 group-hover:bg-slate-700"></div>
                  </div>
                ))}
              </div>

              {/* List Items Mockup */}
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 1 ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-700'}`}>
                      {i === 1 ? <CheckCircle2 size={16} /> : <Play size={16} />}
                    </div>
                    <div className="flex-1">
                      <div className="h-2 w-32 bg-slate-800 rounded mb-1.5 opacity-80"></div>
                      <div className="h-1.5 w-20 bg-slate-400 rounded opacity-60"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Back Elements for Depth */}
            <div className="absolute -top-12 -right-12 z-0">
              <div className="bg-slate-900 rounded-2xl p-6 shadow-xl animate-float animation-delay-2000 w-48">
                <div className="flex items-center gap-2 mb-2 text-white/80">
                  <Terminal size={14} /> <span className="text-xs font-mono">Terminal</span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-white/20 rounded"></div>
                  <div className="h-1.5 w-2/3 bg-white/20 rounded"></div>
                  <div className="h-1.5 w-3/4 bg-white/40 rounded"></div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 z-20">
              <div className="bg-white rounded-xl p-4 shadow-xl border border-slate-100 animate-float flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</div>
                  <div className="text-sm font-black text-slate-900">All Systems Go</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Why Shnoor?</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">scale excellence.</span>
            </h3>
            <p className="text-slate-500 text-lg leading-relaxed">
              We've redesigned the corporate learning experience from the ground up to be fast, beautiful, and incredibly effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Enterprise Security", desc: "Bank-grade encryption and granular role-based access control for every user." },
              { icon: Code2, title: "Code-Native Practice", desc: "Integrated Monaco editors allow developers to practice in a real IDE environment." },
              { icon: Zap, title: "Instant Feedback", desc: "Automated grading pipelines deliver performance results in milliseconds." },
              { icon: BarChart3, title: "Deep Analytics", desc: "Track skill gaps and progression with intuitive, real-time dashboards." },
              { icon: Layout, title: "Distraction-Free", desc: "A minimalist interface designed to keep learners in the flow state." },
              { icon: Users, title: "Cohort Learning", desc: "Built-in community tools to foster peer-to-peer learning and mentorship." }
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 bg-white border border-slate-200 rounded-3xl hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                  <feature.icon size={120} />
                </div>

                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 mb-6 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 shadow-sm">
                  <feature.icon size={26} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed group-hover:text-slate-600 relative z-10">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STATS / MISSION SECTION --- */}
      <section id="about" className="py-24 px-6 relative z-10 bg-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Our Results</h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-8">
                Trusted by the world's <br /> most innovative teams.
              </h3>

              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                    <Globe className="text-slate-300" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Global Scale</h4>
                    <p className="text-slate-400 leading-relaxed">Infrastructure that scales automatically to support teams from 10 to 100,000+ without blinking.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                    <Zap className="text-yellow-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Lightning Fast</h4>
                    <p className="text-slate-400 leading-relaxed">Zero-latency page loads and video streaming. We optimized every byte so your team never waits.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
                <div className="text-5xl font-black text-white mb-2">98%</div>
                <div className="text-sm font-bold text-slate-300 uppercase tracking-widest">Completion Rate</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
                <div className="text-5xl font-black text-white mb-2">2x</div>
                <div className="text-sm font-bold text-slate-300 uppercase tracking-widest">Faster Onboarding</div>
              </div>
              <div className="col-span-2 bg-slate-800 p-8 rounded-3xl shadow-2xl shadow-slate-900/50 flex items-center justify-between group cursor-pointer hover:bg-slate-700 transition-colors border border-white/10">
                <div>
                  <div className="text-3xl font-black text-white mb-1">Case Studies</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Read Success Stories</div>
                </div>
                <ArrowRight className="text-white transform group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA / CONTACT SECTION --- */}
      <section id="contact" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-slate-100 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500"></div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Ready to transform your team?</h2>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            Join 500+ forward-thinking companies building the workforce of tomorrow with Shnoor.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
            <button onClick={onRegister} className="w-full md:w-auto h-16 px-10 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-900/25">
              Get Started for Free
            </button>
            <button className="w-full md:w-auto h-16 px-10 bg-white border-2 border-slate-200 text-slate-700 rounded-full font-bold text-lg hover:border-slate-900 hover:text-slate-900 transition-all">
              Schedule Demo
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
              <CheckCircle2 size={16} className="text-green-500" /> No credit card required
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
              <CheckCircle2 size={16} className="text-green-500" /> 14-day free trial
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
              <CheckCircle2 size={16} className="text-green-500" /> Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0F172A] border-t border-slate-800 pt-16 pb-8 px-6 relative z-10 font-medium">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <BrandLogo titleColor="!text-white" subtitleColor="!text-[#94a3b8]" />
            </div>
            <p className="!text-[#94a3b8] text-sm leading-relaxed mb-6">
              Empowering the next generation of innovative teams with world-class learning tools.
            </p>
            <div className="flex gap-4">
              {/* Socials */}
              <div className="w-8 h-8 rounded-full bg-slate-800 !text-[#94a3b8] hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <Globe size={16} />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 !text-[#94a3b8] hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <Mail size={16} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold !text-white mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="!text-[#94a3b8] hover:!text-white transition-colors">Features</a></li>
              <li><a href="#" className="!text-[#94a3b8] hover:!text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="!text-[#94a3b8] hover:!text-white transition-colors">Enterprise</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold !text-white mb-6">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="!text-[#94a3b8] hover:!text-white transition-colors">Blog</a></li>
              <li><a href="#" className="!text-[#94a3b8] hover:!text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="!text-[#94a3b8] hover:!text-white transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold !text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="!text-[#94a3b8] hover:!text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="!text-[#94a3b8] hover:!text-white transition-colors">Terms</a></li>
              <li><a href="#" className="!text-[#94a3b8] hover:!text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm !text-[#64748b]">
          <div>© 2024 Shnoor Systems Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:!text-[#cbd5e1] !text-[#64748b]">Privacy Policy</a>
            <a href="#" className="hover:!text-[#cbd5e1] !text-[#64748b]">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingView;