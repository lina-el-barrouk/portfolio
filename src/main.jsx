import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import "./styles.css";
import portrait from "../chatgptme.png";

const projects = [
  {
    id: "p1",
    n: "01",
    title: "DiplomaChain",
    subtitle: "Secure Blockchain Diploma Verification",
    desc: "A decentralized platform designed for academic institutions to issue, manage, and verify tamper-proof diplomas with instant cryptographic validation.",
    tags: ["FASTAPI", "REACT", "HEDERA HASHGRAPH", "MYSQL", "JWT", "SECURITY"],
    type: "chain",
    highlights: [
      "Cryptographic certificate signing and verification on Hedera ledger.",
      "FastAPI asynchronous backend with robust JWT role-based access control.",
      "Intuitive React dashboard for students, universities, and verifying recruiters.",
      "Zero-knowledge verification flow ensuring privacy and integrity.",
    ],
  },
  {
    id: "p2",
    n: "02",
    title: "Click2Learn",
    subtitle: "AI-Powered Interactive Education Hub",
    desc: "An intelligent learning ecosystem blending conversational AI agents, personalized curriculum pathways, and real-time collaboration tools.",
    tags: ["PYTHON", "REACT", "OPENAI API", "NLP", "WEBSOCKETS", "TAILWIND"],
    type: "learn",
    highlights: [
      "Custom conversational AI assistant providing 24/7 contextual tutoring.",
      "Adaptive quiz engine calibrating difficulty based on learner mastery.",
      "Real-time student progress analytics and interactive study groups.",
      "Modern, distraction-free user interface designed for deep focus.",
    ],
  },
  {
    id: "p3",
    n: "03",
    title: "Training Platform",
    subtitle: "Modular Learning & Certification Suite",
    desc: "A flexible enterprise web application supporting online training programs, structured curriculum modules, and interactive guidance bots.",
    tags: [
      "JAVASCRIPT",
      "HTML5/CSS3",
      "CHATBOT UX",
      "REST APIS",
      "UI/UX DESIGN",
    ],
    type: "training",
    highlights: [
      "Modular course builder with dynamic video, quiz, and text units.",
      "Integrated search and help chatbot facilitating rapid onboarding.",
      "Custom analytics dashboard tracking completion rates and test scores.",
      "Responsive, accessible design adhering to WCAG standards.",
    ],
  },
];

const skillCategories = [
  {
    title: "Software & Architecture",
    desc: "Core programming paradigms, object-oriented design, and design patterns.",
    skills: [
      "Python",
      "Java / J2EE",
      "C++",
      "C",
      "Object-Oriented Design",
      "UML",
      "Data Structures",
      "Algorithms",
    ],
  },
  {
    title: "Fullstack & Mobile Development",
    desc: "Modern front-end frameworks, robust backends, and cross-platform APIs.",
    skills: [
      "React.js",
      "JavaScript (ES6+)",
      "FastAPI",
      "Laravel",
      "PHP",
      "Angular",
      "HTML5 & Modern CSS",
      "RESTful APIs",
    ],
  },
  {
    title: "Cybersecurity & Systems",
    desc: "Defensive architectures, hardening, protocol analysis, and threat mitigation.",
    skills: [
      "Linux Hardening",
      "Bash Scripting",
      "OWASP Top 10",
      "Network Security",
      "PKI & Cryptography",
      "IAM / JWT",
      "Docker / DevSecOps",
    ],
  },
  {
    title: "AI & Data Science",
    desc: "Machine learning, computer vision, data analysis, and intelligent agents.",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "Pandas & NumPy",
      "Data Modeling",
      "MySQL & Database Admin",
    ],
  },
];

const softSkills = [
  {
    title: "Communication",
    desc: "Translating complex technical problems into clear, actionable ideas for both technical and non-technical audiences.",
    tags: ["Public speaking", "Technical writing", "Active listening"],
  },
  {
    title: "Teamwork",
    desc: "Working across disciplines — development, security, research — and lifting the team's output rather than only my own tasks.",
    tags: ["Cross-functional", "Code reviews", "Pair work"],
  },
  {
    title: "Leadership",
    desc: "Driving projects from the first sketch to delivery, and coordinating community programs with volunteers and partners.",
    tags: ["Ownership", "Mentoring", "Decision making"],
  },
  {
    title: "Critical Thinking",
    desc: "Questioning assumptions, weighing evidence and breaking ambiguous challenges into small testable hypotheses.",
    tags: ["Analysis", "Root-cause", "Research"],
  },
  {
    title: "Adaptability",
    desc: "Learning new stacks quickly and adjusting to shifting requirements without losing quality or momentum.",
    tags: ["Fast learner", "Curiosity", "Resilience"],
  },
  {
    title: "Time Management",
    desc: "Balancing a master's program, engineering projects and community commitments with realistic, honest planning.",
    tags: ["Prioritization", "Deadlines", "Reliability"],
  },
];

const volunteerProjects = [
  {
    id: "c1",
    n: "01",
    period: "SEP 2024 — JUL 2025",
    title: "Creative Minds",
    subtitle: "Interactive English for Youth",
    desc: "Designed and facilitated engaging language workshops and gamified learning activities for young students, cultivating confidence and curiosity.",
    tags: ["EDUCATION", "PEDAGOGY", "LEADERSHIP", "EMPATHY"],
    org: "Lyed f Lyed CSC",
    impact: "Over 50+ children supported with interactive learning tools",
    type: "education",
  },
  {
    id: "c2",
    n: "02",
    period: "JAN 2025 — FEB 2025",
    title: "JOUD Campaign",
    subtitle: "Winter Relief in Rural Communities",
    desc: "Organized collection logistics, donation sorting, and field distribution of winter essentials to underserved mountain villages.",
    tags: ["HUMANITARIAN", "LOGISTICS", "COMMUNITY", "FIELDWORK"],
    org: "Lyed f Lyed CSC",
    impact: "Direct assistance and warm supplies delivered to remote families",
    type: "community",
  },
  {
    id: "c3",
    n: "03",
    period: "FEB 2025 — MAR 2025",
    title: "Ramadan Solidarity",
    subtitle: "Essential Food Aid Initiative",
    desc: "Managed food kit assembly and coordinated distribution networks to ensure families in precarious situations received essential nutritional aid.",
    tags: ["SOLIDARITY", "COORDINATION", "SUPPLY CHAIN", "IMPACT"],
    org: "Lyed f Lyed CSC",
    impact: "Hundreds of nutritional packs prepared and distributed",
    type: "aid",
  },
  {
    id: "c4",
    n: "04",
    period: "APR 2025 — MAY 2025",
    title: "Harmony of Generations",
    subtitle: "Intergenerational Social Connection",
    desc: "Created cultural encounters, memory sharing sessions, and recreational workshops with residents of retirement homes to reduce social isolation.",
    tags: ["ELDERLY CARE", "WELLBEING", "LISTENING", "CULTURE"],
    org: "Lyed f Lyed CSC",
    impact: "Weekly companionship and creative events with senior citizens",
    type: "care",
  },
  {
    id: "c5",
    n: "05",
    period: "JUN 2025",
    title: "Sanad Health Mission",
    subtitle: "Blood Donation & Public Health",
    desc: "Participated in emergency awareness drives, donor logistics, and first-responder training during regional public health campaigns.",
    tags: ["PUBLIC HEALTH", "FIRST AID", "CIVIC ENGAGEMENT", "AWARENESS"],
    org: "Global Shapers Tangier",
    impact: "Mobilized local youth for life-saving blood donation drives",
    type: "health",
  },
];

const journeyItems = [
  {
    id: "j1",
    slug: "bac-science-physique",
    year: "2021 — 2022",
    title: "BAC SCIENCES PHYSIQUES",
    desc: "Option Française avec Mention au Lycée Ibn Batouta, Tanger.",
    institutionName: "Lycée Ibn Batouta, Tanger",
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
    skills: [
      "Raisonnement scientifique",
      "Mathématiques",
      "Résolution de problèmes",
      "Rigueur analytique",
    ],
    experiences: [
      "Cursus scientifique Option Française au Lycée Ibn Batouta à Tanger.",
      "Obtention du Baccalauréat avec mention, posant les bases pour les études supérieures en informatique et technologies.",
    ],
    goals:
      "Confirmer l'attrait pour les sciences informatiques et intégrer un parcours universitaire scientifique.",
  },
  {
    id: "j2",
    slug: "first-year-deust",
    year: "2022 — 2023",
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
    skills: [
      "Programmation en C",
      "Algorithmique & Pointeurs",
      "Analyse mathématique",
      "Algèbre linéaire",
      "Calcul scientifique",
    ],
    experiences: [
      "Apprentissage approfondi des bases algorithmiques et de la programmation structurée en C.",
      "Résolution de problèmes d'ingénierie et modélisation mathématique appliquée.",
    ],
    goals:
      "Approfondir la programmation orientée objet, les bases de données et les architectures systèmes.",
  },
  {
    id: "j3",
    slug: "second-year-deust",
    year: "2023 — 2024",
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
    skills: [
      "Programmation C++ / Java",
      "Bases de Données (SQL)",
      "Systèmes d'exploitation",
      "Théorie des graphes",
      "Modélisation relationnelle",
    ],
    experiences: [
      "Conception et modélisation de bases de données avec requêtes SQL avancées.",
      "Implémentation de structures de données dynamiques et programmation orientée objet.",
    ],
    goals:
      "Rejoindre la Licence d'Ingénierie du Développement des Applications Informatiques (IDAI).",
  },
  {
    id: "j4",
    slug: "bachelor-idai",
    year: "2024 — 2025",
    title: "LICENCE LST IDAI",
    desc: "Ingénierie du Développement des Applications Informatiques à la FST de Tanger.",
    institutionName: "FST Tanger (Licence LST IDAI)",
    institutionLink:
      "https://fstt.ac.ma/portail/formation-initiale/licence/idai/",
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
    skills: [
      "Fullstack (React, FastAPI, Laravel)",
      "Java / J2EE",
      "Mobile Dev",
      "UML & Architecture",
      "DevOps & Docker",
      "APIs REST",
      "Bases de données",
    ],
    experiences: [
      "Conception et développement de la plateforme DiplomaChain (vérification de diplômes sur Hedera Blockchain).",
      "Développement de projets fullstack intégrant architectures sécurisées, REST APIs et interfaces modernes.",
    ],
    goals:
      "Poursuivre vers un Master spécialisé en Intelligence Artificielle et Cybersécurité.",
  },
  {
    id: "j5",
    slug: "jobintech-training",
    year: "2025 — 2026",
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
    skills: [
      "Linux Hardening",
      "Sécurité Réseaux & Pare-feu",
      "Pentesting & OWASP",
      "SOC & SIEM",
      "Cryptographie & IAM",
      "DevSecOps",
    ],
    experiences: [
      "Mise en place d'environnements virtualisés sécurisés avec surveillance de trafic et détection d'intrusions.",
      "Audits de sécurité d'applications web et déploiement d'architectures d'authentification robuste.",
    ],
    goals:
      "Intégrer les principes de sécurité dès la phase de conception logicielle (Security by Design).",
  },
  {
    id: "j6",
    slug: "masters-sic",
    year: "2026 — NOW",
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
    skills: [
      "Machine Learning & Deep Learning",
      "Computer Vision & NLP",
      "Cybersécurité avancée",
      "Forensics & Reverse Engineering",
      "Blockchain",
      "DevSecOps",
    ],
    experiences: [
      "Recherche et conception d'architectures combinant modèles d'intelligence artificielle et mécanismes de défense cybernétique.",
      "Développement de projets innovants alliant vision par ordinateur, traitement des données et sécurité des systèmes distribués.",
    ],
    goals:
      "Concevoir des solutions intelligentes, hautement sécurisées et à fort impact technologique.",
  },
];

/* ================= DYNAMIC CONTENT (ADMIN API) ================= */
const API_BASE = import.meta.env.VITE_API_URL || "/api";
const ADMIN_SESSION_KEY = "portfolioAdminSession";

async function fetchAdminContent() {
  try {
    const res = await fetch(`${API_BASE}/content`);
    if (!res.ok) throw new Error("unavailable");
    const data = await res.json();
    return {
      projects: Array.isArray(data.projects) ? data.projects : [],
      journeyItems: Array.isArray(data.journeyItems) ? data.journeyItems : [],
      community: Array.isArray(data.community) ? data.community : [],
      overrides: data.overrides || {},
      deleted: data.deleted || {},
    };
  } catch {
    // API not running (e.g. static build): fall back to hardcoded content only.
    return null;
  }
}

/* Merge built-in content with the API copy: apply edits, drop deletions,
   append admin-added items, and (optionally) renumber the visible sequence. */
function mergeCollection(
  statics,
  dynamics = [],
  overrides = {},
  deleted = [],
  renumber = false,
) {
  const key = (item) => item.id || item.slug || item.title;
  const merged = [
    ...statics
      .filter((item) => !deleted.includes(key(item)))
      .map((item) => ({ ...item, ...(overrides[key(item)] || {}) })),
    ...dynamics,
  ];
  return renumber
    ? merged.map((item, i) => ({ ...item, n: String(i + 1).padStart(2, "0") }))
    : merged;
}

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ================= MAIL COMPOSER MENU ================= */
const EMAIL = "linaelbarrouk@gmail.com";

