import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticlesBackground from "../components/ParticlesBackground/ParticlesBackground";
import { 
  FaCode, 
  FaPalette, 
  FaServer, 
  FaCloud, 
  FaMobile, 
  FaRocket,
  FaArrowRight,
  FaDownload,
  FaEnvelope
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.utils.toArray(".animate-section").forEach(section => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      });

      // Animate stats
      gsap.from(".stat-item", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    {
      icon: <FaCode className="text-3xl" />,
      title: "Frontend Development",
      description: "React, Vue.js, TypeScript, Tailwind CSS, GSAP animations",
      technologies: ["React", "Vue.js", "TypeScript", "Tailwind CSS"]
    },
    {
      icon: <FaServer className="text-3xl" />,
      title: "Backend Development",
      description: "Node.js, Express, PostgreSQL, MongoDB, REST APIs",
      technologies: ["Node.js", "PostgreSQL", "MongoDB", "REST APIs"]
    },
    {
      icon: <FaMobile className="text-3xl" />,
      title: "Mobile Development",
      description: "React Native, Flutter, iOS & Android cross-platform apps",
      technologies: ["React Native", "Flutter", "iOS", "Android"]
    },
    {
      icon: <FaCloud className="text-3xl" />,
      title: "DevOps & Cloud",
      description: "AWS, Docker, CI/CD, Vercel, DigitalOcean deployment",
      technologies: ["AWS", "Docker", "CI/CD", "Vercel"]
    },
    {
      icon: <FaPalette className="text-3xl" />,
      title: "UI/UX Design",
      description: "Figma, Adobe XD, user research, prototyping, design systems",
      technologies: ["Figma", "Prototyping", "User Research", "Design Systems"]
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: "System Architecture",
      description: "Microservices, scalable infrastructure, security, performance",
      technologies: ["Microservices", "Security", "Performance", "Scalability"]
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "5+", label: "Years Experience" },
    { number: "30+", label: "Happy Clients" },
    { number: "100%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white" ref={pageRef}>
      <ParticlesBackground />
      
      {/* Header */}
      <header className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="animate-section text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] to-[#ff6cde]">Me</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer with over 5 years of experience 
            creating digital solutions that make a difference. I love turning complex 
            problems into simple, beautiful designs.
          </p>
        </div>
      </header>

      {/* Stats Section */}
      <section className="stats-section py-16 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#bd34fe] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-section text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] to-[#ff6cde]">Skills</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Here are the technologies and skills I've mastered over the years
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="animate-section bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-[#bd34fe] transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-[#bd34fe] mb-4">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {skill.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {skill.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm rounded-lg bg-gray-700/50 text-gray-300 border border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 bg-gray-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="animate-section text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] to-[#ff6cde]">Story</span>
            </h2>
          </div>

          <div className="animate-section grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">From Code to Creation</h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  My journey in web development started 5 years ago when I built my first website. 
                  Since then, I've worked with startups and established companies to create 
                  digital products that users love.
                </p>
                <p>
                  I believe in writing clean, maintainable code and creating intuitive user 
                  experiences. Every project is an opportunity to learn something new and 
                  push the boundaries of what's possible.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, 
                  contributing to open source, or sharing knowledge with the developer community.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-[#bd34fe]/20 to-[#7c3aed]/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💻</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Passionate Developer</h3>
                  <p className="text-gray-400">Always learning, always building</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-section bg-gray-800/30 rounded-3xl p-12 border border-gray-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Ready to bring your next project to life? I'd love to hear about your ideas and see how we can collaborate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-[#bd34fe] to-[#7c3aed] rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-[#bd34fe]/40 transition-all duration-300">
                <FaEnvelope className="text-lg" />
                Get In Touch
              </button>
              <button className="px-8 py-4 bg-gray-800/50 border border-gray-700 rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:bg-gray-700/50 transition-all duration-300">
                <FaDownload className="text-lg" />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;