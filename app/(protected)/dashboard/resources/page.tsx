import React from "react";
import fs from "fs/promises";
import path from "path";

// Function to fetch resources from the public/resources_files directory
async function getResources() {
  const dirPath = path.join(process.cwd(), "public", "resources_files");
  try {
    const files = await fs.readdir(dirPath);
    return files.map((file, index) => {
      // Simulate locking for resources 6 and 7
      const isLocked = file.includes("resource 6") || file.includes("resource 7");
      
      return {
        id: index,
        name: file,
        path: `/resources_files/${file}`,
        isLocked,
      };
    });
  } catch (error) {
    console.error("Error reading resources directory:", error);
    return [];
  }
}

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      <div className="mb-8 flex items-center gap-3">
        <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">
          Free Resources
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="group relative flex aspect-square flex-col items-center justify-center rounded-2xl border-4 border-slate-900 dark:border-slate-500 bg-white dark:bg-slate-800 p-6 text-center shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-none transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#1e293b]"
          >
            {resource.isLocked ? (
              <>
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-slate-900/40 backdrop-blur-sm">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-900 bg-white text-slate-900 shadow-[4px_4px_0px_0px_#1e293b]">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-900 bg-slate-300 text-slate-600">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white opacity-50">{resource.name}</h3>
              </>
            ) : (
              <>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-900 bg-teal-500 text-white shadow-[2px_2px_0px_0px_#1e293b]">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="mb-4 font-bold text-slate-900 dark:text-white line-clamp-2">{resource.name}</h3>
                <a
                  href={resource.path}
                  download
                  className="mt-auto flex items-center justify-center gap-2 rounded-xl border-4 border-slate-900 bg-purple-600 px-4 py-2 font-bold text-white shadow-[2px_2px_0px_0px_#1e293b] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1e293b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
