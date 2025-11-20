import React from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const ProjectCard = ({ project }) => {
  return (
    <div className="group project-card bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 border border-gray-800 hover:border-purple-500/30 relative">
      
      {/* Image Container with Fallback */}
      <div className="relative w-full h-48 bg-gray-800 overflow-hidden">
        <img
          src={project.imageUrl || project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300/1f2937/9ca3af?text=${encodeURIComponent(project.title)}`;
          }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-purple-400/30">
            {project.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 relative z-10">
        <h2 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
          {project.title}
        </h2>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded-md border border-purple-500/20"
            >
              {tag}
            </span>
          ))}
          {project.tags && project.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-md">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between pt-2">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-all duration-300 group/link"
          >
            <span>View Details</span>
            <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                title="Live Demo"
              >
                <FiExternalLink size={16} />
              </a>
            )}
            
           
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default ProjectCard;