import { Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";
import useAuthHook from "../hooks/useAuthHook";
import logo from "../../../assets/raahvi_logo.png";
function LoginForm() {
  const navigate = useNavigate();
  const { handleLogin, handleSubmit, register, errors } = useAuthHook();
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="hidden lg:flex flex-col justify-between bg-[#f1f6ff] p-12 relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-35 h-35 flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="Career recommendation logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className=" max-w-md">
              <p className="text-sm font-semibold text-blue-600 mb-4">
                WELCOME BACK
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Your next opportunity starts with knowing your strengths.
              </h1>

              <p className="mt-5 text-slate-600 leading-relaxed">
                Continue exploring your skills, discovering relevant
                opportunities, and building a clearer path toward your career
                goals.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-4">
            {[
              "Review your skill analysis",
              "Explore relevant job opportunities",
              "Track your career progress",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-sm text-slate-600">{item}</span>
              </div>
            ))}
          </div>

          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full border-[40px] border-blue-100/70" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full border-[50px] border-blue-100/50" />
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="max-w-md mx-auto h-full flex flex-col justify-center">
            <div className="mb-8">
              <p className="text-sm font-semibold text-blue-600 mb-3">
                SIGN IN TO YOUR ACCOUNT
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to continue your career journey with Raahvi.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2">
                  Email address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

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
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Please enter your password",
                    })}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-blue-600 text-white text-sm font-semibold flex items-center justify-center gap-2 transition hover:bg-blue-700 active:scale-[0.99] shadow-sm shadow-blue-600/20">
                Sign in
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p
              onClick={() => navigate("/register")}
              className="mt-8 text-center text-sm text-slate-500 cursor-pointer">
              Don't have an account?
            </p>

            <p className="mt-6 text-center text-[11px] text-slate-400">
              Your career journey starts with understanding where you stand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
