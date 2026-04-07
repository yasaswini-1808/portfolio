import { useEffect, useMemo, useRef, useState } from "react";
import { ReactTyped } from "react-typed";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Filter,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sparkles,
  Sun,
  Code2,
  Layers,
  Cpu,
  ChevronDown,
  Terminal,
  Globe,
  Star,
  Briefcase,
  Calendar,
  Clock,
} from "lucide-react";
import { FaPython, FaReact } from "react-icons/fa6";
import {
  SiDjango,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiOpenai,
} from "react-icons/si";

/* ─── Data ──────────────────────────────────────────────────────── */
const skillGroups = [
  {
    title: "Frontend",
    icon: <Globe className="h-5 w-5" />,
    items: [
      { name: "React", level: 95, icon: <FaReact className="text-xl" /> },
      {
        name: "JavaScript",
        level: 92,
        icon: <SiJavascript className="text-xl" />,
      },
      { name: "HTML/CSS", level: 94, icon: <Sparkles className="h-5 w-5" /> },
    ],
  },
  {
    title: "Backend",
    icon: <Terminal className="h-5 w-5" />,
    items: [
      { name: "Node.js", level: 89, icon: <SiNodedotjs className="text-xl" /> },
      { name: "Django", level: 84, icon: <SiDjango className="text-xl" /> },
      { name: "MongoDB", level: 86, icon: <SiMongodb className="text-xl" /> },
    ],
  },
  {
    title: "AI & ML",
    icon: <Cpu className="h-5 w-5" />,
    items: [
      { name: "RAG", level: 82, icon: <SiOpenai className="text-xl" /> },
      { name: "OpenAI", level: 87, icon: <SiOpenai className="text-xl" /> },
      { name: "Embeddings", level: 81, icon: <FaPython className="text-xl" /> },
    ],
  },
];

const projects = [
  {
    id: 1,
    title: "Skill Exchange Platform",
    category: "Full Stack",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    description:
      "A peer-to-peer skill-sharing platform built with the MERN stack. Users can post skills they offer, request skills they need, match with others, and connect via real-time chat — like a barter system for knowledge.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.io", "JWT"],
    live: "https://your-skill-exchange-live-link.com",
    github: "https://github.com/yasasswini-1808/skill-exchange",
  },
  {
    id: 2,
    title: "AI Travel Planner",
    category: "AI",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Trip recommendation platform with retrieval-augmented generation, smart itinerary drafts, and budget-aware suggestions.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "RAG"],
    live: "https://your-ai-travel-live-link.com",
    github: "https://github.com/yasasswini-1808/ai-travel-planner",
  },
  {
    id: 3,
    title: "Hospital Management System",
    category: "Full Stack",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Patient workflow platform with role-based dashboards, appointment tracking, and secure records management.",
    tech: ["Django", "Python", "PostgreSQL"],
    live: "https://your-hospital-live-link.com",
    github: "https://github.com/yasasswini-1808/hospital-mgmt",
  },
  {
    id: 4,
    title: "Netflix Clone",
    category: "Frontend",
    image:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1200&q=80",
    description:
      "A cinematic streaming UI clone featuring category rails, dynamic hero banners, and watchlist interactions.",
    tech: ["React", "Axios", "APIs"],
    live: "https://your-netflix-clone-live-link.com",
    github: "https://github.com/yasasswini-1808/netflix-clone",
  },
  {
    id: 5,
    title: "Online Examination System",
    category: "Full Stack",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    description:
      "Exam platform with timer controls, proctor-ready workflows, and real-time scoring for instructors.",
    tech: ["React", "Node.js", "MongoDB"],
    live: "https://your-exam-system-live-link.com",
    github: "https://github.com/yasasswini-1808/exam-system",
  },
  {
    id: 6,
    title: "Portfolio",
    category: "Frontend",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1200&q=80",
    description:
      "A personal portfolio showcasing projects, skills, and blog posts — built with React and Tailwind.",
    tech: ["React", "Tailwind", "Firebase"],
    live: "https://your-portfolio-live-link.com",
    github: "https://github.com/yasasswini-1808/portfolio",
  },
  {
    id: 7,
    title: "AI-Based Semantic File System Search Engine",
    category: "AI",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
    description:
      'A semantic search engine for local file systems that uses NLP and vector embeddings to find files by meaning, not just filename. Query your filesystem in plain English — "find my invoice from last March" — and get ranked, context-aware results instantly.',
    tech: ["Python", "FastAPI", "NLP", "SQLite", "React"],
    live: "https://your-semantic-search-live-link.com",
    github: "https://github.com/yasasswini-1808/semantic-file-search",
  },
];

