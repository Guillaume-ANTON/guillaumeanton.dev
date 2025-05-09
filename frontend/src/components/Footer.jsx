function Footer( {texts} ) {
    return (
      <footer className="bg-gray-100 text-gray-700 py-4 px-6 mt-12 rounded-t-xl shadow-inner">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Texte copyright */}
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-xl">#</span>
            <span>Copyright © 2025 – {texts.copyright}</span>
          </div>
  
          {/* Icônes réseaux */}
          <div className="flex space-x-4 mt-4 md:mt-0">
      <a
        href="https://github.com/Guillaume-ANTON"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" className="w-6 h-6 hover:opacity-80" />
      </a>
      <a
        href="https://www.linkedin.com/in/guillaume-anton/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="w-6 h-6 hover:opacity-80" />
      </a>
    </div>
        </div>
      </footer>
    )
  }
  
  export default Footer;
  