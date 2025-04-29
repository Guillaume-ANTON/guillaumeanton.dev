import { useEffect, useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';

import fr from './i18n/fr.json';
import en from './i18n/en.json';

function App() {
  const [texts, setTexts] = useState(en); // par défaut anglais

  useEffect(() => {
    const language = navigator.language || navigator.userLanguage;
    if (language.startsWith('fr')) {
      setTexts(fr);
    } else {
      setTexts(en);
    }
  }, []);

  return (
    <div className="pt-20">
      <Header texts={texts.header} />
      <main className="space-y-24">
        <section id="about">
          <About texts={texts.about} />
        </section>
        <section id="skills">
          <Skills texts={texts.skills} />
        </section>
        <section id="projects">
          <Projects texts={texts.projects} />
        </section>
        <section id="footer">
          <Footer texts={texts.footer} />
        </section>
      </main>
    </div>
  );
}

export default App;