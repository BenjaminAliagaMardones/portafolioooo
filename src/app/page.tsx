"use client";

import Image from "next/image";
import { Home as HomeIcon, User, Folder, Briefcase, ArrowRight, Download } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Inicio", href: "#inicio", icon: HomeIcon },
  { label: "Acerca", href: "#acerca", icon: User },
  { label: "Proyectos", href: "#proyectos", icon: Folder },
  { label: "Servicios", href: "#servicios", icon: Briefcase },
];

const roles = ["Ingeniería Informática", "Desarrollo Backend"];

const projects = [
  {
    title: "CooperaPyme",
    description: "Plataforma que conecta PYMEs para comunicarse, generar redes de apoyo y crear oportunidades de negocio.",
    image: "/img/project1.png",
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "Django", "PostgreSQl"],
    link: "https://integra-1-2-0.vercel.app/",
    linkText: "Ver Proyecto"
  },
  {
    title: "TREEJS",
    description: "Aplicación web interactiva con animaciones 3D creadas con Three.js.",
    image: "/img/project2.png",
    tags: ["Three.js", "JavaScript", "WebGL", "3D"],
    link: "#",
    linkText: "Ver Proyecto"
  },
  {
    title: "Entropy Evolve",
    description: "Sistema de automatización para agentes de IA, diseñado para dominios complejos con ingeniería de software.",
    image: "/img/project3.png",
    tags: ["Python", "AI", "Machine Learning"],
    link: "#",
    linkText: "GitHub"
  }
];

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("inicio");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAboutImage, setShowAboutImage] = useState(false);
  const [showAboutTitle, setShowAboutTitle] = useState(false);
  const [showAboutInfo, setShowAboutInfo] = useState(false);
  const [showAboutEducation, setShowAboutEducation] = useState(false);
  const [showAboutExperience, setShowAboutExperience] = useState(false);
  const [showAboutSkills, setShowAboutSkills] = useState(false);
  const [showProjectsTitle, setShowProjectsTitle] = useState(false);
  const [showProjectsCards, setShowProjectsCards] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setDisplayText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("acerca");
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible && !showAboutImage) {
          setShowAboutImage(true);
          setTimeout(() => setShowAboutTitle(true), 200);
          setTimeout(() => setShowAboutInfo(true), 400);
          setTimeout(() => setShowAboutEducation(true), 600);
          setTimeout(() => setShowAboutExperience(true), 800);
          setTimeout(() => setShowAboutSkills(true), 1000);
        }
      }

      const projectsSection = document.getElementById("proyectos");
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible && !showProjectsTitle) {
          setShowProjectsTitle(true);
          setTimeout(() => setShowProjectsCards([true, false, false]), 200);
          setTimeout(() => setShowProjectsCards([true, true, false]), 400);
          setTimeout(() => setShowProjectsCards([true, true, true]), 600);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAboutImage, showProjectsTitle]);

  const handleNavClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    setActiveSection(sectionId);
    
    if (sectionId === "acerca") {
      setShowAboutImage(false);
      setShowAboutTitle(false);
      setShowAboutInfo(false);
      setShowAboutEducation(false);
      setShowAboutExperience(false);
      setShowAboutSkills(false);
      setTimeout(() => {
        setShowAboutImage(true);
        setTimeout(() => setShowAboutTitle(true), 200);
        setTimeout(() => setShowAboutInfo(true), 400);
        setTimeout(() => setShowAboutEducation(true), 600);
        setTimeout(() => setShowAboutExperience(true), 800);
        setTimeout(() => setShowAboutSkills(true), 1000);
      }, 100);
    }
    
    if (sectionId === "inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <main className={`min-h-screen bg-white transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Navbar flotante */}
      <header className="sticky top-0 z-50 flex justify-center pt-6 pb-6">
        <div className="rounded-full border border-gray-200 bg-white/90 px-3 py-3 shadow-xl backdrop-blur-sm">
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={[
                    "flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-all duration-200",
                    activeSection === sectionId
                      ? "bg-black text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100",
                  ].join(" ")}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="mx-auto grid max-w-screen-2xl gap-12 px-18 pb-20 pt-24 md:grid-cols-2 md:items-start md:pt-32"
      >
        {/* Columna izquierda */}
        <div className="space-y-8">
          <h1 className="text-5xl font-[510] tracking-tight transition-all duration-600 hover:scale-105 cursor-default md:text-6xl lg:text-7xl">
            <span className="text-gray-900">Hola, soy </span>
            <span className="animate-color-change">Benjamín</span>
          </h1>

          {/* Etiqueta estilo "badge" */}
          <div className="inline-block">
            <div className="rounded-lg bg-gray-100 px-6 py-4 border border-gray-200">
              <span className="whitespace-nowrap text-base font-medium text-gray-700 md:text-5xl" style={{ fontFamily: "'Cousine Bold', monospace" }}>
                {displayText}
                <span className="animate-pulse text-gray-900">|</span>
              </span>
            </div>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-gray-500 transition-all duration-600 hover:translate-x-2 cursor-default md:text-xl">
            Soy estudiante de{" "}
            <span className="font-semibold text-gray-900">
              Ingeniería Civil Informática
            </span>{" "}
            . Me apasionan el mundo del{" "}
            <span className="font-semibold text-gray-900">
             desarrollo backend y la automatización de procesos
            </span>{" "}
            , además de crear, aprender y llevar mis ideas
            a la realidad a través de la programación y creatividad.
          </p>

          {/* Botones */}
          <div className="flex flex-col gap-5 pt-2 sm:flex-row">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-gray-900 bg-white px-9 py-5 text-base font-semibold text-gray-900 shadow-md transition-all duration-300 hover:scale-105 hover:rotate-2 hover:bg-gray-900 hover:text-white hover:shadow-lg"
            >
              <ArrowRight className="h-5 w-5" />
              Contratar
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-gray-900 bg-gray-900 px-9 py-5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:rotate-2 hover:shadow-lg"
            >
              <Download className="h-5 w-5" />
              Descargar CV
            </a>
          </div>

          {/* Línea divisoria */}
          <div className="border-t border-gray-200"></div>

          {/* Redes */}
          <div className="pt-4">
            <p className="text-sm font-bold tracking-widest text-gray-400">
              SÍGUEME
            </p>
            <div className="mt-3 flex gap-3">
              <a
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
                href="#"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
                href="#"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
                href="#"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Columna derecha - Imagen */}
        <div className="flex justify-center md:justify-end md:-mt-8">
          <div className="relative w-full max-w-xl">
            <div className="group relative rounded-4xl bg-white ring-[20px] ring-white transition-all duration-300 cursor-pointer shadow-[0_25px_60px_-18px_rgba(0,0,0,0.32)] hover:ring-[38px] hover:shadow-[0_35px_90px_-28px_rgba(0,0,0,0.4)]">
              {/* Tarjeta de imagen */}
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                {/* Cambia esta imagen por la tuya o por una ilustración similar */}
                <Image
                  src="/img/img1.png"
                  alt="Ilustración de perfil"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Acerca de Mí */}
      <section id="acerca" className="mx-auto max-w-screen-2xl px-18 py-20 pt-40">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Columna izquierda - Imagen */}
          <div className="flex justify-start">
            <div className="relative w-full max-w-lg">
              <div className={`relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl transition-all duration-1000 ${showAboutImage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <Image
                  src="/img/img2.png"
                  alt="Acerca de mí"
                  width={600}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Columna derecha - Contenido */}
          <div className="space-y-5">
            <h2 className={`text-5xl font-[510] tracking-tight transition-all duration-600 hover:scale-105 cursor-default text-gray-900 md:text-6xl lg:text-7xl ${showAboutTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`} style={{ transitionDuration: '600ms' }}>
              Acerca de <span className="animate-color-change">Mí</span>
            </h2>
            
            {/* Info personal */}
            <div className={`group cursor-default transition-all duration-600 ${showAboutInfo ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <h3 className="text-xl font-semibold text-gray-900 mb-1 transition-all duration-600 group-hover:translate-x-2">Benjamín Aliaga</h3>
              <p className="text-base leading-relaxed text-gray-500 transition-all duration-600 group-hover:translate-x-2 md:text-lg">
                Estudiante de segundo año de Ingeniería Civil Informática en la Universidad Católica de Temuco, apasionado por la programación, el desarrollo web y la automatización.
              </p>
            </div>

            {/* Educación */}
            <div className={`group cursor-default transition-all duration-600 ${showAboutEducation ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2 transition-all duration-600 group-hover:translate-x-2">
                <span className="text-xl">|</span> Educación
              </h3>
              <div className="space-y-1">
                <p className="text-base font-semibold text-gray-900 transition-all duration-600 group-hover:translate-x-2 md:text-lg">Universidad Catolica de Temuco (UCT)</p>
                <p className="text-base text-gray-500 transition-all duration-600 group-hover:translate-x-2 md:text-lg">Licenciatura en Ingeniería Civil Informatica</p>
                <p className="text-sm text-gray-500 transition-all duration-600 group-hover:translate-x-2">Actualmente estudiando</p>
              </div>
            </div>

            {/* Experiencia */}
            <div className={`group cursor-default transition-all duration-600 ${showAboutExperience ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2 transition-all duration-600 group-hover:translate-x-2">
                <span className="text-xl">|</span> Experiencia
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-base font-semibold text-gray-900 transition-all duration-600 group-hover:translate-x-2 md:text-lg">Nada</p>
                  <p className="text-sm text-gray-500 transition-all duration-600 group-hover:translate-x-2 md:text-base">idk</p>
                  <p className="text-sm text-gray-500 transition-all duration-600 group-hover:translate-x-2">2025 - Actualmente</p>
                </div>
              </div>
            </div>

            {/* Habilidades Técnicas */}
            <div className={`transition-all duration-600 ${showAboutSkills ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-xl">|</span> Habilidades Técnicas
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "AIML", "PyTorch", "TypeScript", "React", "Node.js"].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 border-2 border-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="proyectos" className="bg-white py-20 pt-40">
        <div className="mx-auto max-w-screen-2xl px-18">
          {/* Título */}
          <div className={`text-center mb-16 transition-all duration-600 ${showProjectsTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <h2 className="text-5xl font-[510] tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
              Mis <span className="animate-color-change">Proyectos</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 md:text-xl">
              Algunos de los proyectos en los que he trabajado
            </p>
          </div>

          {/* Grid de proyectos */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`group relative aspect-square overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-600 hover:shadow-2xl ${
                  showProjectsCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {/* Imagen del proyecto - ocupa aproximadamente 60% */}
                <div className="relative h-[60%] overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Contenido - ocupa aproximadamente 40% */}
                <div className="h-[40%] p-4 flex flex-col justify-between overflow-hidden">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:translate-x-2 line-clamp-1">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm leading-tight text-gray-600 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags de tecnologías */}
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Botón */}
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 transition-all duration-300 hover:translate-x-2"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {project.linkText}
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-screen-2xl px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900">Servicios</h2>
        <p className="mt-4 text-gray-600">
          Landing pages, automatizaciones, bots, etc.
        </p>
      </section>

      <footer id="contacto" className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-screen-2xl px-6 py-12 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Luis - Desarrollador Web & IA
        </div>
      </footer>
    </main>
  );
}
