import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/home.jsx';
import About from './pages/About.jsx';
import Skills from './pages/Skills.jsx';
import Projects from './pages/Projects.jsx';
import Experience from './pages/Experience.jsx';
import Contact from './pages/Contact.jsx';
import Header from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

import FlyOutMenu from './components/FlyOutMenu/FlyOutMenu.jsx';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';


function App() {
  return (
    <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage />} /> {/* Dynamic route */}

            
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        <Footer />
       
        <FlyOutMenu />
     
        <ParticlesBackground />
        
    </Router>
  );
}

export default App;