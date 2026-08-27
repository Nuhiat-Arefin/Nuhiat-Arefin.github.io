import Nav from '../sections/Nav'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Projects from '../sections/Projects'
import Research from '../sections/Research'
import Writing from '../sections/Writing'
import Achievements from '../sections/Achievements'
import Skills from '../sections/Skills'
import Contact from '../sections/Contact'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[720px] px-6">
        <Hero />
        <About />
        <Projects />
        <Research />
        <Writing />
        <Achievements />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
