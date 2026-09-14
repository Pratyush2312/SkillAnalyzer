import {
  UserRound,
  GraduationCap,
  Code2,
  Brain,
  FolderKanban,
  Target,
  MessageSquare,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import useProfileHook from "../hooks/useProfileHook";
import { useNavigate } from "react-router";

function ProfileSetup() {
  const { register, errors, handleSubmit, onSubmit } = useProfileHook();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Startum
            </span>
          </div>

          <span className="text-sm text-slate-500">Profile setup</span>
        </div>

        <div className="mb-8">
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-full rounded-full bg-blue-600" />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-[#f1f6ff] p-6 lg:sticky lg:top-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <UserRound className="h-6 w-6" />
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
              Build your profile
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Share your academic background, skills, interests, and career
              goals to help SkillMatch understand your profile.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                  1
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Academic background
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Your current course and academic year.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                  2
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Skills and projects
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Your technical and soft skills.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                  3
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Career preferences
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Your interests and support needs.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <main className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                PROFILE INFORMATION
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                Tell us about yourself
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                This information will help us generate relevant skill insights
                and career recommendations.
              </p>

              {Object.keys(errors).length > 0 && (
                <p className="mt-4 text-sm text-red-600" role="alert">
                  Please complete all required profile fields before saving.
                </p>
              )}
            </div>

            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <GraduationCap className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Academic background
                    </h3>
                    <p className="text-xs text-slate-500">
                      Tell us about your current studies.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-700">
                      Full name
                    </label>

                    <div className="relative">
                      <UserRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        {...register("name", {
                          required: "Full name is required",
                        })}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="year"
                      className="mb-2 block text-sm font-medium text-slate-700">
                      Academic year
                    </label>

                    <select
                      id="year"
                      name="year"
                      defaultValue=""
                      {...register("year", {
                        required: "Academic year is required",
                      })}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10">
                      <option value="" disabled>
                        Select your year
                      </option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="Graduate">Graduate</option>
                    </select>

                    {errors.year && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.year.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="current_course"
                      className="mb-2 block text-sm font-medium text-slate-700">
                      Current course
                    </label>

                    <div className="relative">
                      <GraduationCap className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="current_course"
                        name="current_course"
                        type="text"
                        placeholder="e.g. B.Tech Computer Science and Engineering"
                        {...register("current_course", {
                          required: "Current course is required",
                        })}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    {errors.current_course && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.current_course.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <div className="h-px bg-slate-100" />

              <section>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Code2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Technical skills
                    </h3>
                    <p className="text-xs text-slate-500">
                      Describe your technical knowledge.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="technical_skills"
                      className="mb-2 block text-sm font-medium text-slate-700">
                      Technical skills
                    </label>

                    <textarea
                      id="technical_skills"
                      name="technical_skills"
                      rows="3"
                      placeholder="e.g. Web development, database management, data structures, machine learning"
                      {...register("technical_skills", {
                        required: "Technical skills are required",
                      })}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    {errors.technical_skills && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.technical_skills.message}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-slate-400">
                      Separate multiple skills with commas.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="programming_languages"
                      className="mb-2 block text-sm font-medium text-slate-700">
                      Programming languages
                    </label>

                    <input
                      id="programming_languages"
                      name="programming_languages"
                      type="text"
                      placeholder="e.g. JavaScript, Python, Java, C++"
                      {...register("programming_languages", {
                        required: "Programming languages are required",
                      })}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    {errors.programming_languages && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.programming_languages.message}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-slate-400">
                      Separate multiple languages with commas.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="technical_rating"
                      className="mb-2 block text-sm font-medium text-slate-700">
                      Rate your technical skills
                    </label>

                    <select
                      id="technical_rating"
                      name="technical_rating"
                      defaultValue=""
                      {...register("technical_rating", {
                        required: "Technical rating is required",
                      })}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10">
                      <option value="" disabled>
                        Select your rating
                      </option>
                      <option value="1">1 - Beginner</option>
                      <option value="2">2 - Basic</option>
                      <option value="3">3 - Intermediate</option>
                      <option value="4">4 - Advanced</option>
                      <option value="5">5 - Expert</option>
                    </select>

                    {errors.technical_rating && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.technical_rating.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <div className="h-px bg-slate-100" />

              <section>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Brain className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Soft skills
                    </h3>
                    <p className="text-xs text-slate-500">
                      Tell us about your interpersonal strengths.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="soft_skills"
                      className="mb-2 block text-sm font-medium text-slate-700">
                      Soft skills
                    </label>

                    <textarea
                      id="soft_skills"
                      name="soft_skills"
                      rows="3"
                      placeholder="e.g. Communication, teamwork, leadership, problem-solving"
                      {...register("soft_skills", {
                        required: "Soft skills are required",
                      })}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    {errors.soft_skills && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.soft_skills.message}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-slate-400">
                      Separate multiple skills with commas.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="soft_skill_rating"
                      className="mb-2 block text-sm font-medium text-slate-700">
                      Rate your soft skills
                    </label>

                    <select
                      id="soft_skill_rating"
                      name="soft_skill_rating"
                      defaultValue=""
                      {...register("soft_skill_rating", {
                        required: "Soft skill rating is required",
                      })}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10">
                      <option value="" disabled>
                        Select your rating
                      </option>
                      <option value="1">1 - Beginner</option>
                      <option value="2">2 - Basic</option>
                      <option value="3">3 - Intermediate</option>
                      <option value="4">4 - Advanced</option>
                      <option value="5">5 - Expert</option>
                    </select>

                    {errors.soft_skill_rating && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.soft_skill_rating.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <div className="h-px bg-slate-100" />

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Projects
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Tell us whether you have completed any technical or academic
                    projects.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Have you worked on any projects?
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-400 hover:bg-indigo-50">
                      <input
                        type="radio"
                        name="projects"
                        value="true"
                        {...register("projects", {
                          required: "Please select whether you have projects",
                        })}
                        className="h-4 w-4 accent-indigo-600"
                      />
                      <div>
                        <p className="font-medium text-slate-900">Yes</p>
                        <p className="text-sm text-slate-500">
                          I have completed one or more projects
                        </p>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-400 hover:bg-indigo-50">
                      <input
                        type="radio"
                        name="projects"
                        value="false"
                        {...register("projects", {
                          required: "Please select whether you have projects",
                        })}
                        className="h-4 w-4 accent-indigo-600"
                      />
                      <div>
                        <p className="font-medium text-slate-900">No</p>
                        <p className="text-sm text-slate-500">
                          I have not completed any projects yet
                        </p>
                      </div>
                    </label>
                  </div>

                  {errors.projects && (
                    <p className="mt-2 text-sm text-red-600" role="alert">
                      {errors.projects.message}
                    </p>
                  )}
                </div>
              </section>

              <div className="h-px bg-slate-100" />

              <section>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Target className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Career interests
                    </h3>
                    <p className="text-xs text-slate-500">
                      Help us understand your direction.
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="career_interest"
                    className="mb-2 block text-sm font-medium text-slate-700">
                    Career interest
                  </label>

                  <textarea
                    id="career_interest"
                    name="career_interest"
                    rows="3"
                    placeholder="e.g. I am interested in becoming a full-stack developer or data analyst."
                    {...register("career_interest", {
                      required: "Career interest is required",
                    })}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  {errors.career_interest && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.career_interest.message}
                    </p>
                  )}
                </div>
              </section>

              <div className="h-px bg-slate-100" />

              <section>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MessageSquare className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Challenges and support
                    </h3>
                    <p className="text-xs text-slate-500">
                      Tell us where you need guidance.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="challenges"
                      className="mb-2 block text-sm font-medium text-slate-700">
                      Current challenges
                    </label>

                    <textarea
                      id="challenges"
                      name="challenges"
                      rows="3"
                      placeholder="e.g. I find it difficult to choose a career path or identify the skills I need to improve."
                      {...register("challenges", {
                        required: "Current challenges are required",
                      })}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    {errors.challenges && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.challenges.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="support_required"
                      className="mb-2 block text-sm font-medium text-slate-700">
                      Support required
                    </label>

                    <textarea
                      id="support_required"
                      name="support_required"
                      rows="3"
                      placeholder="e.g. Career guidance, learning resources, skill improvement suggestions, or job recommendations."
                      {...register("support_required", {
                        required: "Support requirements are required",
                      })}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    {errors.support_required && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.support_required.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <div className="h-px bg-slate-100" />

              <section>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <ClipboardList className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Learning method
                    </h3>
                    <p className="text-xs text-slate-500">
                      Select how you want to provide your information.
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="method"
                    className="mb-2 block text-sm font-medium text-slate-700">
                    Method
                  </label>

                  <select
                    id="method"
                    name="method"
                    defaultValue=""
                    {...register("method", {
                      required: "Assessment method is required",
                    })}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10">
                    <option value="" disabled>
                      Select a method
                    </option>
                    <option value="videos">Videos</option>
                    <option value="documentation">Documentation</option>
                    <option value="hands_on_projects">Hands on Projects</option>
                    <option value="courses">Courses</option>
                  </select>

                  {errors.method && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.method.message}
                    </p>
                  )}
                </div>
              </section>

              <div className="flex justify-end border-t border-slate-100 pt-6">
                <button
                  // onClick={() => navigate("/")}
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]">
                  Save profile
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetup;
