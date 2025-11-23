import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBolt, FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const activeLinkStyle = {
    color: '#bd34fe', // Fixed to match your color scheme
  };

  return (
    <header className="sticky top-0 z-50 p-4 bg-black/20 backdrop-blur-md">
      <nav className="mx-auto flex max-w-4xl items-center justify-between rounded-full bg-black/40 px-5 py-3 ring-1 ring-white/10 backdrop-blur-lg">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#bd34fe] to-[#7c3aed]"> {/* Fixed gradient colors */}
            <FaBolt className="h-4 w-4 text-white" />
          </div>
          <span className="hidden text-xl font-bold text-white sm:inline">
            Tribun Bajra
          </span>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-x-5 text-sm font-medium text-gray-300 md:gap-x-8">
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="transition-colors hover:text-white"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="transition-colors hover:text-white"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="transition-colors hover:text-white"
            >
              Projects
            </NavLink>
          </li>
          <li>
            
          </li>
        </ul>

        {/* Contact CTA */}
        <NavLink
          to="/contact"
          className="hidden md:inline-block rounded-full bg-gradient-to-r from-[#bd34fe] to-[#7c3aed] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-[#bd34fe]/30 hover:-translate-y-0.5" // Fixed colors and added hover effects
        >
          Contact Me
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 rounded-lg bg-black/80 p-4 text-center ring-1 ring-white/10 backdrop-blur-lg">
          <ul className="flex flex-col gap-y-3 text-gray-300 text-lg font-medium">
            <li>
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                className="transition-colors hover:text-white"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                className="transition-colors hover:text-white"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                className="transition-colors hover:text-white"
              >
                Projects
              </NavLink>
            </li>
          
            <li>
              <NavLink
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-block rounded-full bg-gradient-to-r from-[#bd34fe] to-[#7c3aed] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-[#bd34fe]/30"
              >
                Contact Me
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;