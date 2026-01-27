import React, { useState, useEffect } from 'react';
import {
  ArrowRight, Menu, X, Terminal, BarChart3, CheckCircle2,
  Mail, Phone, MapPin, Send, Play,
  Twitter, Facebook, Linkedin, Instagram,
  Globe, Zap, GraduationCap
} from 'lucide-react';
import markLogo from '../../assets/image.png';
import nasscomLogo from '../../assets/nascom.jpg';

// --- IMPORTING NEW 3D ICONS ---
import instructorIcon from '../../assets/instructor.png';
import privateIcon from '../../assets/private.png';
import selfPacedIcon from '../../assets/self_paced.png'; 
import labsIcon from '../../assets/labs.png';
import examIcon from '../../assets/exam.png';

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
        style={{ width: '60px', height: '62px', objectFit: 'cover' , borderRadius: '50%', marginRight: '10px' }}
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
            <NavLink target="training" label="Training" />
            <NavLink target="certification" label="Certifications" />
            <NavLink target="stories" label="Success Stories" />
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
            <NavLink target="training" label="Training" />
            <NavLink target="certification" label="Certifications" />
            <NavLink target="stories" label="Success Stories" />
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
              <button onClick={() => scrollToSection('training')} className="h-14 px-8 bg-white border border-slate-200 text-slate-700 rounded-full font-bold text-sm uppercase tracking-widest hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50 transition-all">
                Explore Platform
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-slate-400 grayscale opacity-70">
              <span className="font-bold text-xl">ACME Corp</span>
              <span className="font-bold text-xl">GlobalTech</span>
              <span className="font-bold text-xl">Nebula</span>
              <span className="font-bold text-xl">Vertex</span>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="relative hidden lg:block perspective-1000">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 animate-float transform rotate-y-12 rotate-z-2 w-full max-w-lg mx-auto">
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

              <div className="flex gap-2 items-end h-32 mb-6 px-2">
                {[40, 70, 45, 90, 60, 75, 50].map((h, i) => (
                  <div key={i} className="flex-1 bg-slate-50 rounded-t-sm relative group overflow-hidden">
                    <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-slate-900 rounded-t-sm transition-all duration-500 group-hover:bg-slate-700"></div>
                  </div>
                ))}
              </div>

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

      {/* --- TRAINING OPTIONS GRID (FIXED RATIO) --- */}
      <section id="training" className="py-20 px-6 relative z-10 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Flexible Training Options
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Choose the learning style that fits your schedule and goals.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
             {/* Card 1: Instructor-Led */}
             <div className="w-full md:w-[45%] lg:w-[30%] group p-8 bg-white border border-slate-200 rounded-2xl hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 text-center flex flex-col items-center">
                {/* ADJUSTED: Smaller circle (w-32), Larger relative image (w-24) to fill space */}
                <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <img src={instructorIcon} alt="Instructor-Led" className="w-24 h-24 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Instructor-Led Training</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Join live, interactive sessions with expert instructors. Real-time Q&A, hands-on guidance, and structured learning paths.
                </p>
             </div>

             {/* Card 2: Private Training */}
             <div className="w-full md:w-[45%] lg:w-[30%] group p-8 bg-white border border-slate-200 rounded-2xl hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 text-center flex flex-col items-center">
                <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <img src={privateIcon} alt="Private Training" className="w-24 h-24 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Private Training</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Dedicated sessions tailored for your corporate team. Customized curriculum to meet your specific business goals.
                </p>
             </div>

             {/* Card 3: Practice Arena */}
             <div className="w-full md:w-[45%] lg:w-[30%] group p-8 bg-white border border-slate-200 rounded-2xl hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 text-center flex flex-col items-center">
                <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <img src={selfPacedIcon} alt="Practice Arena" className="w-24 h-24 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Practice Arena</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Sharpen your skills with interactive video modules. Watch expert solution breakdowns and tackle algorithmic challenges.
                </p>
             </div>

             {/* Card 4: Facilitated Labs */}
             <div className="w-full md:w-[45%] lg:w-[30%] group p-8 bg-white border border-slate-200 rounded-2xl hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 text-center flex flex-col items-center">
                <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <img src={labsIcon} alt="Facilitated Labs" className="w-24 h-24 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Facilitated Labs</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Experience code-native learning. Our browser-based IDE (powered by Monaco) lets you run, debug, and test code instantly.
                </p>
             </div>

             {/* Card 5: Exam Prep */}
             <div className="w-full md:w-[45%] lg:w-[30%] group p-8 bg-white border border-slate-200 rounded-2xl hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 text-center flex flex-col items-center">
                <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <img src={examIcon} alt="Exam Prep" className="w-24 h-24 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Exam Prep</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Comprehensive study guides, practice tests, and review sessions to ensure you ace your certification exams.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* --- CERTIFICATION SECTION --- */}
      <section id="certification" className="py-20 px-6 bg-slate-100/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-6">
            Set Yourself Apart with <br/> Industry-Recognized Certifications
          </h2>
          <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto">
            Validate your expertise and advance your career. Our certifications are recognized globally and demonstrate your mastery of the Shnoor ecosystem.
          </p>
          <button onClick={onRegister} className="h-14 px-10 bg-indigo-600 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-600/30">
             Explore Certifications
          </button>
        </div>
      </section>

      {/* --- DARK AWARD BANNER (NASSCOM) --- */}
      <section className="bg-slate-900 py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
           <div className="w-36 h-36 rounded-full border-4 border-white/20 flex items-center justify-center bg-white backdrop-blur-sm shadow-2xl relative p-4">
              <img 
                src={nasscomLogo} 
                alt="NASSCOM Certified" 
                className="w-full h-auto object-contain"
              />
              <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Milestone</div>
           </div>
           <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Proudly Recognized by NASSCOM</h3>
              <p className="text-slate-400 max-w-lg">
                 Our proposal has been officially approved by NASSCOM, marking a significant step toward becoming a Certified Company—validating our vision, ethics, and process excellence.
              </p>
              <button className="mt-6 text-sm font-bold text-indigo-400 hover:text-white transition-colors flex items-center gap-2 mx-auto md:mx-0">
                 Read the Announcement <ArrowRight size={14} />
              </button>
           </div>
        </div>
      </section>

      {/* --- SUCCESS STORIES --- */}
      <section id="stories" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
                See How Our Students Have Transformed
             </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 transition-all text-center group">
                <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                   <Globe size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Tech Giants Corp</h4>
                <p className="text-slate-500 italic mb-6">"Shnoor's platform helped us onboard 500+ engineers in record time. The hands-on labs were a game changer."</p>
             </div>
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 transition-all text-center group">
                 <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                   <Zap size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Innovate Inc</h4>
                <p className="text-slate-500 italic mb-6">"The certification paths gave our team a clear roadmap for growth. We've seen a 40% boost in productivity."</p>
             </div>
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 transition-all text-center group">
                 <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                   <GraduationCap size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Future Academy</h4>
                <p className="text-slate-500 italic mb-6">"Our students love the interactive coding challenges. It makes complex concepts easy to digest and apply."</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 px-6 relative z-10 bg-slate-50">
        <div className="max-w-6xl mx-auto bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-100">
          
          {/* Left Side (Dark Info) */}
          <div className="bg-slate-900 p-12 lg:w-5/12 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            <div className="relative z-10">
              <span className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2 block">Get in Touch</span>
              <h2 className="text-3xl font-black tracking-tight mb-8">Ready to upgrade your workforce?</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-indigo-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-200">info@shnoor.com <span className="text-slate-500 text-sm">(General)</span></span>
                    <span className="font-medium text-slate-200">proc@shnoor.com <span className="text-slate-500 text-sm">(Sales)</span></span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-indigo-400" />
                  </div>
                   <div className="flex flex-col">
                    <span className="font-medium text-slate-200">+91-9429694298</span>
                    <span className="font-medium text-slate-200">+91-9041914601</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-indigo-400" />
                  </div>
                  <span className="font-medium text-slate-200 leading-relaxed">
                    10009 Mount Tabor Road, City,<br/> Odessa Missouri, United States
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side (Light Form) */}
          <div className="p-12 lg:w-7/12 bg-white flex flex-col justify-center">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">First Name</label>
                  <input type="text" className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-900 font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Last Name</label>
                  <input type="text" className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-900 font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Work Email</label>
                <input type="email" className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-900 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Message</label>
                <textarea rows="4" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-900 font-medium resize-none"></textarea>
              </div>
              <button type="button" className="w-full h-14 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-600/25 flex items-center justify-center gap-2">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0F172A] border-t border-slate-800 pt-16 pb-8 px-6 relative z-10 font-medium text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand & Socials (Span 5) */}
          <div className="lg:col-span-5">
            <div className="mb-6">
              <BrandLogo titleColor="!text-white" subtitleColor="!text-[#94a3b8]" />
            </div>
            <p className="!text-[#94a3b8] text-sm leading-relaxed mb-8 max-w-sm">
              Transform your learning process with our powerful platform. Create professional training paths, track progress, and certify skills faster with Shnoor International.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-bold !text-white mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => scrollToSection('home')} className="!text-[#94a3b8] hover:!text-white transition-colors">Home</button></li>
              <li><button onClick={() => scrollToSection('training')} className="!text-[#94a3b8] hover:!text-white transition-colors">Training</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="!text-[#94a3b8] hover:!text-white transition-colors">Contact Us</button></li>
            </ul>
          </div>

          {/* Column 3: Contact & Support (Span 4) */}
          <div className="lg:col-span-4">
            <h4 className="font-bold !text-white mb-6 text-lg">Contact & Support</h4>
            <ul className="space-y-6 text-sm !text-[#94a3b8]">
              {/* Emails */}
              <li className="flex items-start gap-3">
                <Mail size={18} className="shrink-0 text-indigo-400 mt-1" />
                <div className="flex flex-col">
                  <span>info@shnoor.com (General)</span>
                  <span>proc@shnoor.com (Sales)</span>
                </div>
              </li>
              
              {/* Phones */}
              <li className="flex items-start gap-3">
                <Phone size={18} className="shrink-0 text-indigo-400 mt-1" />
                <div className="flex flex-col">
                  <span>+91-9429694298</span>
                  <span>+91-9041914601</span>
                </div>
              </li>

              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-indigo-400 mt-1" />
                <span>10009 Mount Tabor Road<br/>City, Odessa Missouri, United States</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm !text-[#64748b]">
          <div>© 2026 Shnoor International. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:!text-[#cbd5e1] !text-[#64748b]">Privacy Policy</a>
            <a href="#" className="hover:!text-[#cbd5e1] !text-[#64748b]">Cookie Policy</a>
            <a href="#" className="hover:!text-[#cbd5e1] !text-[#64748b]">Company Profile</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingView;