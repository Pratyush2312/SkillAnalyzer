import {
  UserRound,
  GraduationCap,
  Code2,
  Brain,
  FolderKanban,
  Target,
  MessageSquare,
  ClipboardList,
  FileText,
  GitBranchPlus,
  Award,
  ClipboardCheck,
  Database,
  ArrowRight,
  CheckCircle2,
  Upload,
  Plus,
} from "lucide-react";

import useProfileHook from "../hooks/useProfileHook";

function ProfileSetup() {
  const { register, errors, handleSubmit, onSubmit } = useProfileHook();

  return (
    <div className="min-h-screen bg-[var(--surface-primary)] px-4 py-8 text-[var(--text-primary)] sm:px-6 lg:px-8">
      <div className="flex w-full flex-col gap-8">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[var(--border-dark)] pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-dark)]">
              <span className="text-xs font-medium text-[var(--color-rose)]">
                R
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-lg font-medium tracking-[-0.03em]">
                RAAHVI
              </span>

              <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Skill Intelligence
              </span>
            </div>
          </div>

          <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Profile setup
          </span>
        </header>

        {/* Progress */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-rose)]">
              Build your profile
            </span>

            <span className="text-[10px] text-[var(--text-muted)]">
              01 — 04
            </span>
          </div>

          <div className="h-px w-full bg-[var(--border-dark)]">
            <div className="h-px w-1/4 bg-[var(--color-rose)]" />
          </div>
        </div>

        {/* Main */}
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="flex h-fit flex-col gap-8 rounded-[var(--radius-lg)] border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-6 lg:sticky lg:top-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-dark)]">
              <Database size={18} className="text-[var(--color-rose)]" />
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-medium tracking-[-0.04em]">
                Build your
                <br />
                <span className="text-[var(--color-rose)]">
                  RAAHVI profile.
                </span>
              </h1>

              <p className="text-sm leading-6 text-[var(--text-muted)]">
                Bring together your academic background, skills, projects and
                experience so RAAHVI can build a unified view of your
                capabilities.
              </p>
            </div>

            {/* Steps */}
            <div className="flex flex-col">
              {[
                {
                  number: "01",
                  title: "About you",
                  description: "Academic information",
                  active: true,
                },
                {
                  number: "02",
                  title: "Your data",
                  description: "Skills & experience",
                  active: false,
                },
                {
                  number: "03",
                  title: "Your evidence",
                  description: "Projects & credentials",
                  active: false,
                },
                {
                  number: "04",
                  title: "Your direction",
                  description: "Career & goals",
                  active: false,
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="flex items-start gap-3 border-t border-[var(--border-dark)] py-4">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[9px] ${
                      step.active
                        ? "border-[var(--color-rose)] bg-[var(--color-rose)] text-[var(--color-black)]"
                        : "border-[var(--border-dark)] text-[var(--text-muted)]"
                    }`}>
                    {step.number}
                  </span>

                  <div className="flex flex-col gap-1">
                    <p
                      className={`text-xs font-medium ${
                        step.active
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)]"
                      }`}>
                      {step.title}
                    </p>

                    <p className="text-[10px] text-[var(--text-muted)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Intelligence note */}
            <div className="flex flex-col gap-3 border-t border-[var(--border-dark)] pt-6">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-rose)]" />

                <span className="text-[9px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Unified intelligence
                </span>
              </div>

              <p className="text-xs leading-5 text-[var(--text-muted)]">
                Your information becomes evidence that contributes to your
                personal skill graph.
              </p>
            </div>
          </aside>

          {/* Form */}
          <main className="flex flex-col gap-10 rounded-[var(--radius-lg)] border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-3 border-b border-[var(--border-dark)] pb-8">
              <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--color-rose)]">
                Profile information
              </span>

              <h2 className="text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
                Tell us about
                <span className="text-[var(--color-rose)]"> yourself.</span>
              </h2>

              <p className="max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                Start with the information you know. RAAHVI will combine it with
                evidence from your projects, certificates, assessments and other
                sources.
              </p>

              {Object.keys(errors).length > 0 && (
                <div className="flex items-center gap-3 border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 p-4 text-xs text-[var(--color-danger)]">
                  <MessageSquare size={15} />
                  <span>
                    Please complete the required fields before continuing.
                  </span>
                </div>
              )}
            </div>

            <form
              className="flex flex-col gap-10"
              onSubmit={handleSubmit(onSubmit)}>
              {/* =====================================================
                  01 — ABOUT YOU
              ====================================================== */}
              <section className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-dark)]">
                    <GraduationCap
                      size={17}
                      className="text-[var(--color-rose)]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-rose)]">
                      01 — About you
                    </span>

                    <h3 className="text-lg font-medium">
                      Your academic foundation
                    </h3>

                    <p className="text-xs leading-5 text-[var(--text-muted)]">
                      Basic information about your current academic journey.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-medium text-[var(--text-secondary)]">
                      Full name
                    </label>

                    <div className="relative">
                      <UserRound
                        size={15}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                      />

                      <input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        {...register("name", {
                          required: "Full name is required",
                        })}
                        className="h-12 w-full rounded-[var(--radius-sm)] border border-[var(--border-dark)] bg-[var(--surface-primary)] pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--color-rose)]"
                      />
                    </div>

                    {errors.name && (
                      <p className="text-xs text-[var(--color-danger)]">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Year */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="year"
                      className="text-xs font-medium text-[var(--text-secondary)]">
                      Academic year
                    </label>

                    <select
                      id="year"
                      defaultValue=""
                      {...register("year", {
                        required: "Academic year is required",
                      })}
                      className="h-12 w-full rounded-[var(--radius-sm)] border border-[var(--border-dark)] bg-[var(--surface-primary)] px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-rose)]">
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
                      <p className="text-xs text-[var(--color-danger)]">
                        {errors.year.message}
                      </p>
                    )}
                  </div>

                  {/* Course */}
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label
                      htmlFor="current_course"
                      className="text-xs font-medium text-[var(--text-secondary)]">
                      Current course
                    </label>

                    <div className="relative">
                      <GraduationCap
                        size={15}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                      />

                      <input
                        id="current_course"
                        type="text"
                        placeholder="e.g. B.Tech Computer Science and Engineering"
                        {...register("current_course", {
                          required: "Current course is required",
                        })}
                        className="h-12 w-full rounded-[var(--radius-sm)] border border-[var(--border-dark)] bg-[var(--surface-primary)] pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--color-rose)]"
                      />
                    </div>

                    {errors.current_course && (
                      <p className="text-xs text-[var(--color-danger)]">
                        {errors.current_course.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <div className="h-px bg-[var(--border-dark)]" />

              {/* =====================================================
                  02 — YOUR DATA
              ====================================================== */}
              <section className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-dark)]">
                    <Database size={17} className="text-[var(--color-rose)]" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-rose)]">
                      02 — Your data
                    </span>

                    <h3 className="text-lg font-medium">
                      Bring your experience together
                    </h3>

                    <p className="text-xs leading-5 text-[var(--text-muted)]">
                      RAAHVI can build your profile from multiple sources,
                      rather than relying on a single form.
                    </p>
                  </div>
                </div>

                {/* Source cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      icon: GitBranchPlus,
                      title: "GitHub",
                      description: "Repositories, code and technologies.",
                      action: "Connect",
                      available: false,
                    },
                    {
                      icon: FileText,
                      title: "Resume",
                      description: "Experience, skills and education.",
                      action: "Upload",
                      available: false,
                    },
                    {
                      icon: FolderKanban,
                      title: "Projects",
                      description: "Work you've built and skills applied.",
                      action: "Add project",
                      available: true,
                    },
                    {
                      icon: Award,
                      title: "Certificates",
                      description: "Courses, credentials and achievements.",
                      action: "Add certificate",
                      available: true,
                    },
                    {
                      icon: ClipboardCheck,
                      title: "Assessments",
                      description: "Scores and demonstrated proficiency.",
                      action: "Add assessment",
                      available: true,
                    },
                    {
                      icon: BriefcaseIcon,
                      title: "Experience",
                      description: "Internships, jobs and practical work.",
                      action: "Add experience",
                      available: false,
                    },
                  ].map((source) => {
                    const Icon = source.icon;

                    return (
                      <div
                        key={source.title}
                        className="flex flex-col gap-5 rounded-[var(--radius-md)] border border-[var(--border-dark)] bg-[var(--surface-primary)] p-5 transition hover:border-[var(--color-rose)]/40">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-dark)]">
                            <Icon
                              size={16}
                              className="text-[var(--color-rose)]"
                            />
                          </div>

                          {!source.available && (
                            <span className="rounded-full border border-[var(--border-dark)] px-2.5 py-1 text-[8px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                              Coming soon
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <h4 className="text-sm font-medium">
                            {source.title}
                          </h4>

                          <p className="text-xs leading-5 text-[var(--text-muted)]">
                            {source.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          disabled={!source.available}
                          className="flex items-center justify-between border-t border-[var(--border-dark)] pt-4 text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--text-secondary)] disabled:cursor-not-allowed disabled:opacity-40">
                          <span>{source.action}</span>
                          {source.available ? (
                            <Plus size={13} />
                          ) : (
                            <ArrowRight size={13} />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Self reported skills */}
                <div className="flex flex-col gap-6 border-t border-[var(--border-dark)] pt-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Self-reported information
                    </span>

                    <p className="text-xs leading-5 text-[var(--text-muted)]">
                      You can still tell us what you already know. These become
                      one source of evidence in your unified profile.
                    </p>
                  </div>

                  <div className="grid gap-5">
                    {/* Technical skills */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="technical_skills"
                        className="text-xs font-medium text-[var(--text-secondary)]">
                        Technical skills
                      </label>

                      <textarea
                        id="technical_skills"
                        rows="3"
                        placeholder="e.g. React, Node.js, MongoDB, REST APIs"
                        {...register("technical_skills", {
                          required: "Technical skills are required",
                        })}
                        className="w-full resize-none rounded-[var(--radius-sm)] border border-[var(--border-dark)] bg-[var(--surface-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--color-rose)]"
                      />

                      <span className="text-[10px] text-[var(--text-muted)]">
                        Separate multiple skills with commas.
                      </span>

                      {errors.technical_skills && (
                        <p className="text-xs text-[var(--color-danger)]">
                          {errors.technical_skills.message}
                        </p>
                      )}
                    </div>

                    {/* Languages */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="programming_languages"
                        className="text-xs font-medium text-[var(--text-secondary)]">
                        Programming languages
                      </label>

                      <input
                        id="programming_languages"
                        type="text"
                        placeholder="e.g. JavaScript, Python, C++, Java"
                        {...register("programming_languages", {
                          required: "Programming languages are required",
                        })}
                        className="h-12 w-full rounded-[var(--radius-sm)] border border-[var(--border-dark)] bg-[var(--surface-primary)] px-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--color-rose)]"
                      />

                      <span className="text-[10px] text-[var(--text-muted)]">
                        Separate multiple languages with commas.
                      </span>

                      {errors.programming_languages && (
                        <p className="text-xs text-[var(--color-danger)]">
                          {errors.programming_languages.message}
                        </p>
                      )}
                    </div>

                    {/* Soft skills */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="soft_skills"
                        className="text-xs font-medium text-[var(--text-secondary)]">
                        Soft skills
                      </label>

                      <textarea
                        id="soft_skills"
                        rows="3"
                        placeholder="e.g. Communication, teamwork, leadership"
                        {...register("soft_skills", {
                          required: "Soft skills are required",
                        })}
                        className="w-full resize-none rounded-[var(--radius-sm)] border border-[var(--border-dark)] bg-[var(--surface-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--color-rose)]"
                      />

                      <span className="text-[10px] text-[var(--text-muted)]">
                        Separate multiple skills with commas.
                      </span>

                      {errors.soft_skills && (
                        <p className="text-xs text-[var(--color-danger)]">
                          {errors.soft_skills.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <div className="h-px bg-[var(--border-dark)]" />

              {/* =====================================================
                  03 — YOUR EVIDENCE
              ====================================================== */}
              <section className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-dark)]">
                    <ClipboardCheck
                      size={17}
                      className="text-[var(--color-rose)]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-rose)]">
                      03 — Your evidence
                    </span>

                    <h3 className="text-lg font-medium">
                      Build evidence around your skills
                    </h3>

                    <p className="text-xs leading-5 text-[var(--text-muted)]">
                      Your proficiency becomes stronger when a skill is
                      supported by projects, assessments, certificates or
                      experience.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      icon: FolderKanban,
                      title: "Projects",
                      text: "Demonstrate how you've applied a skill.",
                    },
                    {
                      icon: Award,
                      title: "Certificates",
                      text: "Add credentials that support your knowledge.",
                    },
                    {
                      icon: ClipboardCheck,
                      title: "Assessments",
                      text: "Use scores to strengthen skill evidence.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="flex flex-col gap-4 rounded-[var(--radius-md)] border border-[var(--border-dark)] bg-[var(--surface-primary)] p-5">
                        <Icon size={17} className="text-[var(--color-rose)]" />

                        <div className="flex flex-col gap-2">
                          <h4 className="text-sm font-medium">{item.title}</h4>

                          <p className="text-xs leading-5 text-[var(--text-muted)]">
                            {item.text}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 border-t border-[var(--border-dark)] pt-3">
                          <CheckCircle2
                            size={12}
                            className="text-[var(--text-muted)]"
                          />

                          <span className="text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                            Evidence source
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 border border-[var(--border-dark)] bg-[var(--surface-primary)] p-4">
                  <Database
                    size={15}
                    className="shrink-0 text-[var(--color-rose)]"
                  />

                  <p className="text-xs leading-5 text-[var(--text-muted)]">
                    RAAHVI combines these evidence sources to create a unified
                    skill profile instead of relying only on self-reported
                    ratings.
                  </p>
                </div>
              </section>

              <div className="h-px bg-[var(--border-dark)]" />

              {/* =====================================================
                  04 — YOUR DIRECTION
              ====================================================== */}
              <section className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-dark)]">
                    <Target size={17} className="text-[var(--color-rose)]" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-rose)]">
                      04 — Your direction
                    </span>

                    <h3 className="text-lg font-medium">
                      Where do you want to go?
                    </h3>

                    <p className="text-xs leading-5 text-[var(--text-muted)]">
                      Your goals help RAAHVI understand what skills and
                      opportunities matter to you.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  {/* Career */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="career_interest"
                      className="text-xs font-medium text-[var(--text-secondary)]">
                      Target career
                    </label>

                    <textarea
                      id="career_interest"
                      rows="3"
                      placeholder="e.g. Full Stack Developer, Data Analyst, AI Engineer"
                      {...register("career_interest", {
                        required: "Career interest is required",
                      })}
                      className="w-full resize-none rounded-[var(--radius-sm)] border border-[var(--border-dark)] bg-[var(--surface-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--color-rose)]"
                    />

                    {errors.career_interest && (
                      <p className="text-xs text-[var(--color-danger)]">
                        {errors.career_interest.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Challenges */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="challenges"
                        className="text-xs font-medium text-[var(--text-secondary)]">
                        Current challenges
                      </label>

                      <textarea
                        id="challenges"
                        rows="4"
                        placeholder="What are you struggling with right now?"
                        {...register("challenges", {
                          required: "Current challenges are required",
                        })}
                        className="w-full resize-none rounded-[var(--radius-sm)] border border-[var(--border-dark)] bg-[var(--surface-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--color-rose)]"
                      />

                      {errors.challenges && (
                        <p className="text-xs text-[var(--color-danger)]">
                          {errors.challenges.message}
                        </p>
                      )}
                    </div>

                    {/* Support */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="support_required"
                        className="text-xs font-medium text-[var(--text-secondary)]">
                        Support required
                      </label>

                      <textarea
                        id="support_required"
                        rows="4"
                        placeholder="What kind of guidance would help you?"
                        {...register("support_required", {
                          required: "Support requirements are required",
                        })}
                        className="w-full resize-none rounded-[var(--radius-sm)] border border-[var(--border-dark)] bg-[var(--surface-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--color-rose)]"
                      />

                      {errors.support_required && (
                        <p className="text-xs text-[var(--color-danger)]">
                          {errors.support_required.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Learning method */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="method"
                      className="text-xs font-medium text-[var(--text-secondary)]">
                      Preferred learning method
                    </label>

                    <select
                      id="method"
                      defaultValue=""
                      {...register("method", {
                        required: "Assessment method is required",
                      })}
                      className="h-12 w-full rounded-[var(--radius-sm)] border border-[var(--border-dark)] bg-[var(--surface-primary)] px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-rose)]">
                      <option value="" disabled>
                        Select a learning method
                      </option>
                      <option value="videos">Videos</option>
                      <option value="documentation">Documentation</option>
                      <option value="hands_on_projects">
                        Hands-on Projects
                      </option>
                      <option value="courses">Courses</option>
                    </select>

                    {errors.method && (
                      <p className="text-xs text-[var(--color-danger)]">
                        {errors.method.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Submit */}
              <div className="flex items-center justify-between border-t border-[var(--border-dark)] pt-6">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-rose)]" />

                  <span className="text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    RAAHVI · Unified skill intelligence
                  </span>
                </div>

                <button
                  type="submit"
                  className="flex h-11 items-center gap-3 rounded-full bg-[var(--color-rose)] px-6 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-black)] transition hover:bg-[var(--color-white)] active:scale-[0.98]">
                  Build my profile
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

/* Small local icon wrapper so the source-card array stays clean. */
function BriefcaseIcon(props) {
  return <FolderKanban {...props} />;
}

export default ProfileSetup;
