import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import "./styles.css";

const projects = [
  {
    n: "01",
    title: "DiplomaChain",
    subtitle: "Secure diploma verification platform",
    desc: "A platform designed to help institutions issue and verify academic certificates through secure digital verification and blockchain technology.",
    tags: ["FASTAPI", "REACT", "MYSQL", "HEDERA", "JWT"],
    type: "chain",
  },
  {
    n: "02",
    title: "Click2Learn",
    subtitle: "AI-powered learning platform",
    desc: "An online learning platform combining digital learning, community and artificial intelligence to create a more interactive learning experience.",
    tags: ["AI", "CHATBOTS", "WEB", "COMMUNITY"],
    type: "learn",
  },
  {
    n: "03",
    title: "Training Platform",
    subtitle: "Web development · UX · AI",
    desc: "A web platform created to support online training, with an integrated chatbot designed to help users find information and navigate the platform.",
    tags: ["HTML/CSS", "JAVASCRIPT", "CHATBOT", "UX/UI"],
    type: "training",
  },
];

const volunteerProjects = [
  {
    n: "01",
    period: "SEP 2024 — JUL 2025",
    title: "Creative Minds",
    subtitle: "English Teaching for Children",
    desc: "Collaborated with teaching partners to provide interactive English lessons tailored to children's learning needs, fostering a fun and immersive environment.",
    tags: ["EDUCATION", "TEACHING", "LEADERSHIP", "CREATIVITY"],
    org: "Lyed f Lyed CSC",
    type: "education",
  },
  {
    n: "02",
    period: "JAN 2025 — FEB 2025",
    title: "JOUD Campaign",
    subtitle: "Winter Clothing Distribution",
    desc: "Collected and distributed warm clothes for rural populations while organizing activities and entertainment for beneficiaries in remote communities.",
    tags: ["COMMUNITY", "LOGISTICS", "TEAMWORK", "SOCIAL IMPACT"],
    org: "Lyed f Lyed CSC",
    type: "community",
  },
  {
    n: "03",
    period: "FEB 2025 — MAR 2025",
    title: "Ramadan Kit Project",
    subtitle: "Food Aid Distribution",
    desc: "Collected funds and food supplies to assemble and distribute Ramadan kits to people in need, coordinating with local associations.",
    tags: ["FUNDRAISING", "COORDINATION", "COMMUNITY", "IMPACT"],
    org: "Lyed f Lyed CSC",
    type: "aid",
  },
  {
    n: "04",
    period: "APR 2025 — MAY 2025",
    title: "Harmony of Generations",
    subtitle: "Retirement Home Volunteering",
    desc: "Organized activities, games, and cultural events at a retirement home to foster intergenerational connection and bring joy to elderly residents.",
    tags: ["ELDERLY CARE", "ACTIVITIES", "CONNECTION", "EMPATHY"],
    org: "Lyed f Lyed CSC",
    type: "care",
  },
  {
    n: "05",
    period: "JUN 2025",
    title: "Sanad",
    subtitle: "Medical & Awareness Campaign",
    desc: "Supported a blood donation and health awareness campaign, guiding participants through the process and participating in first aid training.",
    tags: ["HEALTH", "AWARENESS", "FIRST AID", "COMMUNITY"],
    org: "Global Shapers Tangier",
    type: "health",
  },
];

const skills = [
  "Python",
  "Java",
  "C++",
  "JavaScript",
  "PHP",
  "React.js",
  "Angular",
  "HTML / CSS",
  "Laravel",
  "FastAPI",
  "MySQL",
  "Git",
  "Linux",
  "UML",
  "Figma",
  "Artificial Intelligence",
  "Cybersecurity",
];

