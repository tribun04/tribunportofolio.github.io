import { useParams, useNavigate } from 'react-router-dom';
import projectsData from '../data/projects.json';
import { FiExternalLink, FiGithub, FiArrowLeft, FiCalendar, FiCode } from 'react-icons/fi';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#0f0f10] p-6">
        <p className="text-gray-300 text-xl mb-6">Project not found.</p>
        <button
          onClick={() => navigate('/projects')}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white">
      {/* Header with Background */}
      <div className="relative bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 border-b border-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-8">
          <button
            onClick={() => navigate(-1)}
            className="group mb-8 px-5 py-3 bg-black/40 backdrop-blur-sm rounded-xl hover:bg-black/60 transition-all duration-300 flex items-center gap-3 border border-gray-800 hover:border-purple-500/50"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Projects</span>
          </button>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Project Image */}
          <div className="lg:col-span-2">
            <div className="group relative rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500/30 transition-all duration-500">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Additional Images Gallery - Optional */}
            {project.images && project.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-6">
                {project.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${project.title} ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-800 hover:border-purple-500/30 transition-all duration-300"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Project Details */}
          <div className="space-y-8">
            {/* Project Info Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-white">Project Information</h3>
              
              <div className="space-y-4">
                {project.date && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <FiCalendar className="text-purple-400" />
                    <span>{project.date}</span>
                  </div>
                )}
                
                {project.tech && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <FiCode className="text-purple-400" />
                    <span className="text-sm">{project.tech.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-white">Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {project.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 px-4 py-2 rounded-lg text-sm border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                <FiExternalLink size={20} />
                <span>View Live Demo</span>
              </a>

          
            </div>
          </div>
        </div>

        {/* Project Features - Optional */}
        {project.features && (
          <div className="mt-12 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold mb-6 text-white">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-black/30 rounded-lg border border-gray-800 hover:border-purple-500/30 transition-all duration-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;