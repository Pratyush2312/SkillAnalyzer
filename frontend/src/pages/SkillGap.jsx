import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Crosshair,
  Layers3,
  Radar,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

import { CareerContext } from "../context/MyCareer";
import { api } from "../config/api";
import Roadmap from "./RoadMap";

/* =========================================================
   HELPERS
========================================================= */

const getSkillName = (skill) => {
  return skill?.skill || "Unknown skill";
};

const getCurrentValue = (skill) => {
  return Math.round(skill?.currentProficiency ?? 0);
};

const getRequiredValue = (skill) => {
  return Math.round(skill?.requiredProficiency ?? 70);
};

const getGapValue = (skill) => {
  return Math.round(skill?.gap ?? 0);
};

const getStatus = (skill) => {
  return skill?.status || "critical";
};

const getStatusLabel = (status) => {
  switch (status) {
    case "ready":
      return "Ready";

    case "developing":
      return "Developing";

    case "critical":
      return "Critical";

    default:
      return "Needs work";
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case "ready":
      return "bg-[rgba(127,175,138,0.12)] text-[var(--color-success)]";

    case "developing":
      return "bg-[rgba(197,164,109,0.12)] text-[var(--color-warning)]";

    case "critical":
      return "bg-[rgba(184,120,120,0.12)] text-[var(--color-danger)]";

    default:
      return "bg-[rgba(188,171,174,0.10)] text-[var(--color-rose)]";
  }
};

const StatusIcon = ({ status, size = 16 }) => {
  if (status === "ready") {
    return <CheckCircle2 size={size} />;
  }

  if (status === "developing") {
    return <TrendingUp size={size} />;
  }

  return <AlertTriangle size={size} />;
};

/* =========================================================
   SUMMARY CARD
========================================================= */

const SummaryCard = ({ label, value, description, icon: Icon }) => {
  return (
    <div className="border-l border-[var(--border-dark)] pl-5">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-[var(--color-rose)]" />

        <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          {label}
        </p>
      </div>

      <p className="mt-3 text-3xl font-medium tracking-tight text-[var(--text-primary)]">
        {value}
      </p>

      <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
        {description}
      </p>
    </div>
  );
};

/* =========================================================
   SKILL ROW
========================================================= */

