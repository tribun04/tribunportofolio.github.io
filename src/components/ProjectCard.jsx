import React from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-white">{project.title}</h2>
        <p className="text-gray-300 mb-4">{project.description}</p>

        <Link
          to={`/projects/${project.id}`} // Link to details page
          className="text-purple-400 hover:text-purple-500 font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
