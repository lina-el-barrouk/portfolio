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
          <div className="timeline">
            {[
              [
                "2025",
                "LICENCE — APPLICATION DEVELOPMENT",
                "Licence in Application Development at FST Tanger.",
              ],
              [
                "2025 → 2026",
                "WEB DEVELOPMENT",
                "Building web applications and exploring modern development technologies.",
              ],
              [
                "2026 →",
                "MASTER — INTELLIGENT SYSTEMS & CYBERSECURITY",
                "Exploring intelligent systems, cybersecurity and the technologies behind secure digital environments.",
              ],
            ].map(([year, title, desc], i) => (
              <Reveal key={year} delay={i * 0.08} className="timelineItem">
                <div className="timeYear">{year}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="work" className="work dark sectionPad">
          <div className="sectionMeta lightMeta">
            <span>02 — SELECTED WORK</span>
            <span>PROJECTS</span>
          </div>
          <Reveal>
            <h2>
              THINGS
              <br />
              I’VE <em>BUILT.</em>
            </h2>
          </Reveal>
          <p className="intro lightText">
            A selection of projects where development, problem-solving and
            curiosity meet.
          </p>
          <div className="projects">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} p={p} i={i} />
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
          <div className="twoCol">
            <Reveal>
              <h2>
                BEYOND
                <br />
                THE <em>CODE.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="bodyBlock">
              <p>
                <strong>Technology is also about people.</strong>
              </p>
              <p>
                Through volunteering and community projects, I’ve had the
                opportunity to work with others, organize activities and create
                meaningful experiences.
              </p>
              <div className="volunteerRow">
                <span>LYED F LYED</span>
                <small>Education · Community · Leadership</small>
              </div>
              <div className="volunteerRow">
                <span>COMMUNITY INITIATIVES</span>
                <small>Volunteering · Events · Social impact</small>
              </div>
              <div className="signature">
                I believe that what we build matters — but so does the impact we
                leave behind.
              </div>
            </Reveal>
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
    </>
  );
}

function ProjectCard({ p, i }) {
  return (
    <Reveal delay={i * 0.08}>
      <article className="project">
        <div className="projectTop">
          <span className="projectNumber">
            {String(i + 1).padStart(2, "0")}
          </span>

          <span className="projectCategory">{p.category}</span>
        </div>

        <div className="projectGrid">
          <div className="projectInfo">
            <h3>{p.title}</h3>

            <p className="projectSubtitle">{p.subtitle}</p>

            <p className="projectDescription">{p.description}</p>

            <div className="projectTags">
              {p.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <a
              href={p.link || "#"}
              className="projectLink"
              target="_blank"
              rel="noreferrer"
            >
              VIEW PROJECT <span>↗</span>
            </a>
          </div>

          <div className="projectVisual">
            <div className="projectMockup">
              <div className="mockupHeader">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="mockupContent">
                <span className="mockupNumber">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="mockupTitle">{p.title}</span>

                <span className="mockupLine"></span>
                <span className="mockupLine short"></span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

createRoot(document.getElementById("root")).render(<App />);
