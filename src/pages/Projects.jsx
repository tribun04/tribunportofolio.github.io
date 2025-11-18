// src/pages/ProjectsPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticlesBackground from '../components/ParticlesBackground/ParticlesBackground';
import ProjectCard from '../components/ProjectCard.jsx';
import projectsData from '../data/projects.json';

gsap.registerPlugin(ScrollTrigger);

const ProjectsPage = () => {
  const pageRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAnimating, setIsAnimating] = useState(false);

  // Get unique categories
  const categories = ["All", ...new Set(projectsData.map(project => project.category))];

  // Filter projects
  const filteredProjects = activeCategory === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  // Animation for category change
  const animateCategoryChange = () => {
    if (!gridRef.current) return;

    setIsAnimating(true);
    const cards = gridRef.current.querySelectorAll('.project-card');
    
    // Fade out current cards
    gsap.to(cards, {
      opacity: 0,
      y: 50,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        // After fade out, animate new cards in
        setTimeout(() => {
          const newCards = gridRef.current.querySelectorAll('.project-card');
          gsap.fromTo(newCards, 
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              onComplete: () => setIsAnimating(false)
            }
          );
        }, 100);
      }
    });
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    if (category === activeCategory || isAnimating) return;
    setActiveCategory(category);
  };

  // Initial animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      const tl = gsap.timeline();
      
      tl.from(".page-header", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .from(".page-subtitle", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6")
      .from(".filter-tabs", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .from(".project-counter", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2");

      // Project cards animation
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: {
          amount: 0.4,
          from: "random"
        },
        ease: "power3.out",
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Animate on category change
  useEffect(() => {
    if (pageRef.current) {
      animateCategoryChange();
    }
  }, [activeCategory]);

  return (
    <div className="relative w-full bg-[#0f0f10] text-white min-h-screen">
      {/* Background */}
      <ParticlesBackground />
      
      {/* Main Content */}
      <main ref={pageRef} className="relative z-10 pt-20">
        {/* Header Section */}
        <section className="section-padding">
          <div className="container">
            {/* Page Header */}
            <div className="page-header text-center mb-12">
              <div className="badge-container mb-6">
                <div className="badge">
                  <div className="badge-dot"></div>
                  <span>Featured Portfolio</span>
                </div>
              </div>

              <h1 className="page-title">
                Creative <span className="gradient-text">Projects</span> & Innovations
              </h1>
            </div>

            {/* Page Description */}
            <div className="page-subtitle text-center mb-16">
              <p className="subtitle-text">
                Discover my journey through <span className="text-[#bd34fe]">innovative solutions</span> and 
                <span className="text-[#ff6cde]"> cutting-edge technologies</span> that solve real-world problems
              </p>
            </div>

            {/* Category Filter */}
            <div className="filter-section mb-16">
              <div className="filter-tabs flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    disabled={isAnimating}
                    className={`filter-btn ${activeCategory === category ? 'active' : ''} ${
                      isAnimating ? 'disabled' : ''
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Counter */}
            <div className="project-counter text-center mb-12">
              <div className="counter-stats">
                <span className="counter-number">{filteredProjects.length}</span>
                <span className="counter-label">
                  {filteredProjects.length === 1 ? 'Project' : 'Projects'} 
                  {activeCategory !== "All" && ` in ${activeCategory}`}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="section-padding bg-gradient-to-b from-transparent to-gray-900/20">
          <div className="container">
            <div 
              ref={gridRef}
              className="projects-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))
              ) : (
                // Empty State
                <div className="empty-state col-span-full">
                  <div className="empty-icon">📁</div>
                  <h3 className="empty-title">No Projects Found</h3>
                  <p className="empty-description">
                    No projects available in the <span className="text-[#bd34fe]">"{activeCategory}"</span> category.
                  </p>
                  <button 
                    onClick={() => handleCategoryChange("All")}
                    className="empty-action-btn"
                  >
                    View All Projects
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-b from-gray-900/20 to-[#0f0f10]">
          <div className="container">
            <div className="cta-section text-center">
              <h2 className="cta-title">
                Ready to <span className="gradient-text">Collaborate</span>?
              </h2>
              <p className="cta-description">
                Let's bring your next big idea to life with innovative solutions and exceptional craftsmanship
              </p>
              <div className="cta-buttons">
                <button className="btn-primary">
                  Start a Project
                </button>
                <button className="btn-secondary">
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Loading Overlay */}
      {isAnimating && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading Projects...</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;