"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Settings, Disc, Globe, Github, ChevronLeft, Info } from 'lucide-react';

// Dados atualizados com detalhes extras
const PROJECTS = [
  { 
    id: 1, 
    title: "ASTRO'S PLAYROOM", 
    category: "Portfolio Engine", 
    img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800", 
    bg: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2000", 
    description: "Um motor de portfólio de alta performance construído com Next.js 14 e Framer Motion. Focado em transições imersivas e UX de console.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "#",
    github: "#"
  },
  { 
    id: 2, 
    title: "CYBERPUNK 2077", 
    category: "E-Commerce", 
    img: "https://images.unsplash.com/photo-1605898960710-91152a5538e1?w=800", 
    bg: "https://images.unsplash.com/photo-1605898960710-91152a5538e1?q=80&w=2000",
    description: "Plataforma de e-commerce futurista com integração de pagamentos e renderização no lado do servidor para SEO otimizado.",
    tags: ["React", "Stripe", "Node.js"],
    link: "#",
    github: "#"
  },
  { 
    id: 3, 
    title: "HORIZON ZERO", 
    category: "AI Analytics", 
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800", 
    bg: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000",
    description: "Dashboard de análise de dados utilizando inteligência artificial para prever tendências de mercado e comportamento do usuário.",
    tags: ["Python", "OpenAI", "TensorFlow"],
    link: "#",
    github: "#"
  },
];

export default function PS5Interface() {
  const [view, setView] = useState<'login' | 'home' | 'detail'>('login');
  const [focusedId, setFocusedId] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentProject = PROJECTS.find(p => p.id === (view === 'detail' ? selectedId : focusedId));

  return (
    <main className="relative h-screen w-screen bg-[#000000] text-white overflow-hidden font-sans">
      
      {/* 1. FUNDO OLED (Resultado 1 da busca) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="particles absolute inset-0 opacity-20" />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject?.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentProject?.bg})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <AnimatePresence mode="wait">
        {view === 'login' ? (
          /* TELA DE LOGIN */
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="relative z-10 flex h-full flex-col items-center justify-center">
            <button onClick={() => setView('home')} className="group flex flex-col items-center gap-6">
              <div className="h-44 w-44 rounded-full border-4 border-transparent bg-zinc-800 transition-all duration-500 group-hover:border-blue-500 group-hover:shadow-[0_0_50px_rgba(0,114,206,0.6)] overflow-hidden">
                <img src="sw_wanted.png" alt="User" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-3xl font-light tracking-[0.3em]">SW Wanted</h1>
              <div className="flex items-center gap-2 text-zinc-400 animate-pulse">
                <PSButton shape="X" size="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-white">Entrar</span>
              </div>
            </button>
          </motion.div>
        ) : view === 'home' ? (
          /* TELA HOME (LAYERED DIMENSIONS - Resultado 2) */
          <motion.div key="home" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="relative z-10 flex h-full flex-col">
            <header className="flex items-center justify-between px-16 py-8">
              <nav className="flex items-center gap-10">
                <span className="text-sm font-bold tracking-[0.2em] border-b-2 border-white pb-1">JOGOS</span>
                <span className="text-sm font-bold tracking-[0.2em] text-zinc-400">MÍDIA</span>
              </nav>
              <div className="flex items-center gap-8 text-zinc-400">
                <Search className="w-5 h-5" /> <Settings className="w-5 h-5" />
                <span className="text-xl font-light text-white">{time}</span>
              </div>
            </header>

            <section className="flex-1 flex flex-col justify-end px-16 pb-20">
              <motion.div key={focusedId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                <h1 className="text-7xl font-light tracking-tighter mb-2 italic uppercase">{currentProject?.title}</h1>
                <p className="text-zinc-400 text-lg uppercase tracking-widest">{currentProject?.category}</p>
              </motion.div>

              <div className="flex gap-4">
                {PROJECTS.map((project) => (
                  <motion.div
                    key={project.id}
                    onMouseEnter={() => setFocusedId(project.id)}
                    onClick={() => { setSelectedId(project.id); setView('detail'); }}
                    whileHover={{ scale: 1.1, y: -10 }}
                    className={`relative min-w-[150px] h-[150px] rounded-2xl cursor-pointer transition-all duration-300 ${
                      focusedId === project.id ? 'ring-4 ring-white shadow-2xl z-20' : 'opacity-40'
                    }`}
                  >
                    <img src={project.img} className="w-full h-full object-cover rounded-2xl" />
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        ) : (
          /* TELA DE DETALHES (GLASSMORPHISM - Resultado 3) */
          <motion.div 
            key="detail" 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0 }}
            className="relative z-20 flex h-full items-center justify-center p-10"
          >
            {/* Overlay de Vidro (Fundo do Card) */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
            
            <div className="relative z-30 w-full max-w-5xl grid grid-cols-2 gap-12 items-center">
              <div>
                <motion.img 
                  initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  src={currentProject?.img} className="w-[350px] h-[500px] rounded-3xl object-cover shadow-2xl border border-white/20" 
                />
              </div>
              
              <div className="flex flex-col gap-6">
                <h1 className="text-6xl font-black italic tracking-tighter">{currentProject?.title}</h1>
                <div className="flex gap-3">
                  {currentProject?.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/10 rounded text-[10px] font-bold tracking-widest uppercase border border-white/10">{tag}</span>
                  ))}
                </div>
                <p className="text-xl text-zinc-300 leading-relaxed font-light">{currentProject?.description}</p>
                
                <div className="flex items-center gap-6 mt-6">
                  <button className="px-12 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-3">
                    <Globe className="w-5 h-5" /> Jogar / Ver Site
                  </button>
                  <button className="p-4 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                    <Github className="w-6 h-6" />
                  </button>
                </div>

                <div className="mt-12">
                   <NavHint shape="O" label="Voltar para Início" onClick={() => setView('home')} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// Componentes do PlayStation
function PSButton({ shape, size = "w-6 h-6" }: { shape: string, size?: string }) {
  const colors: Record<string, string> = { "X": "border-blue-400 text-blue-400", "O": "border-red-500 text-red-500" };
  return <div className={`${size} rounded-full border-2 ${colors[shape]} flex items-center justify-center text-[10px] font-black bg-black`}>{shape}</div>;
}

function NavHint({ shape, label, onClick }: { shape: string, label: string, onClick?: () => void }) {
  return (
    <div 
      role="button"
      aria-label={`${label} (Botão ${shape} no controle)`}
      className="flex items-center gap-3 cursor-pointer group" 
      onClick={onClick}
    >
      <PSButton shape={shape} size="w-8 h-8" />
      <span className="text-xs font-bold tracking-widest uppercase text-zinc-300 group-hover:text-white transition-colors">
        {label}
      </span>
    </div>
  );
}