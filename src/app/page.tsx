"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Settings, Disc, Globe, Github, Gamepad2 } from 'lucide-react';

// 1. CONFIGURAÇÃO DE TEMAS INTELIGENTES
const THEMES = {
  default: { 
    id: 'default', accent: '#0072ce', muted: '#94a3b8', text: '#ffffff',
    bg: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #000000 100%)' 
  },
  spiderman: { 
    id: 'spiderman', accent: '#ff0000', muted: '#f87171', text: '#ffffff',
    bg: 'radial-gradient(circle at 50% 50%, #4a0000 0%, #050000 100%)' 
  },
  godofwar: { 
    id: 'godofwar', accent: '#d4af37', muted: '#a8a29e', text: '#ffffff',
    bg: 'radial-gradient(circle at 50% 50%, #2a221b 0%, #050505 100%)' 
  },
  classic: { 
    id: 'classic', accent: '#0072ce', muted: '#64748b', text: '#0f172a',
    bg: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #cbd5e1 100%)' 
  },
};

const PROJECTS = [
  { 
    id: 1, title: "TYPING MASTER", category: "Jogo de Digitação", 
    img: "https://plus.unsplash.com/premium_vector-1723127904163-a41f5dfe041a?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800", 
    bg: "https://plus.unsplash.com/premium_vector-1723127904163-a41f5dfe041a?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2000", 
    description: "Jogo interativo para melhorar habilidades de digitação com níveis desafiadores.",
    tags: ["Next.js", "Tailwind", "Framer Motion"], link: "https://sw-wanted.github.io/typemaster/", github: "https://github.com/SW-Wanted/typemaster"
  },
  { 
    id: 2, title: "ANGOLEAGUE", category: "Futebol de Rua", 
    img: "https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800", 
    bg: "https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2000",
    description: "Plataforma para organizar e gerenciar ligas de futebol de rua com sistema de rankings.",
    tags: ["React", "Stripe", "Node.js"], link: "https://sw-wanted.github.io/AngoLeague/", github: "https://github.com/SW-Wanted/AngoLeague"
  },
  { 
    id: 3, title: "RIDING", category: "Serviço de Transporte", 
    img: "https://images.unsplash.com/photo-1572013343866-dfdb9b416810?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800", 
    bg: "https://images.unsplash.com/photo-1572013343866-dfdb9b416810?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2000",
    description: "Aplicativo de transporte com interface intuitiva e sistema de pagamento integrado.",
    tags: ["Python", "OpenAI", "Next.js"], link: "#", github: "#"
  },
];

