import { useParams, useNavigate } from 'react-router-dom';
import projectsData from '../data/projects.json';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const ProjectDetailsPage = () => {
  const { id } = useParams(); // Get project ID from URL
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <p>Project not found.</p>
        <button
          onClick={() => navigate('/projects')}
          className="mt-4 px-4 py-2 bg-purple-600 rounded hover:bg-purple-500"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        <img src={project.image} alt={project.title} className="w-full h-96 object-cover" />
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-gray-300 mb-6">{project.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="bg-purple-700 text-white px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-purple-400 hover:text-purple-500 transition-colors"
              >
                Live <FiExternalLink />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
              >
                Code <FiGithub />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