const blogs = [
  {
    title: "From Zero to Full Stack: My MERN Journey",
    excerpt:
      "A year ago I couldn\'t tell MongoDB from MySQL. Today I ship full-stack apps with real-time features. Here\'s the honest, non-linear path I took — the resources that actually worked, the rabbit holes that didn\'t, and the mindset shift that changed everything for me as a self-taught developer.",
    date: "Mar 2025",
    readTime: "6 min",
    tag: "Career",
    link: "#",
  },
  {
    title: "Building a REST API with Node.js & Express: A Practical Guide",
    excerpt:
      "Skip the toy examples. This tutorial walks through building a production-ready REST API from scratch — with JWT authentication, input validation, error middleware, and a clean folder structure that scales. Everything I wish someone had shown me when I started with Express.",
    date: "Feb 2025",
    readTime: "8 min",
    tag: "Tutorial",
    link: "#",
  },
  {
    title: "What Building an AI Feature Taught Me About Backend Architecture",
    excerpt:
      "Integrating OpenAI into a web app sounds simple until your API costs spike and responses lag. I learned about prompt caching, streaming, rate limiting, and why your AI layer needs its own service boundary — the hard way, so you don\'t have to.",
    date: "Jan 2025",
    readTime: "7 min",
    tag: "AI & MERN",
    link: "#",
  },
];

const stats = [
  {
    label: "Projects Shipped",
    value: "20+",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    label: "GitHub Commits",
    value: "1.2k",
    icon: <Code2 className="h-5 w-5" />,
  },
  { label: "Happy Clients", value: "15+", icon: <Star className="h-5 w-5" /> },
  { label: "Technologies", value: "12+", icon: <Cpu className="h-5 w-5" /> },
];

const internships = [
  {
    role: "Django Backend Intern",
    company: "Company Name",
    duration: "2 Months",
    period: "Jun 2024 – Aug 2024",
    type: "Internship",
    description:
      "Developed and maintained RESTful APIs using Django REST Framework. Built authentication flows with JWT, designed relational database schemas in PostgreSQL, and optimized query performance. Collaborated with the frontend team to integrate APIs with a React-based dashboard.",
    skills: ["Django", "Python", "REST API", "PostgreSQL", "JWT", "Git"],
    color: "#0c6d69",
  },
  {
    role: "MERN Stack Intern",
    company: "Company Name",
    duration: "2 Months",
    period: "Sep 2024 – Nov 2024",
    type: "Internship",
    description:
      "Built and shipped full-stack features across the MERN stack — from React UI components to Express.js API endpoints and MongoDB data models. Implemented real-time notifications using Socket.io and worked with Redux Toolkit for state management in a production codebase.",
    skills: ["MongoDB", "Express.js", "React", "Node.js", "Socket.io", "Redux"],
    color: "#48c4b8",
  },
];

/* ─── Animation Variants ────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

/* ─── Custom Cursor ─────────────────────────────────────────────── */
function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };
    window.addEventListener("mousemove", move);

    let raf;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.1;
      pos.current.y += (target.current.y - pos.current.y) * 0.1;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

