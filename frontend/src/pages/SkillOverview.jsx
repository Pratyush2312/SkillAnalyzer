import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BarChart3,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Code2,
  FileCheck2,
  FolderKanban,
  GraduationCap,
  Layers3,
  Radar,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

import { CareerContext } from "../context/MyCareer";

/* -------------------------------------------------------
   Helpers
------------------------------------------------------- */

const getProficiency = (skill) =>
  Math.round(Number(skill?.proficiency ?? skill?.score ?? skill?.rating ?? 0));

const getStatus = (value) => {
  if (value >= 70) return "Strong";
  if (value >= 40) return "Developing";
  return "Needs work";
};

const getStatusDescription = (value) => {
  if (value >= 70) {
    return "You have strong evidence of this capability.";
  }

  if (value >= 40) {
    return "You are developing this capability.";
  }

  return "This is currently a priority development area.";
};

const getStatusIcon = (value) => {
  if (value >= 70) return CheckCircle2;
  if (value >= 40) return TrendingUp;
  return CircleAlert;
};

const getStatusClass = (value) => {
  if (value >= 70) {
    return "bg-[rgba(127,175,138,0.12)] text-[var(--color-success)]";
  }

  if (value >= 40) {
    return "bg-[rgba(197,164,109,0.12)] text-[var(--color-warning)]";
  }

  return "bg-[rgba(184,120,120,0.12)] text-[var(--color-danger)]";
};

const getEvidenceIcon = (type = "") => {
  const value = type.toLowerCase();

  if (value.includes("project")) return FolderKanban;
  if (value.includes("certificate")) return Award;
  if (value.includes("assessment")) return FileCheck2;
  if (value.includes("course")) return GraduationCap;
  if (value.includes("experience")) return BriefcaseBusiness;

  return Layers3;
};

/* -------------------------------------------------------
   Stat
------------------------------------------------------- */

const IntelligenceStat = ({ label, value, description, accent = false }) => {
  return (
    <div
      className={`border-l pl-5 ${
        accent ? "border-[var(--color-rose)]" : "border-[var(--border-dark)]"
      }`}>
      <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {label}
      </p>

      <p className="mt-2 text-3xl font-medium tracking-tight text-[var(--text-primary)]">
        {value}
      </p>

      {description && (
        <p className="mt-1 max-w-[180px] text-xs leading-5 text-[var(--text-muted)]">
          {description}
        </p>
      )}
    </div>
  );
};

/* -------------------------------------------------------
   Skill Bar
------------------------------------------------------- */

