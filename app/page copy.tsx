import Link from "next/link";

const webScreens = [
  { id: 1, name: "Login Page", path: "/login" },
  { id: 2, name: "Home Page", path: "/home" },
  { id: 3, name: "Course Page", path: "/courses" },
  { id: 4, name: "Audio Page", path: "/audio" },
  { id: 5, name: "Book Page", path: "/book" },
  { id: 6, name: "AI Agent Page", path: "/ai-agent" },
  { id: 7, name: "Browser Page", path: "/browser" },
  { id: 8, name: "Zoom Clone Page", path: "/live" },
  { id: 9, name: "Short Note Page", path: "/short-note" },
  { id: 10, name: "Chatting System Page", path: "/chatting" },
  { id: 11, name: "Research Tool Page", path: "/research" },
  { id: 12, name: "Exam Hub Page", path: "/exam-hub" },
  { id: 13, name: "Gaming Hub Page", path: "/gaming-hub" },
  { id: 14, name: "Revision Page", path: "/revision" },
];

export default function Home() {
  return (
    <main className="min-h-screen text-white font-custom px-6 py-16 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - Simple & Clean */}
        <header className="mb-12 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">
            Alpha Mind Sub
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Web UI Portal / 14 Active Screens
          </p>
        </header>

        {/* Grid Layout - 1 to 13 Screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {webScreens.map((screen) => (
            <Link
              key={screen.id}
              href={screen.path}
              className="group flex flex-col justify-between p-5 bg-[#131926] border border-slate-800/80 rounded-lg hover:border-blue-500/60 hover:bg-[#161f30] transition-all duration-150"
            >
              <div>
                {/* Number Badge */}
                <div className="text-xs font-mono text-slate-500 group-hover:text-blue-400 mb-2 transition-colors">
                  {String(screen.id).padStart(2, "0")}
                </div>
                {/* Screen Title */}
                <h2 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {screen.name}
                </h2>
              </div>

              {/* Action Link Indicator */}
              <div className="mt-6 flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-400 transition-colors">
                <span>Open Screen</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}