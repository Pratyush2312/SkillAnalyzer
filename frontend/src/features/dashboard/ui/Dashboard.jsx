import { useContext } from "react";
import { useNavigate } from "react-router";
import {
  ArrowUpRight,
  Brain,
  BriefcaseBusiness,
  ChevronRight,
  CircleUserRound,
  Compass,
  GraduationCap,
  Radar,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { CareerContext } from "../../../context/MyCareer";

const getInitials = (name = "") => {
  return (
    name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U"
  );
};

const getSkillStatus = (proficiency = 0) => {
  if (proficiency >= 70) return "Strong";
  if (proficiency >= 40) return "Developing";
  return "Needs work";
};

const getSkillStatusClass = (proficiency = 0) => {
  if (proficiency >= 70) {
    return "bg-[rgba(127,175,138,0.12)] text-[var(--color-success)]";
  }

  if (proficiency >= 40) {
    return "bg-[rgba(197,164,109,0.12)] text-[var(--color-warning)]";
  }

  return "bg-[rgba(184,120,120,0.12)] text-[var(--color-danger)]";
};

const ActionCard = ({ icon: Icon, title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group w-full border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-rose)]">
      <div className="mb-8 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center border border-[var(--border-dark)] bg-[var(--surface-primary)]">
          <Icon size={18} className="text-[var(--color-rose)]" />
        </div>

        <ArrowUpRight
          size={18}
          className="text-[var(--text-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--color-rose)]"
        />
      </div>

      <h3 className="text-lg font-medium text-[var(--text-primary)]">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--text-muted)]">
        {description}
      </p>
    </button>
  );
};

const StatCard = ({ label, value, description }) => {
  return (
    <div className="border-l border-[var(--border-dark)] pl-5">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
        {label}
      </p>

      <p className="mt-2 text-3xl font-medium tracking-tight text-[var(--text-primary)]">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs text-[var(--text-muted)]">{description}</p>
      )}
    </div>
  );
};

