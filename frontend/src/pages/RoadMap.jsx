import { X, ExternalLink } from "lucide-react";

const Roadmap = ({ roadmaps = [], isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-500 hover:bg-slate-100">
          <X size={22} />
        </button>

        <div className="mb-8 pr-10">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            Your Learning Journey
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-950">
            Career Roadmap
          </h2>

          <p className="mt-2 text-slate-500">
            Follow the recommended learning path for your career goal.
          </p>
        </div>

        <div className="space-y-6">
          {roadmaps.map((roadmap) => (
            <div
              key={roadmap._id}
              className="rounded-2xl border border-slate-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-indigo-600">
                    Step {roadmap.order}
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    {roadmap.title}
                  </h3>
                </div>

                <span className="whitespace-nowrap rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {roadmap.estimatedTime}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {roadmap.description}
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {Object.entries(roadmap.resources || {}).map(
                  ([type, resources]) =>
                    resources?.map((resource, index) => (
                      <div
                        key={`${type}-${index}`}
                        className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                          {type.replaceAll("_", " ")}
                        </p>

                        <h4 className="mt-2 font-semibold text-slate-900">
                          {resource.title}
                        </h4>

                        {resource.platform && (
                          <p className="mt-1 text-sm text-slate-500">
                            {resource.platform}
                          </p>
                        )}

                        {resource.description && (
                          <p className="mt-2 text-sm text-slate-500">
                            {resource.description}
                          </p>
                        )}

                        {resource.url && (
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                            Open Resource
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    )),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
