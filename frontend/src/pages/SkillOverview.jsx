import React, { useContext } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Code2,
  Lightbulb,
  Pencil,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Link, useOutletContext } from "react-router";
import { CareerContext } from "../context/MyCareer";

const SkillOverview = () => {
  const { student } = useContext(CareerContext);
  console.log(student);

  const technicalRating = Number(student?.technical_rating) || 0;
  const softSkillRating = Number(student?.soft_skill_rating) || 0;

  const technicalSkills = Array.isArray(student?.technical_skills)
    ? student.technical_skills
    : student?.technical_skills
      ? student.technical_skills.split(",").map((skill) => skill.trim())
      : [];

  const programmingLanguages = Array.isArray(student?.programming_languages)
    ? student.programming_languages
    : student?.programming_languages
      ? student.programming_languages
          .split(",")
          .map((language) => language.trim())
      : [];

  const softSkills = Array.isArray(student?.soft_skills)
    ? student.soft_skills
    : student?.soft_skills
      ? student.soft_skills.split(",").map((skill) => skill.trim())
      : [];

  const getRatingMessage = (rating) => {
    if (rating >= 8) return "Strong foundation";
    if (rating >= 6) return "Good foundation";
    if (rating >= 4) return "Room to grow";
    return "Needs attention";
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] px-5 py-7 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-10">
          <Link
            to="/dashboard"
            className="mb-7 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900">
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.14em] text-indigo-600">
                Personal Development
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Your skill overview
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Get a clear picture of your current strengths and the areas
                where you can continue growing.
              </p>
            </div>
          </div>
        </header>

        {/* Skill rating cards */}
        <section className="grid gap-5 md:grid-cols-2">
          {/* Technical skills */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Code2 size={20} />
                </div>

                <h2 className="text-lg font-semibold text-slate-950">
                  Technical skills
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your current technical self-assessment
                </p>
              </div>

              <span className="text-2xl font-semibold tracking-tight text-slate-950">
                {technicalRating}
                <span className="text-sm font-normal text-slate-400">
                  {" "}
                  / 10
                </span>
              </span>
            </div>

            <div className="mt-7">
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-700"
                  style={{
                    width: `${Math.min(technicalRating * 10, 100)}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-400">Developing</span>
                <span className="font-medium text-indigo-600">
                  {getRatingMessage(technicalRating)}
                </span>
              </div>
            </div>
          </div>

          {/* Soft skills */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Users size={20} />
                </div>

                <h2 className="text-lg font-semibold text-slate-950">
                  Soft skills
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your current interpersonal self-assessment
                </p>
              </div>

              <span className="text-2xl font-semibold tracking-tight text-slate-950">
                {softSkillRating}
                <span className="text-sm font-normal text-slate-400">
                  {" "}
                  / 10
                </span>
              </span>
            </div>

            <div className="mt-7">
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                  style={{
                    width: `${Math.min(softSkillRating * 10, 100)}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-400">Developing</span>
                <span className="font-medium text-emerald-600">
                  {getRatingMessage(softSkillRating)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Skills collection */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] sm:p-7">
          <div className="mb-7">
            <p className="text-sm font-medium text-indigo-600">
              Your capabilities
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
              Skills you have added
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              These skills help shape your career recommendations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Technical skills */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Code2 size={17} className="text-indigo-600" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Technical skills
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {technicalSkills.length > 0 ? (
                  technicalSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">
                    No technical skills added yet.
                  </p>
                )}
              </div>
            </div>

            {/* Programming languages */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <BookOpen size={17} className="text-indigo-600" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Programming languages
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {programmingLanguages.length > 0 ? (
                  programmingLanguages.map((language, index) => (
                    <span
                      key={`${language}-${index}`}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700">
                      {language}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">
                    No languages added yet.
                  </p>
                )}
              </div>
            </div>

            {/* Soft skills */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Users size={17} className="text-emerald-600" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Soft skills
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {softSkills.length > 0 ? (
                  softSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">
                    No soft skills added yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Areas to strengthen */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] sm:p-7">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Target size={20} />
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                  Areas to strengthen
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Use your self-assessment as a starting point for deciding
                  where to focus your time and practice.
                </p>
              </div>
            </div>

            <span className="w-fit rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
              Personal focus
            </span>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {technicalRating < 7 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Lightbulb size={16} className="text-amber-500" />
                  Technical practice
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Strengthen your technical foundation through hands-on practice
                  and practical projects.
                </p>
              </div>
            )}

            {softSkillRating < 7 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Users size={16} className="text-emerald-500" />
                  Communication and collaboration
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Look for opportunities to improve communication, teamwork, and
                  collaborative problem-solving.
                </p>
              </div>
            )}

            {technicalRating >= 7 && softSkillRating >= 7 && (
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-5 sm:col-span-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
                  <CheckCircle2 size={16} />
                  You have a balanced foundation
                </div>

                <p className="mt-2 text-sm leading-6 text-emerald-800/70">
                  Your current self-assessments show a good balance. Continue
                  building depth through projects, practice, and real-world
                  experience.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-7 flex items-start gap-3 border-t border-slate-200 pt-6 text-xs leading-5 text-slate-400">
          <Sparkles size={15} className="mt-0.5 shrink-0" />
          <p>
            Your ratings are based on your profile self-assessment. They are
            intended to help you reflect on your current skills and plan your
            next steps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillOverview;
