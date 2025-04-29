import { Link } from 'react-scroll';

function Header({ texts }) {
  return (
    <header className="fixed w-full top-0 bg-white shadow z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">Portfolio</div>
        <nav className="space-x-6">
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-500"
          >
            {texts.about}
          </Link>
          <Link
            to="skills"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-500"
          >
            {texts.skills}
          </Link>
          <Link
            to="projects"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-500"
          >
            {texts.projects}
          </Link>
          <Link
            to="footer"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-500"
          >
            {texts.contact}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;