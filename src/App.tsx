import { ThemeToggle } from "./components/theme-toggle";
import { useState, type FormEvent } from "react";
import { Github, Linkedin } from "lucide-react"; // Se não tiver lucide-react, avise que troco por texto ou SVG

export default function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // --- FUNÇÃO DE ENCURTAR ---
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
      // Mostra o link usando o domínio atual (Vercel) + o código
      setShortUrl(`${window.location.origin}/${data.code}`);
    } catch (err) {
      setError("Erro ao conectar com a API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300 font-sans selection:bg-indigo-500/30">
      
      {/* Botão de Tema */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Efeito Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>

      <main className="w-full max-w-md p-6 relative z-10">
        <div className="group relative rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-indigo-500/20 dark:hover:border-white/20">
          <div className="p-8">
            
            {/* Título */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-white/60 mb-2">
                ShortUrl
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Encurtador de links rápido e seguro
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest ml-1">
                  URL Original
                </label>
                <input
                  type="url"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="https://exemplo.com"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-lg px-4 py-3.5 outline-none focus:bg-white dark:focus:bg-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 font-mono text-sm placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Resultado: Link Curto */}
              {shortUrl && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-xs text-green-600 dark:text-green-400 mb-2 uppercase font-bold tracking-wider">
                    URL Encurtada
                  </p>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 font-mono font-bold text-lg hover:underline break-all"
                  >
                    {shortUrl}
                  </a>
                </div>
              )}

              {/* Mensagem de Erro */}
              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm text-center animate-in fade-in">
                  {error}
                </div>
              )}

              {/* Botão de Enviar */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 dark:bg-white text-white dark:text-black font-bold py-4 rounded-lg shadow-lg hover:shadow-indigo-500/20 dark:hover:shadow-white/20 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Encurtando...</span>
                    </>
                  ) : (
                    "Encurtar URL"
                  )}
                </span>
              </button>
            </form>

            {/* Divisor */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-[#0a0a0a] px-2 text-gray-500 dark:text-gray-400 font-medium">
                  Desenvolvido por Pedro
                </span>
              </div>
            </div>

            {/* Links Sociais */}
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/Pedro-Vitor-Ribeiro-Silva"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-sm font-medium group"
              >
                <Github size={18} className="group-hover:text-black dark:group-hover:text-white transition-colors" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/pedrovitorribeirosilva"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors text-sm font-medium group"
              >
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}