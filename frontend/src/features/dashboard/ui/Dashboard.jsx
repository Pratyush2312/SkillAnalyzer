import React, { useEffect, useState} from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  ClipboardCheck,
  Compass,
  FileSearch,
  GraduationCap,
  Pencil,
  Target,
  TrendingUp,
} from "lucide-react";
import { data, useOutletContext } from "react-router";
import { api } from "../../../config/api";

const Dashboard = () => {
  const [student, setStudent] = useState([]);
  useEffect(() => { 
    async function fetchStudent() {
      const res = await api.get('/api/student/profile/get');
      setStudent(res.data.data);
    }
    fetchStudent();
  }, [])

  function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        {/* Header */}
        <section className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-medium text-indigo-600">
              Student dashboard
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Welcome back, {student.name}.
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Keep track of your skills and discover the career paths that fit
              you best.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600">
            <Pencil size={15} />
            Edit profile
          </button>
        </section>

        {/* Profile Completion */}
        <section className="mt-8 border border-slate-200 bg-white p-6 sm:p-7">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Profile completion
              </p>

              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                Complete your remaining profile details to get more accurate
                career recommendations.
              </p>
            </div>

            <p className="text-3xl font-semibold tracking-tight text-slate-950">
              75%
            </p>
          </div>

          <div className="mt-6 h-2 w-full bg-slate-100">
            <div className="h-full w-3/4 bg-indigo-600" />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              3 of 4 profile sections completed
            </p>

            <button
              type="button"
              className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700">
              Complete now
              <span className="ml-1">→</span>
            </button>
          </div>
        </section>

        {/* Main Overview */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Career Direction */}
          <div className="border border-slate-200 bg-white p-6 sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Your career direction
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Based on your current profile
                </p>
              </div>

              <div className="text-indigo-600">
                <Compass size={22} strokeWidth={1.8} />
              </div>
            </div>

            <div className="mt-9">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Primary interest
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                {student?.career_interest}
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                Explore suitable roles, identify missing skills, and build a
                focused career roadmap.
              </p>
            </div>

            <button
              type="button"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700">
              View career recommendations
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Skill Overview */}
          <div className="border border-slate-200 bg-white p-6 sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Skill overview
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Your current self-assessment
                </p>
              </div>

              <TrendingUp
                size={22}
                strokeWidth={1.8}
                className="text-indigo-600"
              />
            </div>

            <div className="mt-8 space-y-7">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    Technical skills
                  </span>

                  <span className="text-sm font-semibold text-slate-950">
                    7.8 <span className="font-normal text-slate-400">/ 10</span>
                  </span>
                </div>

                <div className="h-1.5 bg-slate-100">
                  <div className="h-full w-[78%] bg-indigo-600" />
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-slate-600">Soft skills</span>

                  <span className="text-sm font-semibold text-slate-950">
                    8.2 <span className="font-normal text-slate-400">/ 10</span>
                  </span>
                </div>

                <div className="h-1.5 bg-slate-100">
                  <div className="h-full w-[82%] bg-indigo-600" />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700">
              Analyze my skills
              <ArrowUpRight size={16} />
            </button>
          </div>
        </section>

        {/* Actions */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Continue your career journey
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Choose an action to move forward.
            </p>
          </div>

          <div className="grid border border-slate-200 bg-white sm:grid-cols-2 lg:grid-cols-4">
            <button
              type="button"
              className="group border-b border-slate-200 p-5 text-left transition hover:bg-slate-50 sm:border-r lg:border-b-0">
              <ClipboardCheck
                size={22}
                strokeWidth={1.8}
                className="text-indigo-600"
              />

              <h3 className="mt-5 text-sm font-semibold text-slate-900">
                Skill analysis
              </h3>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                Understand your current strengths.
              </p>

              <ChevronRight
                size={17}
                className="mt-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
              />
            </button>

            <button
              type="button"
              className="group border-b border-slate-200 p-5 text-left transition hover:bg-slate-50 lg:border-b-0 lg:border-r">
              <GraduationCap
                size={22}
                strokeWidth={1.8}
                className="text-indigo-600"
              />

              <h3 className="mt-5 text-sm font-semibold text-slate-900">
                Career recommendations
              </h3>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                Find career paths matching your profile.
              </p>

              <ChevronRight
                size={17}
                className="mt-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
              />
            </button>

            <button
              type="button"
              className="group border-b border-slate-200 p-5 text-left transition hover:bg-slate-50 sm:border-r lg:border-b-0">
              <Target size={22} strokeWidth={1.8} className="text-indigo-600" />

              <h3 className="mt-5 text-sm font-semibold text-slate-900">
                Skill gap analysis
              </h3>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                Identify skills needed for your goals.
              </p>

              <ChevronRight
                size={17}
                className="mt-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
              />
            </button>

            <button
              type="button"
              className="group p-5 text-left transition hover:bg-slate-50">
              <BriefcaseBusiness
                size={22}
                strokeWidth={1.8}
                className="text-indigo-600"
              />

              <h3 className="mt-5 text-sm font-semibold text-slate-900">
                Job recommendations
              </h3>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                Explore jobs related to your skills.
              </p>

              <ChevronRight
                size={17}
                className="mt-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
              />
            </button>
          </div>
        </section>

        {/* Recent Activity / Status */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <FileSearch
                size={20}
                strokeWidth={1.8}
                className="text-indigo-600"
              />

              <h2 className="text-sm font-semibold text-slate-900">
                Next recommended step
              </h2>
            </div>

            <p className="mt-5 text-base font-medium text-slate-900">
              Review your skill gaps for Full Stack Development.
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Knowing what to improve will help you prepare for relevant roles
              more effectively.
            </p>

            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              View skill gaps
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness
                size={20}
                strokeWidth={1.8}
                className="text-indigo-600"
              />

              <h2 className="text-sm font-semibold text-slate-900">
                Profile summary
              </h2>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Academic year</span>
                <span className="font-medium text-slate-900">
                  {student.year === 1
                    ? `${student.year}st year`
                    : `${student.year}nd year`}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Projects completed</span>
                <span className="font-medium text-slate-900">
                  {student.projects ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Assessment method</span>
                <span className="font-medium text-slate-900">
                  {capitalizeWord(student?.method.split("_").join(" "))}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              View profile
              <ArrowUpRight size={16} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
