import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

function Header({ texts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [suffix, setSuffix] = useState('.python');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuffix('.dev');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-3xl font-bold text-gray-800 flex items-baseline gap-1">
        <span className="text-blue-600">Guillaume</span>ANTON
            <span
            key={suffix}
            className="text-blue-600 inline-block w-[6ch] transition-all duration-700 ease-in-out opacity-100 translate-y-0 animate-fade-in"
            >
            {suffix}
            </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-8 text-gray-700 font-semibold text-lg">
          <Link to="aboutme" smooth duration={500} className="cursor-pointer hover:text-blue-500">
            {texts.about}
          </Link>
          <Link to="skills" smooth duration={500} className="cursor-pointer hover:text-blue-500">
            {texts.skills}
          </Link>
          <Link to="projects" smooth duration={500} className="cursor-pointer hover:text-blue-500">
            {texts.projects}
          </Link>
        </nav>

        {/* Contact + Avatar */}
        <div className="hidden md:flex items-center gap-x-4">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5">
            {texts.contactme}
          </button>

          <div className="relative flex items-center h-10">
            <img className="w-10 h-10 rounded-full" src="/pictures/about.png" alt="Avatar" />
            <span className="absolute bottom-0 left-7 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
          </div>
        </div>

        {/* Burger - Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl text-gray-800 focus:outline-none">
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
    </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-white px-6 pb-4 shadow-md space-y-4 text-gray-700 text-lg font-semibold">
          <Link to="about" smooth duration={500} className="block hover:text-blue-500" onClick={() => setIsOpen(false)}>
            {texts.about}
          </Link>
          <Link to="skills" smooth duration={500} className="block hover:text-blue-500" onClick={() => setIsOpen(false)}>
            {texts.skills}
          </Link>
          <Link to="projects" smooth duration={500} className="block hover:text-blue-500" onClick={() => setIsOpen(false)}>
            {texts.projects}
          </Link>
          <Link to="contact" smooth duration={500} className="block hover:text-blue-500" onClick={() => setIsOpen(false)}>
            {texts.contact}
          </Link>
          <div className="md:hidden flex items-center gap-4 mt-4">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-2">
              {texts.contactme}
            </button>

            <div className="relative flex items-center h-10">
              <img className="w-10 h-10 rounded-full" src="/pictures/about.png" alt="Avatar" />
              <span className="absolute bottom-0 left-7 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
