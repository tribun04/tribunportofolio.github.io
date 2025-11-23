import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaCode,
  FaPalette,
  FaServer,
  FaCloud,
  FaMobile,
  FaRocket,
  FaDownload,
  FaEnvelope,
  FaStar,
  FaAward,
  FaHeart,
  FaLightbulb
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const pageRef = useRef(null);
  const floatingElementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced section animations
      gsap.utils.toArray(".animate-section").forEach(section => {
        gsap.from(section, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });

      // Enhanced stats animation with counter
      gsap.from(".stat-item", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Floating elements animation
      floatingElementsRef.current.forEach((element, index) => {
        gsap.to(element, {
          y: -20,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3
        });
      });

      // Skills cards hover animation preparation
      gsap.utils.toArray(".skill-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { 
            y: -8, 
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { 
            y: 0, 
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
      });

    }, pageRef);
    
    return () => ctx.revert();
  }, []);

  const skills = [
    { 
      icon: <FaCode className="text-3xl" />, 
      title: "Frontend Development", 
      description: "Creating immersive, responsive web experiences with modern frameworks and animations",
      technologies: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "GSAP", "Three.js"],
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      icon: <FaServer className="text-3xl" />, 
      title: "Backend Development", 
      description: "Building robust, scalable server architectures and APIs",
      technologies: ["Node.js", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL", "Redis"],
      gradient: "from-blue-500 to-cyan-500"
    },
 
    { 
      icon: <FaCloud className="text-3xl" />, 
      title: "DevOps & Cloud", 
      description: "Deploying and maintaining applications in cloud environments",
      technologies: ["AWS", "Docker", "CI/CD", "Vercel", "Kubernetes", "Terraform"],
      gradient: "from-orange-500 to-red-500"
    },
    { 
      icon: <FaPalette className="text-3xl" />, 
      title: "UI/UX Design", 
      description: "Designing intuitive user interfaces and seamless experiences",
      technologies: ["Figma", "Prototyping", "User Research", "Design Systems", "Framer"],
      gradient: "from-pink-500 to-rose-500"
    },
    { 
      icon: <FaRocket className="text-3xl" />, 
      title: "System Architecture", 
      description: "Designing scalable, secure, and high-performance systems",
      technologies: ["Microservices", "Security", "Performance", "Scalability", "System Design"],
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed", icon: <FaStar /> },
    { number: "3+", label: "Years Experience", icon: <FaAward /> },
    { number: "30+", label: "Happy Clients", icon: <FaHeart /> },
    { number: "100%", label: "Success Rate", icon: <FaLightbulb /> }
  ];

  const timeline = [
    { year: "2023", title: "Started Journey", description: "Began my career in web development" },
    { year: "2024", title: "Full-Stack Focus", description: "Expanded into backend technologies" },
    { year: "2025", title: "Architecture Design", description: "Designed scalable system architectures" },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white relative overflow-hidden" ref={pageRef}>
      {/* Enhanced Background with animated elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-[0.15]"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#bd34fe] to-[#ff6cde] rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] rounded-full blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-r from-[#06b6d4] to-[#10b981] rounded-full blur-3xl opacity-15 animate-pulse-slow animation-delay-4000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-6 h-6 border-2 border-[#bd34fe] opacity-40" ref={el => floatingElementsRef.current[0] = el}></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-[#7c3aed] rounded-full opacity-30" ref={el => floatingElementsRef.current[1] = el}></div>
        <div className="absolute bottom-60 left-20 w-8 h-8 border border-[#06b6d4] opacity-30" ref={el => floatingElementsRef.current[2] = el}></div>
        <div className="absolute bottom-40 right-10 w-5 h-5 bg-[#ff6cde] opacity-40" ref={el => floatingElementsRef.current[3] = el}></div>
        
        {/* Animated connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <path d="M100,100 Q500,150 900,300" stroke="url(#gradient1)" strokeWidth="2" fill="transparent" className="animate-dash"/>
          <path d="M1200,200 Q800,400 200,500" stroke="url(#gradient2)" strokeWidth="2" fill="transparent" className="animate-dash animation-delay-1000"/>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#bd34fe" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Hero Header */}
      <header className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-center relative">
        <div className="animate-section">
          {/* Animated title */}
          <div className="relative inline-block mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 relative z-10">
              About <span className=" bg-clip-text  animate-gradient">Me</span>
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-[#bd34fe] to-[#7c3aed] blur-2xl opacity-20 -z-10 rounded-full"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-gray-700/50">
            I'm a passionate <span className="text-[#bd34fe] font-semibold">full-stack developer</span> with over 5 years of experience creating digital solutions that make a difference. I love turning complex problems into simple, beautiful designs that users love.
          </p>
        </div>
      </header>

      {/* Enhanced Stats Section */}
    
      {/* Enhanced Skills Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="animate-section text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] to-[#ff6cde]">Expertise</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A comprehensive suite of skills to bring your digital vision to life
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="animate-section skill-card group relative bg-gradient-to-br from-gray-900/40 to-gray-800/40 rounded-2xl p-6 border border-gray-700/50 hover:border-transparent transition-all duration-500 backdrop-blur-md overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#bd34fe] to-[#7c3aed] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                  <div className="absolute inset-[2px] rounded-2xl bg-[#0f0f10]"></div>
                </div>
                
                <div className="relative z-10">
                  <div className={`text-transparent bg-clip-text bg-gradient-to-r ${skill.gradient} mb-4 group-hover:scale-110 transition-transform duration-300 inline-block`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#bd34fe] group-hover:to-[#ff6cde] transition-all duration-300">
                    {skill.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm">{skill.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-3 py-1 text-xs rounded-lg bg-gray-700/50 text-gray-300 border border-gray-600 group-hover:border-[#bd34fe]/50 group-hover:bg-gray-700/70 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Story Section with Timeline */}
      <section className="py-20 px-6 bg-black/20 backdrop-blur-sm relative">
        <div className="max-w-6xl mx-auto">
          <div className="animate-section text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] to-[#ff6cde]">Journey</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-white mb-6">From Code to Creation</h3>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">My journey in web development started 3 years ago with a simple "Hello World" and has evolved into creating complex, scalable applications used by thousands.</p>
                <p>I believe in writing <span className="text-[#bd34fe]">clean, maintainable code</span> that not only works but is a pleasure to read and extend. Every project is an opportunity to learn, innovate, and push boundaries.</p>
                <p>When I'm not coding, you can find me exploring new technologies, contributing to open source, or sharing knowledge with the developer community.</p>
              </div>
            </div>
            
            {/* Enhanced Timeline */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#bd34fe] to-[#7c3aed]"></div>
              
              {timeline.map((item, index) => (
                <div key={index} className="relative mb-8 pl-16 group">
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#bd34fe] to-[#7c3aed] flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                    {item.year}
                  </div>
                  <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 group-hover:border-[#bd34fe] transition-all duration-300 backdrop-blur-md">
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-section relative bg-gradient-to-br from-gray-900/40 to-gray-800/40 rounded-3xl p-12 border border-gray-700/50 backdrop-blur-md overflow-hidden group">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#bd34fe]/5 to-[#7c3aed]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Create Something Amazing</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Ready to bring your next project to life? I'd love to hear about your ideas and see how we can collaborate to build something extraordinary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:tribunbajra4@gmail.com">
                  <button className="px-8 py-4 bg-gradient-to-r from-[#bd34fe] to-[#7c3aed] rounded-xl font-semibold text-white flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-[#bd34fe]/40 transition-all duration-300 hover:-translate-y-1 group/btn relative overflow-hidden">
                    <span className="relative z-10">Get In Touch</span>
                    <FaEnvelope className="text-lg relative z-10 group-hover/btn:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#bd34fe] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </a>
                <a href="/ResumeTB.pdf" download target="_blank" rel="noopener noreferrer">
                  <button className="px-8 py-4 bg-gray-800/50 border border-gray-700 rounded-xl font-semibold text-white flex items-center justify-center gap-3 hover:bg-gray-700/50 hover:border-[#bd34fe] transition-all duration-300 hover:-translate-y-1 group/btn">
                    <span>Download Resume</span>
                    <FaDownload className="text-lg group-hover/btn:scale-110 transition-transform" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;