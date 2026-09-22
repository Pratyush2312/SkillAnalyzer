import { NavLink, Link } from "react-router";
import { UserCircle, Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/raahvi_logo.png";

function Navbar({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { label: "Overview", path: "/dashboard" },
    { label: "Skills", path: "/dashboard/skill-overview" },
    { label: "Careers", path: "/dashboard/career-recommendations" },
    { label: "Skill Gap", path: "/dashboard/skill-gap" },
  ];

  const getInitials = (name = "") => {
    return (
      name
        .trim()
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("") || "S"
    );
  };

  const userName = user?.name || "Student";
  const userEmail = user?.email || "";
  const userInitials = getInitials(userName);

  const navLinkClass = ({ isActive }) =>
    `relative py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${
      isActive
        ? "text-[var(--text-primary)]"
        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-dark)] bg-[var(--surface-primary)]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* LOGO */}
        <Link
          to="/dashboard"
          className="group flex items-center"
          onClick={() => {
            setIsProfileOpen(false);
            setIsMenuOpen(false);
          }}>
          <div className="relative flex h-12 w-28 items-center justify-start overflow-hidden">
            <img
              src={logo}
              alt="RAAHVI"
              className="h-full w-full object-contain object-left transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={navLinkClass}>
              {({ isActive }) => (
                <span className="group relative">
                  {item.label}

                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-[var(--color-rose)] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* DESKTOP PROFILE */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="group flex items-center gap-3 rounded-full border border-[var(--border-dark)] bg-[var(--surface-secondary)] py-1.5 pl-1.5 pr-3 transition-all duration-300 hover:border-[var(--color-rose)] cursor-pointer">
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-rose)] text-xs font-semibold text-[var(--text-dark)]">
              {userInitials}
            </div>

            <div className="hidden max-w-32 text-left lg:block">
              <p className="truncate text-xs font-medium text-[var(--text-primary)]">
                {userName}
              </p>

              {userEmail && (
                <p className="mt-0.5 truncate text-[10px] text-[var(--text-muted)]">
                  {userEmail}
                </p>
              )}
            </div>

            <ChevronDown
              size={14}
              className={`text-[var(--text-muted)] transition-transform duration-300 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* PROFILE DROPDOWN */}
          {isProfileOpen && (
            <div className="absolute right-0 top-[58px] w-60 overflow-hidden border border-[var(--border-dark)] bg-[var(--surface-secondary)] shadow-[var(--shadow-soft)]">
              <div className="border-b border-[var(--border-dark)] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-rose)] text-xs font-semibold text-[var(--text-dark)]">
                    {userInitials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                      {userName}
                    </p>

                    {userEmail && (
                      <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
                        {userEmail}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-2">
                <NavLink
                  to="/dashboard/view-profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="group flex items-center justify-between px-3 py-3 text-sm text-[var(--text-secondary)] transition-colors duration-300 hover:bg-[var(--surface-primary)] hover:text-[var(--text-primary)]">
                  <span className="flex items-center gap-3">
                    <UserCircle size={16} />
                    View profile
                  </span>

                  <ArrowUpRight
                    size={14}
                    className="text-[var(--text-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </NavLink>

                <button
                  type="button"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex w-full items-center gap-3 px-3 py-3 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] cursor-pointer">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MOBILE MENU */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-dark)] text-[var(--text-primary)] transition-colors hover:border-[var(--color-rose)] md:hidden cursor-pointer"
          aria-label="Toggle navigation menu">
          {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>

      {/* MOBILE NAVIGATION */}
      {isMenuOpen && (
        <div className="border-t border-[var(--border-dark)] bg-[var(--surface-primary)] px-5 py-6 md:hidden">
          {/* USER */}
          <div className="mb-6 flex items-center gap-3 border-b border-[var(--border-dark)] pb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-rose)] text-sm font-semibold text-[var(--text-dark)]">
              {userInitials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                {userName}
              </p>

              {userEmail && (
                <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
                  {userEmail}
                </p>
              )}
            </div>
          </div>

          {/* LINKS */}
          <div className="flex flex-col">
            {navItems.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between border-b border-[var(--border-dark)] py-5 text-sm transition-colors ${
                    isActive
                      ? "text-[var(--color-rose)]"
                      : "text-[var(--text-secondary)]"
                  }`
                }>
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-4">
                      <span className="text-[10px] text-[var(--text-muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="uppercase tracking-[0.15em]">
                        {item.label}
                      </span>
                    </span>

                    <ArrowUpRight size={15} />
                  </>
                )}
              </NavLink>
            ))}

            <NavLink
              to="/dashboard/view-profile"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between py-5 text-sm ${
                  isActive
                    ? "text-[var(--color-rose)]"
                    : "text-[var(--text-secondary)]"
                }`
              }>
              <span className="flex items-center gap-4">
                <UserCircle size={17} />

                <span className="uppercase tracking-[0.15em]">Profile</span>
              </span>

              <ArrowUpRight size={15} />
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