const SkillBar = ({ skill, onClick, active }) => {
  const proficiency = getProficiency(skill);
  const StatusIcon = getStatusIcon(proficiency);

  return (
    <button
      onClick={() => onClick(skill)}
      className={`group w-full border-b border-[var(--border-dark)] py-5 text-left transition-all duration-300 ${
        active
          ? "bg-[rgba(188,171,174,0.05)]"
          : "hover:bg-[rgba(188,171,174,0.03)]"
      }`}>
      <div className="flex items-center justify-between gap-5">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center ${getStatusClass(
              proficiency,
            )}`}>
            <StatusIcon size={15} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[var(--text-primary)]">
              {skill.name}
            </p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              {skill.category || "General capability"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)] sm:block">
            {getStatus(proficiency)}
          </span>

          <span className="w-10 text-right text-sm font-medium text-[var(--color-rose)]">
            {proficiency}
          </span>

          <ChevronRight
            size={15}
            className={`text-[var(--text-muted)] transition-transform ${
              active
                ? "translate-x-1 text-[var(--color-rose)]"
                : "group-hover:translate-x-1"
            }`}
          />
        </div>
      </div>

      <div className="mt-4 h-[3px] overflow-hidden bg-[var(--color-charcoal)]">
        <div
          className="h-full origin-left bg-[var(--color-rose)] transition-all duration-700 ease-out"
          style={{
            width: `${Math.min(Math.max(proficiency, 0), 100)}%`,
          }}
        />
      </div>
    </button>
  );
};

/* -------------------------------------------------------
   Evidence
------------------------------------------------------- */

const EvidenceItem = ({ evidence }) => {
  const Icon = getEvidenceIcon(evidence?.type || evidence?.source);

  return (
    <div className="flex items-start gap-3 border-b border-[var(--border-dark)] py-4 last:border-b-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--border-dark)] bg-[var(--surface-primary)]">
        <Icon size={14} className="text-[var(--color-rose)]" />
      </div>

      <div className="min-w-0">
        <p className="text-sm text-[var(--text-primary)]">
          {evidence?.type || evidence?.source || "Profile evidence"}
        </p>

        {(evidence?.description || evidence?.source) && (
          <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
            {evidence?.description || evidence?.source}
          </p>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------
   Radar Visual
------------------------------------------------------- */

const SkillRadar = ({ skills }) => {
  const points = skills.slice(0, 6);

  if (!points.length) return null;

  const size = 300;
  const center = size / 2;
  const radius = 100;

  const getPoint = (index, value) => {
    const angle = (Math.PI * 2 * index) / points.length - Math.PI / 2;

    const distance = radius * (value / 100);

    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance,
    };
  };

  const polygon = points
    .map((skill, index) => {
      const point = getPoint(index, getProficiency(skill));
      return `${point.x},${point.y}`;
    })
    .join(" ");

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[330px]">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full overflow-visible">
        {[25, 50, 75, 100].map((level) => (
          <polygon
            key={level}
            points={points
              .map((_, index) => {
                const point = getPoint(index, level);
                return `${point.x},${point.y}`;
              })
              .join(" ")}
            fill="none"
            stroke="rgba(251,251,251,0.10)"
            strokeWidth="1"
          />
        ))}

        {points.map((_, index) => {
          const point = getPoint(index, 100);

          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="rgba(251,251,251,0.08)"
              strokeWidth="1"
            />
          );
        })}

        <polygon
          points={polygon}
          fill="rgba(188,171,174,0.12)"
          stroke="var(--color-rose)"
          strokeWidth="2"
        />

        {points.map((skill, index) => {
          const point = getPoint(index, getProficiency(skill));

          const outerPoint = getPoint(index, 113);

          return (
            <g key={skill._id || skill.name}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="var(--color-rose)"
              />

              <text
                x={outerPoint.x}
                y={outerPoint.y}
                fill="var(--text-secondary)"
                fontSize="8"
                textAnchor="middle"
                dominantBaseline="middle">
                {skill.name}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Signal
        </p>

        <p className="mt-1 text-2xl font-medium text-[var(--color-rose)]">
          {Math.round(
            points.reduce((sum, skill) => sum + getProficiency(skill), 0) /
              points.length,
          )}
        </p>
      </div>
    </div>
  );
};

/* -------------------------------------------------------
   Main
------------------------------------------------------- */

const SkillOverview = () => {
  const navigate = useNavigate();

  const { student, skillIntelligence, skillLoading } =
    useContext(CareerContext);

  const [selectedSkill, setSelectedSkill] = useState(null);

  const summary = skillIntelligence?.summary || {};

  const skills = useMemo(() => {
    return Array.isArray(skillIntelligence?.skills)
      ? [...skillIntelligence.skills].sort(
          (a, b) => getProficiency(b) - getProficiency(a),
        )
      : [];
  }, [skillIntelligence]);

  const totalSkills = summary.totalSkills ?? skills.length;

  const strongSkills =
    summary.strongSkills ??
    skills.filter((skill) => getProficiency(skill) >= 70).length;

  const developingSkills =
    summary.developingSkills ??
    skills.filter((skill) => {
      const value = getProficiency(skill);
      return value >= 40 && value < 70;
    }).length;

  const weakSkills =
    summary.weakSkills ??
    skills.filter((skill) => getProficiency(skill) < 40).length;

  const averageProficiency = skills.length
    ? Math.round(
        skills.reduce((sum, skill) => sum + getProficiency(skill), 0) /
          skills.length,
      )
    : 0;

  const strongestSkill = skills[0];
  const prioritySkills = [...skills]
    .sort((a, b) => getProficiency(a) - getProficiency(b))
    .slice(0, 3);

  const categoryCount = new Set(
    skills.map((skill) => skill.category).filter(Boolean),
  ).size;

  return (
    <main className="min-h-screen bg-[var(--surface-primary)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-10 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)] transition hover:text-[var(--color-rose)]">
          <ArrowLeft size={14} />
          Overview
        </button>

        {/* Hero */}
        <section className="border-b border-[var(--border-dark)] pb-12">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-rose)]">
                <Brain size={14} />
                Skill intelligence
              </p>

              <h1 className="mt-5 max-w-4xl text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
                Understand what you can do.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                Your skills are represented as a living capability profile built
                from the evidence available across your learning and experience.
              </p>
            </div>

            <div className="lg:text-right">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Current signal
              </p>

              <p className="mt-2 text-6xl font-medium tracking-tighter text-[var(--color-rose)]">
                {skillLoading ? "—" : averageProficiency}
              </p>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                average proficiency
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid gap-8 border-b border-[var(--border-dark)] py-10 sm:grid-cols-2 lg:grid-cols-5">
          <IntelligenceStat
            label="Skills"
            value={skillLoading ? "—" : totalSkills}
            description="Capabilities identified"
            accent
          />

          <IntelligenceStat
            label="Strong"
            value={skillLoading ? "—" : strongSkills}
            description="70+ proficiency"
          />

          <IntelligenceStat
            label="Developing"
            value={skillLoading ? "—" : developingSkills}
            description="40–69 proficiency"
          />

          <IntelligenceStat
            label="Needs work"
            value={skillLoading ? "—" : weakSkills}
            description="Below 40"
          />

          <IntelligenceStat
            label="Categories"
            value={skillLoading ? "—" : categoryCount}
            description="Skill areas represented"
          />
        </section>

        {skillLoading ? (
          <section className="grid gap-8 py-12 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-5">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="animate-pulse border-b border-[var(--border-dark)] py-5">
                  <div className="h-4 w-40 bg-[var(--color-charcoal)]" />
                  <div className="mt-4 h-[3px] bg-[var(--color-charcoal)]" />
                </div>
              ))}
            </div>

            <div className="h-[400px] animate-pulse bg-[var(--color-charcoal)]" />
          </section>
        ) : skills.length === 0 ? (
          /* Empty State */
          <section className="py-20">
            <div className="mx-auto max-w-xl border border-dashed border-[var(--border-dark)] p-10 text-center">
              <Brain size={32} className="mx-auto text-[var(--color-rose)]" />

              <h2 className="mt-6 text-2xl font-medium">
                Your skill graph is waiting.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                Add skills, projects, assessments or certifications to start
                building your capability profile.
              </p>

              <button
                onClick={() => navigate("/dashboard/edit-profile")}
                className="mt-7 inline-flex items-center gap-2 bg-[var(--color-rose)] px-5 py-3 text-sm text-[var(--text-dark)]">
                Complete profile
                <ArrowUpRight size={15} />
              </button>
            </div>
          </section>
        ) : (
          <>
            {/* Main Skill Intelligence */}
            <section className="grid gap-8 py-12 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Skill list */}
              <div className="border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-6 sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-3">
                      <BarChart3
                        size={17}
                        className="text-[var(--color-rose)]"
                      />

                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Capability inventory
                      </p>
                    </div>

                    <h2 className="mt-4 text-2xl font-medium">
                      Your skill graph.
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
                      Select a skill to inspect the evidence behind its current
                      proficiency signal.
                    </p>
                  </div>

                  <span className="hidden text-xs text-[var(--text-muted)] sm:block">
                    {skills.length} tracked
                  </span>
                </div>

                <div className="mt-8">
                  {skills.map((skill) => (
                    <SkillBar
                      key={skill._id || skill.name}
                      skill={skill}
                      active={selectedSkill?.name === skill.name}
                      onClick={setSelectedSkill}
                    />
                  ))}
                </div>
              </div>

              {/* Radar */}
              <div className="border border-[var(--border-dark)] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <Radar size={17} className="text-[var(--color-rose)]" />

                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Capability map
                  </p>
                </div>

                <h2 className="mt-4 text-2xl font-medium">
                  Your current shape.
                </h2>

                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                  A visual snapshot of your strongest tracked capabilities.
                </p>

                <div className="mt-6">
                  <SkillRadar skills={skills} />
                </div>
              </div>
            </section>

            {/* Selected Skill Detail */}
            {selectedSkill && (
              <section className="border-y border-[var(--border-dark)] py-10">
                <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                          Selected capability
                        </p>

                        <h2 className="mt-3 text-3xl font-medium">
                          {selectedSkill.name}
                        </h2>
                      </div>

                      <button
                        onClick={() => setSelectedSkill(null)}
                        className="text-[var(--text-muted)] transition hover:text-[var(--text-primary)]">
                        <X size={18} />
                      </button>
                    </div>

                    <div className="mt-8 flex items-end gap-3">
                      <span className="text-6xl font-medium tracking-tighter text-[var(--color-rose)]">
                        {getProficiency(selectedSkill)}
                      </span>

                      <span className="pb-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        / 100
                      </span>
                    </div>

                    <div className="mt-5">
                      <span
                        className={`inline-flex px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] ${getStatusClass(
                          getProficiency(selectedSkill),
                        )}`}>
                        {getStatus(getProficiency(selectedSkill))}
                      </span>
                    </div>

                    <p className="mt-5 max-w-md text-sm leading-6 text-[var(--text-muted)]">
                      {getStatusDescription(getProficiency(selectedSkill))}
                    </p>
                  </div>

                  <div className="border-l border-[var(--border-dark)] pl-0 lg:pl-10">
                    <div className="flex items-center gap-3">
                      <Sparkles
                        size={16}
                        className="text-[var(--color-rose)]"
                      />

                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Evidence behind this signal
                      </p>
                    </div>

                    {Array.isArray(selectedSkill.evidence) &&
                    selectedSkill.evidence.length > 0 ? (
                      <div className="mt-5">
                        {selectedSkill.evidence.map((evidence, index) => (
                          <EvidenceItem
                            key={evidence._id || evidence.sourceId || index}
                            evidence={evidence}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="mt-5 border border-dashed border-[var(--border-dark)] p-6">
                        <p className="text-sm text-[var(--text-secondary)]">
                          {selectedSkill.evidenceCount || 0} evidence sources
                          currently contribute to this signal.
                        </p>

                        <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
                          Add projects, assessments, certificates or experience
                          to strengthen the evidence behind this capability.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Development Focus */}
            <section className="grid gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--color-rose)]">
                  <Target size={14} />
                  Development focus
                </p>

                <h2 className="mt-4 text-3xl font-medium tracking-tight">
                  Where should you invest next?
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-[var(--text-muted)]">
                  Your lower-proficiency capabilities become candidates for
                  targeted development and future skill-gap analysis.
                </p>

                <button
                  onClick={() => navigate("/dashboard/skill-gap")}
                  className="mt-7 flex items-center gap-2 text-sm text-[var(--color-rose)] transition hover:text-[var(--text-primary)]">
                  Analyse career gaps
                  <ArrowUpRight size={15} />
                </button>
              </div>

              <div className="border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-6 sm:p-8">
                {prioritySkills.map((skill, index) => {
                  const proficiency = getProficiency(skill);

                  return (
                    <div
                      key={skill._id || skill.name}
                      className="flex items-center gap-5 border-b border-[var(--border-dark)] py-5 last:border-b-0">
                      <span className="w-6 text-xs text-[var(--text-muted)]">
                        0{index + 1}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <span className="truncate text-sm text-[var(--text-primary)]">
                            {skill.name}
                          </span>

                          <span className="text-sm text-[var(--color-rose)]">
                            {proficiency}
                          </span>
                        </div>

                        <div className="mt-3 h-[3px] bg-[var(--color-charcoal)]">
                          <div
                            className="h-full bg-[var(--color-rose)]"
                            style={{
                              width: `${proficiency}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Evidence Sources */}
            <section className="border-t border-[var(--border-dark)] py-12">
              <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <p className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--color-rose)]">
                    <Layers3 size={14} />
                    Unified evidence
                  </p>

                  <h2 className="mt-4 text-3xl font-medium tracking-tight">
                    Your skills are more than a profile field.
                  </h2>

                  <p className="mt-4 max-w-md text-sm leading-6 text-[var(--text-muted)]">
                    RAAHVI can combine different forms of evidence to create a
                    more useful picture of capability.
                  </p>
                </div>

                <div className="grid gap-px bg-[var(--border-dark)] sm:grid-cols-2">
                  {[
                    {
                      icon: Code2,
                      title: "Projects",
                      text: "Practical evidence of applied skills.",
                    },
                    {
                      icon: FileCheck2,
                      title: "Assessments",
                      text: "Measured evidence of current proficiency.",
                    },
                    {
                      icon: Award,
                      title: "Certificates",
                      text: "Structured evidence from completed learning.",
                    },
                    {
                      icon: BriefcaseBusiness,
                      title: "Experience",
                      text: "Real-world evidence from work and practice.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="bg-[var(--surface-primary)] p-6">
                        <Icon size={18} className="text-[var(--color-rose)]" />

                        <h3 className="mt-6 text-sm font-medium">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Bottom CTA */}
            <section className="mt-4 border border-[var(--border-dark)] bg-[var(--color-rose)] p-7 text-[var(--text-dark)] sm:p-10">
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.16em] opacity-60">
                    Continue
                  </p>

                  <h2 className="mt-3 text-3xl font-medium tracking-tight">
                    Turn your capabilities into a career strategy.
                  </h2>

                  <p className="mt-3 text-sm leading-6 opacity-70">
                    Compare your skills against a target role and discover
                    exactly where the gaps are.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/dashboard/skill-gap")}
                  className="flex w-fit shrink-0 items-center gap-2 bg-[var(--color-black)] px-5 py-3 text-sm text-[var(--color-white)] transition hover:bg-[var(--color-charcoal)]">
                  Explore skill gaps
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default SkillOverview;
