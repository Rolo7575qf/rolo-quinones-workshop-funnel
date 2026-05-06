/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShoppingBag, 
  MessageCircle, 
  Globe, 
  Instagram, 
  Palette,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

// --- Constants & Data ---

const MODULES = [
  {
    id: 1,
    title: "Módulo 1: Fundamentos",
    description: "Exploración de materiales, técnicas de dibujo y ejercicios básicos para dominar el agua y el pigmento.",
    icon: <Palette className="w-6 h-6" />,
    topics: ["Selección de materiales", "Teoría del color en acuarela", "Control de humedad", "Ejercicios de pincelada"]
  },
  {
    id: 2,
    title: "Módulo 2: Acuarela Urbana",
    description: "Capturando la esencia de la ciudad, perspectiva simple y juegos de luces y sombras en entornos urbanos.",
    icon: <MapPin className="w-6 h-6" />,
    topics: ["Perspectiva atmosférica", "Composición urbana", "Texturas de piedra y ladrillo", "Figuras humanas minimalistas"]
  },
  {
    id: 3,
    title: "Módulo 3: Acuarela Naturaleza",
    description: "Interpretación orgánica de paisajes, árboles y elementos naturales con fluidez y libertad artística.",
    icon: <Globe className="w-6 h-6" />,
    topics: ["Paleta tierra y verdes", "Interpretación de follaje", "Cielos dinámicos", "Agua y reflejos"]
  }
];

const SCHEDULE = [
  { country: "Chile (Local)", time: "19:30 - 21:30 PM", offset: "CLT (GMT-4)" },
  { country: "Argentina / Uruguay", time: "20:30 - 22:30 PM", offset: "GMT-3" },
  { country: "España", time: "01:30 - 03:30 AM", offset: "CEST (GMT+2)" },
  { country: "Perú / Colombia / Ecuador", time: "18:30 - 20:30 PM", offset: "GMT-5" },
  { country: "Bolivia / Venezuela / Paraguay", time: "19:30 - 21:30 PM", offset: "GMT-4" },
  { country: "México (CDMX)", time: "17:30 - 19:30 PM", offset: "CST (GMT-6)" }
];

