// src/components/Footer.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaHeart, FaArrowUp, FaCoffee, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiReact, SiTailwindcss, SiVite, SiGmail } from 'react-icons/si';

// Default links and stacks
const defaultQuickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const defaultSocialLinks = [
  { label: 'GitHub', icon: FaGithub, url: 'https://github.com/tribun04', gradient: 'from-purple-500 to-pink-500', hover: 'hover:shadow-purple-500/30' },
  { label: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/tribunb/', gradient: 'from-blue-500 to-cyan-500', hover: 'hover:shadow-blue-500/30' },
  { label: 'Email', icon: SiGmail, url: 'mailto:tribunbajra4@gmail.com', gradient: 'from-red-500 to-orange-500', hover: 'hover:shadow-red-500/30' },
];

const defaultTechStack = [
  { icon: SiReact, label: 'React', color: 'text-cyan-400' },
  { icon: SiTailwindcss, label: 'Tailwind', color: 'text-blue-400' },
  { icon: SiVite, label: 'Vite', color: 'text-purple-400' },
];

const Footer = ({
  quickLinks = defaultQuickLinks,
  socialLinks = defaultSocialLinks,
  techStack = defaultTechStack,
}) => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const socialRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Social icons animation
      gsap.fromTo(
        socialRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Footer text animation
      gsap.fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Back to top floating animation
      gsap.to('.back-to-top', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-gray-900 via-[#0f0f10] to-black border-t border-gray-800 py-16 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -left-20 top-10 w-72 h-72 bg-[#bd34fe] rounded-full mix-blend-soft-light filter blur-3xl animate-float"></div>
        <div className="absolute -right-20 top-28 w-72 h-72 bg-[#7c3aed] rounded-full mix-blend-soft-light filter blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute left-40 bottom-10 w-72 h-72 bg-[#ff6cde] rounded-full mix-blend-soft-light filter blur-3xl animate-float animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(189, 52, 254, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(189, 52, 254, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#bd34fe] to-[#ff6cde] bg-clip-text text-transparent mb-4">
              Tribun Bajra
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Full Stack Developer crafting exceptional digital experiences with modern technologies and innovative solutions.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-500">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <tech.icon className={`text-xl ${tech.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-sm group-hover:text-gray-300 transition-colors">{tech.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-[#bd34fe] transition-all duration-300 transform hover:translate-x-2"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center lg:text-right">
            <h4 className="text-lg font-semibold text-white mb-6">Let's Connect</h4>
            <div ref={socialRef} className="flex justify-center lg:justify-end gap-4 mb-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`group relative w-12 h-12 rounded-xl bg-gray-800/50 border border-gray-700 flex items-center justify-center text-xl text-gray-400 transition-all duration-300 hover:scale-110 hover:shadow-lg ${link.hover}`}
                >
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <link.icon className="relative z-10 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-sm">Available for freelance work</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div ref={textRef} className="flex flex-col items-center md:items-start gap-2 text-gray-400">
            <p className="text-sm flex items-center gap-2">
              <span>© {currentYear} Tribun Bajra. All rights reserved.</span>
            </p>
            <p className="text-xs flex items-center gap-1">
              Crafted with <FaHeart className="text-red-500 mx-1 animate-pulse" /> and <FaCoffee className="text-amber-500 mx-1" />
            </p>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="back-to-top group flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-white hover:border-[#bd34fe] transition-all duration-300"
          >
            <span className="text-sm">Back to Top</span>
            <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Gradient Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#bd34fe] via-[#7c3aed] to-[#ff6cde]"></div>
    </footer>
  );
};

export default Footer;