const GapSkillRow = ({ skill, selected, onSelect }) => {
  const name = getSkillName(skill);
  const current = getCurrentValue(skill);
  const required = getRequiredValue(skill);
  const gap = getGapValue(skill);
  const status = getStatus(skill);

  return (
    <button
      type="button"
      onClick={() => onSelect(skill)}
      className={`group w-full border-b border-[var(--border-dark)] py-5 text-left transition-all duration-300 last:border-b-0 ${
        selected
          ? "bg-[rgba(188,171,174,0.05)]"
          : "hover:bg-[rgba(188,171,174,0.025)]"
      }`}>
      <div className="flex items-center justify-between gap-5">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center ${getStatusClass(
              status,
            )}`}>
            <StatusIcon status={status} size={15} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[var(--text-primary)]">
              {name}
            </p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Current {current} · Target {required}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span
            className={`hidden px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] sm:block ${getStatusClass(
              status,
            )}`}>
            {getStatusLabel(status)}
          </span>

          <span className="text-sm font-medium text-[var(--color-rose)]">
            {gap > 0 ? `-${gap}` : "Ready"}
          </span>

          <ArrowRight
            size={15}
            className={`text-[var(--text-muted)] transition-transform ${
              selected
                ? "translate-x-1 text-[var(--color-rose)]"
                : "group-hover:translate-x-1"
            }`}
          />
        </div>
      </div>

      {/* Proficiency */}

      <div className="relative mt-4 h-2 bg-[var(--color-charcoal)]">
        <div
          className="absolute left-0 top-0 h-full bg-[var(--color-rose)] transition-all duration-700"
          style={{
            width: `${Math.min(current, 100)}%`,
          }}
        />

        <div
          className="absolute top-[-3px] h-3.5 w-px bg-[var(--color-white)]/60"
          style={{
            left: `${Math.min(required, 100)}%`,
          }}
        />
      </div>
    </button>
  );
};

/* =========================================================
   MAIN
========================================================= */

const SkillGap = () => {
  const navigate = useNavigate();

  const { student } = useContext(CareerContext);

  /* -------------------------------------------------------
     TARGET ROLE
  ------------------------------------------------------- */

  const initialRole = student?.career_interest || "Full Stack Developer";

  const [role, setRole] = useState(initialRole);

  const [inputRole, setInputRole] = useState(initialRole);

  /* -------------------------------------------------------
     SKILL GAP
  ------------------------------------------------------- */

  const [gapData, setGapData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedSkill, setSelectedSkill] = useState(null);

  /* -------------------------------------------------------
     ROADMAP
  ------------------------------------------------------- */

  const [roadmaps, setRoadmaps] = useState([]);

  const [roadmapLoading, setRoadmapLoading] = useState(false);

  const [roadmapOpen, setRoadmapOpen] = useState(false);

  /* =======================================================
     FETCH SKILL GAP
  ======================================================= */

  const fetchSkillGap = async (targetRole) => {
    if (!targetRole?.trim()) return;

    try {
      setLoading(true);
      setError("");
      setSelectedSkill(null);

      const res = await api.get(
        `/api/skill-gap?role=${encodeURIComponent(targetRole.trim())}`,
      );

      setGapData(res.data.data);
    } catch (err) {
      console.error("Failed to fetch skill gap:", err);

      setGapData(null);

      setError(
        err?.response?.data?.message ||
          "Unable to calculate the skill gap right now.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    const targetRole = student?.career_interest || "Full Stack Developer";

    setRole(targetRole);
    setInputRole(targetRole);

    fetchSkillGap(targetRole);
  }, [student?.career_interest]);

  /* =======================================================
     FETCH PERSONALIZED ROADMAP
  ======================================================= */

  const fetchPersonalizedRoadmap = async () => {
    const targetRole = gapData?.role || role;

    if (!targetRole) return;

    try {
      setRoadmapLoading(true);

      const res = await api.get(
        `/roadmap/personalized?role=${encodeURIComponent(targetRole)}`,
      );

      setRoadmaps(Array.isArray(res.data.data) ? res.data.data : []);

      setRoadmapOpen(true);
    } catch (err) {
      console.error("Failed to fetch personalized roadmap:", err);
    } finally {
      setRoadmapLoading(false);
    }
  };

  /* =======================================================
     ROLE SUBMIT
  ======================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextRole = inputRole.trim();

    if (!nextRole) return;

    setRole(nextRole);
    fetchSkillGap(nextRole);
  };

  /* =======================================================
     DERIVED DATA
  ======================================================= */

  const skills = useMemo(() => {
    if (!Array.isArray(gapData?.skills)) {
      return [];
    }

    return [...gapData.skills].sort((a, b) => getGapValue(b) - getGapValue(a));
  }, [gapData]);

  const readySkills = skills.filter((skill) => getStatus(skill) === "ready");

  const developingSkills = skills.filter(
    (skill) => getStatus(skill) === "developing",
  );

  const criticalSkills = skills.filter(
    (skill) => getStatus(skill) === "critical",
  );

  const actionableSkills = skills.filter((skill) => getGapValue(skill) > 0);

  const totalRequired = gapData?.totalRequiredSkills ?? skills.length;

  const matchedSkills = gapData?.matchedSkills ?? readySkills.length;

  const averageGap = Math.round(
    Number(
      gapData?.averageGap ??
        (skills.length
          ? skills.reduce((sum, skill) => sum + getGapValue(skill), 0) /
            skills.length
          : 0),
    ),
  );

  const readiness = totalRequired
    ? Math.round((matchedSkills / totalRequired) * 100)
    : 0;

  const selectedStatus = selectedSkill ? getStatus(selectedSkill) : null;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen bg-[var(--surface-primary)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {/* =================================================
            BACK
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-10 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)] transition hover:text-[var(--color-rose)]">
          <ArrowLeft size={14} />
          Overview
        </button>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="border-b border-[var(--border-dark)] pb-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-rose)]">
                <Crosshair size={14} />
                Skill gap intelligence
              </p>

              <h1 className="mt-5 max-w-4xl text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
                Find the distance between now and next.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                Compare your current skill evidence with the capabilities
                required for a target career — then turn the gaps into a
                personalized learning path.
              </p>
            </div>

            {/* Target role */}

            <form
              onSubmit={handleSubmit}
              className="border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-5">
              <label className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Target career
              </label>

              <div className="mt-3 flex gap-2">
                <input
                  value={inputRole}
                  onChange={(event) => setInputRole(event.target.value)}
                  placeholder="e.g. Full Stack Developer"
                  className="min-w-0 flex-1 border border-[var(--border-dark)] bg-[var(--surface-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--color-rose)]"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="flex shrink-0 items-center justify-center bg-[var(--color-rose)] px-4 text-[var(--text-dark)] transition hover:bg-[var(--color-white)] disabled:cursor-not-allowed disabled:opacity-50">
                  <ArrowUpRight size={17} />
                </button>
              </div>

              <p className="mt-3 text-xs text-[var(--text-muted)]">
                Current target:{" "}
                <span className="text-[var(--text-secondary)]">{role}</span>
              </p>
            </form>
          </div>
        </section>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && !loading && (
          <section className="mt-8 border border-[rgba(184,120,120,0.3)] bg-[rgba(184,120,120,0.06)] p-6">
            <div className="flex items-start gap-4">
              <CircleAlert
                size={20}
                className="mt-0.5 shrink-0 text-[var(--color-danger)]"
              />

              <div>
                <p className="text-sm font-medium">Skill gap unavailable</p>

                <p className="mt-1 text-sm text-[var(--text-muted)]">{error}</p>

                <button
                  type="button"
                  onClick={() => fetchSkillGap(role)}
                  className="mt-4 text-sm text-[var(--color-rose)]">
                  Try again →
                </button>
              </div>
            </div>
          </section>
        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <section className="py-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-32 animate-pulse bg-[var(--color-charcoal)]"
                />
              ))}
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="h-[550px] animate-pulse bg-[var(--color-charcoal)]" />

              <div className="h-[550px] animate-pulse bg-[var(--color-charcoal)]" />
            </div>
          </section>
        ) : gapData ? (
          <>
            {/* =================================================
                SUMMARY
            ================================================= */}

            <section className="grid gap-8 border-b border-[var(--border-dark)] py-10 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryCard
                icon={Target}
                label="Target"
                value={gapData.role || role}
                description="Career being analysed"
              />

              <SummaryCard
                icon={CheckCircle2}
                label="Ready"
                value={`${matchedSkills}/${totalRequired}`}
                description="Required skills currently ready"
              />

              <SummaryCard
                icon={TrendingUp}
                label="Average gap"
                value={averageGap}
                description="Average distance from target proficiency"
              />

              <SummaryCard
                icon={Radar}
                label="Readiness"
                value={`${readiness}%`}
                description="Required capabilities currently ready"
              />
            </section>

            {/* =================================================
                READINESS
            ================================================= */}

            <section className="grid gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr]">
              {/* Readiness */}

              <div className="border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <Radar size={17} className="text-[var(--color-rose)]" />

                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Career readiness
                  </p>
                </div>

                <div className="mt-10 flex items-end gap-3">
                  <span className="text-7xl font-medium tracking-tighter text-[var(--color-rose)]">
                    {readiness}
                  </span>

                  <span className="pb-2 text-sm text-[var(--text-muted)]">
                    %
                  </span>
                </div>

                <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--text-muted)]">
                  {readiness >= 70
                    ? "Most required capabilities are already at or above the current target threshold."
                    : readiness >= 40
                      ? "You have a foundation for this role, with several capabilities still developing."
                      : "There are several capability gaps to address before reaching the current target threshold."}
                </p>

                <div className="mt-8 h-2 bg-[var(--color-charcoal)]">
                  <div
                    className="h-full bg-[var(--color-rose)] transition-all duration-1000"
                    style={{
                      width: `${readiness}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  <span>Current</span>
                  <span>Target</span>
                </div>
              </div>

              {/* Distribution */}

              <div className="border border-[var(--border-dark)] p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <Layers3 size={17} className="text-[var(--color-rose)]" />

                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Capability distribution
                  </p>
                </div>

                <h2 className="mt-4 text-2xl font-medium">
                  Where the distance lives.
                </h2>

                <div className="mt-10 space-y-7">
                  {/* Ready */}

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm">
                        <span className="h-2 w-2 bg-[var(--color-success)]" />
                        Ready
                      </span>

                      <span className="text-sm text-[var(--text-muted)]">
                        {readySkills.length}
                      </span>
                    </div>

                    <div className="mt-3 h-1.5 bg-[var(--color-charcoal)]">
                      <div
                        className="h-full bg-[var(--color-success)]"
                        style={{
                          width: `${
                            totalRequired
                              ? (readySkills.length / totalRequired) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Developing */}

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm">
                        <span className="h-2 w-2 bg-[var(--color-warning)]" />
                        Developing
                      </span>

                      <span className="text-sm text-[var(--text-muted)]">
                        {developingSkills.length}
                      </span>
                    </div>

                    <div className="mt-3 h-1.5 bg-[var(--color-charcoal)]">
                      <div
                        className="h-full bg-[var(--color-warning)]"
                        style={{
                          width: `${
                            totalRequired
                              ? (developingSkills.length / totalRequired) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Critical */}

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm">
                        <span className="h-2 w-2 bg-[var(--color-danger)]" />
                        Critical
                      </span>

                      <span className="text-sm text-[var(--text-muted)]">
                        {criticalSkills.length}
                      </span>
                    </div>

                    <div className="mt-3 h-1.5 bg-[var(--color-charcoal)]">
                      <div
                        className="h-full bg-[var(--color-danger)]"
                        style={{
                          width: `${
                            totalRequired
                              ? (criticalSkills.length / totalRequired) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                SKILL BREAKDOWN
            ================================================= */}

            <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              {/* ALL SKILLS */}

              <div className="border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-6 sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-3">
                      <Crosshair
                        size={17}
                        className="text-[var(--color-rose)]"
                      />

                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Required capabilities
                      </p>
                    </div>

                    <h2 className="mt-4 text-2xl font-medium">
                      The complete gap map.
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      Select a capability to understand exactly what needs to
                      change.
                    </p>
                  </div>

                  <span className="hidden text-xs text-[var(--text-muted)] sm:block">
                    {skills.length} skills
                  </span>
                </div>

                <div className="mt-7">
                  {skills.map((skill) => (
                    <GapSkillRow
                      key={
                        skill._id ||
                        skill.id ||
                        skill.normalizedSkill ||
                        skill.skill
                      }
                      skill={skill}
                      selected={selectedSkill === skill}
                      onSelect={setSelectedSkill}
                    />
                  ))}
                </div>
              </div>

              {/* PRIORITY */}

              <div className="border border-[var(--border-dark)] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <Sparkles size={17} className="text-[var(--color-rose)]" />

                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Priority gaps
                  </p>
                </div>

                <h2 className="mt-4 text-2xl font-medium">Start here.</h2>

                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                  These are the largest distances from your target proficiency.
                </p>

                <div className="mt-7 space-y-3">
                  {actionableSkills.slice(0, 4).map((skill, index) => {
                    const name = getSkillName(skill);

                    const gap = getGapValue(skill);

                    const status = getStatus(skill);

                    return (
                      <button
                        type="button"
                        key={
                          skill._id || skill.id || skill.normalizedSkill || name
                        }
                        onClick={() => setSelectedSkill(skill)}
                        className="group flex w-full items-center gap-4 border border-[var(--border-dark)] p-4 text-left transition hover:border-[var(--color-rose)]">
                        <span className="text-xs text-[var(--text-muted)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="flex-1">
                          <span className="block text-sm">{name}</span>

                          <span
                            className={`mt-1 inline-block px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] ${getStatusClass(
                              status,
                            )}`}>
                            {getStatusLabel(status)}
                          </span>
                        </span>

                        <span className="text-sm text-[var(--color-rose)]">
                          -{gap}
                        </span>

                        <ArrowUpRight
                          size={14}
                          className="text-[var(--text-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </button>
                    );
                  })}

                  {actionableSkills.length === 0 && (
                    <div className="border border-[var(--border-dark)] p-5">
                      <CheckCircle2
                        size={18}
                        className="text-[var(--color-success)]"
                      />

                      <p className="mt-4 text-sm font-medium">
                        No active skill gaps.
                      </p>

                      <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
                        Your current evidence meets the target threshold for all
                        analysed capabilities.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* =================================================
                SELECTED SKILL
            ================================================= */}

            {selectedSkill && (
              <section className="mt-8 border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-7 sm:p-10">
                <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
                  {/* LEFT */}

                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                          Capability detail
                        </p>

                        <h2 className="mt-3 text-3xl font-medium">
                          {getSkillName(selectedSkill)}
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedSkill(null)}
                        className="text-[var(--text-muted)] transition hover:text-[var(--text-primary)]">
                        <X size={18} />
                      </button>
                    </div>

                    <div className="mt-8 flex items-end gap-3">
                      <span className="text-6xl font-medium tracking-tighter text-[var(--color-rose)]">
                        {getCurrentValue(selectedSkill)}
                      </span>

                      <span className="pb-2 text-sm text-[var(--text-muted)]">
                        / {getRequiredValue(selectedSkill)}
                      </span>
                    </div>

                    <span
                      className={`mt-5 inline-flex px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] ${getStatusClass(
                        selectedStatus,
                      )}`}>
                      {getStatusLabel(selectedStatus)}
                    </span>
                  </div>

                  {/* RIGHT */}

                  <div className="border-l border-[var(--border-dark)] pl-0 lg:pl-10">
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      Gap breakdown
                    </p>

                    <div className="mt-6 space-y-6">
                      {/* Current */}

                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--text-secondary)]">
                            Current proficiency
                          </span>

                          <span className="text-[var(--color-rose)]">
                            {getCurrentValue(selectedSkill)}
                          </span>
                        </div>

                        <div className="mt-3 h-2 bg-[var(--color-charcoal)]">
                          <div
                            className="h-full bg-[var(--color-rose)]"
                            style={{
                              width: `${Math.min(
                                getCurrentValue(selectedSkill),
                                100,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Required */}

                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--text-secondary)]">
                            Required proficiency
                          </span>

                          <span className="text-[var(--text-primary)]">
                            {getRequiredValue(selectedSkill)}
                          </span>
                        </div>

                        <div className="mt-3 h-2 bg-[var(--color-charcoal)]">
                          <div
                            className="h-full bg-[var(--text-primary)]"
                            style={{
                              width: `${Math.min(
                                getRequiredValue(selectedSkill),
                                100,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* GAP */}

                      <div className="flex items-center justify-between border-t border-[var(--border-dark)] pt-5">
                        <span className="text-sm text-[var(--text-muted)]">
                          Remaining gap
                        </span>

                        <span className="text-lg font-medium text-[var(--color-rose)]">
                          {getGapValue(selectedSkill)}
                        </span>
                      </div>

                      {/* ACTION */}

                      {getGapValue(selectedSkill) > 0 ? (
                        <div className="border-t border-[var(--border-dark)] pt-6">
                          <p className="text-sm font-medium">
                            This capability needs development.
                          </p>

                          <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">
                            Your personalized roadmap can turn the current skill
                            gaps for{" "}
                            <span className="text-[var(--text-secondary)]">
                              {gapData.role || role}
                            </span>{" "}
                            into a structured learning path.
                          </p>

                          <button
                            type="button"
                            onClick={fetchPersonalizedRoadmap}
                            disabled={roadmapLoading}
                            className="mt-5 flex items-center gap-2 bg-[var(--color-rose)] px-5 py-3 text-sm text-[var(--text-dark)] transition hover:bg-[var(--color-white)] disabled:cursor-wait disabled:opacity-60">
                            {roadmapLoading ? (
                              <>
                                <span className="h-3.5 w-3.5 animate-spin rounded-full border border-[var(--text-dark)] border-t-transparent" />
                                Building path
                              </>
                            ) : (
                              <>
                                Build learning path
                                <ArrowUpRight size={16} />
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="border-t border-[var(--border-dark)] pt-6">
                          <div className="flex items-center gap-2 text-[var(--color-success)]">
                            <CheckCircle2 size={16} />

                            <span className="text-sm font-medium">
                              Target proficiency reached
                            </span>
                          </div>

                          <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">
                            Your current evidence meets or exceeds the required
                            threshold for this capability.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* =================================================
                ROADMAP CTA
            ================================================= */}

            <section className="mt-12 overflow-hidden border border-[var(--border-dark)] bg-[var(--color-rose)] text-[var(--text-dark)]">
              <div className="grid gap-0 md:grid-cols-[1fr_auto]">
                <div className="p-7 sm:p-10">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] opacity-60">
                    <Clock3 size={13} />
                    Next step
                  </p>

                  <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight">
                    Close the gaps that matter.
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 opacity-70">
                    Build a personalized learning path around the capabilities
                    currently below the target threshold for{" "}
                    <span className="font-medium">{gapData.role || role}</span>.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {actionableSkills.slice(0, 4).map((skill) => (
                      <span
                        key={
                          skill._id ||
                          skill.id ||
                          skill.normalizedSkill ||
                          skill.skill
                        }
                        className="border border-[var(--text-dark)]/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em]">
                        {getSkillName(skill)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center border-t border-[var(--text-dark)]/15 p-7 md:border-l md:border-t-0 sm:p-10">
                  <button
                    type="button"
                    onClick={fetchPersonalizedRoadmap}
                    disabled={roadmapLoading || actionableSkills.length === 0}
                    className="flex w-full items-center justify-center gap-2 bg-[var(--color-black)] px-5 py-3.5 text-sm text-[var(--color-white)] transition hover:bg-[var(--color-charcoal)] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto">
                    {roadmapLoading ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border border-[var(--color-white)] border-t-transparent" />
                        Building roadmap
                      </>
                    ) : (
                      <>
                        Build personalized roadmap
                        <ArrowUpRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </div>

      {/* =====================================================
          ROADMAP MODAL
      ===================================================== */}

      <Roadmap
        roadmaps={roadmaps}
        isOpen={roadmapOpen}
        onClose={() => setRoadmapOpen(false)}
        role={gapData?.role || role}
      />
    </main>
  );
};

export default SkillGap;