const GALLERY = [
  { id: 1, url: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop", title: "Catedral Europea" },
  { id: 2, url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop", title: "Abstracción Floral" },
  { id: 3, url: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1000&auto=format&fit=crop", title: "Puerto al Atardecer" },
  { id: 4, url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1000&auto=format&fit=crop", title: "Calle de Pueblo" },
  { id: 5, url: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1000&auto=format&fit=crop", title: "Paisaje de Montaña" },
  { id: 6, url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop", title: "Naturaleza Viva" }
];

// --- Components ---

const SectionTitle = ({ children, subtitle, accent = "emerald" }: { children: React.ReactNode, subtitle?: string, accent?: "emerald" | "amber" }) => (
  <div className="mb-16 text-left">
    {subtitle && (
      <motion.span 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={`inline-block mb-4 text-[10px] uppercase tracking-[0.4em] font-bold ${accent === "emerald" ? "text-neon-emerald" : "text-neon-amber"}`}
      >
        // {subtitle}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none"
    >
      {children}<span className={accent === "emerald" ? "text-neon-emerald" : "text-neon-amber"}>.</span>
    </motion.h2>
  </div>
);

const TRAJECTORY = [
  { year: "2025", org: "IWS CHILE", award: "Mención Honrosa", details: "en Certamen Nacional 'Visiones de Agua' (Viña del Mar) con la obra 'Baja Marea'." },
  { year: "2025", org: "IWS SLOVENIA", award: "Seleccionado", details: "en Certamen 'Castra' con 'Grodno'." },
  { year: "2024", org: "IWS INDIA", award: "2nd Olympiart", details: "'Worlds Biggest Watercolor Festival' with the work 'Lake Como'." },
  { year: "2024", org: "IWS ALEMANIA", award: "Exposición Internacional", details: "'Your Vision of Germany' with the work 'Diosa de la Paz'." },
  { year: "2023", org: "IWS TURKEY", award: "Mesa Especial", details: "'The Magic of Watercolor' con la obra 'Muelle Olvidado'." },
  { year: "2023", org: "IWS NFT", award: "Pulse and Art", details: "Concurso Internacional con la obra 'Neblina'." },
  { year: "2023", org: "IWS UKRAINE", award: "Festival Internacional", details: "en Aban Institute con la obra 'Cabotaje'." },
  { year: "2022", org: "IWS CHILE", award: "Finalista", details: "en Certamen Nacional 'Visiones Profundas' (Puerto Varas) con 'Despierto'." },
];

const PAINTING_WORLD = [
  { id: 1, url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000", location: "Pintando en Venecia" },
  { id: 2, url: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=1000", location: "Sketch Urbano en Praga" }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePurchase = () => {
    // Mock purchase flow
    setHasPurchased(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans selection:bg-neon-emerald/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-emerald/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-amber/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-black/80 backdrop-blur-2xl py-4 border-b border-white/5" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
             <div className="text-2xl font-display font-black tracking-tighter uppercase">
              Rolo<span className="text-neon-emerald">Quiñones</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-bold">
            <a href="#programa" className="hover:text-neon-emerald transition-colors">Workshop</a>
            <a href="#horarios" className="hover:text-neon-emerald transition-colors">Fechas</a>
            <button 
              onClick={() => document.getElementById('comprar')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-white text-black rounded-full hover:bg-neon-emerald hover:text-black transition-all font-black text-[9px] uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Registrarme Ahora
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-40 bg-black pt-32 px-8 md:hidden"
          >
            <div className="flex flex-col gap-10 text-4xl font-display font-bold">
              <a href="#programa" onClick={() => setIsMenuOpen(false)}>Workshop</a>
              <a href="#horarios" onClick={() => setIsMenuOpen(false)}>Fechas</a>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  document.getElementById('comprar')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-5 bg-neon-emerald text-black rounded-full text-sm font-black uppercase tracking-widest"
              >
                Inscribirse — $247
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* Success Alert */}
        <AnimatePresence>
          {hasPurchased && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="bg-neon-emerald/10 border-b border-neon-emerald/20 overflow-hidden pt-32 pb-12"
            >
              <div className="max-w-4xl mx-auto px-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-neon-emerald mx-auto mb-6" />
                <h3 className="text-4xl font-display font-bold mb-4">¡Bienvenido al Art.Lab!</h3>
                <p className="text-slate-400 mb-8 max-w-md mx-auto font-light">Tu acceso ha sido procesado. Únete a los grupos para comenzar tu viaje artístico.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:bg-neon-emerald px-10 transition-colors">
                    Acceder a Plataforma
                  </button>
                  <button className="px-10 py-4 bg-[#25D366] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:opacity-90 flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp VIP
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center py-32 relative">
          <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-neon-emerald"></span>
                <span className="text-neon-emerald text-[9px] font-black uppercase tracking-[0.5em]">Workshop Online</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-white/50">3 Sesiones de 2 horas</span>
              </div>
              <h1 className="text-3xl md:text-[4rem] font-display font-bold tracking-tighter leading-[0.95] mb-8">
                ¿Y si el <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-emerald to-neon-emerald/50 italic">miedo a fallar</span> fuera lo único que te separa de la obra que siempre soñaste pintar?
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-xl font-light leading-relaxed">
                Da el primer paso en la acuarela y descubre lo maravilloso que es crear disfrutando cada pincelada. Sin frustraciones, sin técnica inalcanzable.
              </p>
              
              <div className="flex flex-col gap-4 items-start">
                <button 
                  onClick={() => document.getElementById('comprar')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-10 md:px-12 py-6 bg-neon-emerald text-black rounded-full text-xs font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(0,255,157,0.2)] hover:shadow-[0_20px_60px_rgba(0,255,157,0.4)] hover:-translate-y-1 transition-all animate-shine"
                >
                  ¡Registrarme ahora y dominar la acuarela! — $247
                </button>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black max-w-md italic ml-4">
                  * No dejes que otro año pase sin haberlo intentado. Transforma tu miedo en arte hoy mismo.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <div className="w-[120%] h-[120%] border border-white/5 rounded-full orbit-item"></div>
                <div className="w-[100%] h-[100%] border border-white/5 rounded-full absolute" style={{animation:'orbit 30s linear infinite reverse'}}></div>
              </div>
              <div className="relative z-10 aspect-[4/5] rounded-[60px] overflow-hidden neon-border-emerald group">
                 <img 
                  src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=1000&auto=format&fit=crop" 
                  alt="Workshop Hero" 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-bottom p-12">
                  <div className="mt-auto">
                    <p className="text-[10px] uppercase font-black tracking-widest text-neon-emerald mb-2">Próxima Edición</p>
                    <p className="text-3xl font-display font-bold">Mayo 20—22</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Story & Video Section (Interés) */}
        <section className="py-24 relative overflow-hidden bg-black/50 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,255,157,0.1)]">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/ykAVF2wwZPo" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                  </iframe>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <SectionTitle subtitle="Mi Historia" accent="emerald">Yo también estuve ahí</SectionTitle>
                <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed">
                  <p>
                    Seguramente has sentido esas ganas de tomar el pincel, pero algo te detiene. Quizás es el miedo a arruinar el papel blanco, o la frustración de sentir que el agua no te obedece. Yo estuve ahí.
                  </p>
                  <p>
                    Durante años, miraba las obras al óleo de mi abuelo y me preguntaba cómo lograba esa magia. El deseo estaba, pero la decisión de avanzar no llegaba... hasta el 2020. En medio del encierro, comprendí que mis sueños no podían seguir esperando.
                  </p>
                  <p>
                    Decidí transformar mis miedos en mi motor de crecimiento. Me formé con grandes mentores y hoy, como acuarelista, mi misión es que tú no abandones tu sueño de pintar.
                  </p>
                </div>
                <div className="mt-10 p-6 glass-vanguard border-white/5 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-neon-emerald"></div>
                  <p className="italic text-slate-300 font-display text-xl ml-4">"Rolo no solo te enseña a pintar, te enseña a perder el miedo a equivocarte y a disfrutar del agua."</p>
                  <p className="text-[10px] text-neon-emerald uppercase tracking-widest font-black mt-4 ml-4">— Alumna de Superación Artística</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section id="programa" className="py-32 relative overflow-hidden bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto mb-20">
              <SectionTitle subtitle="El Programa" accent="amber">Despierta tu Artista: Secretos de la Acuarela con Rolo Quiñones</SectionTitle>
              <p className="text-xl text-slate-400 font-light leading-relaxed mt-6">
                Un espacio diseñado para activar tu creatividad a través de un método 100% práctico que podrás aplicar desde el primer día. No solo aprenderás técnica; aprenderás a disfrutar el proceso.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {MODULES.map((module, idx) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-10 rounded-[40px] glass-vanguard border-white/5 group hover:neon-border-amber transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:bg-neon-amber transition-all duration-500">
                    <div className="group-hover:text-black text-neon-amber transition-colors">
                      {React.cloneElement(module.icon as React.ReactElement, { className: "w-8 h-8" })}
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{module.title}</h3>
                  <p className="text-slate-500 mb-8 text-sm leading-relaxed font-light">{module.description}</p>
                  <ul className="space-y-4">
                    {module.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-4 text-[11px] font-bold text-slate-400 group-hover:text-slate-200 transition-colors uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 bg-neon-amber rounded-full shrink-0 mt-1.5 shadow-[0_0_5px_rgba(245,158,11,0.5)]"></div>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Bonus Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-16 p-10 rounded-[40px] bg-gradient-to-br from-neon-amber/20 via-transparent to-transparent border border-neon-amber/30 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-neon-amber px-4 py-2 bg-neon-amber/10 rounded-full">Al inscribirte hoy</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="shrink-0 w-24 h-24 bg-neon-amber/20 rounded-3xl flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-neon-amber" />
                </div>
                <div className="grid md:grid-cols-2 gap-8 w-full">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 shrink-0 w-5 h-5 rounded-full border border-neon-amber/30 flex items-center justify-center text-[10px] font-bold text-neon-amber">1</div>
                    <div>
                      <h4 className="text-xl font-display font-bold mb-1">Garantía de Formación</h4>
                      <p className="text-slate-400 text-xs font-light">Acceso GRATUITO por 1 año al curso "Los 4 Pilares de la Acuarela" (más de 40 videos con procesos completos).</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 shrink-0 w-5 h-5 rounded-full border border-neon-amber/30 flex items-center justify-center text-[10px] font-bold text-neon-amber">2</div>
                    <div>
                      <h4 className="text-xl font-display font-bold mb-1">Comunidad VIP</h4>
                      <p className="text-slate-400 text-xs font-light">Acceso a la comunidad exclusiva de Rolo Acuarelas, donde compartimos tips, información y soporte continuo.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-neon-amber/5 border border-neon-amber/20 rounded-3xl p-8 max-w-3xl mx-auto text-center"
            >
              <p className="text-neon-amber font-black uppercase tracking-widest text-[10px] mb-3">Nota de Exclusividad</p>
              <p className="text-slate-300 font-light text-sm md:text-base">
                Para garantizar que recibas una atención personalizada y pueda guiar tus pinceladas de cerca, este workshop está limitado a solo <span className="font-bold text-white">15 participantes</span>.
              </p>
              
              <div className="mt-6 flex flex-col items-center">
                <div className="flex justify-between w-full max-w-xs text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">
                  <span>Cupos Ocupados</span>
                  <span className="text-neon-amber">12 / 15</span>
                </div>
                <div className="w-full max-w-xs h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-amber w-[80%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                </div>
                <p className="text-neon-amber font-black text-xs mt-3 animate-pulse">¡Últimos 3 cupos disponibles!</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 text-center flex flex-col items-center gap-4"
            >
              <button 
                onClick={() => document.getElementById('comprar')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-14 py-6 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-neon-amber hover:text-black transition-all animate-shine shadow-2xl"
              >
                ¡Registrarme ahora y dominar la acuarela!
              </button>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black max-w-md italic">
                * No dejes que otro año pase sin haberlo intentado. Transforma tu miedo en arte hoy mismo.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="horarios" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <SectionTitle subtitle="Calendario" accent="emerald">Fechas de las sesiones y horarios por país</SectionTitle>
                <p className="text-slate-400 mb-12 text-lg font-light leading-relaxed">
                  3 Sesiones de 2 horas cada una. Conéctate en vivo y transforma tu técnica con guía personalizada.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-8 glass-vanguard rounded-3xl border-white/5">
                    <Calendar className="w-6 h-6 text-neon-emerald mb-4" />
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">Días</p>
                    <p className="text-xl font-display font-bold tracking-tight">Mayo 20, 21, 22</p>
                  </div>
                  <div className="p-8 glass-vanguard rounded-3xl border-white/5">
                    <Clock className="w-6 h-6 text-neon-emerald mb-4" />
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">Sesiones</p>
                    <p className="text-xl font-display font-bold tracking-tight">3 x 120 Mins</p>
                  </div>
                </div>
              </div>

              <div className="glass-vanguard p-12 rounded-[50px] border-white/10 shadow-2xl relative overflow-hidden">
                <div className="space-y-4 relative z-10">
                  {SCHEDULE.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex justify-between items-center py-6 border-b border-white/5 last:border-0 hover:bg-white/5 px-4 rounded-2xl transition-all group"
                    >
                      <div>
                        <p className="text-xs uppercase font-black tracking-widest text-slate-400 group-hover:text-white transition-colors">{item.country}</p>
                        <p className="text-[10px] text-slate-600 font-mono mt-1 uppercase">{item.offset}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-display font-bold text-neon-emerald transition-transform group-hover:scale-110">{item.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trajectory */}
        <section id="trayectoria" className="py-24 bg-black relative">
          <div className="absolute inset-0 bg-radial-gradient"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionTitle subtitle="Experience" accent="emerald">Trayectoria Internacional</SectionTitle>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
              {TRAJECTORY.map((item, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="group flex items-center justify-between py-4 px-6 glass-vanguard border-transparent hover:border-neon-emerald/20 transition-all duration-300 rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black font-mono text-slate-600 group-hover:text-neon-emerald transition-colors">{item.year}</span>
                    <div>
                      <p className="text-[8px] font-black uppercase text-neon-emerald tracking-[0.2em]">{item.org}</p>
                      <h4 className="text-lg font-display font-bold tracking-tight">{item.award}</h4>
                    </div>
                  </div>
                  <p className="text-slate-500 italic text-[10px] font-light max-w-[150px] text-right leading-tight">
                    {item.details.split(' ').slice(0, 5).join(' ')}...
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Rolo in the World Section */}
        <section className="py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <SectionTitle subtitle="En Terreno" accent="emerald">Pintando alrededor del mundo</SectionTitle>
            <div className="grid md:grid-cols-2 gap-12">
              {PAINTING_WORLD.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative group rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img 
                    src={item.url} 
                    alt={item.location}
                    className="w-full h-full object-cover aspect-video transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-bottom p-8">
                    <p className="text-white font-display text-xl mt-auto italic">{item.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="galeria" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <SectionTitle subtitle="Portafolio" accent="amber">Obras Recientes</SectionTitle>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY.map((img, idx) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative aspect-square rounded-[40px] overflow-hidden group shadow-2xl"
                >
                  <img 
                    src={img.url} 
                    alt={img.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <p className="text-neon-amber text-[9px] font-black uppercase tracking-widest mb-1 italic">Fine Art Print</p>
                    <p className="text-white text-3xl font-display font-bold leading-none">{img.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="comprar" className="py-24 relative">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-12 md:p-20 rounded-[50px] glass-vanguard border-neon-emerald/10 overflow-hidden relative"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-emerald/5 rounded-full blur-[80px]"></div>
              
              <div className="relative z-10 text-center">
                <SectionTitle subtitle="Únete al Art.Lab" accent="emerald">Transforma tu arte hoy</SectionTitle>
                <div className="mb-12">
                   <div className="flex justify-center items-baseline gap-2">
                    <span className="text-xl font-display font-bold text-neon-emerald/50">USD</span>
                    <span className="text-9xl md:text-[12rem] font-display font-black tracking-[-0.08em] leading-none mb-4">247</span>
                  </div>
                  <p className="text-slate-400 font-light tracking-[0.2em] uppercase text-[10px]">Inversión única / Acceso de por vida</p>
                </div>

                <div className="flex flex-col gap-6 max-w-sm mx-auto">
                  <button 
                    onClick={handlePurchase}
                    className="w-full py-7 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:bg-neon-emerald hover:-translate-y-1 transition-all group active:scale-95 animate-shine"
                  >
                    ¡Registrarme Ahora y Dominar la Acuarela!
                  </button>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black italic -mt-2">
                    * No dejes que otro año pase sin haberlo intentado. Transforma tu miedo en arte hoy mismo.
                  </p>
                  <div className="flex items-center justify-center gap-6 text-[9px] font-black uppercase tracking-widest text-slate-600">
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-neon-emerald" /> Stripe</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-neon-emerald" /> PayPal</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-display font-black tracking-tighter uppercase">
            Rolo<span className="text-neon-emerald">Quiñones</span>
          </div>

          <p className="text-[9px] uppercase font-black tracking-widest text-slate-600">
            © 2026 Rolo Quiñones Art.Lab — All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
