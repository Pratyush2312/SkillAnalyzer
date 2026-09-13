import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Compass,
  Menu,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import logo from "../../assets/startum_logo.png";
const features = [
  [
    BarChart3,
    "01",
    "Skill analysis",
    "Turn your technical strengths and people skills into a clear, useful picture.",
  ],
  [
    Compass,
    "02",
    "Career recommendations",
    "Find career directions that make sense for where you are and where you want to go.",
  ],
  [
    Target,
    "03",
    "Skill gap analysis",
    "See exactly which abilities are worth building for the path you choose.",
  ],
  [
    BriefcaseBusiness,
    "04",
    "Job recommendations",
    "Explore relevant opportunities with your profile, interests, and goals in view.",
  ],
];
const steps = [
  [
    "01",
    "Create your profile",
    "Add your education, projects, interests, and experience.",
  ],
  [
    "02",
    "Analyze your skills",
    "Get a structured read on the capabilities you bring today.",
  ],
  [
    "03",
    "Discover career paths",
    "Compare directions that align with your strengths and ambitions.",
  ],
  [
    "04",
    "Plan your next step",
    "Turn insight into a practical plan for what comes next.",
  ],
];

function ProductPreview() {
  return (
    <div className="border border-[#cbd3db] bg-[#fdfcf8] p-3 shadow-[10px_10px_0_#1267e8] sm:p-4">
      <div className="border border-[#d8dde2] bg-white">
        <div className="flex items-center justify-between border-b border-[#d8dde2] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-full bg-[#122033] text-[10px] font-bold text-white">
              AS
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#64748b]">
                My direction
              </p>
              <p className="text-xs font-semibold text-[#122033]">
                Aarav Sharma
              </p>
            </div>
          </div>
          <span
            className="h-2.5 w-2.5 rounded-full bg-[#2fbe7d]"
            aria-label="Profile is active"
          />
        </div>
        <div className="grid gap-3 bg-[#f6f7f5] p-3 sm:grid-cols-[1.16fr_.84fr] sm:p-4">
          <article className="border border-[#d8dde2] bg-white p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#64748b]">
                  Career direction
                </p>
                <h3 className="mt-2 text-xl font-bold leading-tight tracking-[-0.045em] sm:text-2xl">
                  Product designer
                </h3>
              </div>
              <span className="grid size-8 place-items-center bg-[#e7f0ff] text-[#1267e8]">
                <Compass className="size-4" />
              </span>
            </div>
            <div className="mt-7">
              <div className="flex justify-between text-xs font-medium text-[#526174]">
                <span>Profile alignment</span>
                <span className="font-bold text-[#122033]">82%</span>
              </div>
              <div className="mt-2 h-2 bg-[#e4e8eb]">
                <div className="h-full w-[82%] bg-[#1267e8]" />
              </div>
            </div>
            <p className="mt-5 border-t border-[#e2e6e8] pt-4 text-xs leading-5 text-[#526174]">
              Your research, visual thinking, and collaborative strengths point
              here.
            </p>
          </article>
          <div className="grid gap-3">
            <article className="border border-[#d8dde2] bg-[#122033] p-4 text-white">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-300">
                  Skill score
                </p>
                <BarChart3 className="size-4 text-[#74a8ff]" />
              </div>
              <p className="mt-3 text-3xl font-bold tracking-[-0.06em]">
                7.8<span className="text-base text-slate-400">/10</span>
              </p>
              <p className="mt-1 text-xs text-slate-300">Strong foundation</p>
            </article>
            <article className="border border-[#d8dde2] bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#64748b]">
                Skill gaps
              </p>
              <p className="mt-2 text-sm font-bold">UX research · Figma</p>
              <p className="mt-1 text-xs leading-5 text-[#64748b]">
                Two focus areas to build next.
              </p>
            </article>
          </div>
          <article className="border border-[#d8dde2] bg-white p-4 sm:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#64748b]">
                Recommended next steps
              </p>
              <ArrowRight className="size-4 text-[#1267e8]" />
            </div>
            <ul className="mt-3 grid gap-2 text-xs font-medium text-[#334155] sm:grid-cols-3">
              {[
                "Document one case study",
                "Practise user interviews",
                "Review junior roles",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-[#1267e8]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fdfcf8] font-sans text-[#122033] selection:bg-[#1267e8] selection:text-white">
      <header className="border-b border-[#d8dde2] bg-[#fdfcf8]/95 backdrop-blur-sm">
        <nav
          className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-8"
          aria-label="Main navigation">
          <div className="w-35 h-35 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={logo}
              alt="Career recommendation logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="hidden items-center gap-7 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-[#526174] hover:text-[#1267e8]">
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#526174] hover:text-[#1267e8]">
              How it works
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-[#526174] hover:text-[#1267e8]">
              About
            </a>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <Link
              to="/login"
              className="text-sm font-semibold hover:text-[#1267e8]">
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-[#1267e8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0b53c5]">
              Get started
            </Link>
          </div>
          <button
            type="button"
            className="p-2 md:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t border-[#d8dde2] px-5 py-4 md:hidden">
            <div className="flex flex-col">
              <a
                onClick={closeMenu}
                href="#features"
                className="py-3 text-sm font-semibold">
                Features
              </a>
              <a
                onClick={closeMenu}
                href="#how-it-works"
                className="py-3 text-sm font-semibold">
                How it works
              </a>
              <a
                onClick={closeMenu}
                href="#about"
                className="py-3 text-sm font-semibold">
                About
              </a>
              <div className="mt-2 flex gap-3 border-t border-[#d8dde2] pt-4">
                <Link
                  onClick={closeMenu}
                  to="/login"
                  className="flex-1 border border-[#122033] px-4 py-2.5 text-center text-sm font-semibold">
                  Log in
                </Link>
                <Link
                  onClick={closeMenu}
                  to="/register"
                  className="flex-1 bg-[#1267e8] px-4 py-2.5 text-center text-sm font-semibold text-white">
                  Get started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      <main>
        <section className="border-b border-[#d8dde2]">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.93fr_1.07fr] lg:items-center lg:gap-16 lg:py-24">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1267e8]">
                <span className="size-2 bg-[#1267e8]" />
                Career clarity for students
              </p>
              <h1 className="mt-6 max-w-[630px] text-[clamp(3.15rem,6.5vw,5.75rem)] font-bold leading-[.92] tracking-[-0.075em]">
                Choose a direction
                <br />
                <em className="font-serif font-normal text-[#1267e8]">
                  you can grow into.
                </em>
              </h1>
              <p className="mt-7 max-w-[525px] text-lg leading-8 text-[#526174]">
                Startum connects what you know, what you enjoy, and what the
                working world needs—so you can make your next career move with
                intention.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 bg-[#1267e8] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#0b53c5]">
                  Get started <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 border border-[#aeb8c2] px-5 py-3.5 text-sm font-bold hover:border-[#122033] hover:bg-white">
                  Explore how it works <ArrowDownRight className="size-4" />
                </a>
              </div>
              <p className="mt-9 border-t border-startum-line pt-4 text-sm text-[#64748b]">
                <span className="font-semibold text-startum-ink">
                  Start with the signal you already have.
                </span>{" "}
                Skills, interests, coursework, and projects.
              </p>
            </div>
            <ProductPreview />
          </div>
        </section>
        <section
          id="about"
          className="border-b border-[#d8dde2] bg-[#122033] text-white">
          <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#74a8ff]">
              The problem
            </p>
            <div>
              <h2 className="max-w-3xl text-3xl font-bold leading-[1.04] tracking-[-0.055em] sm:text-5xl">
                Knowing your strengths is one thing. Knowing where they lead is
                another.
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                Students are often asked to choose a path before they can see
                how their skills, interests, and real opportunities fit
                together. Startum makes that connection visible.
              </p>
            </div>
          </div>
        </section>
        <section id="features" className="border-b border-[#d8dde2]">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
            <div className="grid gap-8 md:grid-cols-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1267e8]">
                What Startum does
              </p>
              <h2 className="max-w-xl text-3xl font-bold leading-[1.02] tracking-[-0.055em] sm:text-5xl">
                A more grounded way to map your future.
              </h2>
            </div>
            <div className="mt-14 grid border-l border-t border-[#d8dde2] sm:grid-cols-2 lg:grid-cols-4">
              {features.map(([Icon, index, title, copy]) => (
                <article
                  key={title}
                  className="min-h-64 border-b border-r border-[#d8dde2] p-6 hover:bg-[#f2f6ff] sm:p-7">
                  <div className="flex items-start justify-between">
                    <Icon className="size-5 text-[#1267e8]" />
                    <span className="text-xs font-bold text-[#94a3b8]">
                      {index}
                    </span>
                  </div>
                  <h3 className="mt-16 text-xl font-bold tracking-[-0.04em]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#526174]">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="how-it-works"
          className="border-b border-[#d8dde2] bg-[#f3f5f3]">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1267e8]">
                  How it works
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.055em] sm:text-5xl">
                  Four moves. One clearer path.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#526174]">
                A simple process for turning self-knowledge into a useful
                direction.
              </p>
            </div>
            <ol className="mt-14 grid border-l border-t border-[#cbd3db] md:grid-cols-2 lg:grid-cols-4">
              {steps.map(([number, title, copy]) => (
                <li
                  key={number}
                  className="border-b border-r border-[#cbd3db] p-6 sm:p-7">
                  <span className="text-sm font-bold text-[#1267e8]">
                    {number}
                  </span>
                  <h3 className="mt-11 text-xl font-bold tracking-[-0.04em]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#526174]">
                    {copy}
                  </p>
                  <ChevronRight className="mt-8 size-5 text-[#1267e8]" />
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section>
          <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:py-24">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1267e8]">
                <Sparkles className="size-3.5" />
                Make your next move count
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-[.98] tracking-[-0.065em] sm:text-6xl">
                Your career direction is waiting to take shape.
              </h2>
            </div>
            <div>
              <p className="mb-6 text-base leading-7 text-[#526174]">
                Build your profile, see what fits, and leave with a plan that
                feels like yours.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-[#1267e8] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#0b53c5]">
                Start exploring <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#d8dde2]">
        <div className="mx-auto flex max-w-310 flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mt-3 text-sm text-[#64748b]">
              A clearer starting point for student careers.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#526174]">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <Link to="/login">Log in</Link>
            <Link to="/register">Get started</Link>
          </div>
          <p className="text-sm text-[#64748b]">
            © {new Date().getFullYear()} Startum
          </p>
        </div>
      </footer>
    </div>
  );
}