const SkillRow = ({ skill }) => {
  const proficiency = Math.round(skill.proficiency || 0);

  return (
    <div className="group border-b border-[var(--border-dark)] py-4 last:border-b-0">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[var(--text-primary)]">
            {skill.name}
          </p>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            {skill.evidenceCount || 0} evidence{" "}
            {skill.evidenceCount === 1 ? "source" : "sources"}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span
            className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] ${getSkillStatusClass(
              proficiency,
            )}`}>
            {getSkillStatus(proficiency)}
          </span>

          <span className="w-10 text-right text-sm font-medium text-[var(--color-rose)]">
            {proficiency}
          </span>
        </div>
      </div>

      <div className="mt-3 h-1 overflow-hidden bg-[var(--color-charcoal)]">
        <div
          className="h-full bg-[var(--color-rose)] transition-all duration-700"
          style={{
            width: `${Math.min(proficiency, 100)}%`,
          }}
        />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  const { student, skillIntelligence, loading, skillLoading } =
    useContext(CareerContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface-primary)] px-6 py-12 text-[var(--text-primary)]">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-4 w-32 bg-[var(--color-charcoal)]" />
          <div className="mt-6 h-14 w-2/3 bg-[var(--color-charcoal)]" />
          <div className="mt-4 h-5 w-1/2 bg-[var(--color-charcoal)]" />

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <div className="h-32 bg-[var(--color-charcoal)]" />
            <div className="h-32 bg-[var(--color-charcoal)]" />
            <div className="h-32 bg-[var(--color-charcoal)]" />
          </div>
        </div>
      </div>
    );
  }

  const name = student?.name || "there";

  const summary = skillIntelligence?.summary || {};

  const skills = Array.isArray(skillIntelligence?.skills)
    ? skillIntelligence.skills
    : [];

  const sortedSkills = [...skills]
    .sort((a, b) => (b.proficiency || 0) - (a.proficiency || 0))
    .slice(0, 5);

  const totalSkills = summary.totalSkills ?? skills.length ?? 0;

  const strongSkills =
    summary.strongSkills ??
    skills.filter((skill) => (skill.proficiency || 0) >= 70).length;

  const developingSkills =
    summary.developingSkills ??
    skills.filter(
      (skill) =>
        (skill.proficiency || 0) >= 40 && (skill.proficiency || 0) < 70,
    ).length;

  const weakSkills =
    summary.weakSkills ??
    skills.filter((skill) => (skill.proficiency || 0) < 40).length;

  return (
    <main className="min-h-screen bg-[var(--surface-primary)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {/* Header */}
        <section className="border-b border-[var(--border-dark)] pb-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-rose)]">
                <Sparkles size={13} />
                Career intelligence
              </p>

              <h1 className="max-w-4xl text-4xl font-medium tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
                Welcome back,{" "}
                <span className="text-[var(--color-rose)]">
                  {name.split(" ")[0]}.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                Your career profile is becoming a living picture of what you
                know, what you can prove, and where you can go next.
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard/edit-profile")}
              className="flex w-fit items-center gap-3 border border-[var(--border-dark)] px-4 py-3 text-sm text-[var(--text-secondary)] transition hover:border-[var(--color-rose)] hover:text-[var(--text-primary)]">
              <div className="flex h-8 w-8 items-center justify-center bg-[var(--color-rose)] text-[var(--text-dark)]">
                {getInitials(name)}
              </div>

              <span>Edit profile</span>

              <ChevronRight size={15} />
            </button>
          </div>
        </section>

        {/* Intelligence Stats */}
        <section className="grid gap-8 border-b border-[var(--border-dark)] py-10 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Skills identified"
            value={skillLoading ? "—" : totalSkills}
            description="Across your current evidence"
          />

          <StatCard
            label="Strong skills"
            value={skillLoading ? "—" : strongSkills}
            description="Proficiency of 70 or above"
          />

          <StatCard
            label="Developing"
            value={skillLoading ? "—" : developingSkills}
            description="Skills between 40 and 69"
          />

          <StatCard
            label="Needs work"
            value={skillLoading ? "—" : weakSkills}
            description="Skills below 40"
          />
        </section>

        {/* Main Intelligence Area */}
        <section className="grid gap-8 py-10 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Skill Intelligence */}
          <div className="border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center gap-3">
                  <Radar size={18} className="text-[var(--color-rose)]" />

                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Skill intelligence
                  </p>
                </div>

                <h2 className="mt-4 text-2xl font-medium tracking-tight">
                  Your current capability signal.
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
                  Skills are built from the evidence available in your profile
                  rather than a single self-rating.
                </p>
              </div>

              <button
                onClick={() => navigate("/dashboard/skill-overview")}
                className="flex w-fit items-center gap-2 text-sm text-[var(--color-rose)] transition hover:text-[var(--text-primary)]">
                Explore skills
                <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="mt-8">
              {skillLoading ? (
                <div className="space-y-5">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="animate-pulse">
                      <div className="h-4 w-32 bg-[var(--color-charcoal)]" />
                      <div className="mt-3 h-1 bg-[var(--color-charcoal)]" />
                    </div>
                  ))}
                </div>
              ) : sortedSkills.length > 0 ? (
                sortedSkills.map((skill) => (
                  <SkillRow key={skill._id || skill.name} skill={skill} />
                ))
              ) : (
                <div className="border border-dashed border-[var(--border-dark)] p-8 text-center">
                  <Brain
                    size={24}
                    className="mx-auto text-[var(--color-rose)]"
                  />

                  <p className="mt-4 text-sm text-[var(--text-secondary)]">
                    No skill intelligence has been generated yet.
                  </p>

                  <button
                    onClick={() => navigate("/dashboard/edit-profile")}
                    className="mt-4 text-sm text-[var(--color-rose)]">
                    Complete your profile →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Snapshot */}
          <div className="border border-[var(--border-dark)] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <CircleUserRound size={18} className="text-[var(--color-rose)]" />

              <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Profile snapshot
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-xs text-[var(--text-muted)]">
                  Current course
                </p>

                <p className="mt-1 text-sm text-[var(--text-primary)]">
                  {student?.current_course || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--text-muted)]">
                  Academic year
                </p>

                <p className="mt-1 text-sm text-[var(--text-primary)]">
                  {student?.year ? `Year ${student.year}` : "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--text-muted)]">
                  Career interest
                </p>

                <p className="mt-1 text-sm text-[var(--text-primary)]">
                  {student?.career_interest || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--text-muted)]">Projects</p>

                <p className="mt-1 text-sm text-[var(--text-primary)]">
                  {Array.isArray(student?.projects)
                    ? student.projects.length
                    : student?.project_count || 0}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/dashboard/edit-profile")}
              className="mt-10 flex w-full items-center justify-between border-t border-[var(--border-dark)] pt-5 text-sm text-[var(--text-secondary)] transition hover:text-[var(--color-rose)]">
              Update profile
              <ArrowUpRight size={16} />
            </button>
          </div>
        </section>

        {/* Actions */}
        <section className="border-t border-[var(--border-dark)] pt-10">
          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Continue exploring
            </p>

            <h2 className="mt-3 text-2xl font-medium tracking-tight">
              Turn your profile into a plan.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <ActionCard
              icon={Target}
              title="Find your skill gaps"
              description="Compare your current capabilities against the requirements of a target career."
              onClick={() => navigate("/dashboard/skill-gap")}
            />

            <ActionCard
              icon={BriefcaseBusiness}
              title="Explore career paths"
              description="See the career signals generated from your profile and current skill set."
              onClick={() => navigate("/dashboard/career-recommendations")}
            />

            <ActionCard
              icon={GraduationCap}
              title="Build your roadmap"
              description="Turn missing capabilities into a structured learning journey."
              onClick={() => navigate("/dashboard/roadmap")}
            />
          </div>
        </section>

        {/* Next Step */}
        <section className="mt-10 border border-[var(--border-dark)] bg-[var(--color-rose)] p-7 text-[var(--text-dark)] sm:p-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] opacity-70">
                <TrendingUp size={14} />
                Next step
              </div>

              <h2 className="mt-4 text-3xl font-medium tracking-tight">
                Make your skill profile more complete.
              </h2>

              <p className="mt-3 text-sm leading-6 opacity-75">
                Add projects, assessments and certifications so your skill
                intelligence is based on stronger evidence.
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard/edit-profile")}
              className="flex w-fit shrink-0 items-center gap-2 bg-[var(--color-black)] px-5 py-3 text-sm text-[var(--color-white)] transition hover:bg-[var(--color-charcoal)]">
              Update profile
              <ArrowUpRight size={16} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
