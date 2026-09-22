import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  LoaderCircle,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { api } from "../config/api";

const CareerRecommendations = () => {
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/career/recommendations");

      setRecommendations(response.data.recommendations || []);
    } catch (err) {
      console.error("Failed to fetch career recommendations:", err);

      setError(
        err.response?.data?.message ||
          "We could not generate your career recommendations.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const topRecommendation = recommendations[0];

  return (
    <div className="min-h-screen bg-[var(--surface-primary)] text-[var(--text-primary)]">
      <main className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        {/* HEADER */}
        <header className="border-b border-[var(--border-dark)] pb-10">
          <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
            <Link
              to="/dashboard"
              className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]">
              Dashboard
            </Link>

            <ChevronRight size={14} className="text-[var(--text-muted)]" />

            <span className="text-[var(--color-rose)]">
              Career Intelligence
            </span>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--color-rose)]" />

                <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
                  Career exploration
                </p>
              </div>

              <h1 className="text-4xl font-medium leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Where could your
                <br />
                <span className="text-[var(--color-rose)]">
                  skills take you?
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                Explore career paths generated from the skills, interests and
                profile information you've provided.
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard/edit-profile")}
              type="button"
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-[var(--border-dark)] bg-[var(--surface-secondary)] px-5 py-3 text-sm font-medium transition-all duration-300 hover:border-[var(--color-rose)] hover:bg-[var(--color-rose)] hover:text-[var(--text-dark)] cursor-pointer">
              Refine your profile
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </header>

        {/* LOADING */}
        {loading && <LoadingState />}

        {/* ERROR */}
        {!loading && error && (
          <ErrorState error={error} onRetry={fetchRecommendations} />
        )}

        {/* EMPTY */}
        {!loading && !error && recommendations.length === 0 && <EmptyState />}

        {/* RESULTS */}
        {!loading && !error && recommendations.length > 0 && (
          <div>
            {/* TOP SIGNAL */}
            <section className="mt-8 grid gap-px overflow-hidden border border-[var(--border-dark)] bg-[var(--border-dark)] lg:grid-cols-[1.4fr_0.6fr]">
              <div className="bg-[var(--surface-secondary)] p-7 sm:p-10 lg:p-12">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Strongest career signal
                    </p>

                    <p className="mt-3 text-sm text-[var(--text-secondary)]">
                      Based on your current profile
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-dark)]">
                    <Sparkles
                      size={19}
                      strokeWidth={1.5}
                      className="text-[var(--color-rose)]"
                    />
                  </div>
                </div>

                <div className="mt-14">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Recommended path
                  </p>

                  <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                    {topRecommendation.career}
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
                    Your current profile generated the strongest model signal
                    for this career path.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 border border-[var(--border-dark)] bg-[var(--surface-primary)] px-4 py-2.5 text-xs text-[var(--text-secondary)]">
                    <TrendingUp
                      size={14}
                      className="text-[var(--color-rose)]"
                    />
                    {topRecommendation.probability}% model score
                  </span>

                  <span className="inline-flex items-center gap-2 border border-[var(--border-dark)] bg-[var(--surface-primary)] px-4 py-2.5 text-xs text-[var(--text-secondary)]">
                    <Target size={14} className="text-[var(--color-rose)]" />
                    Profile based
                  </span>
                </div>
              </div>

              {/* SCORE */}
              <div className="flex flex-col justify-between bg-[var(--surface-primary)] p-7 sm:p-10 lg:p-12">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Recommendation signal
                </p>

                <div className="py-12">
                  <p className="text-7xl font-medium tracking-[-0.08em] text-[var(--color-rose)]">
                    {topRecommendation.probability}
                    <span className="text-3xl">%</span>
                  </p>

                  <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--text-secondary)]">
                    Model-generated alignment score based on the information
                    currently available in your profile.
                  </p>
                </div>

                <div className="border-t border-[var(--border-dark)] pt-5">
                  <p className="text-xs leading-5 text-[var(--text-muted)]">
                    This is a recommendation signal, not a guarantee of
                    employment or career success.
                  </p>
                </div>
              </div>
            </section>

            {/* OTHER PATHS */}
            {recommendations.length > 1 && (
              <section className="mt-14">
                <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Career landscape
                    </p>

                    <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                      Other paths in your profile.
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
                      These career paths also received signals from your current
                      profile.
                    </p>
                  </div>

                  <span className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">
                    {recommendations.length} paths detected
                  </span>
                </div>

                <div className="border border-[var(--border-dark)]">
                  {recommendations.slice(1).map((recommendation, index) => (
                    <CareerRow
                      key={recommendation.career}
                      recommendation={recommendation}
                      index={index + 2}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* INTERPRETATION */}
            <section className="mt-14 grid gap-px overflow-hidden border border-[var(--border-dark)] bg-[var(--border-dark)] md:grid-cols-[0.65fr_1.35fr]">
              <div className="bg-[var(--color-rose)] p-7 text-[var(--text-dark)] sm:p-10">
                <BriefcaseBusiness size={23} strokeWidth={1.5} />

                <p className="mt-14 text-xs uppercase tracking-[0.2em] opacity-60">
                  What this means
                </p>

                <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em]">
                  A direction,
                  <br />
                  not a destination.
                </h2>
              </div>

              <div className="bg-[var(--surface-secondary)] p-7 sm:p-10">
                <p className="max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                  These recommendations are generated from the information
                  currently available in your profile. As you add projects,
                  assessments, certificates and other evidence, your career
                  intelligence can become more specific.
                </p>

                <div className="mt-9 grid gap-px border border-[var(--border-dark)] bg-[var(--border-dark)] sm:grid-cols-3">
                  <Signal
                    number="01"
                    title="Skills"
                    description="What you can currently demonstrate."
                  />

                  <Signal
                    number="02"
                    title="Evidence"
                    description="How strongly your skills are supported."
                  />

                  <Signal
                    number="03"
                    title="Direction"
                    description="Where your profile currently points."
                  />
                </div>
              </div>
            </section>

            {/* NEXT STEP */}
            <section className="mt-14 border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-7 sm:p-9">
              <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Continue
                  </p>

                  <h2 className="mt-3 text-xl font-medium tracking-[-0.02em]">
                    Want to understand what each path requires?
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
                    Compare your capabilities against a target career and
                    identify the skills you need to develop.
                  </p>
                </div>

                <Link
                  to="/dashboard/skill-gap"
                  className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[var(--color-rose)] px-5 py-3 text-sm font-medium text-[var(--text-dark)] transition-transform duration-300 hover:translate-x-1">
                  Explore skill gaps
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </section>

            {/* FOOTER */}
            <div className="mt-10 flex flex-col justify-between gap-3 border-t border-[var(--border-dark)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row">
              <span>RAAHVI / Career Intelligence</span>

              <span>Your recommendations evolve with your evidence.</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

/* -------------------------------------------------- */
/* CAREER ROW */
/* -------------------------------------------------- */

function CareerRow({ recommendation, index }) {
  return (
    <div className="group border-b border-[var(--border-dark)] bg-[var(--surface-secondary)] p-6 last:border-b-0 transition-colors duration-300 hover:bg-[var(--surface-primary)] sm:p-8">
      <div className="flex items-center gap-5">
        <span className="hidden text-xs text-[var(--text-muted)] sm:block">
          {String(index).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness
                size={17}
                strokeWidth={1.5}
                className="shrink-0 text-[var(--color-rose)]"
              />

              <h3 className="text-base font-medium text-[var(--text-primary)]">
                {recommendation.career}
              </h3>
            </div>

            <span className="text-sm font-medium text-[var(--text-primary)]">
              {recommendation.probability}%
            </span>
          </div>

          <div className="mt-5 h-px bg-[var(--border-dark)]">
            <div
              className="h-full bg-[var(--color-rose)] transition-all duration-700"
              style={{
                width: `${Math.min(
                  Math.max(Number(recommendation.probability) || 0, 0),
                  100,
                )}%`,
              }}
            />
          </div>
        </div>

        <ArrowUpRight
          size={17}
          className="text-[var(--text-muted)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-rose)]"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* SIGNAL */
/* -------------------------------------------------- */

function Signal({ number, title, description }) {
  return (
    <div className="bg-[var(--surface-primary)] p-5">
      <span className="text-xs text-[var(--color-rose)]">{number}</span>

      <h3 className="mt-7 text-sm font-medium">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
        {description}
      </p>
    </div>
  );
}

/* -------------------------------------------------- */
/* LOADING */
/* -------------------------------------------------- */

function LoadingState() {
  return (
    <section className="mt-8">
      <div className="border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-8">
        <div className="flex min-h-72 items-center justify-center">
          <div className="text-center">
            <LoaderCircle
              className="mx-auto animate-spin text-[var(--color-rose)]"
              size={25}
            />

            <p className="mt-5 text-sm text-[var(--text-secondary)]">
              Analyzing your career profile...
            </p>

            <p className="mt-2 text-xs text-[var(--text-muted)]">
              Generating career signals from your current data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* ERROR */
/* -------------------------------------------------- */

function ErrorState({ error, onRetry }) {
  return (
    <section className="mt-8 flex min-h-[55vh] items-center justify-center">
      <div className="w-full max-w-md border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-dark)] text-[var(--color-rose)]">
          <BriefcaseBusiness size={21} />
        </div>

        <h2 className="mt-6 text-xl font-medium">
          Recommendations unavailable
        </h2>

        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
          {error}
        </p>

        <button
          onClick={onRetry}
          type="button"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--color-rose)] px-5 py-3 text-sm font-medium text-[var(--text-dark)] cursor-pointer">
          Try again
          <ArrowUpRight size={15} />
        </button>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* EMPTY */
/* -------------------------------------------------- */

function EmptyState() {
  return (
    <section className="mt-8 flex min-h-[60vh] items-center justify-center border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-8">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border-dark)]">
          <BriefcaseBusiness size={23} className="text-[var(--color-rose)]" />
        </div>

        <h2 className="mt-7 text-xl font-medium">
          Your career map is waiting.
        </h2>

        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
          Add more information to your profile — especially skills, interests
          and project experience — to generate career recommendations.
        </p>

        <Link
          to="/dashboard/edit-profile"
          className="mt-7 inline-flex items-center gap-3 rounded-full bg-[var(--color-rose)] px-5 py-3 text-sm font-medium text-[var(--text-dark)]">
          Complete profile
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}

export default CareerRecommendations;