export default function PS5Interface() {
  const [view, setView] = useState<'login' | 'home' | 'detail'>('login');
  const [focusedId, setFocusedId] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [time, setTime] = useState('');
  const [currentTheme, setCurrentTheme] = useState(THEMES.default);

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const cycleTheme = () => {
    const keys = Object.keys(THEMES);
    const currentIndex = keys.indexOf(currentTheme.id);
    const nextIndex = (currentIndex + 1) % keys.length;
    // @ts-ignore
    setCurrentTheme(THEMES[keys[nextIndex]]);
  };

  const currentProject = PROJECTS.find(p => p.id === (view === 'detail' ? selectedId : focusedId));

  return (
    <main 
      className="relative h-screen w-screen overflow-hidden font-sans transition-all duration-700"
      style={{ background: currentTheme.bg, color: currentTheme.text }}
    >
      <div className="absolute inset-0 z-0">
        <div className="particles absolute inset-0 opacity-10" />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject?.id}
            initial={{ opacity: 0 }} animate={{ opacity: 0.25 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentProject?.bg})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${currentTheme.id === 'classic' ? 'rgba(255,255,255,0.7)' : 'black'}, transparent)` }} />
      </div>

      <AnimatePresence mode="wait">
        {view === 'login' ? (
          /* TELA DE LOGIN COM TEXTO CRIATIVO */
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="relative z-10 flex h-full flex-col items-center justify-center gap-12 text-center px-4">
            <div>
    <h1 className="text-5xl font-light tracking-tight mb-3">
      Bem-vindo de volta ao Portfolio
    </h1>
    <p 
      style={{ color: currentTheme.muted }} 
      className="text-xl tracking-wide font-light max-w-2xl mx-auto"
    >
      Selecione o meu perfil para continuar
    </p>
            </div>

            <button onClick={() => setView('home')} className="group relative flex flex-col items-center gap-6 focus:outline-none">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-16">
                <Gamepad2 className="w-10 h-10" style={{ color: currentTheme.text }} />
                <div className="bg-white text-black text-[10px] font-bold px-1.5 rounded-sm absolute -top-1 -right-3 shadow-lg">1</div>
              </motion.div>

              <div className="h-52 w-52 rounded-full border-[6px] border-transparent group-hover:border-blue-500 transition-all duration-500 overflow-hidden shadow-2xl bg-zinc-800">
                <img src="https://github.com/SW-Wanted.png" alt="User" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>

              <div>
                <h2 className="text-3xl font-light tracking-[0.3em] uppercase">SW Wanted</h2>
                <div className="mt-4 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <PSButton shape="X" size="w-6 h-6" theme={currentTheme} />
                  <span className="text-[11px] uppercase tracking-[0.2em] font-bold">Iniciar Portfólio</span>
                </div>
              </div>
            </button>
          </motion.div>
        ) : view === 'home' ? (
          /* TELA HOME */
          <motion.div key="home" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="relative z-10 flex h-full flex-col">
            <header className="flex items-center justify-between px-16 py-8">
              <nav className="flex items-center gap-10">
                <span className="text-xs font-black tracking-[0.3em] border-b-2 pb-1" style={{ borderColor: currentTheme.text }}>JOGOS</span>
                <span className="text-xs font-black tracking-[0.3em]" style={{ color: currentTheme.muted }}>MÍDIA</span>
              </nav>
              <div className="flex items-center gap-8">
                <Search className="w-5 h-5 cursor-pointer" /> 
                <Settings className="w-5 h-5 cursor-pointer hover:rotate-90 transition-transform" onClick={cycleTheme} style={{ color: currentTheme.accent }} />
                <span className="text-xl font-light">{time}</span>
              </div>
            </header>

            <section className="flex-1 flex flex-col justify-end px-16 pb-24">
              <motion.div key={focusedId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                <h1 className="text-7xl font-light tracking-tighter mb-2 italic uppercase">{currentProject?.title}</h1>
                <p style={{ color: currentTheme.muted }} className="text-lg uppercase tracking-widest">{currentProject?.category}</p>
              </motion.div>

              <div className="flex gap-4 overflow-visible h-[280px] items-end">
                {PROJECTS.map((project) => (
                  <motion.div
                    key={project.id}
                    onMouseEnter={() => setFocusedId(project.id)}
                    onClick={() => { setSelectedId(project.id); setView('detail'); }}
                    whileHover={{ scale: 1.05, y: -15 }}
                    className={`relative w-[180px] aspect-[2/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 shadow-xl border-4 ${
                      focusedId === project.id ? 'z-20 scale-105' : 'opacity-40 border-transparent'
                    }`}
                    style={{ borderColor: focusedId === project.id ? currentTheme.text : 'transparent' }}
                  >
                    <img src={project.img} className="w-full h-full object-cover" alt={project.title} />
                  </motion.div>
                ))}
              </div>
            </section>

            <footer className="px-16 py-8 flex items-center gap-10">
               <NavHint shape="X" label="Selecionar" theme={currentTheme} />
               <NavHint shape="O" label="Sair" theme={currentTheme} onClick={() => setView('login')} />
            </footer>
          </motion.div>
        ) : (
          /* TELA DE DETALHES */
          <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-20 flex h-full items-center justify-center p-10">
            <div className={`absolute inset-0 backdrop-blur-3xl ${currentTheme.id === 'classic' ? 'bg-white/60' : 'bg-black/70'}`} />
            <div className="relative z-30 w-full max-w-6xl grid grid-cols-5 gap-16 items-center">
              <div className="col-span-2 flex justify-center">
                <img src={currentProject?.img} className="w-full max-w-[400px] aspect-[2/3] rounded-xl object-cover shadow-2xl border border-white/10" />
              </div>
              <div className="col-span-3 flex flex-col gap-8">
                <h1 className="text-8xl font-black italic tracking-tighter uppercase">{currentProject?.title}</h1>
                <p className="text-2xl leading-relaxed font-light" style={{ color: currentTheme.muted }}>{currentProject?.description}</p>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => window.open(currentProject?.link, '_blank')}
                    className="px-14 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform flex items-center gap-4"
                    style={{ background: currentTheme.id === 'classic' ? '#0f172a' : 'white', color: currentTheme.id === 'classic' ? 'white' : 'black' }}>
                    <Globe className="w-6 h-6" /> JOGAR AGORA
                  </button>
                  <button 
                    onClick={() => window.open(currentProject?.github, '_blank')}
                    className="p-5 rounded-full border border-current hover:bg-zinc-500/10 transition-colors">
                    <Github className="w-7 h-7" />
                  </button>
                </div>
                <NavHint shape="O" label="Voltar" theme={currentTheme} onClick={() => setView('home')} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// COMPONENTES AUXILIARES ADAPTÁVEIS
function PSButton({ shape, size = "w-6 h-6", theme }: { shape: string, size?: string, theme: any }) {
  const shapes: Record<string, string> = { "X": "border-blue-400 text-blue-400", "O": "border-red-500 text-red-500" };
  return (
    <div className={`${size} rounded-full border-2 ${shapes[shape]} flex items-center justify-center text-[10px] font-black`}
         style={{ backgroundColor: theme.id === 'classic' ? '#f1f5f9' : '#000' }}>
      {shape}
    </div>
  );
}

function NavHint({ shape, label, theme, onClick }: { shape: string, label: string, theme: any, onClick?: () => void }) {
  return (
    <div role="button" className="flex items-center gap-3 cursor-pointer group" onClick={onClick}>
      <PSButton shape={shape} size="w-8 h-8" theme={theme} />
      <span className="text-sm font-bold tracking-[0.2em] uppercase transition-colors" style={{ color: theme.muted }}>{label}</span>
    </div>
  );
}