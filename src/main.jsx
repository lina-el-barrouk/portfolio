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
    title: "BAC SCIENCES PHYSIQUES",
    desc: "Option Française avec Mention au Lycée Ibn Batouta, Tanger.",
    institutionName: "Lycée Ibn Batouta",
    institutionLink: "https://www.men.gov.ma",
    overview:
      "Une première étape vers les sciences et technologies fondée sur la rigueur analytique, les mathématiques appliquées et la physique fondamentale.",
    semesters: [
      {
        name: "Piliers Scientifiques",
        modules: [
          "Mathématiques (Analyse, Algèbre & Géométrie)",
          "Physique & Chimie",
          "Sciences de la Vie et de la Terre (SVT)",
          "Philosophie, Français & Langues Étrangères",
        ],
      },
    ],
    skills: ["Raisonnement scientifique", "Mathématiques", "Résolution de problèmes", "Rigueur analytique"],
    experiences: [
      "Cursus scientifique Option Française au Lycée Ibn Batouta à Tanger.",
      "Obtention du Baccalauréat avec mention, posant les bases pour les études supérieures en informatique et technologies.",
    ],
    goals: "Confirmer l'attrait pour les sciences informatiques et intégrer un parcours universitaire scientifique.",
  },
  {
    slug: "first-year-deust",
    year: "2022—2023",
    title: "1ÈRE ANNÉE DEUST MIPC",
    desc: "Tronc Commun Mathématiques, Informatique, Physique, Chimie à la FST de Tanger.",
    institutionName: "Faculté des Sciences et Techniques de Tanger (FSTT)",
    institutionLink: "https://fstt.ac.ma",
    overview:
      "La première année du DEUST pose les bases théoriques et pratiques indispensables : programmation structurée, algorithmique, calcul scientifique et analyse mathématique.",
    semesters: [
      {
        name: "Semestre 1 (S1)",
        modules: [
          "M111 : Analyse 1 (Suites, Fonctions & Continuité)",
          "M112 : Algèbre 1 (Espaces Vectoriels & Matrices)",
          "M113 : Algorithmique et Programmation 1 (Langage C)",
          "M114 : Mécanique du Point Matériel & Optique Géométrique",
          "M115 : Thermodynamique & Structure de la Matière",
          "M116 : Langue, Méthodologie & Communication (TEC 1)",
        ],
      },
      {
        name: "Semestre 2 (S2)",
        modules: [
          "M121 : Analyse 2 (Calcul Intégral & Équations Différentielles)",
          "M122 : Algèbre 2 (Réduction des Endomorphismes & Algèbre Linéaire)",
          "M123 : Algorithmique et Programmation 2 (Structures de Données & Pointeurs en C)",
          "M124 : Électrostatique, Électrocinétique & Circuits",
          "M125 : Chimie des Solutions & Équilibres Chimiques",
          "M126 : Compétences Numériques & Anglais Technique (TEC 2)",
        ],
      },
    ],
    skills: ["Programmation en C", "Algorithmique & Pointeurs", "Analyse mathématique", "Algèbre linéaire", "Calcul scientifique"],
    experiences: [
      "Apprentissage approfondi des bases algorithmiques et de la programmation structurée en C.",
      "Résolution de problèmes d'ingénierie et modélisation mathématique appliquée.",
    ],
    goals: "Approfondir la programmation orientée objet, les bases de données et les architectures systèmes.",
  },
  {
    slug: "second-year-deust",
    year: "2023—2024",
    title: "2ÈME ANNÉE DEUST MIPC",
    desc: "Spécialisation et consolidation en informatique et sciences à la FST de Tanger.",
    institutionName: "Faculté des Sciences et Techniques de Tanger (FSTT)",
    institutionLink: "https://fstt.ac.ma",
    overview:
      "La seconde année du DEUST marque l'orientation vers le développement logiciel : programmation orientée objet, conception de bases de données, architectures matérielles et graphes.",
    semesters: [
      {
        name: "Semestre 3 (S3)",
        modules: [
          "M211 : Analyse 3 (Séries Numériques & Fonctions de Plusieurs Variables)",
          "M212 : Probabilités & Statistiques Appliquées",
          "M213 : Programmation Orientée Objet (C++ / Java)",
          "M214 : Électromagnétisme & Phénomènes Ondulatoires",
          "M215 : Systèmes d'Exploitation & Architecture des Ordinateurs",
          "M216 : Culture Entrepreneuriale & Communication Professionnelle",
        ],
      },
      {
        name: "Semestre 4 (S4)",
        modules: [
          "M221 : Analyse Numérique & Algorithmes d'Optimisation",
          "M222 : Bases de Données Relationnelles & Langage SQL",
          "M223 : Structures de Données Avancées & Théorie des Graphes",
          "M224 : Électronique Numérique & Logique Combinatoire",
          "M225 : Optique Ondulatoire & Physique Moderne",
          "M226 : Projet de Fin de DEUST / Stage d'Initiation",
        ],
      },
    ],
    skills: ["Programmation C++ / Java", "Bases de Données (SQL)", "Systèmes d'exploitation", "Théorie des graphes", "Modélisation relationnelle"],
    experiences: [
      "Conception et modélisation de bases de données avec requêtes SQL avancées.",
      "Implémentation de structures de données dynamiques et programmation orientée objet.",
    ],
    goals: "Rejoindre la Licence d'Ingénierie du Développement des Applications Informatiques (IDAI).",
  },
  {
    slug: "bachelor-idai",
    year: "2024—2025",
    title: "LICENCE LST IDAI",
    desc: "Ingénierie du Développement des Applications Informatiques à la FST de Tanger.",
    institutionName: "FST Tanger (Licence LST IDAI)",
    institutionLink: "https://fstt.ac.ma/portail/formation-initiale/licence/idai/",
    overview:
      "La Licence Sciences et Techniques IDAI est une formation d'excellence axée sur le génie logiciel, le développement web fullstack, les architectures distribuées, le mobile et les méthodes agiles.",
    semesters: [
      {
        name: "Semestre 5 (S5)",
        modules: [
          "M311 : Conception Orientée Objet & Modélisation UML Avancée",
          "M312 : Développement Web Fullstack (HTML5/CSS3, JavaScript, PHP/Laravel, Node.js)",
          "M313 : Développement d'Applications Java / J2EE & Frameworks",
          "M314 : Administration & Optimisation des Bases de Données (SGBD / PL-SQL)",
          "M315 : Réseaux Informatiques, Protocoles TCP/IP & Administration Système",
          "M316 : Génie Logiciel, Méthodes Agiles (Scrum) & Gestion de Projets IT",
        ],
      },
      {
        name: "Semestre 6 (S6)",
        modules: [
          "M321 : Développement d'Applications Mobiles (Android / Flutter)",
          "M322 : Architectures Distribuées, Microservices & API REST (FastAPI / Spring Boot)",
          "M323 : Sécurité des Systèmes d'Information & Sécurité des Applications Web",
          "M324 : Cloud Computing, Virtualisation & Introduction au DevOps (Docker, CI/CD)",
          "M325 & M326 : Projet de Fin d'Études (PFE) & Stage Professionnel en Entreprise",
        ],
      },
    ],
    skills: ["Fullstack (React, FastAPI, Laravel)", "Java / J2EE", "Mobile Dev", "UML & Architecture", "DevOps & Docker", "APIs REST", "Bases de données"],
    experiences: [
      "Conception et développement de la plateforme DiplomaChain (vérification de diplômes sur Hedera Blockchain).",
      "Développement de projets fullstack intégrant architectures sécurisées, REST APIs et interfaces modernes.",
    ],
    goals: "Poursuivre vers un Master spécialisé en Intelligence Artificielle et Cybersécurité.",
  },
  {
    slug: "jobintech-training",
    year: "2025—2026",
    title: "FORMATION JOBINTECH",
    desc: "Cybersécurité & Ingénierie des Systèmes à la Faculté des Sciences de Rabat.",
    institutionName: "Faculté des Sciences de Rabat / Programme JobInTech",
    institutionLink: "https://jobintech.ma",
    overview:
      "Programme intensif d'ingénierie des systèmes et de cybersécurité, orienté vers la pratique : sécurisation des infrastructures, tests d'intrusion, monitoring SOC et DevSecOps.",
    semesters: [
      {
        name: "Modules de Spécialisation Cybersécurité & Systèmes",
        modules: [
          "Module 1 : Administration Système Linux Avancée, Hardening OS & Bash Scripting",
          "Module 2 : Architecture Réseaux, Protocoles Sécurisés, VLAN, Firewalling & VPN",
          "Module 3 : Sécurité Offensive, Pentesting & Analyse des Vulnérabilités (OWASP Top 10)",
          "Module 4 : Sécurité Défensive, SOC, Monitoring SIEM & Réponse aux Incidents",
          "Module 5 : Cryptographie Appliquée, PKI, Gestion des Identités et des Accès (IAM / JWT)",
          "Module 6 : Sécurité des Applications Web, DevSecOps & Sécurité Conteneurs (Docker)",
          "Module 7 : Soft Skills, Préparation aux Certifications Techniques & Leadership",
        ],
      },
    ],
    skills: ["Linux Hardening", "Sécurité Réseaux & Pare-feu", "Pentesting & OWASP", "SOC & SIEM", "Cryptographie & IAM", "DevSecOps"],
    experiences: [
      "Mise en place d'environnements virtualisés sécurisés avec surveillance de trafic et détection d'intrusions.",
      "Audits de sécurité d'applications web et déploiement d'architectures d'authentification robuste.",
    ],
    goals: "Intégrer les principes de sécurité dès la phase de conception logicielle (Security by Design).",
  },
  {
    slug: "masters-sic",
    year: "2026—NOW",
    title: "MASTER SIC (SYSTÈMES INTELLIGENTS & CYBERSÉCURITÉ)",
    desc: "Formation d'Excellence Master à la Faculté des Sciences et Techniques de Tanger.",
    institutionName: "FST Tanger (Master SIC)",
    institutionLink: "https://fstt.ac.ma",
    overview:
      "Le Master SIC réunit les deux disciplines clés du numérique contemporain : l'Intelligence Artificielle (Machine Learning, Deep Learning, Vision) et la Cybersécurité avancée (Systèmes sécurisés, Blockchain, Forensics).",
    semesters: [
      {
        name: "Semestre 1 (S1)",
        modules: [
          "MS11 : Fondements de l'Intelligence Artificielle & Machine Learning",
          "MS12 : Cryptographie Avancée, Protocoles de Sécurité & PKI",
          "MS13 : Sécurité des Réseaux, Systèmes et Architectures Distribuées",
          "MS14 : Algorithmique Avancée & Optimisation Combinatoire",
          "MS15 : Programmation Python Avancée pour la Data Science & l'IA",
          "MS16 : Anglais Scientifique, Déontologie & Méthodologie de Recherche",
        ],
      },
      {
        name: "Semestre 2 (S2)",
        modules: [
          "MS21 : Deep Learning, Computer Vision & Traitement Automatique du Langage (NLP)",
          "MS22 : Sécurité Offensive, Tests d'Intrusion & Analyse de Vulnérabilités Avancée",
          "MS23 : Sécurité des Applications Web, Mobiles & Cloud Security",
          "MS24 : Internet des Objets (IoT) & Sécurité des Systèmes Embarqués",
          "MS25 : Analyse Forensique, Reverse Engineering & Rétro-ingénierie de Malwares",
          "MS26 : Projet Fédérateur R&D / Mini-Projet de Recherche Appliquée",
        ],
      },
      {
        name: "Semestre 3 (S3)",
        modules: [
          "MS31 : Intelligence Artificielle appliquée à la Cybersécurité & Threat Intelligence",
          "MS32 : Sécurité Blockchain & Smart Contracts Sécurisés",
          "MS33 : Gouvernance de la Sécurité, Gestion des Risques (ISO 27001/27002, EBIOS) & Audit",
          "MS34 : Sécurité du Cloud & Architectures DevSecOps Avancées",
          "MS35 : Systèmes Multi-Agents & Systèmes Intelligents Autonomes",
          "MS36 : Séminaires Professionnels & Préparation au PFE",
        ],
      },
      {
        name: "Semestre 4 (S4)",
        modules: [
          "MS41 & MS42 : Projet de Fin d'Études (PFE) / Stage Master en Entreprise ou Laboratoire de Recherche",
        ],
      },
    ],
    skills: ["Machine Learning & Deep Learning", "Computer Vision & NLP", "Cybersécurité avancée", "Forensics & Reverse Engineering", "Blockchain", "DevSecOps"],
    experiences: [
      "Recherche et conception d'architectures combinant modèles d'intelligence artificielle et mécanismes de défense cybernétique.",
      "Développement de projets innovants alliant vision par ordinateur, traitement des données et sécurité des systèmes distribués.",
    ],
    goals: "Concevoir des solutions intelligentes, hautement sécurisées et à fort impact technologique.",
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
    <div className="journeyDetailPage">
      <header className="detailNav">
        <a className="brand" href="#/" aria-label="Back to home">
          LINA <span>EL BARROUK</span>
        </a>
        <a className="backLink" href="#/">
          ← RETOUR AU PORTFOLIO
        </a>
      </header>

      <main className="detailContainer">
        <Reveal>
          <div className="detailHeroCard">
            <div className="detailMetaRow">
              <span className="detailBadge">{item.year}</span>
              <span className="detailSubBadge">FORMATION & PARCOURS</span>
            </div>
            <h1 className="detailMainTitle">{item.title}</h1>
            <p className="detailSubtitle">{item.desc}</p>

            {item.institutionName && (
              <div className="detailInstitutionBar">
                <div className="institutionInfo">
                  <span className="institutionIcon">🏛️</span>
                  <div>
                    <small>ÉTABLISSEMENT / FORMATION</small>
                    <h4>{item.institutionName}</h4>
                  </div>
                </div>
                {item.institutionLink && (
                  <a
                    href={item.institutionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="institutionBtn"
                  >
                    SITE OFFICIEL <span>↗</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </Reveal>

        <div className="detailBodyGrid">
          <Reveal delay={0.05}>
            <div className="detailCard">
              <div className="cardHeader">
                <span className="cardLabel">01 — PRÉSENTATION & CONTEXTE</span>
              </div>
              <p className="detailOverviewText">{item.overview}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="detailCard modulesCard">
              <div className="cardHeader">
                <span className="cardLabel">02 — PROGRAMME DES MODULES (S1 — S6)</span>
                <span className="cardCount">
                  {item.semesters.reduce((acc, sem) => acc + sem.modules.length, 0)} modules
                </span>
              </div>

              <div className="semestersGrid">
                {item.semesters.map((sem, sIdx) => (
                  <div key={sem.name || sIdx} className="semesterColumn">
                    <div className="semesterHeader">
                      <span className="semesterIcon">📚</span>
                      <h3>{sem.name}</h3>
                    </div>
                    <ul className="semesterModulesList">
                      {sem.modules.map((mod, mIdx) => (
                        <li key={mod}>
                          <span className="moduleNumber">{String(mIdx + 1).padStart(2, "0")}</span>
                          <span className="moduleText">{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="detailDualRow">
            <Reveal delay={0.15} className="dualCol">
              <div className="detailCard hFull">
                <div className="cardHeader">
                  <span className="cardLabel">03 — COMPÉTENCES & OUTILS</span>
                </div>
                <div className="detailTagsCloud">
                  {item.skills.map((skill) => (
                    <span key={skill} className="skillTag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="dualCol">
              <div className="detailCard hFull">
                <div className="cardHeader">
                  <span className="cardLabel">04 — EXPÉRIENCES & PROJETS</span>
                </div>
                <ul className="detailExpList">
                  {item.experiences.map((exp) => (
                    <li key={exp}>{exp}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <div className="detailCard goalCard">
              <div className="cardHeader">
                <span className="cardLabel">05 — PERSPECTIVES & OBJECTIFS</span>
              </div>
              <p className="goalText">{item.goals}</p>
              <div className="goalActions">
                <a className="pill light" href="#/">
                  ← RETOUR AU PARCOURS
                </a>
                <a className="pill outline" href="#work">
                  VOIR MES PROJETS ↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
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
    </div>
  );
}

function JourneyNotFound() {
  return (
    <div className="journeyDetailPage">
      <header className="detailNav">
        <a className="brand" href="#/" aria-label="Back to home">
          LINA <span>EL BARROUK</span>
        </a>
        <a className="backLink" href="#/">
          ← RETOUR AU PORTFOLIO
        </a>
      </header>
      <main className="detailContainer notFoundCenter">
        <h1>ÉTAPE INTROUVABLE</h1>
        <p>La page demandée n'existe pas ou a été déplacée.</p>
        <div style={{ marginTop: "30px" }}>
          <a className="pill light" href="#/">
            ← RETOUR AU PARCOURS
          </a>
        </div>
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
    </div>
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
