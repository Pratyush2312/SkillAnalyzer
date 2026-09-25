import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthHook from "../hooks/useAuthHook";
import logo from "../../../assets/raahvi_logo.png";

function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin, handleSubmit, register, errors } = useAuthHook();

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--surface-primary)] text-[var(--text-primary)]">
      <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* BACKGROUND GRID */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,251,251,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(251,251,251,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* AMBIENT SHAPES */}
        <div className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-[var(--border-dark)]" />
        <div className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-[var(--border-dark)]" />
        <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full border border-[var(--border-dark)]" />

        <div className="relative grid w-full max-w-[1280px] overflow-hidden border border-[var(--border-dark)] bg-[var(--surface-secondary)] lg:min-h-[720px] lg:grid-cols-[1.15fr_0.85fr]">
          {/* ------------------------------------------------ */}
          {/* LEFT — BRAND / STORY */}
          {/* ------------------------------------------------ */}

          <section className="relative hidden overflow-hidden border-r border-[var(--border-dark)] lg:flex">
            <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
              {/* BRAND */}
              <div>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[var(--border-dark)] bg-[var(--surface-primary)]">
                    <img
                      src={logo}
                      alt="RAAHVI"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium tracking-[0.25em]">
                      RAAHVI
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Career intelligence
                    </p>
                  </div>
                </div>
              </div>

              {/* MAIN MESSAGE */}
              <div className="max-w-2xl">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-rose)]" />

                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
                    Your career signal
                  </p>
                </div>

                <h1 className="text-5xl font-medium leading-[0.98] tracking-[-0.06em] xl:text-6xl">
                  Know where
                  <br />
                  your skills
                  <br />
                  <span className="text-[var(--color-rose)]">
                    can take you.
                  </span>
                </h1>

                <p className="mt-8 max-w-lg text-sm leading-7 text-[var(--text-secondary)] xl:text-base">
                  RAAHVI brings your skills, evidence and career direction
                  together to help you understand where you stand — and what
                  comes next.
                </p>
              </div>

              {/* SIGNALS */}
              <div className="grid max-w-2xl grid-cols-3 border border-[var(--border-dark)]">
                {[
                  ["01", "Skills", "Understand your capabilities"],
                  ["02", "Evidence", "Build stronger signals"],
                  ["03", "Direction", "Explore career paths"],
                ].map(([number, title, description]) => (
                  <div
                    key={number}
                    className="border-r border-[var(--border-dark)] p-5 last:border-r-0">
                    <span className="text-[10px] text-[var(--color-rose)]">
                      {number}
                    </span>

                    <p className="mt-5 text-sm font-medium">{title}</p>

                    <p className="mt-2 text-[11px] leading-5 text-[var(--text-muted)]">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* DECORATIVE CIRCLE */}
            <div className="pointer-events-none absolute -bottom-56 -right-56 h-[620px] w-[620px] rounded-full border border-[var(--border-dark)]" />

            <div className="pointer-events-none absolute -bottom-36 -right-36 h-[420px] w-[420px] rounded-full border border-[var(--border-dark)]" />

            <div className="pointer-events-none absolute bottom-24 right-24 flex h-20 w-20 items-center justify-center rounded-full border border-[var(--border-dark)]">
              <Sparkles
                size={22}
                strokeWidth={1}
                className="text-[var(--color-rose)]"
              />
            </div>
          </section>

          {/* ------------------------------------------------ */}
          {/* RIGHT — LOGIN */}
          {/* ------------------------------------------------ */}

          <section className="flex items-center bg-[var(--surface-primary)] p-6 sm:p-10 lg:p-12 xl:p-16">
            <div className="mx-auto w-full max-w-md">
              {/* MOBILE BRAND */}
              <div className="mb-14 flex items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[var(--border-dark)]">
                  <img
                    src={logo}
                    alt="RAAHVI"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium tracking-[0.2em]">RAAHVI</p>

                  <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Career intelligence
                  </p>
                </div>
              </div>

              {/* HEADER */}
              <div className="mb-10">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-rose)]" />

                  <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                    Sign in
                  </p>
                </div>

                <h2 className="text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                  Welcome
                  <br />
                  <span className="text-[var(--color-rose)]">back.</span>
                </h2>

                <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
                  Continue exploring your skills and career direction with
                  RAAHVI.
                </p>
              </div>

              {/* FORM */}
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(handleLogin)}>
                {/* EMAIL */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={16}
                      strokeWidth={1.5}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email", {
                        required: "Please enter your email address",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                      className="h-14 w-full border border-[var(--border-dark)] bg-[var(--surface-secondary)] pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--color-rose)]"
                    />
                  </div>

                  {errors.email && (
                    <p className="text-xs text-[var(--color-danger)]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={16}
                      strokeWidth={1.5}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Please enter your password",
                      })}
                      className="h-14 w-full border border-[var(--border-dark)] bg-[var(--surface-secondary)] pl-11 pr-12 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--color-rose)]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }>
                      {showPassword ? (
                        <EyeOff size={16} strokeWidth={1.5} />
                      ) : (
                        <Eye size={16} strokeWidth={1.5} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-xs text-[var(--color-danger)]">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="group mt-2 flex h-14 w-full cursor-pointer items-center justify-between bg-[var(--color-rose)] px-5 text-sm font-medium text-[var(--text-dark)] transition-all duration-300 hover:bg-[var(--color-white)]">
                  <span>Continue to RAAHVI</span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(15,15,15,0.12)] transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight size={16} />
                  </span>
                </button>
              </form>

              {/* REGISTER */}
              <div className="mt-9 border-t border-[var(--border-dark)] pt-7">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-[var(--text-muted)]">
                    New to RAAHVI?
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="group flex cursor-pointer items-center gap-2 text-sm text-[var(--text-primary)] transition hover:text-[var(--color-rose)]">
                    Create account
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                <CheckCircle2 size={13} strokeWidth={1.5} />
                <span>Your career data stays yours.</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
