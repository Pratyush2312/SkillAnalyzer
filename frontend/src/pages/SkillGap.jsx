import {
  Target,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  BriefcaseBusiness,
  LoaderCircle,
  RefreshCw,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { api } from "../config/api";
import { CareerContext } from "../context/MyCareer";

export default function SkillGap() {
  const { student } = useContext(CareerContext);

  const role = student?.career_interest;

  const [skillMatchResult, setSkillMatchResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSkillMatch = async () => {
    if (!role) {
      setLoading(false);
      setError("Please add your career interest to view your skill gap.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/career/match?role=${encodeURIComponent(role)}`,
      );

      setSkillMatchResult(response.data.data);
    } catch (error) {
      console.error("Failed to fetch skill match:", error);

      setError(
        error.response?.data?.message || "Unable to calculate your skill match",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillMatch();
  }, [role]);

  if (loading) {
    return <LoadingState role={role} />;
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={fetchSkillMatch}
        showRetry={Boolean(role)}
      />
    );
  }

  const targetJob = skillMatchResult?.targetJob || role;

  const matchPercentage = Number(skillMatchResult?.matchPercentage) || 0;

  const matchedSkills = skillMatchResult?.matchedSkills || [];

  const missingSkills = skillMatchResult?.missingSkills || [];

  const optionalMissingSkills = skillMatchResult?.optionalMissingSkills || [];

  return (
    <main className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/dashboard" className="transition hover:text-indigo-600">
            Dashboard
          </Link>

          <ChevronRight size={15} />

          <span className="font-medium text-slate-800">Skill Gap</span>
        </div>

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.14em] text-indigo-600">
              Career Readiness
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Skill gap analysis
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Understand how your current skills compare with the requirements
              of your target career.
            </p>
          </div>

          <Link
            to="/dashboard/career-recommendations"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600">
            Explore careers
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Target Role + Score */}
        <div className="mb-6 grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* Target Role Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Your target career
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {targetJob}
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Your match is calculated by comparing your profile skills with
                  the required skills for this role.
                </p>
              </div>

              <div className="hidden rounded-xl bg-indigo-50 p-3 text-indigo-600 sm:block">
                <BriefcaseBusiness size={24} />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-emerald-500" />
                {matchedSkills.length} skills matched
              </div>

              <div className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                <AlertCircle size={16} className="text-rose-500" />
                {missingSkills.length} skills missing
              </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <Link
                to="/dashboard/edit-profile"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700">
                Update your profile
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Match Score Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400">
              Overall match
            </p>

            <div className="my-6 flex justify-center">
              <MatchScore percentage={matchPercentage} />
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold text-slate-800">
                {getMatchLabel(matchPercentage)}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Based on your current profile and job requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            icon={<CheckCircle2 size={19} />}
            title="Matched skills"
            count={matchedSkills.length}
            description="Skills you already have"
            iconClassName="bg-emerald-50 text-emerald-600"
          />

          <SummaryCard
            icon={<AlertCircle size={19} />}
            title="Required gaps"
            count={missingSkills.length}
            description="Skills you need to learn"
            iconClassName="bg-rose-50 text-rose-600"
          />

          <SummaryCard
            icon={<TrendingUp size={19} />}
            title="Optional skills"
            count={optionalMissingSkills.length}
            description="Skills to explore next"
            iconClassName="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Skill Comparison */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SkillSection
            title="Skills you already have"
            description="These skills match the requirements of your target role."
            skills={matchedSkills}
            type="matched"
            icon={<CheckCircle2 size={19} />}
          />

          <SkillSection
            title="Required skills to develop"
            description="Focus on these skills to improve your career readiness."
            skills={missingSkills}
            type="missing"
            icon={<AlertCircle size={19} />}
          />
        </div>

        {/* Optional Skills */}
        {optionalMissingSkills.length > 0 && (
          <div className="mt-6">
            <SkillSection
              title="Optional skills to explore"
              description="These skills are not mandatory but can strengthen your profile."
              skills={optionalMissingSkills}
              type="improve"
              icon={<TrendingUp size={19} />}
            />
          </div>
        )}

        {/* Roadmap CTA */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50">
          <div className="flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-white p-3 text-indigo-600 shadow-sm">
                <Target size={22} />
              </div>

              <div>
                <h2 className="text-base font-bold text-indigo-950 sm:text-lg">
                  Ready to close your skill gaps?
                </h2>

                <p className="mt-1 max-w-xl text-sm leading-6 text-indigo-800/70">
                  Build a focused learning plan around the skills required for
                  your target career.
                </p>
              </div>
            </div>

            <Link
              to="/dashboard/roadmap"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
              View roadmap
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------- Match Score ---------- */

function MatchScore({ percentage }) {
  const safePercentage = Math.min(Math.max(Number(percentage) || 0, 0), 100);

  return (
    <div
      className="relative flex h-40 w-40 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(#4f46e5 ${safePercentage * 3.6}deg, #e2e8f0 0deg)`,
      }}>
      <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
        <span className="text-3xl font-bold tracking-tight text-slate-900">
          {safePercentage}%
        </span>

        <span className="mt-1 text-xs font-medium text-slate-400">
          match score
        </span>
      </div>
    </div>
  );
}

/* ---------- Summary Card ---------- */

function SummaryCard({ icon, title, count, description, iconClassName }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`mb-4 inline-flex rounded-xl p-2.5 ${iconClassName}`}>
        {icon}
      </div>

      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-1 text-2xl font-bold text-slate-900">{count}</p>

      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}