const journeyItems = [
  {
    slug: "bac-science-physique",
    year: "2021—2022",
    title: "BAC SCIENCE PHYSIQUE",
    desc: "French Option with Honors at Ibn Batouta High School, Tangier.",
    overview:
      "My first step toward technology began with a scientific foundation built around analytical thinking, mathematics and physics.",
    skills: ["Scientific reasoning", "Mathematics", "Problem-solving", "Communication"],
    experiences: [
      "Completed the French Option science curriculum at Ibn Batouta High School in Tangier.",
      "Graduated with honors while developing a methodical approach to learning and problem-solving.",
    ],
    goals:
      "This experience confirmed my interest in technical fields and prepared me to continue toward computer science.",
    modules: ["Mathématiques", "Physique & Chimie", "Sciences de la Vie et de la Terre", "Philosophie & Langues"],
    institutionName: "Lycée Ibn Batouta",
    institutionLink: "https://www.men.gov.ma"
  },
  {
    slug: "first-year-deust",
    year: "2022—2023",
    title: "1ST YEAR DEUST",
    desc: "MIPC Program (Mathematics, Computer Science, Physics, Chemistry) at FST Tangier.",
    overview:
      "The first DEUST year introduced me to a multidisciplinary scientific environment, including the fundamentals of computer science.",
    skills: ["Programming foundations", "Algorithms", "Mathematics", "Scientific methods"],
    experiences: [
      "Studied mathematics, computer science, physics and chemistry through the MIPC program at FST Tangier.",
      "Built a foundation for understanding computational thinking and structured problem-solving.",
    ],
    goals:
      "I wanted to deepen my programming knowledge and progress toward application development.",
    modules: ["Algorithmique & Programmation en C", "Analyse Mathématique", "Algèbre Linéaire", "Mécanique du Point & Thermodynamique", "Chimie Générale"],
    institutionName: "FST Tangier",
    institutionLink: "https://fstt.ac.ma"
  },
  {
    slug: "second-year-deust",
    year: "2023—2024",
    title: "2ND YEAR DEUST",
    desc: "Faculty of Sciences and Technologies, Tangier.",
    overview:
      "During the second DEUST year, I continued consolidating my technical foundation and prepared for a more specialized development path.",
    skills: ["Programming practice", "Systems thinking", "Teamwork", "Technical learning"],
    experiences: [
      "Continued the DEUST curriculum at the Faculty of Sciences and Technologies in Tangier.",
      "Strengthened the analytical and technical skills required for advanced software studies.",
    ],
    goals:
      "This stage was about turning a broad scientific background into a clear focus on software engineering.",
    modules: ["Structures de Données & Programmation", "Systèmes d'Information & Bases de Données", "Architecture des Ordinateurs", "Analyse Numérique"],
    institutionName: "FST Tangier",
    institutionLink: "https://fstt.ac.ma"
  },
  {
    slug: "bachelor-idai",
    year: "2024—2025",
    title: "BACHELOR DEGREE IDAI",
    desc: "Software Application Development Engineering at FST Tangier.",
    overview:
      "The IDAI bachelor program allowed me to focus on designing and building useful software applications.",
    skills: ["Web development", "Application design", "Databases", "UX/UI", "Project delivery"],
    experiences: [
      "Specialized in Software Application Development Engineering at FST Tangier.",
      "Developed practical experience with application development technologies and user-centered digital products.",
    ],
    goals:
      "I aimed to create reliable applications while exploring how software can solve real user needs.",
    modules: ["Développement Web Avancé", "Développement Backend", "Conception Orientée Objet", "Bases de Données", "Génie Logiciel"],
    institutionName: "FST Tangier (Licence IDAI)",
    institutionLink: "https://fstt.ac.ma/portail/formation-initiale/licence/idai/"
  },
  {
    slug: "jobintech-training",
    year: "2025—2026",
    title: "JOBINTECH TRAINING",
    desc: "Cybersecurity and Systems Engineering at Faculty of Sciences, Rabat.",
    overview:
      "JobInTech broadened my perspective from building applications to understanding the systems and security practices that support them.",
    skills: ["Cybersecurity fundamentals", "Linux", "Networks", "Systems engineering", "Secure development"],
    experiences: [
      "Trained in cybersecurity and systems engineering at the Faculty of Sciences in Rabat.",
      "Explored the foundations of networks, Linux, access control and web security.",
    ],
    goals:
      "This training shaped my goal of building applications with security considered from the start.",
    modules: ["Cybersécurité", "Administration Systèmes Linux", "Sécurité Réseaux", "Cryptographie", "Sécurité des Applications Web"],
    institutionName: "Faculté des Sciences de Rabat / JobInTech",
    institutionLink: "https://jobintech.ma"
  },
  {
    slug: "masters-sic",
    year: "2026—NOW",
    title: "MASTER'S DEGREE SIC",
    desc: "Intelligent Systems and Cybersecurity at FST Tangier.",
    overview:
      "I am currently pursuing a Master's degree that brings together my interests in intelligent systems, software and cybersecurity.",
    skills: ["Artificial intelligence", "Cybersecurity", "Research", "Secure systems", "Continuous learning"],
    experiences: [
      "Currently studying Intelligent Systems and Cybersecurity at FST Tangier.",
      "Expanding my knowledge while connecting software development with AI and security.",
    ],
    goals:
      "My objective is to keep developing thoughtful, useful and secure digital experiences.",
    modules: ["Intelligence Artificielle Avancée", "Cybersécurité Avancée", "Sécurité des Systèmes Distribués", "Analyse de Malware", "Vision par Ordinateur"],
    institutionName: "FST Tangier (Master SIC)",
    institutionLink: "https://fstt.ac.ma"
  },
];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    visible: false,
    label: "+",
  });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  });

  useEffect(() => {
    const move = (e) =>
      setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY, visible: true }));
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const go = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <div
        className="cursor"
        style={{
          left: cursor.x,
          top: cursor.y,
          opacity: cursor.visible ? 1 : 0,
        }}
      >
        {cursor.label}
      </div>

      <header className="nav">
        <button className="brand" onClick={() => go("home")} aria-label="Home">
          LINA <span>EL BARROUK</span>
        </button>
        <div className="navlinks">
          <button onClick={() => go("work")}>WORK</button>
          <button onClick={() => go("about")}>ABOUT</button>
          <button onClick={() => go("contact")}>CONTACT</button>
        </div>
        <button className="menuBtn" onClick={() => setMenu(true)}>
          MENU <span>—</span>
        </button>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="menuOverlay"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <button className="menuClose" onClick={() => setMenu(false)}>
              CLOSE ×
            </button>
            <div className="menuItems">
              {[
                ["01", "HOME", "home"],
                ["02", "ABOUT", "about"],
                ["03", "WORK", "work"],
                ["04", "CYBERSECURITY", "cyber"],
                ["05", "CONTACT", "contact"],
              ].map(([n, t, id]) => (
                <button key={id} onClick={() => go(id)}>
                  <small>{n}</small>
                  {t}
                  <span>↗</span>
                </button>
              ))}
            </div>
            <div className="menuFoot">
              Tangier, Morocco · Software Developer
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="home" className="hero dark">
          <div className="heroGrid">
            <div className="heroCopy">
              <motion.div
                className="eyebrow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                SOFTWARE DEVELOPER · AI · CYBERSECURITY
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.35,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                BUILD.
                <br />
                CREATE.
                <br />
                <em>SECURE.</em>
              </motion.h1>
              <motion.p
                className="serifLead"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
              >
                Turning ideas into meaningful digital experiences.
              </motion.p>
              <motion.p
                className="heroDesc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 }}
              >
                I’m Lina, a software developer passionate about building useful
                digital experiences and exploring the intersection of artificial
                intelligence and cybersecurity.
              </motion.p>
              <motion.button
                className="pill light"
                onClick={() => go("work")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.15 }}
              >
                EXPLORE MY WORK <span>↗</span>
              </motion.button>
            </div>
            <motion.div
              className="heroVisual"
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.55,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="portraitFrame">
                <div className="portraitPlaceholder">
                  <span>LE</span>
                  <small>
                    YOUR PHOTO
                    <br />
                    GOES HERE
                  </small>
                </div>
                <div className="portraitLabel">LINA / 2026</div>
              </div>
            </motion.div>
          </div>
          <div className="scrollCue">
            SCROLL TO EXPLORE <span>↓</span>
          </div>
        </section>

        <section id="about" className="about blush sectionPad">
          <div className="sectionMeta">
            <span>01 — ABOUT ME</span>
            <span>01 / 05</span>
          </div>
          <div className="twoCol">
            <Reveal>
              <h2>
                CURIOUS
                <br />
                BY <em>NATURE.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="bodyBlock">
              <p>
                I’m a software developer with a background in application
                development and a growing interest in artificial intelligence
                and cybersecurity.
              </p>
              <p>
                I enjoy understanding how systems work, turning ideas into
                applications and continuously learning new technologies.
              </p>
              <p>
                Today, I’m pursuing a Master’s degree in{" "}
                <strong>Intelligent Systems &amp; Cybersecurity</strong>, while
                continuing to develop my technical and creative skills.
              </p>
              <div className="signature">Always learning. Always building.</div>
            </Reveal>
          </div>
        </section>

        <section className="journey cream sectionPad">
          <div className="sectionMeta">
            <span>MY JOURNEY</span>
            <span>EDUCATION · DEVELOPMENT · SECURITY</span>
          </div>
          <div className="journeyTitle">
            <Reveal>
              <h2>
                FROM CODE
                <br />
                TO <em>SECURITY.</em>
              </h2>
            </Reveal>
          </div>
          <div className="horizontalTimeline">
            {journeyItems.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.08} className="htimelineItem">
                <a
                  className="timelineLink"
                  href={`#/journey/${item.slug}`}
                  aria-label={`Read more about ${item.title}`}
                >
                  <div className="htimelineYear">{item.year}</div>
                  <div className="htimelineContent">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <span className="timelineCta">EXPLORE ↗</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="work" className="work dark sectionPad">
          <div className="sectionMeta lightMeta">
            <span>02 — SELECTED WORK</span>
            <span>PROJECTS</span>
          </div>
          <div className="workHeader">
            <Reveal>
              <h2>
                THINGS I’VE <em>BUILT.</em>
              </h2>
            </Reveal>
            <p className="intro lightText">
              A selection of projects where development, problem-solving and
              curiosity meet.
            </p>
          </div>
          <div className="projects">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} p={p} i={i} onClick={() => setSelectedProject(p)} />
            ))}
          </div>
        </section>

        <section className="statement ivory">
          <Reveal>
            <h2>
              I DON’T JUST
              <br />
              WRITE <em>CODE.</em>
            </h2>
            <p>I'm learning how to make it useful, intelligent and secure.</p>
          </Reveal>
        </section>

        <section id="cyber" className="cyber deep sectionPad">
          <div className="sectionMeta lightMeta">
            <span>03 — CYBERSECURITY</span>
            <span>LEARN · BUILD · TEST · IMPROVE</span>
          </div>
          <div className="cyberGrid">
            <Reveal>
              <h2>
                SECURE
                <br />
                BY <em>DESIGN.</em>
              </h2>
              <p>
                Cybersecurity is an area I’m actively exploring alongside
                software development.
              </p>
              <p>
                I’m developing my understanding of networks, Linux, access
                control, web security and secure application development.
              </p>
              <strong>Learn. Build. Test. Improve.</strong>
            </Reveal>
            <Reveal delay={0.15} className="securityOrb">
              <div className="orb">
                <span>SECURITY</span>
                <i>+</i>
                <b>CODE</b>
              </div>
              <div className="orbit o1">NETWORKS</div>
              <div className="orbit o2">LINUX</div>
              <div className="orbit o3">WEB</div>
              <div className="orbit o4">APPLICATIONS</div>
            </Reveal>
          </div>
        </section>

        <section className="skills cream sectionPad">
          <div className="sectionMeta">
            <span>04 — TOOLKIT</span>
            <span>TECHNOLOGIES</span>
          </div>
          <Reveal>
            <h2>
              TOOLS I USE
              <br />
              TO TURN IDEAS
              <br />
              INTO <em>REALITY.</em>
            </h2>
          </Reveal>
          <div className="skillCloud">
            {skills.map((s, i) => (
              <motion.span
                key={s}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </section>

        <section className="beyond blush sectionPad">
          <div className="sectionMeta">
            <span>BEYOND THE CODE</span>
            <span>COMMUNITY · LEADERSHIP</span>
          </div>
          <div className="beyondHeader">
            <Reveal>
              <h2>
                BEYOND THE <em>CODE.</em>
              </h2>
            </Reveal>
            <p className="intro">
              Technology is also about people. Through volunteering and community
              projects, I’ve had the opportunity to work with others, organize
              activities and create meaningful experiences.
            </p>
          </div>
          <div className="volunteerProjects">
            {volunteerProjects.map((v, i) => (
              <VolunteerCard key={v.title} v={v} i={i} onClick={() => setSelectedVolunteer(v)} />
            ))}
          </div>
        </section>

        <section id="contact" className="contact dark sectionPad">
          <div className="sectionMeta lightMeta">
            <span>05 — CONTACT</span>
            <span>LET’S CONNECT</span>
          </div>
          <Reveal>
            <h2>
              LET’S BUILD
              <br />
              SOMETHING
              <br />
              <em>MEANINGFUL.</em>
            </h2>
            <p>
              Have a project, an opportunity or simply an idea you’d like to
              discuss?
            </p>
            <a className="contactPill" href="mailto:hello@linaelbarrouk.dev">
              LET’S TALK <span>↗</span>
            </a>
          </Reveal>
          <div className="contactLinks">
            <a href="https://www.linkedin.com" target="_blank">
              LinkedIn ↗
            </a>
            <a href="https://github.com" target="_blank">
              GitHub ↗
            </a>
            <a href="mailto:hello@linaelbarrouk.dev">Email ↗</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>LINA EL BARROUK</strong>
          <span>Software Developer · AI · Cybersecurity · Web</span>
        </div>
        <div className="footerRight">
          <span>© 2026 Lina El Barrouk</span>
          <em>Built with curiosity.</em>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
        {selectedVolunteer && (
          <VolunteerModal
            volunteer={selectedVolunteer}
            onClose={() => setSelectedVolunteer(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectCard({ p, i, onClick }) {
  return (
    <Reveal delay={i * 0.08}>
      <article className="project" onClick={onClick}>
        <div className="projectVisual">
          <div className="visualChrome">
            <span>PROJECT {p.n}</span>
            <span>VIEW</span>
          </div>
          <div className="visualArt">
            {p.type === "chain" && (
              <>
                <div className="chainLogo">
                  DC<span>+</span>
                </div>
                <div className="doc">
                  DIPLOMA
                  <br />
                  <small>VERIFIED</small>
                </div>
              </>
            )}
            {p.type === "learn" && (
              <>
                <div className="learnTitle">
                  CLICK<span>2</span>LEARN
                </div>
                <div className="chatBubble">AI</div>
              </>
            )}
            {p.type === "training" && (
              <>
                <div className="trainTitle">
                  TRAINING
                  <br />
                  <em>Platform</em>
                </div>
                <div className="trainLine"></div>
              </>
            )}
          </div>
        </div>
        <div className="projectNo">{p.n}</div>
        <div className="projectInfo">
          <h3>{p.title}</h3>
          <h4>{p.subtitle}</h4>
          <p>{p.desc}</p>
          <div className="tags">
            {p.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <a href="#" onClick={(e) => e.preventDefault()}>
            VIEW DETAILS <span>↗</span>
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function VolunteerCard({ v, i, onClick }) {
  return (
    <Reveal delay={i * 0.08}>
      <article className="volunteerCard" onClick={onClick}>
        <div className="volunteerVisual">
          <div className="visualChrome">
            <span>{v.org}</span>
            <span>{v.period}</span>
          </div>
          <div className="volunteerIcon">
            {v.type === "education" && <span className="iconLarge">📚</span>}
            {v.type === "community" && <span className="iconLarge">🤝</span>}
            {v.type === "aid" && <span className="iconLarge">🎁</span>}
            {v.type === "care" && <span className="iconLarge">💝</span>}
            {v.type === "health" && <span className="iconLarge">🩺</span>}
          </div>
        </div>
        <div className="volunteerNo">{v.n}</div>
        <div className="volunteerInfo">
          <h3>{v.title}</h3>
          <h4>{v.subtitle}</h4>
          <p>{v.desc}</p>
          <div className="tags">
            {v.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function JourneyDetail({ item }) {
  return (
    <main className="journeyDetail">
      <header className="detailNav dark">
        <a className="brand" href="#/" aria-label="Back to home">
          LINA <span>EL BARROUK</span>
        </a>
        <a className="backLink" href="#/">
          ← BACK TO PORTFOLIO
        </a>
      </header>

      <section className="detailHero dark sectionPad">
        <div className="sectionMeta lightMeta">
          <span>MY JOURNEY · {item.year}</span>
          <span>EDUCATION · DEVELOPMENT · SECURITY</span>
        </div>
        <Reveal>
          <p className="detailEyebrow">{item.year}</p>
          <h1>{item.title}</h1>
          <p className="detailLead">{item.desc}</p>
        </Reveal>
      </section>

      <section className="detailInstitution cream sectionPad">
        <Reveal>
          <span className="detailLabel">INSTITUTION</span>
          <h2>{item.institutionName}</h2>
          <a href={item.institutionLink} target="_blank" rel="noopener noreferrer" className="detailCta">
            VISIT WEBSITE <span>↗</span>
          </a>
        </Reveal>
      </section>

      <section className="detailModules blush sectionPad">
        <Reveal>
          <span className="detailLabel">MODULES STUDIED</span>
          <ul className="detailList">
             {item.modules.map((module) => (
               <li key={module}>{module}</li>
             ))}
          </ul>
        </Reveal>
      </section>

      <section className="detailOverview ivory sectionPad">
        <Reveal className="detailCopy">
          <span className="detailLabel">THE EXPERIENCE</span>
          <h2>
            A STEP TOWARD
            <br />
            <em>WHAT'S NEXT.</em>
          </h2>
          <p>{item.overview}</p>
        </Reveal>
      </section>

      <section className="detailGrid cream sectionPad">
        <Reveal className="detailPanel">
          <span className="detailLabel">SKILLS I DEVELOPED</span>
          <div className="detailTags">
            {item.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="detailPanel">
          <span className="detailLabel">KEY EXPERIENCES</span>
          <ul className="detailList">
            {item.experiences.map((experience) => (
              <li key={experience}>{experience}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="detailGoal ivory sectionPad">
        <Reveal>
          <span className="detailLabel">LOOKING FORWARD</span>
          <p>{item.goals}</p>
          <a className="detailCta" href="#/">
            RETURN TO MY JOURNEY <span>↗</span>
          </a>
        </Reveal>
      </section>

      <footer className="footer">
        <div>
          <strong>LINA EL BARROUK</strong>
          <span>Software Developer · AI · Cybersecurity · Web</span>
        </div>
        <div className="footerRight">
          <span>© 2026 Lina El Barrouk</span>
          <em>Built with curiosity.</em>
        </div>
      </footer>
    </main>
  );
}

function JourneyNotFound() {
  return (
    <main className="journeyDetail notFound dark sectionPad">
      <a className="backLink" href="#/">
        ← BACK TO PORTFOLIO
      </a>
      <h1>JOURNEY STEP NOT FOUND.</h1>
      <p>The page you requested does not exist.</p>
    </main>
  );
}

function PortfolioRouter() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const updateHash = () => {
      window.scrollTo(0, 0);
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const journeySlug = hash.match(/^#\/journey\/([^/]+)$/)?.[1];

  if (!journeySlug) {
    return hash.startsWith("#/journey/") ? <JourneyNotFound /> : <App />;
  }

  const item = journeyItems.find((journeyItem) => journeyItem.slug === journeySlug);
  return item ? <JourneyDetail item={item} /> : <JourneyNotFound />;
}

function VolunteerModal({ volunteer, onClose }) {
  return (
    <motion.div
      className="projectModal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="modalContent"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modalClose" onClick={onClose}>
          ×
        </button>
        <div className="modalVisual">
          <div className="visualChrome">
            <span>{volunteer.org}</span>
            <span>{volunteer.period}</span>
          </div>
          <div className="volunteerIcon">
            {volunteer.type === "education" && <span className="iconLarge" style={{ fontSize: "120px" }}>📚</span>}
            {volunteer.type === "community" && <span className="iconLarge" style={{ fontSize: "120px" }}>🤝</span>}
            {volunteer.type === "aid" && <span className="iconLarge" style={{ fontSize: "120px" }}>🎁</span>}
            {volunteer.type === "care" && <span className="iconLarge" style={{ fontSize: "120px" }}>💝</span>}
            {volunteer.type === "health" && <span className="iconLarge" style={{ fontSize: "120px" }}>🩺</span>}
          </div>
        </div>
        <div className="modalBody">
          <div className="projectNo">{volunteer.n}</div>
          <h3>{volunteer.title}</h3>
          <h4>{volunteer.subtitle}</h4>
          <p>{volunteer.desc}</p>
          <div className="tags">
            {volunteer.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

createRoot(document.getElementById("root")).render(<PortfolioRouter />);
