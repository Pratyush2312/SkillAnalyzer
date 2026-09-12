import React, { useEffect, useState } from "react";
import { ArrowLeft, BriefcaseBusiness, LoaderCircle } from "lucide-react";
import { Link } from "react-router";
import { api } from "../config/api";

const CareerRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRecommendations() {
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
    }

    fetchRecommendations();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <Link
            to="/dashboard"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900">
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <p className="mb-3 text-sm font-medium uppercase tracking-[0.14em] text-indigo-600">
            Career exploration
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Career recommendations
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
            Explore career paths that align with the information in your student
            profile.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex min-h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center gap-3 text-slate-500">
              <LoaderCircle className="animate-spin" size={20} />
              <span>Analyzing your profile...</span>
            </div>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-900">
              Recommendations unavailable
            </h2>

            <p className="mt-2 text-sm text-red-700">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-red-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-800">
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && recommendations.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <BriefcaseBusiness className="mx-auto text-slate-400" size={36} />

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              No recommendations available yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Complete your profile with your skills, interests, and project
              information to generate career recommendations.
            </p>

            <Link
              to="/profile"
              className="mt-6 inline-flex rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700">
              Complete profile
            </Link>
          </div>
        )}

        {/* Recommendations */}
        {!loading && !error && recommendations.length > 0 && (
          <div className="space-y-8">
            {/* Top recommendation */}
            <section>
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-500">
                  Your strongest match
                </p>
              </div>

              <div className="rounded-2xl border border-indigo-100 bg-white p-7 shadow-sm md:p-9">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">
                      Top recommendation
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                      {recommendations[0].career}
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                      This career path received the highest recommendation score
                      based on your current profile.
                    </p>
                  </div>

                  <div className="md:text-right">
                    <p className="text-sm text-slate-500">
                      Recommendation score
                    </p>

                    <p className="mt-1 text-3xl font-semibold text-indigo-600">
                      {recommendations[0].probability}%
                    </p>
                  </div>
                </div>

                <div className="mt-7 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all duration-700"
                    style={{
                      width: `${recommendations[0].probability}%`,
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Other recommendations */}
            <section>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-slate-950">
                  Other career paths
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  These paths may also align with your profile.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {recommendations.slice(1).map((recommendation, index) => (
                  <div
                    key={recommendation.career}
                    className="border-b border-slate-100 p-5 last:border-b-0 md:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-4">
                        <span className="text-sm font-medium text-slate-400">
                          {String(index + 2).padStart(2, "0")}
                        </span>

                        <h3 className="truncate text-base font-medium text-slate-900">
                          {recommendation.career}
                        </h3>
                      </div>

                      <span className="shrink-0 text-sm font-medium text-slate-700">
                        {recommendation.probability}%
                      </span>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-indigo-400 transition-all duration-700"
                        style={{
                          width: `${recommendation.probability}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Explanation */}
            <div className="border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500">
              <strong className="font-medium text-slate-700">
                About these scores:
              </strong>{" "}
              These are model recommendation scores based on your submitted
              profile. They are not guarantees of career success or employment.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerRecommendations;
