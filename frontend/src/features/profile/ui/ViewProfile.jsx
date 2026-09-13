import {
  ArrowLeft,
  UserRound,
  Code2,
  Users,
  BriefcaseBusiness,
  Pencil,
  GraduationCap,
  Star,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { CareerContext } from "../../../context/MyCareer";
import useProfileHook from "../hooks/useProfileHook";

export default function ViewProfile() {
  const { student } = useContext(CareerContext);
  const { handleLogout } = useProfileHook();
  if (!student) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">
          Profile information is not available.
        </p>
      </div>
    );
  }

  const getYearLabel = (year) => {
    const numericYear = Number(year);

    if (!Number.isFinite(numericYear)) {
      return "Not available";
    }

    if (numericYear === 1) return "1st Year";
    if (numericYear === 2) return "2nd Year";
    if (numericYear === 3) return "3rd Year";
    if (numericYear === 4) return "4th Year";

    return `${numericYear}th Year`;
  };

  const getRatingLabel = (rating) => {
    const numericRating = Number(rating) || 0;

    if (numericRating <= 3) return "Beginner";
    if (numericRating <= 6) return "Intermediate";
    if (numericRating <= 8) return "Good";
    return "Advanced";
  };

  const technicalRating = Number(student.technical_rating) || 0;
  const softSkillRating = Number(student.soft_skill_rating) || 0;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <Link
              to="/dashboard"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600">
              <ArrowLeft size={17} />
              Back to dashboard
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-2xl font-bold text-indigo-600">
                {student.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  {student.name || "Your Profile"}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  {student.current_course || "Course not specified"}{" "}
                  {student.year && <span>• {getYearLabel(student.year)}</span>}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <ProfileSection
            icon={<UserRound size={21} />}
            title="Personal information"
            description="Your basic academic details">
            <div className="grid gap-5 sm:grid-cols-2">
              <InfoItem label="Full name" value={student.name} />

              <InfoItem
                label="Academic year"
                value={getYearLabel(student.year)}
              />

              <InfoItem
                label="Current course"
                value={student.current_course}
                fullWidth
              />
            </div>
          </ProfileSection>

          <ProfileSection
            icon={<Code2 size={21} />}
            title="Technical skills"
            description="Your technical background and expertise">
            <div className="space-y-6">
              <InfoItem
                label="Technical skills"
                value={student.technical_skills}
              />

              <InfoItem
                label="Programming languages"
                value={student.programming_languages}
              />

              <RatingDisplay
                label="Technical skill rating"
                rating={technicalRating}
                description={getRatingLabel(technicalRating)}
              />
            </div>
          </ProfileSection>

          <ProfileSection
            icon={<Users size={21} />}
            title="Soft skills"
            description="Your interpersonal and professional strengths">
            <div className="space-y-6">
              <InfoItem label="Soft skills" value={student.soft_skills} />

              <RatingDisplay
                label="Soft skill rating"
                rating={softSkillRating}
                description={getRatingLabel(softSkillRating)}
              />
            </div>
          </ProfileSection>

          <ProfileSection
            icon={<BriefcaseBusiness size={21} />}
            title="Career preferences"
            description="Your career goals and learning preferences">
            <div className="grid gap-5 sm:grid-cols-2">
              <InfoItem
                label="Career interest"
                value={student.career_interest}
              />

              <InfoItem
                label="Preferred learning method"
                value={student.method}
              />

              <InfoItem
                label="Current challenges"
                value={student.challenges}
                fullWidth
              />

              <InfoItem
                label="Support required"
                value={student.support_required}
                fullWidth
              />

              <div className="sm:col-span-2">
                <p className="mb-2 text-sm font-medium text-slate-500">
                  Project experience
                </p>

                {student.projects ? (
                  <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                    <CheckCircle2 size={17} />
                    Has worked on projects
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
                    <XCircle size={17} />
                    No project experience added
                  </div>
                )}
              </div>
            </div>
          </ProfileSection>
          <button
            onClick={handleLogout}
            className="border border-slate-200 rounded-2xl bg-red-500 text-white px-3 py-2">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileSection({ icon, title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="text-indigo-600">{icon}</div>

        <div>
          <h2 className="font-semibold text-slate-900">{title}</h2>

          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>

      {children}
    </section>
  );
}

function InfoItem({ label, value, fullWidth = false }) {
  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <p className="mb-2 text-sm font-medium text-slate-500">{label}</p>

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
        {value || <span className="italic text-slate-400">Not provided</span>}
      </div>
    </div>
  );
}

function RatingDisplay({ label, rating, description }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>

        <div className="flex items-center gap-2">
          <Star size={16} className="fill-amber-400 text-amber-400" />

          <span className="text-sm font-semibold text-indigo-600">
            {rating}/10
          </span>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all"
          style={{
            width: `${Math.min(Math.max(rating, 0), 10) * 10}%`,
          }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-400">{description}</p>
    </div>
  );
}