function openMail(kind) {
  const subject = encodeURIComponent("Contact — Portfolio");
  if (kind === "gmail") {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${subject}`,
      "_blank",
      "noopener,noreferrer",
    );
  } else if (kind === "outlook") {
    window.open(
      `https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL}&subject=${subject}`,
      "_blank",
      "noopener,noreferrer",
    );
  } else {
    window.location.href = `mailto:${EMAIL}?subject=${subject}`;
  }
}

function MailComposerMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="mailMenuWrap" ref={ref}>
      <button
        className="pill light"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        INITIALIZE CONVERSATION <span>{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <motion.div
          className="mailMenu"
          role="menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {[
            ["gmail", "Gmail", "Ouvre le composeur Gmail"],
            ["outlook", "Outlook", "Ouvre le composeur Outlook"],
            ["default", "Client par défaut", "Ouvre ton app mail (mailto:)"],
          ].map(([kind, label, hint]) => (
            <button
              key={kind}
              role="menuitem"
              className="mailMenuItem"
              onClick={() => {
                setOpen(false);
                openMail(kind);
              }}
            >
              <strong>{label}</strong>
              <small>{hint}</small>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function App({ content, scrollToId }) {
  const [menu, setMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.1,
  });

  const go = (id) => {
    setMenu(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* Ancre d'un autre écran (ex: « VOIR MES PROJETS » → #work) : la section
     n'existe pas au moment du hashchange, on l'attend puis on y va. Le
     second passage corrige le décalage dû au chargement des médias. */
  useEffect(() => {
    if (!scrollToId) return;
    let cancelled = false;
    const timers = [];
    const align = (behavior) => {
      const element = document.getElementById(scrollToId);
      if (element) element.scrollIntoView({ behavior, block: "start" });
      return element;
    };

    const frame = requestAnimationFrame(() => align("smooth"));
    [700, 1600].forEach((delay, i) => {
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          const element = document.getElementById(scrollToId);
          if (element && Math.abs(element.getBoundingClientRect().top) > 8) {
            align(i === 0 ? "smooth" : "auto");
          }
        }, delay),
      );
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, [scrollToId]);

  const safeContent = content || { projects: [], journeyItems: [], community: [] };
  const overrides = safeContent.overrides || {};
  const deleted = safeContent.deleted || {};
  const dynamicProjects = mergeCollection(
    projects,
    safeContent.projects || [],
    overrides.projects,
    deleted.projects,
    true,
  );
  const dynamicJourneyItems = mergeCollection(
    journeyItems,
    safeContent.journeyItems || [],
    overrides.journeyItems,
    deleted.journeyItems,
  );
  const dynamicVolunteers = mergeCollection(
    volunteerProjects,
    safeContent.community || [],
    overrides.community,
    deleted.community,
    true,
  );

  const filteredProjects =
    activeFilter === "ALL"
      ? dynamicProjects
      : dynamicProjects.filter((p) =>
          p.tags.some((t) =>
            t.toUpperCase().includes(activeFilter.toUpperCase()),
          ),
        );

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />

      <header className="nav">
        <button className="brand" onClick={() => go("home")} aria-label="Home">
          <div className="brandDot"></div>
          <div className="brandName">
            LINA<span>EL BARROUK</span>
          </div>
        </button>

        <div className="navlinks">
          <button onClick={() => go("about")}>ABOUT</button>
          <button onClick={() => go("journey")}>JOURNEY</button>
          <button onClick={() => go("work")}>PROJECTS</button>
          <button onClick={() => go("cyber")}>SECURITY</button>
          <button onClick={() => go("toolkit")}>TOOLKIT</button>
          <button onClick={() => go("softskills")}>SOFT SKILLS</button>
          <button onClick={() => go("beyond")}>COMMUNITY</button>
          <button onClick={() => go("contact")}>CONTACT</button>
        </div>

        <div className="navAction">
          <div className="statusPill">
            <span className="statusDot"></span>
            <span>MASTER SIC</span>
          </div>
          <button className="menuBtn" onClick={() => setMenu(true)}>
            MENU <span>☰</span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="menuOverlay"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menuHeader">
              <div className="brandName">
                LINA<span>EL BARROUK</span>
              </div>
              <button className="menuClose" onClick={() => setMenu(false)}>
                FERMER ×
              </button>
            </div>

            <div className="menuItems">
              {[
                ["01", "HOME / ACCUEIL", "home"],
                ["02", "ABOUT / PROFIL", "about"],
                ["03", "JOURNEY / PARCOURS", "journey"],
                ["04", "WORK / PROJETS", "work"],
                ["05", "CYBERSECURITY / DÉFENSE", "cyber"],
                ["06", "TOOLKIT / TECHNOLOGIES", "toolkit"],
                ["07", "SOFT SKILLS / COMPÉTENCES", "softskills"],
                ["08", "COMMUNITY / ENGAGEMENT", "beyond"],
                ["09", "CONTACT / ÉCHANGE", "contact"],
              ].map(([n, t, id]) => (
                <button key={id} onClick={() => go(id)}>
                  <span className="menuNum">{n}</span>
                  <span>{t}</span>
                  <span className="menuArrow">↗</span>
                </button>
              ))}
            </div>

            <div className="menuFoot">
              <span>Tangier, Morocco · Software Developer</span>
              <span>Available for high-impact initiatives & research</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ================= HERO SECTION ================= */}
        <section id="home" className="hero">
          <div className="heroGrid">
            <div className="heroCopy">
              <motion.div
                className="eyebrow"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span>✦</span>
                <span>SOFTWARE ENGINEER · AI · CYBER DEFENSE</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                ARCHITECTING
                <br />
                INTELLIGENT &amp;
                <br />
                <em>RESILIENT SYSTEMS.</em>
              </motion.h1>

              <motion.p
                className="heroDesc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
              >
                I’m <strong>Lina El Barrouk</strong>, a software developer
                pursuing a Master's in{" "}
                <strong>Intelligent Systems &amp; Cybersecurity</strong>. I
                design reliable, modern web applications engineered with
                security and artificial intelligence at their core.
              </motion.p>

              <motion.div
                className="heroActions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <button className="pill light" onClick={() => go("work")}>
                  EXPLORE SELECTED WORK <span>↗</span>
                </button>
                <button className="pill ghost" onClick={() => go("journey")}>
                  VIEW ACADEMIC JOURNEY <span>↓</span>
                </button>
              </motion.div>

              <motion.div
                className="heroTags"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="heroTag">FASTAPI &amp; REACT</span>
                <span className="heroTag">PYTHON &amp; MACHINE LEARNING</span>
                <span className="heroTag">CYBER DEFENSE &amp; DEVSECOPS</span>
              </motion.div>
            </div>

            <motion.div
              className="heroVisual"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="portraitComposition">
                <div className="floatingCard f1">
                  <span className="fIcon">🛡️</span>
                  <div className="fText">
                    <small>SECURITY</small>
                    <strong>By Design</strong>
                  </div>
                </div>

                <div className="portraitFrame">
                  <div className="portraitArt">
                    <img src={portrait} alt="Portrait of Lina El Barrouk" />
                  </div>
                </div>

                <div className="floatingCard f2">
                  <span className="fIcon">🧠</span>
                  <div className="fText">
                    <small>INTELLIGENCE</small>
                    <strong>Master SIC</strong>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= ABOUT SECTION ================= */}
        <section id="about" className="about ivory sectionPad">
          <div className="sectionInner">
            <div className="sectionMeta">
              <span>01 — ABOUT &amp; PHILOSOPHY</span>
              <span>THE INTERSECTION OF CODE &amp; DEFENSE</span>
            </div>

            <div className="aboutGrid">
              <Reveal>
                <div className="aboutQuote">
                  "Engineering software is not only about writing functional
                  code; it is about <em>anticipating vulnerabilities</em>,
                  crafting clear interfaces, and embedding <em>intelligence</em>
                  ."
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="aboutText">
                  <p>
                    With an academic grounding spanning mathematical
                    foundations, software engineering, and intensive
                    cybersecurity practice, my path is driven by continuous
                    rigor and deep curiosity.
                  </p>
                  <p>
                    Currently enrolled in the <strong>Master SIC</strong>{" "}
                    (Intelligent Systems &amp; Cybersecurity) at FST Tanger, I
                    specialize in architecting secure fullstack platforms,
                    exploring offensive and defensive security principles, and
                    integrating applied machine learning models.
                  </p>
                  <div className="aboutPillars">
                    <div className="aboutPillarCard">
                      <span className="pillarNum">01</span>
                      <h4>Robust Dev</h4>
                      <p>
                        Clean code, modular APIs, and modern UI architectures.
                      </p>
                    </div>
                    <div className="aboutPillarCard">
                      <span className="pillarNum">02</span>
                      <h4>Active Defense</h4>
                      <p>Security audits, hardening, and threat mitigation.</p>
                    </div>
                    <div className="aboutPillarCard">
                      <span className="pillarNum">03</span>
                      <h4>Applied AI</h4>
                      <p>
                        Intelligent assistants, classification, and computer
                        vision.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= JOURNEY TIMELINE ================= */}
        <section id="journey" className="journey cream sectionPad">
          <div className="sectionInner">
            <div className="sectionMeta">
              <span>02 — ACADEMIC CURRICULUM</span>
              <span>CLICK AN ERA TO VIEW FULL MODULES (S1 — S6)</span>
            </div>

            <div className="sectionHeader">
              <Reveal>
                <h2 className="sectionTitle">
                  FROM CODE
                  <br />
                  TO <em>SECURITY.</em>
                </h2>
              </Reveal>
              <p className="sectionDesc">
                Each milestone represents a formative foundation. Select any
                card below to explore its detailed academic curriculum, semester
                modules, official institutions, and hands-on deliverables.
              </p>
            </div>

            <div className="timelineTrack">
              {dynamicJourneyItems.map((item, i) => (
                <Reveal key={item.slug} delay={i * 0.05} className="timelineItemWrap">
                  <div className="timelineItem">
                    <a
                      className="timelineDot"
                      href={`#/journey/${item.slug}`}
                      aria-label={`Voir les détails : ${item.title}`}
                    >
                      <span className="timelineDotInner"></span>
                    </a>
                    <a
                      className="timelineCard"
                      href={`#/journey/${item.slug}`}
                      aria-label={`Detailed curriculum for ${item.title}`}
                    >
                    <div>
                      <div className="timelineCardHead">
                        <span className="timelineYearPill">{item.year}</span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>

                    <div className="timelineCardFoot">
                      <span className="timelineActionLink">
                        DÉTAILS COMPLETS <span>↗</span>
                      </span>
                    </div>
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WORK / PROJECTS ================= */}
        <section id="work" className="work dark sectionPad">
          <div className="sectionInner">
            <div className="sectionMeta lightMeta">
              <span>03 — FEATURED WORK</span>
              <span>ENGINEERED SOLUTIONS</span>
            </div>

            <div className="sectionHeader">
              <Reveal>
                <h2 className="sectionTitle" style={{ color: "var(--ivory)" }}>
                  DISTINCTIVE
                  <br />
                  <em>DEVELOPMENTS.</em>
                </h2>
              </Reveal>
              <p
                className="sectionDesc"
                style={{ color: "rgba(248, 245, 239, 0.75)" }}
              >
                A selection of systems developed with focus on robust security,
                decentralized trust, and seamless interactive experiences.
              </p>
            </div>

            <div className="projectsFilter">
              {["ALL", "FASTAPI", "REACT", "AI", "SECURITY"].map((f) => (
                <button
                  key={f}
                  className={`filterBtn ${activeFilter === f ? "active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="projectsGrid">
              {filteredProjects.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <a
                    className="projectCard"
                    href={`#/project/${p.id}`}
                    aria-label={`Voir les détails du projet : ${p.title}`}
                  >
                    <div className="projectCardVisual">
                      <div className="visualHeader">
                        <span>PROJECT {p.n}</span>
                        <span>DETAILS ↗</span>
                      </div>
                      <div className="visualBody">
                        <div className="projectIconText">
                          {p.title.slice(0, 4)}
                          <span>{p.title.slice(4)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="projectCardContent">
                      <h3>{p.title}</h3>
                      <h4>{p.subtitle}</h4>
                      <p>{p.desc}</p>

                      <div className="tagsRow">
                        {p.tags.map((tag) => (
                          <span key={tag} className="tagPill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="projectCardFoot">
                      <span>EXPLORE PROJECT</span>
                      <span>↗</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CYBERSECURITY MATRIX ================= */}
        <section id="cyber" className="cyber deep sectionPad">
          <div className="sectionInner">
            <div className="sectionMeta lightMeta">
              <span>04 — CYBER DEFENSE LAB</span>
              <span>PROACTIVE RESILIENCE &amp; HARDENING</span>
            </div>

            <div className="cyberGrid">
              <Reveal>
                <div className="cyberText">
                  <h2
                    className="sectionTitle"
                    style={{ color: "var(--ivory)" }}
                  >
                    DEFENSE
                    <br />
                    IN <em>DEPTH.</em>
                  </h2>
                  <h3>Security is an ongoing architectural practice.</h3>
                  <p>
                    Combining low-level Linux administration, network
                    segregation, modern cryptographic identities (PKI, JWT,
                    OAuth2), and continuous vulnerability assessments according
                    to OWASP guidelines.
                  </p>
                  <p>
                    My workflow integrates automated linting, container
                    isolation, and defense mechanisms to protect sensitive data
                    and service integrity.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="cyberMatrixCard">
                  <div className="matrixHead">
                    <span
                      style={{
                        fontFamily: "JetBrains Mono",
                        fontSize: "11px",
                        color: "var(--blush)",
                      }}
                    >
                      DEFENSE FRAMEWORK
                    </span>
                    <div className="matrixLive">
                      <span className="matrixLiveDot"></span>
                      ACTIVE OBSERVABILITY
                    </div>
                  </div>

                  <div className="matrixLayers">
                    <div className="layerBox">
                      <div className="layerIcon">🔐</div>
                      <h5>Identity &amp; Auth</h5>
                      <p>
                        JWT, PKI certificates, asymmetric hashing, and
                        role-based policies.
                      </p>
                    </div>

                    <div className="layerBox">
                      <div className="layerIcon">🌐</div>
                      <h5>Network &amp; Perimeter</h5>
                      <p>
                        VLAN routing, strict firewall policies, TLS encryption,
                        and VPN tunnels.
                      </p>
                    </div>

                    <div className="layerBox">
                      <div className="layerIcon">🐧</div>
                      <h5>Linux Hardening</h5>
                      <p>
                        Kernel parameter tuning, permission matrices, and Bash
                        automation.
                      </p>
                    </div>

                    <div className="layerBox">
                      <div className="layerIcon">🛡️</div>
                      <h5>App Sec &amp; Audit</h5>
                      <p>
                        OWASP Top 10 remediation, safe serialization, and
                        container lockdown.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= TOOLKIT / SKILLS ================= */}
        <section id="toolkit" className="toolkit cream sectionPad">
          <div className="sectionInner">
            <div className="sectionMeta">
              <span>05 — TECHNICAL TOOLKIT</span>
              <span>ENGINEERING STACK &amp; CAPABILITIES</span>
            </div>

            <div className="sectionHeader">
              <Reveal>
                <h2 className="sectionTitle">
                  MODERN &amp;
                  <br />
                  <em>PURPOSEFUL TECH.</em>
                </h2>
              </Reveal>
              <p className="sectionDesc">
                A structured overview of the languages, frameworks, and defense
                tools I leverage to build dependable software systems.
              </p>
            </div>

            <div className="skillsCategoriesGrid">
              {skillCategories.map((cat, i) => (
                <Reveal key={cat.title} delay={i * 0.08}>
                  <div className="skillCategoryCard">
                    <div className="skillCategoryHead">
                      <span className="skillNum">{String(i + 1).padStart(2, "0")}</span>
                      <h3>{cat.title}</h3>
                    </div>
                    <p className="skillCategoryDesc">{cat.desc}</p>
                    <div className="skillPillsWrap">
                      {cat.skills.map((s) => (
                        <span key={s} className="skillPill">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SOFT SKILLS ================= */}
        <section id="softskills" className="softskills blush sectionPad">
          <div className="sectionInner">
            <div className="sectionMeta">
              <span>06 — SOFT SKILLS</span>
              <span>HOW I WORK WITH PEOPLE</span>
            </div>

            <div className="sectionHeader">
              <Reveal>
                <h2 className="sectionTitle">
                  BEYOND CODE,
                  <br />
                  <em>HUMAN SKILLS.</em>
                </h2>
              </Reveal>
              <p className="sectionDesc">
                Technology is a team sport. These are the interpersonal
                strengths I bring to every project — from leading a workshop to
                untangling a hard problem with a colleague.
              </p>
            </div>

            <div className="softSkillsGrid">
              {softSkills.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.07}>
                  <div className="softSkillCard">
                    <div className="softSkillHead">
                      <span className="softSkillNum">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3>{s.title}</h3>
                    </div>
                    <p className="softSkillDesc">{s.desc}</p>
                    <div className="softSkillTags">
                      {s.tags.map((t) => (
                        <span key={t} className="softSkillTag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= BEYOND THE CODE / COMMUNITY ================= */}
        <section id="beyond" className="beyond ivory sectionPad">
          <div className="sectionInner">
            <div className="sectionMeta">
              <span>07 — COMMUNITY ENGAGEMENT</span>
              <span>LEADERSHIP, HUMAN VALUES &amp; IMPACT</span>
            </div>

            <div className="sectionHeader">
              <Reveal>
                <h2 className="sectionTitle">
                  BEYOND THE
                  <br />
                  <em>TERMINAL.</em>
                </h2>
              </Reveal>
              <p className="sectionDesc">
                Technology finds its true value in serving people. Through
                humanitarian initiatives, education programs, and youth
                development, I actively dedicate time to impactful community
                causes.
              </p>
            </div>

            <div className="volunteerGrid">
              {dynamicVolunteers.map((v, i) => (
                <Reveal key={v.id} delay={i * 0.08}>
                  <a
                    className="volunteerCard"
                    href={`#/community/${v.id}`}
                    aria-label={`Voir les détails : ${v.title}`}
                  >
                    <div className="volunteerHead">
                      <span className="volunteerOrg">{v.org}</span>
                      <span className="volunteerPeriod">{v.period}</span>
                    </div>

                    <h3>{v.title}</h3>
                    <h4>{v.subtitle}</h4>
                    <p>{v.desc}</p>

                    <div className="volunteerImpactPill">
                      <span>✦</span>
                      <span>{v.impact}</span>
                    </div>

                    <div className="tagsRow">
                      {v.tags.map((t) => (
                        <span
                          key={t}
                          className="tagPill"
                          style={{ color: "var(--wine)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section id="contact" className="contact deep sectionPad">
          <div className="sectionInner">
            <Reveal>
              <div className="contactCard">
                <div className="eyebrow" style={{ margin: "0 auto 24px" }}>
                  <span>✦</span>
                  <span>OPEN FOR COLLABORATION</span>
                </div>

                <h2>
                  LET’S BUILD
                  <br />
                  SOMETHING <em>RESILIENT.</em>
                </h2>

                <p>
                  Whether you are seeking a software engineer for a challenging
                  project, an academic collaboration, or a technical inquiry, my
                  inbox is always open.
                </p>

                <MailComposerMenu />

                <div className="contactLinksBar">
                  <a
                    className="contactLinkItem"
                    href="https://www.linkedin.com/in/lina-el-barrouk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LINKEDIN <span>↗</span>
                  </a>
                  <a
                    className="contactLinkItem"
                    href="https://github.com/lina-el-barrouk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GITHUB <span>↗</span>
                  </a>
                  <a
                    className="contactLinkItem"
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=linaelbarrouk@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    EMAIL <span>↗</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footerBrand">
          <strong>LINA EL BARROUK</strong>
          <span>Software Developer · Master SIC · AI &amp; Cybersecurity</span>
        </div>
        <div className="footerNote">
          © 2026 — Crafted with precision &amp; curiosity.{" "}
          <a className="footerAdmin" href="#/admin">ADMIN</a>
        </div>
      </footer>
    </>
  );
}

/* ================= PROJECT / COMMUNITY DETAIL PAGES ================= */
function mediaEmbed(url) {
  const yt = String(url).match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/,
  );
  if (yt) {
    return { kind: "iframe", src: `https://www.youtube.com/embed/${yt[1]}` };
  }
  const vimeo = String(url).match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    return { kind: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}` };
  }
  return { kind: "video", src: url };
}

function MediaGallery({ images, videos }) {
  const img = Array.isArray(images) ? images : [];
  const vid = Array.isArray(videos) ? videos : [];
  if (!img.length && !vid.length) return null;
  return (
    <Reveal delay={0.15}>
      <div className="detailCard">
        <div className="cardHeader">
          <span className="cardLabel">GALERIE — PHOTOS &amp; VIDÉOS</span>
          <span className="cardCount">{img.length + vid.length} médias</span>
        </div>
        <div className="detailMediaGrid">
          {img.map((src) => (
            <a
              key={src}
              className="detailMediaImg"
              href={src}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={src} alt="" loading="lazy" />
            </a>
          ))}
          {vid.map((src) => {
            const media = mediaEmbed(src);
            return (
              <div key={src} className="detailMediaVideo">
                {media.kind === "iframe" ? (
                  <iframe
                    src={media.src}
                    title={src}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={media.src} controls playsInline preload="metadata" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

function DetailActions() {
  return (
    <Reveal delay={0.2}>
      <div className="detailCard goalCard">
        <div className="goalActions">
          <a className="pill light" href="#/">
            ← RETOUR AU PORTFOLIO
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectDetail({ project }) {
  const highlights = project.highlights || [];
  const tags = project.tags || [];
  return (
    <div className="journeyDetailPage">
      <header className="detailNav">
        <a className="brand" href="#/" aria-label="Back to home">
          <div className="brandDot"></div>
          <div className="brandName">
            LINA<span>EL BARROUK</span>
          </div>
        </a>
        <a className="backLink" href="#/">
          ← RETOUR AU PORTFOLIO
        </a>
      </header>

      <main className="detailContainer">
        <Reveal>
          <div className="detailHeroCard">
            <div className="detailMetaRow">
              <span className="detailBadge">PROJECT {project.n}</span>
              <span className="detailSubBadge">SPÉCIFICATION TECHNIQUE</span>
            </div>
            <h1 className="detailMainTitle">{project.title}</h1>
            <p className="detailSubtitle">{project.subtitle}</p>
          </div>
        </Reveal>

        <div className="detailBodyGrid">
          <Reveal delay={0.05}>
            <div className="detailCard">
              <div className="cardHeader">
                <span className="cardLabel">01 — PRÉSENTATION DU PROJET</span>
              </div>
              <p className="detailOverviewText">{project.desc}</p>
            </div>
          </Reveal>

          {highlights.length > 0 && (
            <Reveal delay={0.1}>
              <div className="detailCard">
                <div className="cardHeader">
                  <span className="cardLabel">02 — POINTS FORTS CLÉS</span>
                </div>
                <ul className="detailExpList">
                  {highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {tags.length > 0 && (
            <Reveal delay={0.12}>
              <div className="detailCard">
                <div className="cardHeader">
                  <span className="cardLabel">03 — STACK TECHNOLOGIQUE</span>
                </div>
                <div className="detailTagsCloud">
                  {tags.map((t) => (
                    <span key={t} className="skillTag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          <MediaGallery images={project.images} videos={project.videos} />
          <DetailActions />
        </div>
      </main>

      <footer className="footer">
        <div className="footerBrand">
          <strong>LINA EL BARROUK</strong>
          <span>Software Developer · AI · Cybersecurity</span>
        </div>
        <div className="footerNote">© 2026 Lina El Barrouk</div>
      </footer>
    </div>
  );
}

function CommunityDetail({ volunteer }) {
  const tags = volunteer.tags || [];
  return (
    <div className="journeyDetailPage">
      <header className="detailNav">
        <a className="brand" href="#/" aria-label="Back to home">
          <div className="brandDot"></div>
          <div className="brandName">
            LINA<span>EL BARROUK</span>
          </div>
        </a>
        <a className="backLink" href="#/">
          ← RETOUR AU PORTFOLIO
        </a>
      </header>

      <main className="detailContainer">
        <Reveal>
          <div className="detailHeroCard">
            <div className="detailMetaRow">
              <span className="detailBadge">{volunteer.org || "ENGAGEMENT"}</span>
              {volunteer.period && (
                <span className="detailSubBadge">{volunteer.period}</span>
              )}
            </div>
            <h1 className="detailMainTitle">{volunteer.title}</h1>
            <p className="detailSubtitle">{volunteer.subtitle}</p>
          </div>
        </Reveal>

        <div className="detailBodyGrid">
          <Reveal delay={0.05}>
            <div className="detailCard">
              <div className="cardHeader">
                <span className="cardLabel">01 — DESCRIPTION DE L'ACTION</span>
              </div>
              <p className="detailOverviewText">{volunteer.desc}</p>
            </div>
          </Reveal>

          {volunteer.impact && (
            <Reveal delay={0.1}>
              <div className="detailCard">
                <div className="cardHeader">
                  <span className="cardLabel">02 — IMPACT COMMUNAUTAIRE</span>
                </div>
                <div className="volunteerImpactPill">
                  <span>✦</span>
                  <span>{volunteer.impact}</span>
                </div>
              </div>
            </Reveal>
          )}

          {tags.length > 0 && (
            <Reveal delay={0.12}>
              <div className="detailCard">
                <div className="cardHeader">
                  <span className="cardLabel">03 — DOMAINES D'ENGAGEMENT</span>
                </div>
                <div className="detailTagsCloud">
                  {tags.map((t) => (
                    <span key={t} className="skillTag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          <MediaGallery images={volunteer.images} videos={volunteer.videos} />
          <DetailActions />
        </div>
      </main>

      <footer className="footer">
        <div className="footerBrand">
          <strong>LINA EL BARROUK</strong>
          <span>Software Developer · AI · Cybersecurity</span>
        </div>
        <div className="footerNote">© 2026 Lina El Barrouk</div>
      </footer>
    </div>
  );
}

/* ================= JOURNEY DETAIL VIEW ================= */
function JourneyDetail({ item }) {
  return (
    <div className="journeyDetailPage">
      <header className="detailNav">
        <a className="brand" href="#/" aria-label="Back to home">
          <div className="brandDot"></div>
          <div className="brandName">
            LINA<span>EL BARROUK</span>
          </div>
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
              <span className="detailSubBadge">CURRICULUM ACADÉMIQUE</span>
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
                <span className="cardLabel">
                  01 — PRÉSENTATION &amp; CONTEXTE
                </span>
              </div>
              <p className="detailOverviewText">{item.overview}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="detailCard">
              <div className="cardHeader">
                <span className="cardLabel">
                  02 — PROGRAMME DES MODULES SEMESTRIELS
                </span>
                <span className="cardCount">
                  {item.semesters.reduce(
                    (acc, sem) => acc + sem.modules.length,
                    0,
                  )}{" "}
                  modules enseignés
                </span>
              </div>

              <div className="semestersGrid">
                {item.semesters.map((sem, sIdx) => (
                  <div key={sem.name || sIdx} className="semesterColumn">
                    <div className="semesterHeader">
                      <span style={{ fontSize: "16px" }}>📖</span>
                      <h3>{sem.name}</h3>
                    </div>
                    <ul className="semesterModulesList">
                      {sem.modules.map((mod, mIdx) => (
                        <li key={mod}>
                          <span className="moduleNumber">
                            {String(mIdx + 1).padStart(2, "0")}
                          </span>
                          <span>{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="detailDualRow">
            <Reveal delay={0.15}>
              <div className="detailCard" style={{ height: "100%" }}>
                <div className="cardHeader">
                  <span className="cardLabel">
                    03 — COMPÉTENCES &amp; OUTILS
                  </span>
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

            <Reveal delay={0.2}>
              <div className="detailCard" style={{ height: "100%" }}>
                <div className="cardHeader">
                  <span className="cardLabel">
                    04 — EXPÉRIENCES &amp; PROJETS
                  </span>
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
                <span className="cardLabel">
                  05 — OBJECTIFS &amp; PERSPECTIVES
                </span>
              </div>
              <p className="goalText">{item.goals}</p>
              <div className="goalActions">
                <a className="pill light" href="#/">
                  ← RETOUR AU PORTFOLIO
                </a>
                <a className="pill ghost" href="#work">
                  VOIR MES PROJETS ↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <footer className="footer">
        <div className="footerBrand">
          <strong>LINA EL BARROUK</strong>
          <span>Software Developer · AI · Cybersecurity</span>
        </div>
        <div className="footerNote">© 2026 Lina El Barrouk</div>
      </footer>
    </div>
  );
}

function JourneyNotFound() {
  return (
    <div className="journeyDetailPage">
      <header className="detailNav">
        <a className="brand" href="#/" aria-label="Back to home">
          <div className="brandDot"></div>
          <div className="brandName">
            LINA<span>EL BARROUK</span>
          </div>
        </a>
        <a className="backLink" href="#/">
          ← RETOUR AU PORTFOLIO
        </a>
      </header>
      <main
        className="detailContainer"
        style={{ textAlign: "center", padding: "100px 20px" }}
      >
        <h1
          style={{ fontFamily: "Syne", fontSize: "36px", marginBottom: "16px" }}
        >
          ÉTAPE INTROUVABLE
        </h1>
        <p style={{ color: "rgba(248, 245, 239, 0.7)", marginBottom: "30px" }}>
          La page demandée n'existe pas ou a été déplacée.
        </p>
        <a className="pill light" href="#/">
          ← RETOUR À L'ACCUEIL
        </a>
      </main>
      <footer className="footer">
        <div className="footerBrand">
          <strong>LINA EL BARROUK</strong>
          <span>Software Developer · AI · Cybersecurity</span>
        </div>
      </footer>
    </div>
  );
}

/* ================= ADMIN LISTS (one per tab) ================= */
const ADMIN_SECTIONS = {
  project: {
    endpoint: "projects",
    listTitle: "PROJETS",
    items: (c) => c.projects,
    keyOf: (it) => it.id || it.title,
    metaOf: (it) => [it.subtitle, it.period].filter(Boolean).join(" · "),
  },
  journey: {
    endpoint: "journey",
    listTitle: "ÉTAPES DE PARCOURS",
    items: (c) => c.journeyItems,
    keyOf: (it) => it.id || it.slug,
    metaOf: (it) => it.year,
  },
  community: {
    endpoint: "community",
    listTitle: "ACTIONS COMMUNAUTAIRES",
    items: (c) => c.community,
    keyOf: (it) => it.id || it.title,
    metaOf: (it) => [it.org, it.period].filter(Boolean).join(" · "),
  },
};

/* ================= ADMIN EDITION HELPERS ================= */
function splitList(value, separator) {
  return String(value || "")
    .split(separator)
    .map((v) => v.trim())
    .filter(Boolean);
}

/* Form values (strings) -> full API payload, merged onto the original item so
   fields the form does not cover (type, slug, id…) are preserved. */
function buildPayload(section, original, values) {
  if (section === "project") {
    return {
      ...original,
      title: values.title || "",
      subtitle: values.subtitle || "",
      desc: values.desc || "",
      tags: splitList(values.tags, ","),
      highlights: splitList(values.highlights, "\n"),
      images: splitList(values.images, "\n"),
      videos: splitList(values.videos, "\n"),
    };
  }
  if (section === "community") {
    return {
      ...original,
      period: values.period || "",
      title: values.title || "",
      subtitle: values.subtitle || "",
      org: values.org || "",
      desc: values.desc || "",
      impact: values.impact || "",
      tags: splitList(values.tags, ","),
      images: splitList(values.images, "\n"),
      videos: splitList(values.videos, "\n"),
    };
  }
  // journey: rebuild semesters from the flat modules textarea, keeping the
  // original semester names/grouping when the module count is unchanged.
  const lines = splitList(values.modules, "\n");
  const originalSemesters = Array.isArray(original.semesters)
    ? original.semesters
    : [];
  const counts = originalSemesters.map((s) => (s.modules || []).length);
  const total = counts.reduce((a, b) => a + b, 0);
  let semesters;
  if (originalSemesters.length && total === lines.length && total > 0) {
    let cursor = 0;
    semesters = originalSemesters.map((s, i) => {
      const group = lines.slice(cursor, cursor + counts[i]);
      cursor += counts[i];
      return { ...s, modules: group };
    });
  } else {
    semesters = [{ name: "Modules", modules: lines }];
  }
  return {
    ...original,
    year: values.year || "",
    title: values.title || "",
    desc: values.desc || "",
    institutionName: values.institutionName || "",
    institutionLink: values.institutionLink || "",
    overview: values.overview || "",
    goals: values.goals || "",
    skills: splitList(values.skills, ","),
    experiences: splitList(values.experiences, "\n"),
    semesters,
  };
}

/* Full item -> pre-filled form values (arrays flattened to strings). */
function itemToFormValues(section, item) {
  if (section === "project") {
    return {
      title: item.title || "",
      subtitle: item.subtitle || "",
      desc: item.desc || "",
      tags: (item.tags || []).join(", "),
      highlights: (item.highlights || []).join("\n"),
      images: (item.images || []).join("\n"),
      videos: (item.videos || []).join("\n"),
    };
  }
  if (section === "community") {
    return {
      period: item.period || "",
      title: item.title || "",
      subtitle: item.subtitle || "",
      org: item.org || "",
      desc: item.desc || "",
      impact: item.impact || "",
      tags: (item.tags || []).join(", "),
      images: (item.images || []).join("\n"),
      videos: (item.videos || []).join("\n"),
    };
  }
  return {
    year: item.year || "",
    title: item.title || "",
    desc: item.desc || "",
    institutionName: item.institutionName || "",
    institutionLink: item.institutionLink || "",
    overview: item.overview || "",
    modules: (item.semesters || [])
      .flatMap((s) => s.modules || [])
      .join("\n"),
    skills: (item.skills || []).join(", "),
    experiences: (item.experiences || []).join("\n"),
    goals: item.goals || "",
  };
}

/* ================= ADMIN PAGE ================= */
function AdminPage({ onContentChanged }) {
  const stored = sessionStorage.getItem(ADMIN_SESSION_KEY);
  const [token, setToken] = useState(stored || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const [section, setSection] = useState("project");
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState("");
  const [notice, setNotice] = useState("");
  const [editing, setEditing] = useState(null);
  const [content, setContent] = useState({
    projects: [],
    journeyItems: [],
    community: [],
  });

  const refresh = () => {
    fetchAdminContent().then((data) => {
      const d = data || {
        projects: [],
        journeyItems: [],
        community: [],
        overrides: {},
        deleted: {},
      };
      setContent({
        projects: mergeCollection(
          projects,
          d.projects,
          d.overrides.projects,
          d.deleted.projects,
          true,
        ),
        journeyItems: mergeCollection(
          journeyItems,
          d.journeyItems,
          d.overrides.journeyItems,
          d.deleted.journeyItems,
        ),
        community: mergeCollection(
          volunteerProjects,
          d.community,
          d.overrides.community,
          d.deleted.community,
          true,
        ),
      });
    });
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Connexion impossible.");
      sessionStorage.setItem(ADMIN_SESSION_KEY, data.token);
      setToken(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  const submit = async (endpoint, values, editId) => {
    setSending(true);
    setError("");
    setStatus("");
    try {
      const payload =
        editId && editing ? buildPayload(section, editing, values) : values;
      const res = await fetch(
        editId
          ? `${API_BASE}/${endpoint}/${encodeURIComponent(editId)}`
          : `${API_BASE}/${endpoint}`,
        {
          method: editId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Envoi impossible.");
      if (editId) {
        setNotice(`✏️ « ${payload.title} » a été modifié.`);
        setTimeout(() => setNotice(""), 4000);
        setEditing(null);
      } else {
        setStatus("✅ Contenu ajouté avec succès.");
      }
      refresh();
      if (onContentChanged) onContentChanged();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSending(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setToken("");
  };

  const startEdit = (item) => {
    setEditing(item);
    requestAnimationFrame(() => {
      document
        .querySelector(".adminForm")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const remove = async (key, title) => {
    const config = ADMIN_SECTIONS[section];
    setError("");
    setNotice("");
    setDeleting(key);
    try {
      const res = await fetch(
        `${API_BASE}/${config.endpoint}/${encodeURIComponent(key)}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Suppression impossible.");
      if (editing && config.keyOf(editing) === key) setEditing(null);
      setNotice(`🗑 « ${title} » a été supprimé.`);
      setTimeout(() => setNotice(""), 4000);
      refresh();
      if (onContentChanged) onContentChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting("");
    }
  };

  return (
    <div className="journeyDetailPage">
      <header className="detailNav">
        <a className="brand" href="#/" aria-label="Back to home">
          <div className="brandDot"></div>
          <div className="brandName">
            LINA<span>EL BARROUK</span>
          </div>
        </a>
        <div className="adminNavActions">
          {token && (
            <button className="pill ghost" onClick={logout}>
              DÉCONNEXION
            </button>
          )}
          <a className="backLink" href="#/">
            ← RETOUR AU PORTFOLIO
          </a>
        </div>
      </header>

      <main className="detailContainer adminContainer">
        <Reveal>
          <div className="detailHeroCard">
            <div className="detailMetaRow">
              <span className="detailBadge">ESPACE ADMIN</span>
              <span className="detailSubBadge">GESTION DE CONTENU</span>
            </div>
            <h1 className="detailMainTitle">ADMINISTRATION.</h1>
            <p className="detailSubtitle">
              Ajoutez des projets, des étapes de parcours et des actions
              communautaires. Ils apparaîtront à la suite du contenu existant.
            </p>
          </div>
        </Reveal>

        {!token ? (
          <Reveal delay={0.05}>
            <form className="adminCard" onSubmit={login}>
              <div className="cardHeader">
                <span className="cardLabel">CONNEXION ADMINISTRATEUR</span>
              </div>
              <div className="adminField">
                <label htmlFor="admin-username">Identifiant</label>
                <input
                  id="admin-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="adminField">
                <label htmlFor="admin-password">Mot de passe</label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              {error && <p className="adminError">{error}</p>}
              <button className="pill light adminSubmit" type="submit">
                SE CONNECTER <span>↗</span>
              </button>
            </form>
          </Reveal>
        ) : (
          <>
            <Reveal delay={0.05}>
              <div className="adminTabs">
                {[
                  ["project", "PROJET"],
                  ["journey", "PARCOURS"],
                  ["community", "COMMUNAUTÉ"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    className={`filterBtn ${section === key ? "active" : ""}`}
                    onClick={() => {
                      setSection(key);
                      setEditing(null);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Reveal>

            {error && <p className="adminError">{error}</p>}
            {notice && <p className="adminSuccess">{notice}</p>}

            {section === "project" && (
              <Reveal delay={0.1}>
                <AdminForm
                  key={editing ? `edit-${editing.id}` : "create"}
                  endpoint="projects"
                  title={
                    editing
                      ? `MODIFIER — ${editing.title}`
                      : "AJOUTER UN PROJET"
                  }
                  initial={
                    editing ? itemToFormValues("project", editing) : undefined
                  }
                  editId={editing?.id}
                  onCancel={() => setEditing(null)}
                  submit={submit}
                  sending={sending}
                  fields={[
                    { name: "title", label: "Titre *", required: true },
                    { name: "subtitle", label: "Sous-titre" },
                    { name: "desc", label: "Description *", textarea: true, required: true },
                    { name: "tags", label: "Tags (séparés par des virgules)" },
                    { name: "highlights", label: "Points forts (une ligne par point)", textarea: true },
                    { name: "images", label: "Photos (une URL par ligne)", textarea: true },
                    { name: "videos", label: "Vidéos (une URL par ligne : YouTube, Vimeo ou fichier)", textarea: true },
                  ]}
                />
              </Reveal>
            )}

            {section === "journey" && (
              <Reveal delay={0.1}>
                <AdminForm
                  key={editing ? `edit-${editing.id}` : "create"}
                  endpoint="journey"
                  title={
                    editing
                      ? `MODIFIER — ${editing.title}`
                      : "AJOUTER UNE ÉTAPE DE PARCOURS"
                  }
                  initial={
                    editing ? itemToFormValues("journey", editing) : undefined
                  }
                  editId={editing?.id}
                  onCancel={() => setEditing(null)}
                  submit={submit}
                  sending={sending}
                  fields={[
                    { name: "year", label: "Période (ex : 2026 — 2027) *", required: true },
                    { name: "title", label: "Titre *", required: true },
                    { name: "desc", label: "Description courte", textarea: true },
                    { name: "institutionName", label: "Établissement" },
                    { name: "institutionLink", label: "Lien de l'établissement" },
                    { name: "overview", label: "Présentation", textarea: true },
                    { name: "modules", label: "Modules (une ligne par module)", textarea: true },
                    { name: "skills", label: "Compétences (séparées par des virgules)" },
                    { name: "experiences", label: "Expériences (une ligne par expérience)", textarea: true },
                    { name: "goals", label: "Objectifs", textarea: true },
                  ]}
                />
              </Reveal>
            )}

            {section === "community" && (
              <Reveal delay={0.1}>
                <AdminForm
                  key={editing ? `edit-${editing.id}` : "create"}
                  endpoint="community"
                  title={
                    editing
                      ? `MODIFIER — ${editing.title}`
                      : "AJOUTER UNE ACTION COMMUNAUTAIRE"
                  }
                  initial={
                    editing ? itemToFormValues("community", editing) : undefined
                  }
                  editId={editing?.id}
                  onCancel={() => setEditing(null)}
                  submit={submit}
                  sending={sending}
                  fields={[
                    { name: "title", label: "Titre *", required: true },
                    { name: "subtitle", label: "Sous-titre" },
                    { name: "period", label: "Période (ex : SEP 2026 — NOV 2026)" },
                    { name: "org", label: "Organisation" },
                    { name: "desc", label: "Description *", textarea: true, required: true },
                    { name: "impact", label: "Impact" },
                    { name: "tags", label: "Tags (séparés par des virgules)" },
                    { name: "images", label: "Photos (une URL par ligne)", textarea: true },
                    { name: "videos", label: "Vidéos (une URL par ligne : YouTube, Vimeo ou fichier)", textarea: true },
                  ]}
                />
              </Reveal>
            )}

            <Reveal delay={0.15}>
              <AdminList
                key={section}
                config={ADMIN_SECTIONS[section]}
                items={ADMIN_SECTIONS[section].items(content)}
                deleting={deleting}
                editingId={
                  editing ? ADMIN_SECTIONS[section].keyOf(editing) : ""
                }
                onEdit={startEdit}
                onRemove={remove}
              />
            </Reveal>
          </>
        )}
      </main>

      <footer className="footer">
        <div className="footerBrand">
          <strong>LINA EL BARROUK</strong>
          <span>Software Developer · AI · Cybersecurity</span>
        </div>
        <div className="footerNote">© 2026 Lina El Barrouk</div>
      </footer>
    </div>
  );
}

function AdminForm({
  endpoint,
  title,
  fields,
  submit,
  sending,
  initial,
  editId,
  onCancel,
}) {
  const [values, setValues] = useState(initial || {});
  const [done, setDone] = useState("");
  const isEdit = Boolean(editId);

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await submit(endpoint, values, editId);
    if (ok && !isEdit) {
      setDone(title);
      setValues({});
      setTimeout(() => setDone(""), 4000);
    }
  };

  return (
    <form className="adminCard adminForm" onSubmit={handleSubmit}>
      <div className="cardHeader">
        <span className="cardLabel">{title}</span>
      </div>
      <div className="adminGrid">
        {fields.map((field) => (
          <div className="adminField" key={field.name}>
            <label htmlFor={`${endpoint}-${field.name}`}>{field.label}</label>
            {field.textarea ? (
              <textarea
                id={`${endpoint}-${field.name}`}
                rows={3}
                value={values[field.name] || ""}
                onChange={(e) => setField(field.name, e.target.value)}
                required={field.required}
              />
            ) : (
              <input
                id={`${endpoint}-${field.name}`}
                value={values[field.name] || ""}
                onChange={(e) => setField(field.name, e.target.value)}
                required={field.required}
              />
            )}
          </div>
        ))}
      </div>
      <div className="adminFormFoot">
        <button className="pill light adminSubmit" type="submit" disabled={sending}>
          {sending ? "ENVOI…" : isEdit ? "ENREGISTRER" : "AJOUTER"} <span>↗</span>
        </button>
        {isEdit && onCancel && (
          <button
            className="adminCancel"
            type="button"
            onClick={onCancel}
            disabled={sending}
          >
            ANNULER
          </button>
        )}
        {done && <span className="adminSuccess">✅ Contenu ajouté avec succès.</span>}
      </div>
    </form>
  );
}

function AdminList({ config, items, deleting, editingId, onEdit, onRemove }) {
  const [arming, setArming] = useState("");

  // Clic 1 = armer le bouton, clic 2 (sous 4s) = confirmer la suppression.
  const handleClick = (key, title) => {
    if (arming === key) {
      setArming("");
      onRemove(key, title);
    } else {
      setArming(key);
    }
  };

  return (
    <div className="adminCard adminListCard">
      <div className="cardHeader">
        <span className="cardLabel">
          {config.listTitle} ({items.length})
        </span>
      </div>
      {items.length === 0 ? (
        <p className="adminEmpty">
          Aucun contenu dans cette section pour le moment. Ajoutez-en via le
          formulaire ci-dessus : il apparaîtra ici et pourra être modifié ou
          supprimé.
        </p>
      ) : (
        <ul className="adminList">
          {items.map((item, i) => {
            const key = config.keyOf(item);
            const meta = config.metaOf(item);
            const armed = arming === key;
            return (
              <li
                className={`adminListItem${editingId === key ? " editing" : ""}`}
                key={key || i}
              >
                <div className="adminListInfo">
                  <strong>{item.title}</strong>
                  {meta && <span>{meta}</span>}
                </div>
                <div className="adminRowActions">
                  <button
                    type="button"
                    className="adminEdit"
                    disabled={deleting === key}
                    onClick={() => onEdit(item)}
                  >
                    {editingId === key ? "EN ÉDITION" : "MODIFIER"}
                  </button>
                  <button
                    type="button"
                    className={`adminDelete${armed ? " armed" : ""}`}
                    disabled={deleting === key}
                    onClick={() => handleClick(key, item.title)}
                  >
                    {deleting === key
                      ? "SUPPRESSION…"
                      : armed
                        ? "CONFIRMER ?"
                        : "SUPPRIMER"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function PortfolioRouter() {
  const [hash, setHash] = useState(window.location.hash);
  const [content, setContent] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchAdminContent().then((data) => {
      if (!cancelled) setContent(data);
    });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  useEffect(() => {
    const updateHash = () => {
      const next = window.location.hash;
      /* Les ancres de section (#work…) ne doivent pas remonter en haut :
         le défilement vers la cible est géré par <App scrollToId>. */
      if (!next || next.startsWith("#/")) window.scrollTo(0, 0);
      setHash(next);
    };

    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const sectionAnchor =
    hash && !hash.startsWith("#/") ? decodeURIComponent(hash.slice(1)) : null;

  if (hash.startsWith("#/admin")) {
    return <AdminPage onContentChanged={() => setReloadKey((k) => k + 1)} />;
  }

  const safeContent = content || {
    projects: [],
    journeyItems: [],
    community: [],
  };
  const ov = safeContent.overrides || {};
  const del = safeContent.deleted || {};

  const projectKey = hash.match(/^#\/project\/([^/]+)$/)?.[1];
  if (projectKey) {
    const found = mergeCollection(
      projects,
      safeContent.projects || [],
      ov.projects,
      del.projects,
      true,
    ).find((p) => p.id === projectKey);
    return found ? <ProjectDetail project={found} /> : <JourneyNotFound />;
  }

  const communityKey = hash.match(/^#\/community\/([^/]+)$/)?.[1];
  if (communityKey) {
    const found = mergeCollection(
      volunteerProjects,
      safeContent.community || [],
      ov.community,
      del.community,
      true,
    ).find((v) => v.id === communityKey);
    return found ? <CommunityDetail volunteer={found} /> : <JourneyNotFound />;
  }

  const journeySlug = hash.match(/^#\/journey\/([^/]+)$/)?.[1];

  if (!journeySlug) {
    return hash.startsWith("#/journey/") ? (
      <JourneyNotFound />
    ) : (
      <App content={content} scrollToId={sectionAnchor} />
    );
  }

  const allJourneyItems = mergeCollection(
    journeyItems,
    safeContent.journeyItems || [],
    ov.journeyItems,
    del.journeyItems,
  );
  const item = allJourneyItems.find(
    (journeyItem) => journeyItem.slug === journeySlug,
  );
  return item ? <JourneyDetail item={item} /> : <JourneyNotFound />;
}

createRoot(document.getElementById("root")).render(<PortfolioRouter />);
