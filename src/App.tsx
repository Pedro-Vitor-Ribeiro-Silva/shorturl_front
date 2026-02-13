import { ThemeToggle } from "./components/theme-toggle"
import { useState, type FormEvent, useEffect } from "react"

export default function App() {
  const [originalUrl, setOriginalUrl] = useState("")
  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_URL = import.meta.env.VITE_API_URL;
  const path = window.location.pathname;
  
  // Detecta se é um acesso direto a um código (ex: /AbC12)
  const isRedirecting = path.length > 1 && path !== "/";

  useEffect(() => {
    if (isRedirecting) {
      // Redireciona para o backend
      window.location.href = `${API_URL}${path}`;
    }
  }, [API_URL, path, isRedirecting]);

  // --- TELA DE REDIRECIONAMENTO ---
  // Renderiza isso ANTES do formulário se for um link curto
  if (isRedirecting) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
        
        <div className="z-10 flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-indigo-600 dark:border-white/10 dark:border-t-white"></div>
            <h2 className="text-xl font-bold tracking-tight animate-pulse">Redirecionando...</h2>
        </div>
      </div>
    );
  }

  // --- TELA PRINCIPAL (FORMULÁRIO) ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShortUrl(null);

    try {
      const response = await fetch(`${API_URL}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: originalUrl }),
      });

      if (!response.ok) throw new Error("Falha ao encurtar URL");

      const data = await response.json();
      setShortUrl(`${window.location.origin}/${data.code}`); 
    } catch (err) {
      setError("Erro ao conectar com a API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-6 right-6 z-50"><ThemeToggle /></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>

      <main className="w-full max-w-md p-6 relative z-10">
        <div className="group relative rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-indigo-500/20 dark:hover:border-white/20">
          <div className="p-8">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-white/60 mb-2">ShortUrl</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-widest ml-1">URL Original</label>
                <input
                  type="text"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="exemplo.com"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-lg px-4 py-3.5 outline-none focus:bg-white dark:focus:bg-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 font-mono text-sm"
                  required
                />
              </div>

              {shortUrl && (
                 <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-xs text-green-600 dark:text-green-400 mb-1 uppercase font-semibold tracking-wider">URL Encurtada</p>
                    <a href={shortUrl} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 font-mono font-bold hover:underline break-all">
                      {shortUrl}
                    </a>
                 </div>
              )}

              {error && <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm text-center">{error}</div>}

              <button type="submit" disabled={loading} className="w-full bg-indigo-600 dark:bg-white text-white dark:text-black font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-2 relative overflow-hidden group disabled:opacity-70">
                <span className="relative z-10">{loading ? "Encurtando..." : "Encurtar URL"}</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}