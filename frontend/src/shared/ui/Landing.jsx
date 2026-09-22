import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Compass,
  Menu,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from 'velmora';
import logo from "../../assets/raahvi_logo.png";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: "01",
    icon: BarChart3,
    title: "Skill intelligence",
    description:
      "Turn your projects, assessments, courses and experience into one structured picture of what you can actually do.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Career direction",
    description:
      "Explore career paths through the lens of your current capabilities, interests and evolving goals.",
  },
  {
    number: "03",
    icon: Target,
    title: "Skill gap analysis",
    description:
      "See the distance between your current capabilities and the skills required for the path you want.",
  },
  {
    number: "04",
    icon: BriefcaseBusiness,
    title: "Opportunity mapping",
    description:
      "Connect your evolving skill profile with roles, learning paths and opportunities worth exploring.",
  },
];

const steps = [
  {
    number: "01",
    title: "Build your signal",
    description:
      "Bring together your education, projects, interests, skills and experience.",
  },
  {
    number: "02",
    title: "Understand yourself",
    description:
      "RAAHVI turns scattered information into a living picture of your capabilities.",
  },
  {
    number: "03",
    title: "See the distance",
    description:
      "Compare your current profile against the skills different career paths demand.",
  },
  {
    number: "04",
    title: "Move with intent",
    description:
      "Use personalized recommendations and learning paths to decide what comes next.",
  },
];

const skills = [
  "React",
  "Python",
  "JavaScript",
  "Machine Learning",
  "Node.js",
  "Data Structures",
  "MongoDB",
  "UI / UX",
  "Cloud",
  "SQL",
  "Git",
  "Problem Solving",
];

