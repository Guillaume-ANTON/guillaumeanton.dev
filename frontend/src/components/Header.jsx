import { useState } from 'react';
import { Link } from 'react-scroll';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold text-gray-800">
          <span className="text-blue-600">Mon</span>Portfolio
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-semibold text-lg">
          <Link to="about" smooth duration={500} className="cursor-pointer hover:text-blue-500">
            À propos
          </Link>
          <Link to="skills" smooth duration={500} className="cursor-pointer hover:text-blue-500">
            Compétences
          </Link>
          <Link to="projects" smooth duration={500} className="cursor-pointer hover:text-blue-500">
            Projets
          </Link>
          <Link to="contact" smooth duration={500} className="cursor-pointer hover:text-blue-500">
            Contact
          </Link>
        </nav>

        {/* Burger - Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl text-gray-800 focus:outline-none"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-4 shadow-md space-y-4 text-gray-700 text-lg font-semibold">
          <Link to="about" smooth duration={500} className="block hover:text-blue-500" onClick={() => setIsOpen(false)}>
            À propos
          </Link>
          <Link to="skills" smooth duration={500} className="block hover:text-blue-500" onClick={() => setIsOpen(false)}>
            Compétences
          </Link>
          <Link to="projects" smooth duration={500} className="block hover:text-blue-500" onClick={() => setIsOpen(false)}>
            Projets
          </Link>
          <Link to="contact" smooth duration={500} className="block hover:text-blue-500" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;