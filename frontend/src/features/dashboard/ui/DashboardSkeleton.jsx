function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8 animate-pulse">
        <div className="flex items-center justify-between mb-10">
          <div className="space-y-3">
            <div className="h-3 w-32 bg-slate-200 rounded" />
            <div className="h-10 w-96 bg-slate-200 rounded-lg" />
            <div className="h-4 w-80 bg-slate-200 rounded" />
          </div>

          <div className="h-10 w-28 bg-slate-200 rounded-lg" />
        </div>

        <div className="border-t border-slate-200 mb-8" />

        <div className="grid lg:grid-cols-2 gap-6 mb-9">
          <div className="bg-white border border-slate-200 p-7 min-h-[290px]">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="h-4 w-36 bg-slate-200 rounded" />
                <div className="h-4 w-52 bg-slate-200 rounded" />
              </div>
              <div className="h-6 w-6 bg-slate-200 rounded-full" />
            </div>

            <div className="mt-9 space-y-4">
              <div className="h-3 w-28 bg-slate-200 rounded" />
              <div className="h-7 w-48 bg-slate-200 rounded" />
              <div className="h-4 w-full max-w-md bg-slate-200 rounded" />
              <div className="h-4 w-72 bg-slate-200 rounded" />
            </div>

            <div className="h-4 w-52 bg-slate-200 rounded mt-8" />
          </div>

          <div className="bg-white border border-slate-200 p-7 min-h-[290px]">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="h-4 w-28 bg-slate-200 rounded" />
                <div className="h-4 w-48 bg-slate-200 rounded" />
              </div>
              <div className="h-6 w-6 bg-slate-200 rounded-full" />
            </div>

            <div className="mt-9 space-y-7">
              <div>
                <div className="flex justify-between mb-3">
                  <div className="h-4 w-28 bg-slate-200 rounded" />
                  <div className="h-4 w-12 bg-slate-200 rounded" />
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full" />
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                  <div className="h-4 w-12 bg-slate-200 rounded" />
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full" />
              </div>
            </div>

            <div className="h-4 w-36 bg-slate-200 rounded mt-8" />
          </div>
        </div>

        <div className="mb-6 space-y-3">
          <div className="h-6 w-64 bg-slate-200 rounded" />
          <div className="h-4 w-48 bg-slate-200 rounded" />
        </div>

        <div className="grid md:grid-cols-3 bg-white border border-slate-200 mb-9">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-6 min-h-[155px] border-b md:border-b-0 md:border-r last:border-0 border-slate-200">
              <div className="h-5 w-5 bg-slate-200 rounded mb-6" />
              <div className="h-4 w-32 bg-slate-200 rounded mb-4" />
              <div className="h-4 w-48 bg-slate-200 rounded mb-5" />
              <div className="h-4 w-4 bg-slate-200 rounded" />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 p-7 min-h-[200px]">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-5 w-5 bg-slate-200 rounded" />
              <div className="h-4 w-40 bg-slate-200 rounded" />
            </div>

            <div className="h-5 w-72 bg-slate-200 rounded mb-5" />
            <div className="h-4 w-full max-w-lg bg-slate-200 rounded mb-3" />
            <div className="h-4 w-80 bg-slate-200 rounded mb-8" />
            <div className="h-4 w-28 bg-slate-200 rounded" />
          </div>

          <div className="bg-white border border-slate-200 p-7 min-h-[200px]">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-5 w-5 bg-slate-200 rounded" />
              <div className="h-4 w-36 bg-slate-200 rounded" />
            </div>

            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between">
                  <div className="h-4 w-32 bg-slate-200 rounded" />
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                </div>
              ))}
            </div>

            <div className="h-4 w-24 bg-slate-200 rounded mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSkeleton;
