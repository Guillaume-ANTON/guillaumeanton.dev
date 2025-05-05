import { useEffect, useState } from 'react';
import Header from './components/Header';
import About from './components/About';

import fr from './i18n/fr.json';
import en from './i18n/en.json';
import Aboutme from './components/Aboutme';
import Skills from './components/Skills';
import Projects from './components/Project';

function App() {
  const [texts, setTexts] = useState(fr);

  useEffect(() => {
    const language = navigator.language || navigator.userLanguage;
    if (language.startsWith('fr')) {
      setTexts(fr);
    } else {
      setTexts(en);
    }
  }, []);

  return (
    <>
      <Header texts={texts.header} />
      <main className="pt-24">
        <About texts={texts.about} />
      </main>
      <Aboutme texts={texts.aboutme}/>
      <Skills texts={texts.skills}/>
      <Projects texts={texts.projects} />
    </>
  );
}

export default App;
