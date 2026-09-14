import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Save,
  LoaderCircle,
  UserRound,
  Code2,
  Users,
  BriefcaseBusiness,
} from "lucide-react";
import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { CareerContext } from "../context/MyCareer";
import { api } from "../config/api";
import { toast } from "react-hot-toast";

export default function EditProfile() {
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      name: "",
      year: "",
      current_course: "",
      technical_skills: "",
      programming_languages: "",
      technical_rating: 0,
      soft_skills: "",
      soft_skill_rating: 0,
      projects: false,
      career_interest: "",
      challenges: "",
      support_required: "",
      method: "",
    },
  });

  const { student } = useContext(CareerContext);

  const [loading, setLoading] = useState(false);

  const technicalRating = watch("technical_rating");
  const softSkillRating = watch("soft_skill_rating");

  function getYearLabel(year) {
    const numericYear = Number(year);

    if (!Number.isFinite(numericYear)) {
      return "Not available";
    }
    if (year === 5) {
      return "Graduate";
    }
    if (numericYear === 1) return "1st Year";
    if (numericYear === 2) return "2nd Year";
    if (numericYear === 3) return "3rd Year";

    return `${numericYear}th Year`;
  }

  useEffect(() => {
    if (!student) return;

    reset({
      name: student.name || "",
      year: getYearLabel(student.year) || "",
      current_course: student.current_course || "",
      technical_skills: student.technical_skills || "",
      programming_languages: student.programming_languages || "",
      technical_rating: student.technical_rating || 0,
      soft_skills: student.soft_skills || "",
      soft_skill_rating: student.soft_skill_rating || 0,
      projects: student.projects || false,
      career_interest: student.career_interest || "",
      challenges: student.challenges || "",
      support_required: student.support_required || "",
      method: student.method || "",
    });
  }, [student, reset]);

  const formatText = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }

    return String(value || "").trim();
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const yearMap = {
        "1st Year": 1,
        "2nd Year": 2,
        "3rd Year": 3,
        "4th Year": 4,
        Graduate: 5,
      };

      const formattedData = {
        ...data,

        year: yearMap[data.year] || null,

        technical_skills: formatText(data.technical_skills),
        programming_languages: formatText(data.programming_languages),
        soft_skills: formatText(data.soft_skills),

        name: formatText(data.name),
        current_course: formatText(data.current_course),
        career_interest: formatText(data.career_interest),
        challenges: formatText(data.challenges),
        support_required: formatText(data.support_required),
        method: formatText(data.method),

        technical_rating: Number(data.technical_rating) || 0,
        soft_skill_rating: Number(data.soft_skill_rating) || 0,

        projects: data.projects === true || data.projects === "true",
      };
      await api.put("/api/student/profile/update", formattedData);

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600">
            <ArrowLeft size={17} />
            Back to dashboard
          </Link>

          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
              <UserRound size={25} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Edit profile
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Update your information to improve your career recommendations.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={<UserRound size={21} />}
              title="Personal information"
              description="Basic details about you"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                label="Full name"
                name="name"
                register={register}
                placeholder="Enter your full name"
              />

              <SelectField
                label="Academic year"
                name="year"
                register={register}
                options={[
                  "1st Year",
                  "2nd Year",
                  "3rd Year",
                  "4th Year",
                  "Graduate",
                ]}
              />

              <div className="sm:col-span-2">
                <InputField
                  label="Current course"
                  name="current_course"
                  register={register}
                  placeholder="e.g. B.Tech Computer Science"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={<Code2 size={21} />}
              title="Technical skills"
              description="Tell us about your technical background"
            />

            <div className="space-y-5">
              <TextAreaField
                label="Technical skills"
                name="technical_skills"
                register={register}
                placeholder="e.g. Web Development, Data Analysis, Machine Learning"
                hint="Separate multiple skills with commas"
              />

              <TextAreaField
                label="Programming languages"
                name="programming_languages"
                register={register}
                placeholder="e.g. JavaScript, Python, Java"
                hint="Separate multiple languages with commas"
              />

              <RatingField
                label="How would you rate your technical skills?"
                name="technical_rating"
                register={register}
                value={technicalRating}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={<Users size={21} />}
              title="Soft skills"
              description="Highlight your interpersonal strengths"
            />

            <div className="space-y-5">
              <TextAreaField
                label="Soft skills"
                name="soft_skills"
                register={register}
                placeholder="e.g. Communication, Leadership, Problem Solving"
                hint="Separate multiple skills with commas"
              />

              <RatingField
                label="How would you rate your soft skills?"
                name="soft_skill_rating"
                register={register}
                value={softSkillRating}
              />
            </div>
          </section>

          {/* Career Preferences */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={<BriefcaseBusiness size={21} />}
              title="Career preferences"
              description="Help us understand your goals"
            />

            <div className="space-y-5">
              <InputField
                label="Career interest"
                name="career_interest"
                register={register}
                placeholder="e.g. AI Engineer, Software Developer"
              />

              <TextAreaField
                label="Current challenges"
                name="challenges"
                register={register}
                placeholder="What challenges are you facing in your career journey?"
              />

              <TextAreaField
                label="Support required"
                name="support_required"
                register={register}
                placeholder="What kind of support would help you?"
              />

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

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <input
                  type="checkbox"
                  {...register("projects")}
                  className="h-4 w-4 accent-indigo-600"
                />

                <span>
                  <span className="block text-sm font-medium text-slate-800">
                    I have worked on projects
                  </span>

                  <span className="text-xs text-slate-500">
                    Include this information in my career assessment
                  </span>
                </span>
              </label>
            </div>
          </section>

          {/* Buttons */}
          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <Link
              to="/dashboard"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Reusable UI Components ---------- */

function SectionHeader({ icon, title, description }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="text-indigo-600">{icon}</div>

      <div>
        <h2 className="font-semibold text-slate-900">{title}</h2>

        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function InputField({ label, name, register, placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type="text"
        {...register(name)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
      />
    </div>
  );
}

function TextAreaField({ label, name, register, placeholder, hint }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <textarea
        {...register(name)}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
      />

      {hint && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

function SelectField({ label, name, register, options }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        defaultValue=""
        {...register(name)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50">
        <option value="">Select an option</option>

        {options.map((option) => (
          <option key={option} value={option.to_lower}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function RatingField({ label, name, register, value }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>

        <span className="text-sm font-semibold text-indigo-600">
          {value}/5
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="5"
        {...register(name, { valueAsNumber: true })}
        className="w-full accent-indigo-600"
      />

      <div className="mt-1 flex justify-between text-xs text-slate-400">
        <span>Beginner</span>
        <span>Advanced</span>
      </div>
    </div>
  );
}