function DashboardPreview() {
  const [active, setActive] = useState("skills");

  const panels = {
    skills: {
      title: "Your skill signal",
      value: "08",
      label: "capabilities mapped",
    },
    careers: {
      title: "Career direction",
      value: "82%",
      label: "strongest model signal",
    },
    gaps: {
      title: "Skill gaps",
      value: "02",
      label: "priority areas",
    },
    jobs: {
      title: "Opportunities",
      value: "24",
      label: "relevant roles",
    },
  };

  const panel = panels[active];

  return (
    <div className="hero-preview relative">
      <div className="absolute -inset-5 hidden border border-[var(--border-dark)] opacity-40 sm:block" />

      <div className="relative overflow-hidden border border-[var(--border-dark)] bg-[var(--surface-secondary)] shadow-[var(--shadow-soft)]">
        {/* Browser bar */}
        <div className="flex h-11 items-center justify-between border-b border-[var(--border-dark)] px-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--color-muted)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--color-muted)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--color-rose)]" />
          </div>

          <span className="text-[9px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
            raahvi / intelligence
          </span>

          <div className="w-10" />
        </div>

        <div className="grid min-h-[430px] grid-cols-[68px_1fr]">
          {/* Sidebar */}
          <aside className="border-r border-[var(--border-dark)] p-3">
            <div className="flex h-8 items-center justify-center border border-[var(--border-dark)]">
              <span className="text-[9px] font-bold text-[var(--color-rose)]">
                R
              </span>
            </div>

            <div className="mt-8 space-y-3">
              {[
                ["skills", BarChart3],
                ["careers", Compass],
                ["gaps", Target],
                ["jobs", BriefcaseBusiness],
              ].map(([id, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  className={`flex h-9 w-full items-center justify-center transition-all duration-300 ${
                    active === id
                      ? "bg-[var(--color-rose)] text-[var(--text-dark)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}>
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </aside>

          {/* Dashboard */}
          <main className="p-5 sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {panel.title}
                </p>

                <h3 className="mt-2 text-xl font-medium tracking-[-0.04em] text-[var(--text-primary)] sm:text-2xl">
                  Good morning, Aarav.
                </h3>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-rose)] text-[9px] font-bold text-[var(--text-dark)]">
                AS
              </div>
            </div>

            {/* Main card */}
            <div className="mt-6 grid gap-3 sm:grid-cols-[1.25fr_.75fr]">
              <div className="border border-[var(--border-dark)] bg-[var(--surface-primary)] p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Strongest direction
                    </p>

                    <h4 className="mt-2 text-lg font-medium text-[var(--text-primary)]">
                      Full Stack Developer
                    </h4>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="text-[var(--color-rose)]"
                  />
                </div>

                <div className="mt-8">
                  <div className="flex justify-between text-[9px] uppercase tracking-[0.12em]">
                    <span className="text-[var(--text-muted)]">
                      Model signal
                    </span>

                    <span className="text-[var(--color-rose)]">82%</span>
                  </div>

                  <div className="mt-2 h-[3px] bg-[var(--color-charcoal)]">
                    <div className="hero-progress h-full w-[82%] bg-[var(--color-rose)]" />
                  </div>
                </div>
              </div>

              <div className="border border-[var(--border-dark)] bg-[var(--color-rose)] p-5 text-[var(--text-dark)]">
                <p className="text-[8px] uppercase tracking-[0.18em] opacity-70">
                  {panel.label}
                </p>

                <p className="hero-number mt-4 text-4xl font-light tracking-[-0.06em]">
                  {panel.value}
                </p>

                <p className="mt-1 text-[10px] opacity-70">
                  live profile signal
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[
                ["React", "72", true],
                ["Node.js", "70", true],
                ["HTML", "00", false],
              ].map(([name, score, ready]) => (
                <div
                  key={name}
                  className="border border-[var(--border-dark)] bg-[var(--surface-primary)] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-[var(--text-secondary)]">
                      {name}
                    </span>

                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        ready
                          ? "bg-[var(--color-success)]"
                          : "bg-[var(--color-danger)]"
                      }`}
                    />
                  </div>

                  <p className="mt-4 text-xl font-light text-[var(--text-primary)]">
                    {score}
                  </p>

                  <div className="mt-2 h-px bg-[var(--color-charcoal)]">
                    <div
                      className="hero-skill-bar h-full bg-[var(--color-rose)]"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-[var(--border-dark)] pt-4">
              <span className="text-[8px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Next recommended action
              </span>

              <span className="flex items-center gap-2 text-[9px] text-[var(--text-secondary)]">
                Strengthen HTML fundamentals
                <ArrowRight size={11} />
              </span>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}



function FeatureCard({ feature }) {
  const Icon = feature.icon;
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMove = (event) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const card = cardRef.current;
    const glow = glowRef.current;

    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();

    gsap.to(glow, {
      x: event.clientX - rect.left - 100,
      y: event.clientY - rect.top - 100,
      opacity: 0.16,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.5,
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="feature-card group relative min-h-[360px] overflow-hidden border-b border-r border-[var(--border-dark)] p-7 transition-colors duration-500 hover:bg-[var(--surface-secondary)] sm:p-9">
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 h-[200px] w-[200px] rounded-full bg-[var(--color-rose)] opacity-0 blur-3xl"
      />

      <div className="relative flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center border border-[var(--border-dark)] text-[var(--color-rose)] transition-all duration-500 group-hover:border-[var(--color-rose)] group-hover:bg-[var(--color-rose)] group-hover:text-[var(--text-dark)]">
          <Icon size={17} />
        </div>

        <span className="font-mono text-[10px] text-[var(--text-muted)]">
          {feature.number}
        </span>
      </div>

      <div className="relative mt-24">
        <h3 className="text-2xl font-medium tracking-[-0.04em] text-[var(--text-primary)]">
          {feature.title}
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--text-muted)]">
          {feature.description}
        </p>
      </div>

      <ArrowUpRight
        size={17}
        className="absolute bottom-8 right-8 text-[var(--text-muted)] transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--color-rose)]"
      />
    </article>
  );
}

export default function Landing() {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [
            ".hero-eyebrow",
            ".hero-line",
            ".hero-copy",
            ".hero-actions",
            ".hero-preview",
            ".hero-scroll",
            ".gsap-reveal",
            ".feature-card",
            ".process-row",
            ".final-cta",
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
          },
        );

        return;
      }

      /* --------------------------------
         HERO INTRO
      -------------------------------- */

      const hero = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      hero
        .from(".hero-eyebrow", {
          y: 30,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          ".hero-line",
          {
            yPercent: 115,
            opacity: 0,
            duration: 1.15,
            stagger: 0.12,
          },
          "-=0.45",
        )
        .from(
          ".hero-copy",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.55",
        )
        .from(
          ".hero-actions",
          {
            y: 25,
            opacity: 0,
            duration: 0.75,
          },
          "-=0.45",
        )
        .from(
          ".hero-preview",
          {
            y: 90,
            opacity: 0,
            scale: 0.92,
            rotateY: -10,
            duration: 1.3,
            ease: "power4.out",
          },
          "-=0.85",
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            y: -15,
            duration: 0.6,
          },
          "-=0.4",
        );

      /* --------------------------------
         HERO PARALLAX
      -------------------------------- */

      const heroSection = root.querySelector(".hero-section");

      if (heroSection) {
        heroSection.addEventListener("mousemove", (event) => {
          const bounds = heroSection.getBoundingClientRect();

          const x =
            (event.clientX - bounds.left - bounds.width / 2) / bounds.width;

          const y =
            (event.clientY - bounds.top - bounds.height / 2) / bounds.height;

          gsap.to(".hero-parallax", {
            x: x * 18,
            y: y * 12,
            duration: 1.2,
            ease: "power3.out",
            overwrite: "auto",
          });

          gsap.to(".hero-preview", {
            x: x * -10,
            y: y * -7,
            rotateY: x * 3,
            rotateX: y * -2,
            duration: 1.4,
            ease: "power3.out",
            overwrite: "auto",
          });
        });

        heroSection.addEventListener("mouseleave", () => {
          gsap.to(".hero-parallax", {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          });

          gsap.to(".hero-preview", {
            x: 0,
            y: 0,
            rotateY: 0,
            rotateX: 0,
            duration: 1.2,
            ease: "power3.out",
          });
        });
      }

      /* --------------------------------
         HERO PROGRESS BARS
      -------------------------------- */

      gsap.from(".hero-progress", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        delay: 1.6,
        ease: "power4.out",
      });

      gsap.from(".hero-skill-bar", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        delay: 1.8,
        stagger: 0.12,
        ease: "power4.out",
      });

      /* --------------------------------
         SCROLL REVEALS
      -------------------------------- */

      gsap.utils.toArray(".gsap-reveal").forEach((element) => {
        gsap.from(element, {
          y: 70,
          opacity: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            once: true,
          },
        });
      });

      /* --------------------------------
         FEATURES
      -------------------------------- */

      gsap.from(".feature-card", {
        y: 80,
        opacity: 0,
        stagger: 0.13,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "#features",
          start: "top 72%",
          once: true,
        },
      });

      /* --------------------------------
         PROCESS
      -------------------------------- */

      gsap.from(".process-row", {
        x: -50,
        opacity: 0,
        stagger: 0.16,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "#how-it-works",
          start: "top 70%",
          once: true,
        },
      });

      /* --------------------------------
         MARQUEE
      -------------------------------- */

      gsap.to(".raahvi-marquee", {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      /* --------------------------------
         FINAL CTA
      -------------------------------- */

      gsap.from(".final-cta", {
        y: 100,
        opacity: 0,
        scale: 0.96,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".final-cta",
          start: "top 78%",
          once: true,
        },
      });

      /* --------------------------------
         CTA ORBIT
      -------------------------------- */

      gsap.to(".cta-orbit-outer", {
        rotation: 360,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".cta-orbit-inner", {
        rotation: -360,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen overflow-x-hidden bg-[var(--surface-primary)] font-sans text-[var(--text-primary)] selection:bg-[var(--color-rose)] selection:text-[var(--text-dark)]">
      {/* NAVBAR */}

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border-dark)] bg-[var(--surface-primary)]/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" onClick={() => setMenuOpen(false)} className="group">
            <img
              src={logo}
              alt="RAAHVI"
              className="h-11 w-28 object-contain object-left transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {[
              ["Features", "#features"],
              ["Approach", "#approach"],
              ["Process", "#how-it-works"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="group relative py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]">
                {label}

                <span className="absolute bottom-0 left-0 h-px w-0 bg-[var(--color-rose)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <Link
              to="/login"
              className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
              Log in
            </Link>

            <MagneticButton>
              <Link
                to="/register"
                className="group flex items-center gap-3 bg-[var(--color-rose)] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-dark)] transition-colors hover:bg-[var(--text-primary)]">
                Start exploring
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center border border-[var(--border-dark)] text-[var(--text-primary)] md:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-[var(--border-dark)] bg-[var(--surface-primary)] px-5 py-6 md:hidden">
            {[
              ["Features", "#features"],
              ["Approach", "#approach"],
              ["Process", "#how-it-works"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-[var(--border-dark)] py-5 text-sm uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                {label}
                <ArrowUpRight size={15} />
              </a>
            ))}

            <div className="flex gap-3 pt-6">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex flex-1 items-center justify-center border border-[var(--border-dark)] py-3 text-xs uppercase tracking-[0.14em]">
                Log in
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex flex-1 items-center justify-center bg-[var(--color-rose)] py-3 text-xs uppercase tracking-[0.14em] text-[var(--text-dark)]">
                Start
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO */}

        <section className="hero-section relative flex min-h-screen items-center overflow-hidden border-b border-[var(--border-dark)] pt-[76px]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage: `
                linear-gradient(var(--text-primary) 1px, transparent 1px),
                linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />

          <div className="hero-parallax pointer-events-none absolute -bottom-20 right-[-4%] select-none text-[27vw] font-medium leading-none tracking-[-0.1em] text-[var(--surface-secondary)]">
            R
          </div>

          <div className="mx-auto grid w-full max-w-[1500px] gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-12 lg:py-24">
            <div className="relative z-10">
              <div className="hero-eyebrow flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--color-rose)]" />

                <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-rose)]">
                  Skill intelligence platform
                </span>
              </div>

              <h1 className="mt-7 max-w-5xl text-[clamp(3.6rem,8vw,8.5rem)] font-medium leading-[0.84] tracking-[-0.075em]">
                <span className="block overflow-hidden">
                  <span className="hero-line block">Know your</span>
                </span>

                <span className="block overflow-hidden">
                  <span className="hero-line block text-[var(--color-rose)]">
                    potential.
                  </span>
                </span>

                <span className="block overflow-hidden">
                  <span className="hero-line block">
                    Shape what&apos;s next.
                  </span>
                </span>
              </h1>

              <p className="hero-copy mt-9 max-w-xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                RAAHVI brings your skills, experience, interests and
                opportunities into one evolving intelligence layer—so your next
                career decision starts with evidence, not guesswork.
              </p>

              <div className="hero-actions mt-9 flex flex-col gap-3 sm:flex-row">
                <MagneticButton>
                  <Link
                    to="/register"
                    className="group flex items-center justify-center gap-4 bg-[var(--color-rose)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-dark)] transition-colors hover:bg-[var(--text-primary)]">
                    Discover your signal
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--text-dark)] text-[var(--color-rose)] transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight size={12} />
                    </span>
                  </Link>
                </MagneticButton>

                <a
                  href="#approach"
                  className="group flex items-center justify-center gap-3 border border-[var(--border-dark)] px-6 py-4 text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)] transition-all hover:border-[var(--color-rose)] hover:text-[var(--text-primary)]">
                  See how it works
                  <ArrowDown
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-y-1"
                  />
                </a>
              </div>
            </div>

            <DashboardPreview />
          </div>

          <a
            href="#approach"
            className="hero-scroll absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[8px] uppercase tracking-[0.3em] text-[var(--text-muted)] md:flex">
            <span>Scroll</span>

            <span className="h-12 w-px bg-gradient-to-b from-[var(--color-rose)] to-transparent" />
          </a>
        </section>

        {/* MARQUEE */}

        <section className="overflow-hidden border-b border-[var(--border-dark)] py-5">
          <div className="raahvi-marquee flex w-max gap-8 whitespace-nowrap">
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={`${skill}-${index}`}
                className="flex items-center gap-8">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {skill}
                </span>

                <span className="h-1 w-1 rounded-full bg-[var(--color-rose)]" />
              </div>
            ))}
          </div>
        </section>

        {/* APPROACH */}

        <section id="approach" className="border-b border-[var(--border-dark)]">
          <div className="mx-auto grid max-w-[1500px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[0.65fr_1.35fr] lg:px-12 lg:py-32">
            <div className="gsap-reveal">
              <div className="sticky top-32">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--color-rose)]" />

                  <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-rose)]">
                    The idea
                  </span>
                </div>

                <h2 className="mt-6 max-w-sm text-4xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-5xl">
                  Your career is not a single decision.
                </h2>
              </div>
            </div>

            <div className="gsap-reveal">
              <p className="max-w-3xl text-2xl font-light leading-[1.35] tracking-[-0.025em] text-[var(--text-secondary)] sm:text-4xl">
                It&apos;s a moving relationship between what you know, what
                you&apos;re learning, what the world needs, and what you want to
                become.
              </p>

              <p className="mt-10 max-w-2xl text-sm leading-8 text-[var(--text-muted)]">
                RAAHVI is designed around that relationship. Instead of treating
                your profile as a static form, it builds a richer skill signal
                from multiple forms of evidence and turns that signal into
                practical next steps.
              </p>

              <div className="mt-14 grid border-l border-t border-[var(--border-dark)] sm:grid-cols-2">
                {[
                  [
                    "01",
                    "Evidence",
                    "Projects, assessments, courses and experience.",
                  ],
                  [
                    "02",
                    "Intelligence",
                    "A structured view of your evolving capabilities.",
                  ],
                  [
                    "03",
                    "Context",
                    "Career requirements and changing skill demand.",
                  ],
                  ["04", "Action", "Gaps, learning paths and opportunities."],
                ].map(([number, title, description]) => (
                  <div
                    key={number}
                    className="gsap-reveal border-b border-r border-[var(--border-dark)] p-6 transition-colors hover:bg-[var(--surface-secondary)] sm:p-8">
                    <span className="font-mono text-[10px] text-[var(--color-rose)]">
                      {number}
                    </span>

                    <h3 className="mt-12 text-xl font-medium tracking-[-0.03em]">
                      {title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}

        <section id="features" className="border-b border-[var(--border-dark)]">
          <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
            <div className="gsap-reveal grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--color-rose)]" />

                  <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-rose)]">
                    Intelligence layer
                  </span>
                </div>
              </div>

              <h2 className="max-w-4xl text-4xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl">
                From scattered signals to a clearer direction.
              </h2>
            </div>

            <div className="mt-16 grid border-l border-t border-[var(--border-dark)] sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <FeatureCard key={feature.number} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}

        <section
          id="how-it-works"
          className="border-b border-[var(--border-dark)] bg-[var(--surface-secondary)]">
          <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
            <div className="gsap-reveal flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--color-rose)]" />

                  <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-rose)]">
                    The process
                  </span>
                </div>

                <h2 className="mt-6 max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl">
                  Four moves.
                  <br />
                  <span className="text-[var(--color-rose)]">
                    One evolving profile.
                  </span>
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-7 text-[var(--text-muted)]">
                Start with what you have. RAAHVI helps you understand what it
                means—and what to do with it.
              </p>
            </div>

            <div className="mt-16">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="process-row group grid gap-6 border-t border-[var(--border-dark)] py-8 transition-colors hover:bg-[var(--surface-primary)] sm:grid-cols-[80px_0.8fr_1.2fr_auto] sm:items-center sm:gap-8 sm:px-5">
                  <span className="font-mono text-xs text-[var(--color-rose)]">
                    {step.number}
                  </span>

                  <h3 className="text-2xl font-medium tracking-[-0.04em]">
                    {step.title}
                  </h3>

                  <p className="max-w-lg text-sm leading-7 text-[var(--text-muted)]">
                    {step.description}
                  </p>

                  <ArrowUpRight
                    size={18}
                    className="text-[var(--text-muted)] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--color-rose)]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}

        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="cta-orbit-outer h-[520px] w-[520px] rounded-full border border-[var(--border-dark)]" />

            <div className="cta-orbit-inner absolute h-[350px] w-[350px] rounded-full border border-[var(--border-dark)]" />

            <div className="absolute h-[180px] w-[180px] rounded-full border border-[var(--color-rose)] opacity-20" />
          </div>

          <div className="final-cta relative mx-auto max-w-[1500px] px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <Sparkles size={14} className="text-[var(--color-rose)]" />

                <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-rose)]">
                  Start with yourself
                </span>

                <Sparkles size={14} className="text-[var(--color-rose)]" />
              </div>

              <h2 className="mx-auto mt-7 max-w-5xl text-[clamp(3.2rem,7vw,7rem)] font-medium leading-[0.86] tracking-[-0.075em]">
                Your next chapter
                <span className="text-[var(--color-rose)]"> starts here.</span>
              </h2>

              <p className="mx-auto mt-8 max-w-lg text-sm leading-7 text-[var(--text-muted)]">
                Build your profile. Understand your signal. Find the gaps.
                Decide what comes next.
              </p>

              <div className="mt-9 flex justify-center">
                <MagneticButton>
                  <Link
                    to="/register"
                    className="group flex items-center gap-4 bg-[var(--color-rose)] px-7 py-4 text-xs font-semibold uppercase tracking-[0.17em] text-[var(--text-dark)] transition-all hover:bg-[var(--text-primary)]">
                    Create your profile
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--text-dark)] text-[var(--color-rose)] transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight size={13} />
                    </span>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}

      <footer className="border-t border-[var(--border-dark)]">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 px-5 py-10 sm:px-8 lg:px-12 md:flex-row md:items-end md:justify-between">
          <div>
            <img
              src={logo}
              alt="RAAHVI"
              className="h-9 w-24 object-contain object-left"
            />

            <p className="mt-3 max-w-xs text-xs leading-5 text-[var(--text-muted)]">
              A skill intelligence platform for making career direction more
              visible.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-3 text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            <a
              href="#features"
              className="transition-colors hover:text-[var(--text-primary)]">
              Features
            </a>

            <a
              href="#approach"
              className="transition-colors hover:text-[var(--text-primary)]">
              Approach
            </a>

            <a
              href="#how-it-works"
              className="transition-colors hover:text-[var(--text-primary)]">
              Process
            </a>

            <Link
              to="/login"
              className="transition-colors hover:text-[var(--text-primary)]">
              Login
            </Link>
          </div>

          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
            © {new Date().getFullYear()} RAAHVI
          </p>
        </div>
      </footer>
    </div>
  );
}
