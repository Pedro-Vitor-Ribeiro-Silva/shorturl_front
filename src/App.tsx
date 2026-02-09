import { ThemeToggle } from "./components/theme-toggle"

export default function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white selection:bg-indigo-500 selection:text-white dark:selection:bg-white dark:selection:text-black relative overflow-hidden transition-colors duration-300">

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Lighting effect */}
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>

      <main className="w-full max-w-md p-6 relative z-10">
        <div className="group relative rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-indigo-500/20 dark:hover:border-white/20">

          <div className="p-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-4 shadow-inner text-indigo-600 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              </div>
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-white/60 mb-2">
                ShortUrl
              </h1>
              <p className="text-gray-500 dark:text-zinc-400 text-sm">
                A nova geração de links curtos.
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="original-url" className="text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-widest ml-1">
                  URL Original
                </label>
                <input
                  type="url"
                  id="original-url"
                  placeholder="https://exemplo.com"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-lg px-4 py-3.5 outline-none focus:bg-white dark:focus:bg-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-zinc-600 font-mono text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="custom-url" className="text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-widest ml-1">
                  Personalizar
                </label>
                <div className="relative flex items-center group/input">
                  <div className="absolute left-0 top-0 bottom-0 flex items-center pl-2 pr-3 border-r border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-white/[0.02] rounded-l-lg text-gray-500 dark:text-zinc-500 text-sm select-none font-mono transition-colors group-focus-within/input:text-gray-400 dark:group-focus-within/input:text-zinc-300 group-focus-within/input:bg-gray-50 dark:group-focus-within/input:bg-white/5">
                    short.url/
                  </div>
                  <input
                    type="text"
                    id="custom-url"
                    placeholder="alias"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-lg pl-[6.5rem] pr-4 py-3.5 outline-none focus:bg-white dark:focus:bg-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-zinc-600 font-mono text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 dark:bg-white text-white dark:text-black font-bold py-4 rounded-lg shadow-lg dark:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-xl dark:hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)] transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-2 relative overflow-hidden group cursor-pointer"
              >
                <span className="relative z-10">Encurtar URL</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1s_infinite]"></div>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-gray-500 dark:text-zinc-600 hover:text-indigo-600 dark:hover:text-white transition-colors text-xs">Analytics</a>
          <a href="#" className="text-gray-500 dark:text-zinc-600 hover:text-indigo-600 dark:hover:text-white transition-colors text-xs">API</a>
          <a href="#" className="text-gray-500 dark:text-zinc-600 hover:text-indigo-600 dark:hover:text-white transition-colors text-xs">Github</a>
        </div>
      </main>
    </div>
  );
}