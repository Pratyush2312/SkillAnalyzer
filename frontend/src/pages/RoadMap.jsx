import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Layers3,
  Target,
  X,
} from "lucide-react";

const getResourceCount = (resources = {}) => {
  return Object.values(resources).reduce(
    (total, items) => total + (Array.isArray(items) ? items.length : 0),
    0,
  );
};

const getResourceTypeLabel = (type) => {
  return type
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const Roadmap = ({ roadmaps = [], isOpen, onClose, role }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-black)]/85 p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}>
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-dark)] bg-[var(--surface-primary)] shadow-[var(--shadow-soft)]">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="shrink-0 border-b border-[var(--border-dark)]">
          <div className="flex items-start justify-between gap-6 px-6 py-7 sm:px-9 sm:py-8">
            <div className="min-w-0">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--color-rose)]" />

                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--color-rose)]">
                  Personalized learning path
                </p>
              </div>

              <h2 className="max-w-3xl text-3xl font-medium tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl">
                Close the gaps.
                <br />
                <span className="text-[var(--color-rose)]">
                  Build what comes next.
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                This learning path is built around the capabilities you still
                need to develop for your target career.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close roadmap"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-dark)] text-[var(--text-muted)] transition-all duration-200 hover:border-[var(--color-rose)]/50 hover:bg-[var(--surface-secondary)] hover:text-[var(--color-rose)]">
              <X size={18} />
            </button>
          </div>

          {/* CONTEXT BAR */}

          <div className="grid border-t border-[var(--border-dark)] sm:grid-cols-2">
            <div className="flex items-center gap-3 px-6 py-4 sm:px-9">
              <Target size={14} className="text-[var(--color-rose)]" />

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Target career
                </p>

                <p className="mt-1 text-sm text-[var(--text-primary)]">
                  {role || "Your target career"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-[var(--border-dark)] px-6 py-4 sm:border-l sm:border-t-0 sm:px-9">
              <Layers3 size={14} className="text-[var(--color-rose)]" />

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Learning path
                </p>

                <p className="mt-1 text-sm text-[var(--text-primary)]">
                  {roadmaps.length} {roadmaps.length === 1 ? "step" : "steps"}{" "}
                  based on your current gaps
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="overflow-y-auto">
          {roadmaps.length === 0 ? (
            <div className="flex min-h-[350px] items-center justify-center px-6 py-12">
              <div className="max-w-md text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-dark)]">
                  <Layers3 size={18} className="text-[var(--color-rose)]" />
                </div>

                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  No learning path available
                </p>

                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  There is not enough skill-gap data to generate a personalized
                  roadmap yet.
                </p>
              </div>
            </div>
          ) : (
            <div className="px-6 py-8 sm:px-9 sm:py-10">
              {/* TIMELINE */}

              <div className="relative">
                <div className="absolute bottom-5 left-5 top-5 hidden w-px bg-[var(--border-dark)] sm:block" />

                <div className="space-y-10">
                  {roadmaps.map((roadmap, index) => {
                    const step = roadmap.order ?? index + 1;

                    const resourceCount = getResourceCount(roadmap.resources);

                    return (
                      <section
                        key={roadmap._id || `${roadmap.title}-${index}`}
                        className="relative sm:pl-16">
                        {/* STEP NUMBER */}

                        <div className="absolute left-0 top-0 hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--border-dark)] bg-[var(--surface-primary)] sm:flex">
                          <span className="text-[10px] font-medium text-[var(--color-rose)]">
                            {String(step).padStart(2, "0")}
                          </span>
                        </div>

                        {/* STEP CARD */}

                        <div className="rounded-[var(--radius-md)] border border-[var(--border-dark)] bg-[var(--surface-secondary)] p-5 sm:p-7">
                          {/* MOBILE STEP */}

                          <div className="mb-4 flex items-center gap-2 sm:hidden">
                            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-rose)]">
                              Step {String(step).padStart(2, "0")}
                            </span>
                          </div>

                          {/* TITLE */}

                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p className="mb-2 hidden text-[9px] uppercase tracking-[0.2em] text-[var(--color-rose)] sm:block">
                                Step {String(step).padStart(2, "0")}
                              </p>

                              <h3 className="text-xl font-medium tracking-[-0.025em] text-[var(--text-primary)] sm:text-2xl">
                                {roadmap.title || `Learning step ${step}`}
                              </h3>
                            </div>

                            {roadmap.estimatedTime && (
                              <div className="flex w-fit shrink-0 items-center gap-2 rounded-full border border-[var(--border-dark)] px-3 py-1.5 text-xs text-[var(--text-muted)]">
                                <Clock3 size={12} />

                                <span>{roadmap.estimatedTime}</span>
                              </div>
                            )}
                          </div>

                          {/* DESCRIPTION */}

                          {roadmap.description && (
                            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
                              {roadmap.description}
                            </p>
                          )}

                          {/* SKILL FOCUS */}

                          {roadmap.skill && (
                            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[var(--border-dark)] pt-5">
                              <CheckCircle2
                                size={13}
                                className="text-[var(--color-rose)]"
                              />

                              <span className="text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                                Skill focus
                              </span>

                              <span className="text-xs text-[var(--text-secondary)]">
                                {typeof roadmap.skill === "string"
                                  ? roadmap.skill
                                  : roadmap.skill?.name}
                              </span>
                            </div>
                          )}

                          {/* TOPICS */}

                          {Array.isArray(roadmap.topics) &&
                            roadmap.topics.length > 0 && (
                              <div className="mt-6">
                                <p className="mb-3 text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                                  Focus areas
                                </p>

                                <div className="flex flex-wrap gap-2">
                                  {roadmap.topics.map((topic, topicIndex) => (
                                    <span
                                      key={`${topic}-${topicIndex}`}
                                      className="rounded-full border border-[var(--border-dark)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* RESOURCES */}

                          {roadmap.resources && resourceCount > 0 && (
                            <div className="mt-7 border-t border-[var(--border-dark)] pt-6">
                              <div className="mb-4 flex items-center justify-between">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                                  Learning resources
                                </p>

                                <span className="text-[10px] text-[var(--text-muted)]">
                                  {resourceCount} available
                                </span>
                              </div>

                              <div className="grid gap-3 sm:grid-cols-2">
                                {Object.entries(roadmap.resources).map(
                                  ([type, resources]) => {
                                    if (!Array.isArray(resources)) {
                                      return null;
                                    }

                                    return resources.map(
                                      (resource, resourceIndex) => (
                                        <article
                                          key={`${type}-${resourceIndex}`}
                                          className="group rounded-[var(--radius-sm)] border border-[var(--border-dark)] bg-[var(--surface-primary)] p-4 transition-all duration-300 hover:border-[var(--color-rose)]/50">
                                          <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                              <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-rose)]">
                                                {getResourceTypeLabel(type)}
                                              </p>

                                              <h4 className="mt-2 text-sm font-medium leading-5 text-[var(--text-primary)]">
                                                {resource?.title ||
                                                  "Learning resource"}
                                              </h4>

                                              {resource?.platform && (
                                                <p className="mt-1 text-xs text-[var(--text-muted)]">
                                                  {resource.platform}
                                                </p>
                                              )}
                                            </div>

                                            {resource?.url && (
                                              <ArrowUpRight
                                                size={16}
                                                className="shrink-0 text-[var(--text-muted)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-rose)]"
                                              />
                                            )}
                                          </div>

                                          {resource?.description && (
                                            <p className="mt-3 text-xs leading-6 text-[var(--text-muted)]">
                                              {resource.description}
                                            </p>
                                          )}

                                          {resource?.url && (
                                            <a
                                              href={resource.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="mt-4 inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--text-secondary)] transition-colors hover:text-[var(--color-rose)]">
                                              Open resource
                                              <ExternalLink size={11} />
                                            </a>
                                          )}
                                        </article>
                                      ),
                                    );
                                  },
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </section>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer className="shrink-0 border-t border-[var(--border-dark)] bg-[var(--surface-primary)] px-6 py-4 sm:px-9">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-rose)]" />

              <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                RAAHVI · Skill Intelligence
              </p>
            </div>

            <p className="text-[10px] text-[var(--text-muted)]">
              Generated from your current skill evidence
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Roadmap;
