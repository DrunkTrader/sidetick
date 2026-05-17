import { flattenLessons, miniQuantCourse } from "@/lib/portal-data";

export default function DashboardPage(): React.JSX.Element {
  const lessons = flattenLessons(miniQuantCourse);

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      {/* Hero Card */}
      <div className="mb-12 overflow-hidden rounded-2xl border-4 border-slate-900 bg-white p-6 shadow-[8px_8px_0px_0px_#1e293b] md:p-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-center">
          
          {/* Mock Window Illustration */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border-4 border-slate-900 bg-[#252525] shadow-[4px_4px_0px_0px_#1e293b]">
              <div className="flex items-center gap-2 border-b-4 border-slate-900 bg-white px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500 border-2 border-slate-900"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400 border-2 border-slate-900"></div>
                <div className="h-3 w-3 rounded-full bg-green-500 border-2 border-slate-900"></div>
              </div>
              <div className="flex h-[calc(100%-3rem)] items-end justify-center p-6 gap-3 sm:gap-5 pb-0">
                <div className="h-[35%] w-1/4 rounded-t-lg bg-purple-600 border-4 border-b-0 border-slate-900"></div>
                <div className="h-[55%] w-1/4 rounded-t-lg bg-teal-500 border-4 border-b-0 border-slate-900"></div>
                <div className="h-[25%] w-1/4 rounded-t-lg bg-red-500 border-4 border-b-0 border-slate-900"></div>
                <div className="h-[75%] w-1/4 rounded-t-lg bg-teal-500 border-4 border-b-0 border-slate-900"></div>
                <div className="h-[45%] w-1/4 rounded-t-lg bg-purple-600 border-4 border-b-0 border-slate-900"></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex w-full flex-col items-start gap-6 md:w-1/2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Mini Quant
            </h1>
            <p className="text-base font-medium text-slate-600 leading-relaxed md:text-lg">
              Learn to automate your trading workflows using Pine Script and broker APIs. Build algorithms without being a professional coder.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border-2 border-slate-900 bg-purple-600 px-4 py-1.5 text-xs font-bold tracking-wide text-white shadow-[2px_2px_0px_0px_#1e293b]">
                TRADINGVIEW
              </span>
              <span className="rounded-full border-2 border-slate-900 bg-teal-500 px-4 py-1.5 text-xs font-bold tracking-wide text-white shadow-[2px_2px_0px_0px_#1e293b]">
                PINE SCRIPT
              </span>
              <span className="rounded-full border-2 border-slate-900 bg-blue-500 px-4 py-1.5 text-xs font-bold tracking-wide text-white shadow-[2px_2px_0px_0px_#1e293b]">
                DHAN API
              </span>
            </div>

            <button className="group mt-2 flex items-center gap-3 rounded-xl border-4 border-slate-900 bg-white px-6 py-3.5 font-bold text-slate-900 shadow-[4px_4px_0px_0px_#1e293b] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1e293b] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
              <svg className="h-6 w-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Enroll Now • 22 Hours
            </button>
          </div>
        </div>
      </div>

      {/* Curriculum Section */}
      <div>
        <div className="mb-8 flex items-center gap-3">
          <svg className="h-7 w-7 text-purple-600" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
            Course Curriculum
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.slice(0, 6).map((lessonObj, index) => (
            <div
              key={lessonObj.lesson.id}
              className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border-4 border-slate-900 bg-white p-6 text-center shadow-[4px_4px_0px_0px_#1e293b] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#1e293b]"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-4 border-slate-900 bg-purple-600 text-2xl font-black text-white shadow-[2px_2px_0px_0px_#1e293b]">
                {index + 1}
              </div>
              <h3 className="line-clamp-2 font-bold text-slate-900">{lessonObj.lesson.title}</h3>
              <p className="mt-2 text-sm font-medium text-slate-500">{lessonObj.module.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
