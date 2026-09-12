import { NavLink, Link } from "react-router";
import { UserCircle, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

function Navbar({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Skill Analysis", path: "/skill-analysis" },
    { label: "Jobs", path: "/jobs" },
    { label: "Skill Gap", path: "/skill-gap" },
  ];

  const getNavLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
    }`;

  const getInitials = (name = "") => {
    return name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  const userName = user?.name || "Student";
  const userEmail = user?.email || "";
  const userInitials = getInitials(userName) || "S";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-sm font-bold text-white">S</span>
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Skill<span className="text-blue-600">Match</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={getNavLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop User Section */}
        <div className="relative hidden items-center md:flex">
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50">
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              {userInitials}
            </div>

            {/* User Details */}
            <div className="hidden text-left lg:block">
              <p className="max-w-32 truncate text-sm font-semibold text-slate-900">
                {userName}
              </p>

              {userEmail && (
                <p className="max-w-40 truncate text-xs text-slate-500">
                  {userEmail}
                </p>
              )}
            </div>

            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-14 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
              <div className="border-b border-slate-100 px-3 py-3">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {userName}
                </p>

                {userEmail && (
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {userEmail}
                  </p>
                )}
              </div>

              <NavLink
                to="/profile"
                onClick={() => setIsProfileOpen(false)}
                className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-blue-600">
                <UserCircle className="h-4 w-4" />
                View profile
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation menu">
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          {/* Mobile User Info */}
          <div className="mb-3 flex items-center gap-3 border-b border-slate-100 px-2 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              {userInitials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {userName}
              </p>

              {userEmail && (
                <p className="truncate text-xs text-slate-500">{userEmail}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`
                }>
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`
              }>
              <UserCircle className="h-5 w-5" />
              Profile
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