/* ---------- Skill Section ---------- */

function SkillSection({ title, description, skills, type, icon }) {
  const styles = {
    matched: {
      icon: "bg-emerald-50 text-emerald-600",
      badge: "border-emerald-100 bg-emerald-50 text-emerald-700",
      empty: "No matching skills found yet.",
    },
    missing: {
      icon: "bg-rose-50 text-rose-600",
      badge: "border-rose-100 bg-rose-50 text-rose-700",
      empty: "You currently have no missing required skills.",
    },
    improve: {
      icon: "bg-amber-50 text-amber-600",
      badge: "border-amber-100 bg-amber-50 text-amber-700",
      empty: "No optional skills available.",
    },
  };

  const currentStyle = styles[type];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className={`rounded-xl p-2.5 ${currentStyle.icon}`}>{icon}</div>

        <div>
          <h2 className="text-base font-bold text-slate-900">{title}</h2>

          <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
        </div>
      </div>

      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold ${currentStyle.badge}`}>
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50 px-4 py-5 text-center">
          <p className="text-sm text-slate-500">{currentStyle.empty}</p>
        </div>
      )}
    </section>
  );
}

/* ---------- Loading State ---------- */

function LoadingState({ role }) {
  return (
    <main className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
          <div className="mt-5 h-9 w-64 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-slate-200" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="h-64 animate-pulse rounded-2xl bg-white shadow-sm" />
          <div className="h-64 animate-pulse rounded-2xl bg-white shadow-sm" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="h-36 animate-pulse rounded-2xl bg-white" />
          <div className="h-36 animate-pulse rounded-2xl bg-white" />
          <div className="h-36 animate-pulse rounded-2xl bg-white" />
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Analyzing your skills
          {role ? ` for ${role}` : ""}...
        </p>
      </div>
    </main>
  );
}

/* ---------- Error State ---------- */

function ErrorState({ error, onRetry, showRetry }) {
  return (
    <main className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600">
            <AlertCircle size={26} />
          </div>

          <h1 className="mt-5 text-lg font-bold text-slate-900">
            Unable to load skill gap
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">{error}</p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            {showRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
                <RefreshCw size={15} />
                Try again
              </button>
            )}

            <Link
              to="/dashboard/edit-profile"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600">
              Update profile
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------- Match Label ---------- */

function getMatchLabel(percentage) {
  if (percentage >= 80) return "Excellent career alignment";
  if (percentage >= 60) return "Good starting point";
  if (percentage >= 40) return "Some preparation needed";
  return "More skills need development";
}