/* ─── Floating Orbs ─────────────────────────────────────────────── */
function FloatingOrbs() {
  const orbs = [
    { size: 320, x: "8%", y: "12%", delay: 0, duration: 14 },
    { size: 220, x: "75%", y: "8%", delay: 3, duration: 18 },
    { size: 180, x: "60%", y: "65%", delay: 6, duration: 12 },
    { size: 260, x: "20%", y: "70%", delay: 2, duration: 16 },
  ];

  return (
    <div className="orbs-container">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="orb"
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{ y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.05, 1] }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Scroll Progress Bar ───────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/* ─── Navbar ────────────────────────────────────────────────────── */
function Navbar({ theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    "About",
    "Experience",
    "Skills",
    "Projects",
    "Blog",
    "Contact",
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className="navbar__inner">
        <motion.a
          href="#"
          className="navbar__logo"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          YA<span className="navbar__logo-dot">.</span>
        </motion.a>

        <div className="navbar__links">
          {links.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="navbar__link"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
              whileHover={{ y: -2 }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        <motion.button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          whileHover={{ scale: 1.08, rotate: 15 }}
          whileTap={{ scale: 0.92 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {theme === "light" ? (
              <motion.span
                key="moon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="h-4 w-4" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.nav>
  );
}

/* ─── Hero Name Animation ───────────────────────────────────────── */
function AnimatedName({ name }) {
  return (
    <span className="hero-name">
      {name.split("").map((char, i) => (
        <motion.span
          key={i}
          className="hero-name__char"
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: 0.4 + i * 0.045,
            duration: 0.6,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          whileHover={{
            y: -6,
            color: "var(--accent)",
            transition: { duration: 0.15 },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Magnetic Button ───────────────────────────────────────────── */
function MagneticBtn({ children, className, href, onClick }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };
  const Tag = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <Tag
        href={href}
        onClick={onClick}
        className={className}
        target={href ? "_blank" : undefined}
        rel={href ? "noreferrer" : undefined}
      >
        {children}
      </Tag>
    </motion.div>
  );
}

/* ─── Counter Animation ─────────────────────────────────────────── */
function CountUp({ value }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  return (
    <motion.span
      onViewportEnter={() => {
        let start = 0;
        const step = numericValue / 40;
        const timer = setInterval(() => {
          start += step;
          if (start >= numericValue) {
            setCount(numericValue);
            clearInterval(timer);
          } else setCount(Math.floor(start));
        }, 30);
      }}
    >
      {count}
      {suffix}
    </motion.span>
  );
}

/* ─── App ───────────────────────────────────────────────────────── */
function App() {
  const [theme, setTheme] = useState("light");
  const [filter, setFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const filteredProjects = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar theme={theme} setTheme={setTheme} />
      <FloatingOrbs />

      <main className="main">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section ref={heroRef} className="hero" id="hero">
          <motion.div
            className="hero__content"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.div
              className="hero__badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
              }}
            >
              <span className="hero__badge-dot" />
              Available for opportunities
            </motion.div>

            <h1 className="hero__headline">
              <motion.span
                className="hero__greeting"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Hi, I'm
              </motion.span>
              <AnimatedName name="Yasaswini Arigela" />
            </h1>

            <motion.div
              className="hero__typed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <span className="hero__typed-prefix">{">"}_</span>
              <ReactTyped
                strings={[
                  "Full Stack Developer",
                  "React Developer",
                  "AI Integration Engineer",
                  "Django Developer",
                  "Building scalable web apps.",
                ]}
                typeSpeed={48}
                backSpeed={26}
                backDelay={1400}
                loop
              />
            </motion.div>

            <motion.p
              className="hero__description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              I craft scalable, intelligent web applications — from
              pixel-perfect frontends to robust backends and AI-powered
              experiences.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <MagneticBtn
                href="https://your-resume-link.com/resume.pdf"
                className="btn btn--primary"
              >
                Download Resume <ArrowRight className="h-4 w-4" />
              </MagneticBtn>
              <MagneticBtn
                href="https://github.com/yasaswini-1808"
                className="btn btn--ghost"
              >
                <Github className="h-4 w-4" /> GitHub
              </MagneticBtn>
              <MagneticBtn
                href="https://www.linkedin.com/in/yasaswini-arigela-b0a345333/"
                className="btn btn--ghost"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </MagneticBtn>
            </motion.div>

            <motion.div
              className="hero__scroll-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.6,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
              <span>Scroll to explore</span>
            </motion.div>
          </motion.div>

          {/* Floating code card */}
          <motion.div
            className="hero__code-card glass-card"
            initial={{ opacity: 0, x: 60, rotate: 4 }}
            animate={{ opacity: 1, x: 0, rotate: 2 }}
            transition={{
              delay: 1.8,
              duration: 0.8,
              ease: [0.22, 0.61, 0.36, 1],
            }}
            whileHover={{ rotate: 0, scale: 1.02 }}
          >
            <div className="code-card__dots">
              <span />
              <span />
              <span />
            </div>
            <pre className="code-card__code">{`const yasaswini = {
  role: "Full Stack Dev",
  passion: "Building at the
    intersection of AI
    and beautiful UX",
  stack: ["React","Django",
          "Node","OpenAI"],
  available: true ✨
}`}</pre>
          </motion.div>
        </section>

        {/* ── STATS ────────────────────────────────────────────── */}
        <motion.section
          className="stats-section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-card glass-card"
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <div className="stat-card__icon">{stat.icon}</div>
              <div className="stat-card__value">
                <CountUp value={stat.value} />
              </div>
              <div className="stat-card__label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.section>

        {/* ── ABOUT ────────────────────────────────────────────── */}
        <section id="about" className="section">
          <div className="section__inner">
            <motion.div
              className="about-card glass-card"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeLeft}
            >
              <motion.div className="section-label" variants={fadeUp}>
                <Sparkles className="h-4 w-4" /> About Me
              </motion.div>
              <motion.h2 className="section-title" variants={fadeUp} custom={1}>
                Turning ideas into
                <br />
                <span className="accent-text">living products</span>
              </motion.h2>
              <motion.p
                className="about-card__text"
                variants={fadeUp}
                custom={2}
              >
                I'm <strong>Yasaswini Arigela</strong>, a Full Stack Developer
                specializing in React, Node.js, Django, and AI-powered
                applications. I build scalable, intelligent web systems that are
                reliable, maintainable, and delightful to use.
              </motion.p>
              <motion.p
                className="about-card__text"
                variants={fadeUp}
                custom={3}
              >
                My passion sits at the intersection of elegant frontend craft
                and powerful backend architecture — increasingly enhanced by AI.
                I love turning complex problems into simple, beautiful
                interfaces.
              </motion.p>
              <motion.div
                className="about-card__chips"
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {[
                  "React",
                  "Node.js",
                  "Django",
                  "OpenAI",
                  "MongoDB",
                  "Tailwind",
                  "Python",
                  "PostgreSQL",
                ].map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="chip"
                    variants={fadeUp}
                    custom={i}
                    whileHover={{ y: -3, scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
              <motion.p
                className="about-card__goal"
                variants={fadeUp}
                custom={5}
              >
                🎯 Career Goal: Build impactful, AI-enhanced products used by
                millions.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── EXPERIENCE ───────────────────────────────────────── */}
        <section id="experience" className="section">
          <div className="section__inner">
            <motion.div
              className="section-header"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="section-label">
                <Briefcase className="h-4 w-4" /> Experience
              </span>
              <h2 className="section-title">Internships</h2>
            </motion.div>

            <div className="internships-timeline">
              {internships.map((item, i) => (
                <motion.div
                  key={item.role}
                  className="internship-card glass-card"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    delay: i * 0.15,
                    duration: 0.65,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  whileHover={{ y: -5 }}
                >
                  {/* accent bar */}
                  <div
                    className="internship-card__bar"
                    style={{ background: item.color }}
                  />

                  <div className="internship-card__header">
                    <div
                      className="internship-card__icon-wrap"
                      style={{
                        background: `${item.color}18`,
                        color: item.color,
                      }}
                    >
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div className="internship-card__title-group">
                      <h3 className="internship-card__role">{item.role}</h3>
                      <p className="internship-card__company">{item.company}</p>
                    </div>
                    <span className="internship-card__badge">{item.type}</span>
                  </div>

                  <div className="internship-card__meta">
                    <span className="internship-card__meta-item">
                      <Calendar className="h-3.5 w-3.5" /> {item.period}
                    </span>
                    <span className="internship-card__meta-item">
                      <Clock className="h-3.5 w-3.5" /> {item.duration}
                    </span>
                  </div>

                  <p className="internship-card__desc">{item.description}</p>

                  <div className="internship-card__skills">
                    {item.skills.map((s) => (
                      <motion.span
                        key={s}
                        className="internship-card__skill-tag"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ───────────────────────────────────────────── */}
        <section id="skills" className="section">
          <div className="section__inner">
            <motion.div
              className="section-header"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="section-label">
                <Code2 className="h-4 w-4" /> Skills
              </span>
              <h2 className="section-title">What I work with</h2>
            </motion.div>
            <div className="skills-grid">
              {skillGroups.map((group, gi) => (
                <motion.article
                  key={group.title}
                  className="skill-card glass-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    delay: gi * 0.15,
                    duration: 0.6,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  whileHover={{ y: -4 }}
                >
                  <div className="skill-card__header">
                    <span className="skill-card__icon-wrap">{group.icon}</span>
                    <h3>{group.title}</h3>
                  </div>
                  <div className="skill-card__items">
                    {group.items.map((skill, si) => (
                      <div key={skill.name} className="skill-item">
                        <div className="skill-item__meta">
                          <span className="skill-item__name">
                            {skill.icon} {skill.name}
                          </span>
                          <span className="skill-item__pct">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="skill-bar">
                          <motion.div
                            className="skill-bar__fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              delay: gi * 0.15 + si * 0.1 + 0.3,
                              duration: 1.1,
                              ease: [0.22, 0.61, 0.36, 1],
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────── */}
        <section id="projects" className="section">
          <div className="section__inner">
            <motion.div
              className="section-header projects-header"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              <div>
                <motion.span className="section-label" variants={fadeUp}>
                  <Layers className="h-4 w-4" /> Projects
                </motion.span>
                <motion.h2
                  className="section-title"
                  variants={fadeUp}
                  custom={1}
                >
                  Featured Work
                </motion.h2>
              </div>
              <motion.div className="filter-group" variants={fadeUp} custom={2}>
                {["All", "AI", "Full Stack", "Frontend"].map((type) => (
                  <motion.button
                    key={type}
                    type="button"
                    onClick={() => setFilter(type)}
                    className={`filter-btn ${filter === type ? "filter-btn--active" : ""}`}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Filter className="h-3.5 w-3.5" /> {type}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            <AnimatePresence mode="popLayout">
              <motion.div className="projects-grid" layout>
                {filteredProjects.map((project, i) => (
                  <motion.article
                    key={project.id}
                    className="project-card glass-card"
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: -20 }}
                    transition={{
                      delay: i * 0.07,
                      duration: 0.45,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                    onHoverStart={() => setHoveredProject(project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                    whileHover={{ y: -8 }}
                  >
                    <div className="project-card__img-wrap">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-card__img"
                      />
                      <motion.div
                        className="project-card__overlay"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredProject === project.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        <span className="project-card__category">
                          {project.category}
                        </span>
                      </motion.div>
                    </div>
                    <div className="project-card__body">
                      <h3 className="project-card__title">{project.title}</h3>
                      <p className="project-card__desc">
                        {project.description}
                      </p>
                      <div className="project-card__tech">
                        {project.tech.map((t) => (
                          <span key={t} className="tech-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="project-card__actions">
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn--primary btn--sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          Live Demo <ExternalLink className="h-3 w-3" />
                        </motion.a>
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn--ghost btn--sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <Github className="h-3 w-3" /> GitHub
                        </motion.a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── GITHUB STATS ─────────────────────────────────────── */}
        <section id="stats" className="section">
          <div className="section__inner">
            <motion.div
              className="github-card glass-card"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
            >
              <span className="section-label">
                <Github className="h-4 w-4" /> GitHub Activity
              </span>
              <h2 className="section-title">Code in the wild</h2>
              <p className="github-card__hint">
                Showing stats for <code>yasasswini-1808</code> — update if your
                username differs.
              </p>
              <div className="github-stats-grid">
                <motion.img
                  src="https://github-readme-stats.vercel.app/api?username=yasasswini-1808&show_icons=true&theme=transparent&hide_border=true"
                  alt="GitHub stats"
                  className="github-img"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                />
                <motion.img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=yasasswini-1808&layout=compact&theme=transparent&hide_border=true"
                  alt="Top languages"
                  className="github-img"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BLOG ─────────────────────────────────────────────── */}
        <section id="blog" className="section">
          <div className="section__inner">
            <motion.div
              className="section-header"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="section-label">✍️ Writing</span>
              <h2 className="section-title">From the blog</h2>
            </motion.div>
            <div className="blog-grid">
              {blogs.map((post, i) => (
                <motion.article
                  key={post.title}
                  className="blog-card glass-card"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.12, duration: 0.55 }}
                  whileHover={{ y: -6, boxShadow: "var(--shadow-lg)" }}
                >
                  <div className="blog-card__top">
                    <span className="blog-card__tag">{post.tag}</span>
                  </div>
                  <div className="blog-card__meta">
                    <span>{post.date}</span>
                    <span className="blog-card__dot" />
                    <span>{post.readTime} read</span>
                  </div>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <motion.a
                    href={post.link}
                    className="blog-card__link"
                    whileHover={{ x: 4 }}
                  >
                    Read More <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────── */}
        <section id="contact" className="section">
          <div className="section__inner">
            <motion.div
              className="contact-wrapper"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <motion.div className="contact-info" variants={fadeLeft}>
                <span className="section-label">
                  <Mail className="h-4 w-4" /> Let's Connect
                </span>
                <h2 className="section-title">
                  Got an idea?
                  <br />
                  <span className="accent-text">Let's build it.</span>
                </h2>
                <p className="contact-info__text">
                  Whether it's a product, a collaboration, or just a hello — I'd
                  love to hear from you.
                </p>
                <div className="contact-links">
                  {[
                    {
                      label: "yasaswini@email.com",
                      href: "mailto:yasaswini@email.com",
                      icon: <Mail className="h-4 w-4" />,
                    },
                    {
                      label: "linkedin.com/in/Yasaswini-Arigela",
                      href: "https://linkedin.com/in/Yasaswini-Arigela",
                      icon: <Linkedin className="h-4 w-4" />,
                    },
                    {
                      label: "github.com/yasasswini-1808",
                      href: "https://github.com/yasasswini-1808",
                      icon: <Github className="h-4 w-4" />,
                    },
                  ].map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      className="contact-link"
                      whileHover={{ x: 6 }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.icon} {link.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="contact-form glass-card"
                variants={fadeRight}
              >
                <div className="form-grid">
                  {[
                    { type: "text", placeholder: "Your name" },
                    { type: "email", placeholder: "Your email" },
                  ].map((field) => (
                    <motion.input
                      key={field.placeholder}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="form-input"
                      whileFocus={{ scale: 1.01 }}
                    />
                  ))}
                  <motion.textarea
                    placeholder="Tell me about your project…"
                    className="form-input form-input--textarea"
                    whileFocus={{ scale: 1.01 }}
                  />
                  <MagneticBtn className="btn btn--primary btn--full">
                    Send Message <Mail className="h-4 w-4" />
                  </MagneticBtn>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <footer className="footer">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Designed & Built by{" "}
            <span className="accent-text">Yasaswini Arigela</span> ·{" "}
            {new Date().getFullYear()}
          </motion.p>
        </footer>
      </main>
    </>
  );
}

export default App;
