import React, { useState, useEffect, useRef, useCallback } from "react";
import FlyOutMenu from '../components/FlyOutMenu/FlyOutMenu.jsx';
import "../index.css";

// Icons
import { FaLaptopCode, FaUser, FaFileAlt, FaBolt, FaCog, FaArrowRight, FaGithub, FaLinkedin, FaTwitter, FaRegStar, FaRocket } from 'react-icons/fa';
import { MdOutlineSpeed, MdOutlineStar, MdEmail, MdPhone } from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';

const Home = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    services: false,
    collaboration: false,
    cta: false
  });

  const [activeService, setActiveService] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const collaborationRef = useRef(null);
  const ctaRef = useRef(null);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const progress = (scrollPosition / documentHeight) * 100;
    setScrollProgress(progress);

    // More precise visibility calculations
    const heroRect = heroRef.current?.getBoundingClientRect();
    const servicesRect = servicesRef.current?.getBoundingClientRect();
    const collaborationRect = collaborationRef.current?.getBoundingClientRect();
    const ctaRect = ctaRef.current?.getBoundingClientRect();

    setIsVisible({
      hero: !heroRect || heroRect.top < windowHeight * 0.8,
      services: servicesRect && servicesRect.top < windowHeight * 0.8 && servicesRect.bottom > 0,
      collaboration: collaborationRect && collaborationRect.top < windowHeight * 0.8 && collaborationRect.bottom > 0,
      cta: ctaRect && ctaRect.top < windowHeight * 0.8
    });
  }, []);

  // Optimized mouse move handler
  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Service rotation with pause on hover
  const rotateServices = useCallback(() => {
    setActiveService(prev => (prev + 1) % services.length);
  }, []);

  useEffect(() => {
    let serviceInterval;
    
    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    // Event listeners
    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Initial setup
    handleScroll();
    
    // Start service rotation after initial load
    const startRotation = setTimeout(() => {
      serviceInterval = setInterval(rotateServices, 4000);
    }, 2000);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(serviceInterval);
      clearTimeout(startRotation);
    };
  }, [handleScroll, handleMouseMove, rotateServices]);

  const services = [
    { 
      title: "Web Development", 
      desc: "Custom web applications built with modern technologies like React, Vue, and Node.js. I create fast, scalable, and maintainable solutions that drive business growth.",
      icon: <FaLaptopCode className="text-4xl" />,
      tech: ["React", "Vue.js", "Node.js", "TypeScript", "Next.js"],
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      title: "UI/UX Design", 
      desc: "User-centered designs that prioritize both aesthetics and functionality. I create intuitive interfaces that enhance user engagement and conversion rates.",
      icon: <FaUser className="text-4xl" />,
      tech: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      title: "Mobile Development", 
      desc: "Cross-platform mobile applications that work seamlessly on iOS and Android. I build native-feeling apps with React Native and Flutter.",
      icon: <MdOutlineSpeed className="text-4xl" />,
      tech: ["React Native", "Flutter", "iOS", "Android", "Expo"],
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      title: "E-Commerce Solutions", 
      desc: "Complete online store setup with payment integration and inventory management. I build scalable e-commerce platforms that convert visitors into customers.",
      icon: <FaFileAlt className="text-4xl" />,
      tech: ["Shopify", "WooCommerce", "Stripe", "Payment APIs", "Inventory Systems"],
      gradient: "from-orange-500 to-red-500"
    },
    { 
      title: "API Development", 
      desc: "Robust backend services and RESTful APIs to power your applications. I design secure, scalable APIs with proper documentation and testing.",
      icon: <FaBolt className="text-4xl" />,
      tech: ["REST APIs", "GraphQL", "Microservices", "Database Design", "Authentication"],
      gradient: "from-indigo-500 to-purple-500"
    },
    { 
      title: "DevOps & Deployment", 
      desc: "Continuous integration, deployment pipelines, and cloud infrastructure setup. I ensure your applications are fast, secure, and always available.",
      icon: <FaCog className="text-4xl" />,
      tech: ["AWS", "Docker", "CI/CD", "Cloud Architecture", "Monitoring"],
      gradient: "from-rose-500 to-pink-500"
    }
  ];

  const collaborationFeatures = [
    { 
      icon: <FaUser className="text-3xl" />, 
      title: "Client-Centric Approach", 
      desc: "Your vision is my priority. I work closely with you to ensure every detail aligns with your goals and expectations.",
      features: ["Regular progress updates", "Transparent communication", "Flexible to your needs"]
    },
    { 
      icon: <MdOutlineSpeed className="text-3xl" />, 
      title: "Agile Development", 
      desc: "Fast, iterative development process that delivers value quickly while maintaining the highest quality standards.",
      features: ["Quick prototyping", "Continuous delivery", "Adaptive planning"]
    },
    { 
      icon: <FaRegStar className="text-3xl" />, 
      title: "Quality Assurance", 
      desc: "Rigorous testing and code reviews ensure your project is robust, secure, and performs excellently.",
      features: ["Automated testing", "Code reviews", "Performance optimization"]
    }
  ];

  const stats = [
    { value: "24h", label: "Avg Response Time" },
    { value: "50+", label: "Projects Delivered" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "5+", label: "Years Experience" }
  ];

  return (
    <div className="relative w-full bg-[#0f0f10] text-white min-h-screen overflow-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#bd34fe] to-[#ff6cde] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Mouse-following gradient */}
        <div 
          className="absolute inset-0 opacity-10 transition-all duration-1000"
          style={{
            background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(189, 52, 254, 0.2), transparent 70%)`
          }}
        />
        
        {/* Floating blobs with optimized animation */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-float-slow"
            style={{
              width: `${100 + i * 150}px`,
              height: `${100 + i * 150}px`,
              top: `${10 + i * 15}%`,
              left: `${i * 18}%`,
              background: `radial-gradient(circle, #bd34fe${8 + i * 3}%, transparent 70%)`,
              opacity: 0.05 + i * 0.02,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${25 + i * 5}s`
            }}
          />
        ))}

        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0 transition-transform duration-200"
            style={{
              backgroundImage: `linear-gradient(rgba(189, 52, 254, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(189, 52, 254, 0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`
            }} 
          />
        </div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 py-20 lg:px-16 lg:py-0">
          <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl lg:max-w-none">
              <div className={`transition-all duration-1000 transform ${
                isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                {/* Availability Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 mb-8 group hover:border-[#bd34fe] transition-all duration-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#bd34fe] to-[#ff6cde] animate-pulse" />
                    <span className="text-sm font-medium text-gray-300">Available for new projects</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#bd34fe] transition-colors" />
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight">
                  Crafting{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] via-[#ff6cde] to-[#bd34fe] bg-size-200 animate-gradient">
                    Digital
                  </span>{" "}
                  Excellence
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
                  I transform complex ideas into{" "}
                  <span className="text-[#bd34fe] font-semibold">exceptional digital solutions</span> 
                  {" "}that drive measurable results and create lasting impact.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mb-12">
                  <button className="px-8 py-4 bg-gradient-to-r from-[#bd34fe] to-[#7c3aed] rounded-xl font-semibold text-white flex items-center gap-3 group hover:shadow-2xl hover:shadow-[#bd34fe]/40 transition-all duration-300 hover:-translate-y-1 active:scale-95">
                    <span>Explore My Work</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  <button className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl font-semibold text-white hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 active:scale-95">
                    Schedule Consultation
                  </button>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-5">
                  {[
                    { icon: <FaGithub />, label: "GitHub", href: "https://github.com/tribun04" },
                    { icon: <FaLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/tribunb/" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#bd34fe] hover:bg-gray-800/70 transition-all duration-300 group hover:-translate-y-1"
                      aria-label={social.label}
                    >
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className={`relative transition-all duration-1000 delay-300 ${
                isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                {/* Main Profile Container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#bd34fe] to-[#7c3aed] p-1.5 animate-spin-slow">
                    <div className="w-full h-full rounded-3xl bg-[#0f0f10]" />
                  </div>
                  
                  {/* Profile Content */}
                  <div className="absolute inset-2 rounded-2xl bg-[#0f0f10] flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#bd34fe] to-[#7c3aed] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#bd34fe]/30">
                        <RiCustomerService2Fill className="text-4xl text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Full Stack Developer</h3>
                      <p className="text-gray-400 text-sm">React • Node.js • TypeScript • AWS</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Stats */}
                {[
                  { top: "-5%", right: "-5%", value: "50+", label: "Projects", delay: "0s" },
                  { bottom: "-5%", left: "-5%", value: "5+", label: "Years Exp", delay: "1s" },
                  { top: "35%", left: "-15%", value: "100%", label: "Satisfaction", delay: "2s" }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="absolute w-20 h-20 rounded-2xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 flex flex-col items-center justify-center p-2 shadow-2xl animate-float hover:-translate-y-2 transition-transform duration-300"
                    style={{
                      top: item.top,
                      right: item.right,
                      bottom: item.bottom,
                      left: item.left,
                      animationDelay: item.delay
                    }}
                  >
                    <span className="text-lg font-bold text-[#bd34fe]">{item.value}</span>
                    <span className="text-xs text-center text-gray-400 mt-1">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="py-32 px-6 lg:px-16 relative">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-20 transition-all duration-700 ${
              isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] to-[#ff6cde]">Expertise</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Comprehensive digital solutions tailored to transform your vision into reality with cutting-edge technology
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Services List */}
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 group ${
                      activeService === index
                        ? 'bg-gray-800/50 backdrop-blur-sm border border-[#bd34fe] shadow-2xl shadow-[#bd34fe]/20 scale-[1.02]'
                        : 'bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-gray-600'
                    } ${isVisible.services ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                    onMouseEnter={() => setActiveService(index)}
                    onClick={() => setActiveService(index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl transition-all duration-300 ${
                        activeService === index
                          ? 'bg-gradient-to-r from-[#bd34fe] to-[#7c3aed] text-white shadow-lg'
                          : 'bg-gray-800 text-[#bd34fe] group-hover:scale-110'
                      }`}>
                        {service.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-white mb-2 truncate">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {service.desc}
                        </p>
                      </div>
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeService === index 
                          ? 'bg-[#bd34fe] scale-150' 
                          : 'bg-gray-600 group-hover:bg-gray-500'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Active Service Detail */}
              <div className={`sticky top-24 transition-all duration-500 ${
                isVisible.services ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 shadow-2xl">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${services[activeService]?.gradient} flex items-center justify-center text-white mb-6 shadow-lg`}>
                    {services[activeService]?.icon}
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {services[activeService]?.title}
                  </h3>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    {services[activeService]?.desc}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-gray-400">Core Technologies</h4>
                    <div className="flex flex-wrap gap-3">
                      {services[activeService]?.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full bg-gray-700/50 text-gray-300 text-sm border border-gray-600 hover:border-[#bd34fe] transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full py-4 bg-gradient-to-r from-[#bd34fe] to-[#7c3aed] rounded-xl font-semibold text-white flex items-center justify-center gap-3 group hover:shadow-xl hover:shadow-[#bd34fe]/30 transition-all duration-300 hover:-translate-y-1 active:scale-95">
                    <span>Start {services[activeService]?.title} Project</span>
                    <FaRocket className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration Section */}
        <section ref={collaborationRef} className="py-32 px-6 lg:px-16 bg-gray-900/20">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-20 transition-all duration-700 ${
              isVisible.collaboration ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] to-[#ff6cde]">Choose Me</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A partnership built on trust, innovation, and exceptional results
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collaborationFeatures.map((item, index) => (
                <div 
                  key={index}
                  className={`group relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 hover:border-[#bd34fe] transition-all duration-500 hover:-translate-y-2 ${
                    isVisible.collaboration ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Floating Icon */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#bd34fe] to-[#7c3aed] flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                  </div>
                  
                  <div className="pt-8">
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 mb-6 text-center leading-relaxed">
                      {item.desc}
                    </p>
                    
                    <ul className="space-y-3">
                      {item.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3 text-gray-300 group-hover:text-gray-200 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-[#bd34fe] flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="py-32 px-6 lg:px-16 relative">
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#bd34fe]/10 via-transparent to-[#7c3aed]/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#bd34fe]/5 via-transparent to-transparent" />
          
          <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-700 ${
            isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] to-[#ff6cde]">Begin</span> Your Journey?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Let's transform your vision into an exceptional digital experience that captivates your audience and drives meaningful results.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <button className="px-12 py-5 bg-gradient-to-r from-[#bd34fe] to-[#7c3aed] rounded-xl font-semibold text-white flex items-center justify-center gap-3 group hover:shadow-2xl hover:shadow-[#bd34fe]/40 transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg">
                <span>Start Your Project</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="px-12 py-5 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl font-semibold text-white hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg">
                View Case Studies
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-2xl md:text-3xl font-bold text-[#bd34fe] mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FlyOutMenu />
    </div>
  );
};

export default Home;