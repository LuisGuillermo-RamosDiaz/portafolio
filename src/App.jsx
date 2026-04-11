import { LanguageProvider } from './context/LanguageContext';
import ParticleBackground from './canvas/ParticleBackground';
import ScrollProgress from './components/ui/ScrollProgress';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';

export default function App() {
  return (
    <LanguageProvider>
      <ParticleBackground />
      <ScrollProgress />
      <Header />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
