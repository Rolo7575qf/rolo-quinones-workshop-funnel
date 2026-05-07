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
  { id: 1, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1776098579/Bajo_la_luz_de_Paris_1.jpg", title: "Bajo la luz de Paris" },
  { id: 2, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1776096698/Rouen___Francia.jpg", title: "Rouen Francia" },
  { id: 3, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1774572770/Acuarela_Cesky.jpg", title: "Acuarela Cesky" },
  { id: 4, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1774402985/Baja_Marea.jpg", title: "Baja Marea" },
  { id: 5, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1774402778/IMG_20260310_161727918_AE_1_-_copia.jpg", title: "Obra en Estudio" },
  { id: 6, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1774399238/Bolsa%20Valparaiso.jpg", title: "Bolsa Valparaíso" },
  { id: 7, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1774402877/Sierra_India_-_copia.jpg", title: "Sierra India" },
  { id: 8, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1774572108/Valle_en_Inverno.jpg", title: "Valle en Invierno" }
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
  { id: 1, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1774398411/1704126221112_qoh9la.jpg", location: "Sketch Urbano" },
  { id: 2, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1774398410/Rolo%20_Historia.jpg", location: "Taller en Vivo" },
  { id: 3, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1778088670/Madrid.jpg", location: "Madrid, España" },
  { id: 4, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1778088669/Liverpool.jpg", location: "Liverpool, UK" },
  { id: 5, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1778088669/Londres.jpg", location: "Londres, UK" },
  { id: 6, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1778088669/Cambrich_1.jpg", location: "Cambridge, UK" }
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
    window.open('https://pay.hotmart.com/U99377775X?off=zcbvhlbz', '_blank');
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
            <button 
              onClick={() => window.open('https://pay.hotmart.com/U99377775X?off=zcbvhlbz', '_blank')}
              className="px-8 py-3 bg-white text-black rounded-full hover:bg-neon-emerald hover:text-black transition-all font-black text-[9px] uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Sí, quiero despertar mi artista interior
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
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  window.open('https://pay.hotmart.com/U99377775X?off=zcbvhlbz', '_blank');
                }}
                className="w-full py-5 bg-neon-emerald text-black rounded-full text-sm font-black uppercase tracking-widest"
              >
                Sí, quiero despertar mi artista interior
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex items-center pt-40 pb-20 relative">
          <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-neon-emerald"></span>
                <span className="text-neon-emerald text-[9px] font-black uppercase tracking-[0.5em]">El Despertar del Artista</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-display font-bold tracking-tighter leading-[1] mb-8">
                ¿Y si todavía no es demasiado tarde para convertirte en artista?
              </h1>
              
              <div className="space-y-4 text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-12 max-w-xl">
                <p>Hay una parte de ti que lleva años esperando este momento.</p>
                <p>Una parte silenciosa... creativa... sensible... que sueña con pintar, crear y expresarse... pero que ha vivido demasiado tiempo atrapada entre el miedo y la postergación.</p>
                <p className="text-white italic font-display">Hoy puedes volver a encontrarla.</p>
              </div>
              
              <div className="flex flex-col gap-4 items-start">
                <button 
                  onClick={() => window.open('https://pay.hotmart.com/U99377775X?off=zcbvhlbz', '_blank')}
                  className="px-10 md:px-12 py-6 bg-neon-emerald text-black rounded-full text-xs font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(0,255,157,0.2)] hover:shadow-[0_20px_60px_rgba(0,255,157,0.4)] hover:-translate-y-1 transition-all animate-shine"
                >
                  Sí, quiero dejar de postergar mi lado artístico
                </button>
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
              </div>
              <div className="relative z-10 w-full max-w-sm mx-auto aspect-[9/16] rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(0,255,157,0.1)] neon-border-emerald group">
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
          </div>
        </section>

        {/* EL DOLOR SILENCIOSO */}
        <section className="py-32 relative overflow-hidden bg-black text-center border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-12">Lo más triste no es no saber pintar...</h2>
              
              <div className="space-y-6 text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
                <p className="text-white text-2xl font-display mb-8">Lo más triste es pasar años creyendo que ya es demasiado tarde.</p>
                <p>Sé lo que se siente.</p>
                <p>Guardar pinceles en un cajón.<br/>Comprar materiales “para algún día”.<br/>Mirar artistas en Instagram pensando:<br/><span className="italic">“ojalá yo pudiera hacer eso.”</span></p>
                <p>Y mientras tanto... los años pasan. La creatividad se va apagando lentamente. La rutina ocupa todo el espacio. Y esa parte tuya que quería crear... empieza a quedarse en silencio.</p>
                <p>Pero quiero decirte algo importante:</p>
                
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mt-12 mb-6">El problema nunca fue el talento.</h3>
                <p className="text-xl">El problema fue seguir esperando el momento perfecto.</p>
                
                <div className="pt-12">
                  <button 
                    onClick={() => window.open('https://pay.hotmart.com/U99377775X?off=zcbvhlbz', '_blank')}
                    className="text-neon-emerald hover:text-white transition-colors uppercase tracking-[0.3em] font-bold text-[10px] pb-2 border-b border-neon-emerald/30 hover:border-white"
                  >
                    Quizá hoy pueda ser ese momento
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STORYTELLING DE ROLO */}
        <section className="py-32 relative overflow-hidden bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1">
                <div className="aspect-[4/5] w-full max-w-md mx-auto rounded-[40px] overflow-hidden border border-white/10 relative shadow-2xl">
                  <img src="https://res.cloudinary.com/diqwlgqig/image/upload/v1774398410/Rolo%20_Historia.jpg" alt="Rolo pintando en el taller" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700" />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-10">Yo también pensé que no era capaz.</h2>
                <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed">
                  <p>Desde niño, el olor a óleo en el taller de mi abuelo se quedó grabado dentro de mí. Lo veía pintar y sentía admiración... pero también distancia. Pensaba: <span className="italic">“él tiene un don.” “yo no nací para eso.”</span></p>
                  <p>Y así comenzaron años de frustración silenciosa. Compré materiales que nunca usé. Miraba el papel en blanco como si fuera un enemigo. Me paralizaba la idea de equivocarme.</p>
                  <p>Hasta que llegó el año 2020. El mundo se detuvo... y por primera vez tuve que mirar de frente todo lo que llevaba años postergando. Ahí entendí algo que cambió mi vida:</p>
                  
                  <div className="py-6 border-l-2 border-neon-emerald/50 pl-6 my-8">
                    <h3 className="text-2xl font-display text-white font-bold mb-4">La acuarela no se trata de pintar perfecto. Se trata de atreverse a sentir.</h3>
                  </div>

                  <p>Dejar de pelear con el agua. Soltar el miedo. Aceptar el error. Volver a jugar. Volver a crear.</p>
                  <p>Y poco a poco... la frustración se transformó en libertad. Hoy mis obras han viajado por distintos lugares del mundo. Pero honestamente... mi mayor logro no son las exposiciones.</p>
                  <p className="text-white font-display text-xl">Mi mayor logro fue descubrir que nunca era demasiado tarde para empezar.</p>
                  <p>Y si yo pude hacerlo... tú también puedes.</p>
                  
                  <div className="pt-8">
                    <button 
                      onClick={() => window.open('https://pay.hotmart.com/U99377775X?off=zcbvhlbz', '_blank')}
                      className="px-10 py-5 bg-white/10 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-neon-emerald hover:text-black transition-all"
                    >
                      Quiero atreverme a comenzar
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* IDENTIFICACIÓN */}
        <section className="py-32 relative bg-black">
          <div className="max-w-4xl mx-auto px-6">
            <SectionTitle subtitle="Es un reflejo de ti" accent="amber">Quizá esta experiencia es para ti si...</SectionTitle>
            <div className="mt-12 space-y-6">
              {[
                "Siempre soñaste con pintar pero nunca te atreviste.",
                "Compraste acuarelas y todavía siguen guardadas.",
                "Sientes miedo al papel en blanco.",
                "Crees que “no tienes talento”.",
                "Necesitas un espacio creativo que sea solo tuyo.",
                "Estás cansado del estrés y quieres volver a sentir calma.",
                "Has postergado tanto tiempo tu lado artístico... que ya no quieres seguir esperando."
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-neon-amber/30 transition-all"
                >
                  <div className="w-2 h-2 rounded-full bg-neon-amber shrink-0"></div>
                  <p className="text-lg text-slate-300 font-light">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* VISUAL EMOCIONAL */}
        <section className="py-40 relative bg-white/[0.02] text-center overflow-hidden border-y border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-neon-emerald/5 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-16 opacity-20">Imagina esto...</h2>
            <div className="space-y-8 text-2xl md:text-4xl font-display font-light text-slate-300 leading-tight">
              <p>Servirte una taza de té.<br/>Respirar profundo.<br/>Escuchar música suave.<br/>Tomar un pincel después de años.<br/>Y descubrir...</p>
              <p className="text-white font-bold italic">que todavía puedes crear algo hermoso con tus propias manos.</p>
              <p className="pt-12 text-xl text-slate-400">Imagínate terminando una acuarela...<br/>mirándola en silencio...<br/>y pensando:</p>
              <h3 className="text-5xl md:text-6xl font-bold text-neon-emerald py-8">“¿De verdad hice esto yo?”</h3>
              <p className="text-xl text-slate-400">Porque muchas veces... el arte no despierta solo creatividad. También despierta partes de nosotros que creíamos perdidas.</p>
            </div>
            
            <div className="pt-20">
              <button 
                onClick={() => window.open('https://pay.hotmart.com/U99377775X?off=zcbvhlbz', '_blank')}
                className="text-neon-amber hover:text-white transition-colors uppercase tracking-[0.3em] font-bold text-[10px] pb-2 border-b border-neon-amber/30 hover:border-white"
              >
                Sí... quiero vivir eso
              </button>
            </div>
          </div>
        </section>

        {/* PRESENTACIÓN DEL WORKSHOP */}
        <section id="programa" className="py-32 relative bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Esto no es un curso más.</h2>
              <h3 className="text-2xl md:text-4xl font-display text-neon-emerald">Es una experiencia de transformación artística y emocional.</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-xl text-slate-300 font-light leading-relaxed mb-10">
                  Bienvenido al Workshop en Vivo de Acuarela con Rolo Quiñones. Una experiencia íntima y guiada donde no solo aprenderás técnica... Aprenderás a perderle miedo al papel en blanco, confiar en tu intuición, disfrutar el proceso, expresarte libremente, y reconectar con una parte de ti que quizá llevabas años ignorando.
                </p>
                <div className="p-10 rounded-[40px] glass-vanguard border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><Palette className="w-32 h-32 text-neon-emerald" /></div>
                  <h4 className="text-3xl font-display font-bold mb-8 relative z-10">¿Qué Incluye?</h4>
                  
                  <div className="flex items-start gap-6 mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-neon-emerald/20 flex items-center justify-center shrink-0 border border-neon-emerald/30">
                      <Calendar className="w-5 h-5 text-neon-emerald" />
                    </div>
                    <div>
                      <h5 className="text-xl font-bold mb-2">3 Sesiones EN VIVO junto a Rolo</h5>
                      <p className="text-slate-400 font-light">Donde pintarás paso a paso acompañado personalmente. No estarás solo.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6 mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-neon-amber/20 flex items-center justify-center shrink-0 border border-neon-amber/30">
                      <Play className="w-5 h-5 text-neon-amber" />
                    </div>
                    <div>
                      <h5 className="text-xl font-bold mb-2">BONO 1: "Los 4 Pilares de la Acuarela"</h5>
                      <p className="text-slate-400 font-light text-sm mb-2">Más de 40 lecciones grabadas para ayudarte a comprender agua, transparencia, color, atmósfera, y composición.</p>
                      <p className="text-xs uppercase tracking-widest font-black text-neon-amber">Valor real: 27 USD — <span className="text-white bg-white/10 px-2 py-1 rounded">Incluido GRATIS</span></p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-neon-amber/20 flex items-center justify-center shrink-0 border border-neon-amber/30">
                      <MessageCircle className="w-5 h-5 text-neon-amber" />
                    </div>
                    <div>
                      <h5 className="text-xl font-bold mb-2">BONO 2: Comunidad Privada</h5>
                      <p className="text-slate-400 font-light text-sm mb-2">Un espacio íntimo para compartir procesos, avances, dudas, inspiración y crear acompañado.</p>
                      <p className="text-xs uppercase tracking-widest font-black text-neon-amber">Valor real: 47 USD — <span className="text-white bg-white/10 px-2 py-1 rounded">Incluido GRATIS</span></p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                
                {/* GRUPO PIONERO */}
                <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.02]">
                  <h4 className="text-2xl font-display font-bold mb-4 text-white">Este será un grupo pequeño. Y eso es intencional.</h4>
                  <p className="text-slate-300 font-light mb-4 text-sm leading-relaxed">
                    No quiero crear un curso masivo e impersonal. Quiero acompañar de cerca a las primeras personas que decidan vivir esta experiencia. Por eso los cupos son limitados.
                  </p>
                  <p className="text-slate-300 font-light mb-6 text-sm leading-relaxed">
                    Quiero conocer tu proceso. Ver tus avances. Responder tus dudas. Y ayudarte personalmente a desbloquear tu creatividad.
                  </p>
                  <p className="text-neon-emerald font-display italic text-lg">Este primer grupo no será solo un workshop. Será el comienzo de una comunidad artística real.</p>
                </div>

                <div className="p-10 rounded-[40px] border border-neon-emerald/30 bg-neon-emerald/5 shadow-[0_0_50px_rgba(0,255,157,0.05)] text-center relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-emerald/20 blur-[50px] rounded-full"></div>
                  <h4 className="text-xl font-display font-bold mb-2 text-white relative z-10">Esto puede acompañarte toda la vida.</h4>
                  <p className="text-sm text-slate-400 mb-6 font-light relative z-10">Por menos de lo que muchas personas gastan en un fin de semana olvidable... puedes regalarte una experiencia transformadora.</p>
                  <p className="text-xs text-neon-emerald uppercase tracking-widest font-black mb-4 relative z-10">Workshop + Bonos + Comunidad</p>
                  <div className="flex justify-center items-baseline gap-2 mb-8 relative z-10">
                    <span className="text-xl font-display font-bold text-neon-emerald/50">USD</span>
                    <span className="text-7xl font-display font-black tracking-tighter text-white">147</span>
                  </div>
                  <button 
                    onClick={() => window.open('https://pay.hotmart.com/U99377775X?off=zcbvhlbz', '_blank')}
                    className="w-full py-5 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest shadow-2xl hover:bg-neon-emerald hover:text-black transition-all relative z-10"
                  >
                    Sí, quiero despertar mi artista interior
                  </button>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-4 relative z-10">Pago único.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MANEJO DE OBJECIONES */}
        <section className="py-32 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <SectionTitle subtitle="Mitos comunes" accent="amber">No dejes que tu mente te detenga</SectionTitle>
            <div className="grid md:grid-cols-2 gap-10 mt-12">
              <div className="p-8 rounded-3xl bg-black border border-white/5 hover:border-white/20 transition-all">
                <h4 className="text-xl font-display font-bold text-white mb-4">“No tengo talento...”</h4>
                <p className="text-slate-400 font-light leading-relaxed">Nadie nace sabiendo pintar acuarela. Los artistas que hoy admiras también sintieron miedo la primera vez que tocaron un pincel. No necesitas perfección. Necesitas darte permiso para comenzar.</p>
              </div>
              <div className="p-8 rounded-3xl bg-black border border-white/5 hover:border-white/20 transition-all">
                <h4 className="text-xl font-display font-bold text-white mb-4">“Nunca he pintado...”</h4>
                <p className="text-slate-400 font-light leading-relaxed">Perfecto. No necesitas experiencia previa. Solo ganas de descubrir algo nuevo dentro de ti.</p>
              </div>
              <div className="p-8 rounded-3xl bg-black border border-white/5 hover:border-white/20 transition-all">
                <h4 className="text-xl font-display font-bold text-white mb-4">“Ya estoy grande para empezar...”</h4>
                <p className="text-slate-400 font-light leading-relaxed">La creatividad no tiene edad. Y honestamente... quizá hoy tengas más sensibilidad, más historia y más emoción para expresar que nunca antes.</p>
              </div>
              <div className="p-8 rounded-3xl bg-black border border-white/5 hover:border-white/20 transition-all">
                <h4 className="text-xl font-display font-bold text-white mb-4">“Tengo miedo de fracasar...”</h4>
                <p className="text-slate-400 font-light leading-relaxed">Aquí no existen los fracasos. Solo manchas... aprendizajes... y nuevas formas de mirar el mundo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* GARANTÍA */}
        <section className="py-24 bg-black">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-20 h-20 mx-auto bg-neon-emerald/10 rounded-full flex items-center justify-center mb-8">
              <Shield className="w-10 h-10 text-neon-emerald" />
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Quiero que entres sin miedo.</h2>
            <p className="text-xl text-slate-300 font-light leading-relaxed mb-8">
              Si después de la primera sesión sientes que esta experiencia no era para ti... solo escríbeme personalmente y te devolveré el 100% de tu inversión. Así de simple.
            </p>
            <p className="text-lg text-neon-emerald italic font-display">Porque quiero que tomes esta decisión desde la ilusión... no desde la presión.</p>
          </div>
        </section>

        {/* PINTANDO EN TERRENO */}
        <section className="py-32 bg-white/[0.02] text-white overflow-hidden border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <SectionTitle subtitle="En Terreno" accent="emerald">Pintando alrededor del mundo</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {PAINTING_WORLD.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/5"
                >
                  <img 
                    src={item.url} 
                    alt={item.location}
                    className="w-full h-full object-cover aspect-video transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-bottom p-6 md:p-8">
                    <p className="text-white font-display text-lg md:text-xl mt-auto italic">{item.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GALERÍA DE OBRAS */}
        <section id="galeria" className="py-32 bg-black border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <SectionTitle subtitle="Portafolio" accent="amber">Obras Recientes</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {GALLERY.map((img, idx) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative aspect-square rounded-[40px] overflow-hidden group shadow-2xl border border-white/5"
                >
                  <img 
                    src={img.url} 
                    alt={img.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <p className="text-white text-xl md:text-2xl font-display font-bold leading-none">{img.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CIERRE CINEMATOGRÁFICO */}
        <section className="py-40 bg-white/[0.02] text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <div className="space-y-8 text-2xl md:text-4xl font-display font-light text-slate-300 leading-relaxed mb-20">
              <p>Quizá dentro de unos años recuerdes este momento.</p>
              <p>El momento exacto en el que decidiste dejar de seguir postergando algo importante para ti.</p>
              <p>La acuarela no cambiará quién eres. Pero quizá pueda ayudarte a reencontrarte con una parte de ti que había quedado dormida.</p>
              <p className="text-white font-bold">El artista que vive dentro de ti sigue ahí. Esperando.</p>
              <p className="text-neon-emerald italic">Y tal vez... hoy sea el día en que finalmente decidas escucharlo.</p>
            </div>
            
            <button 
              onClick={() => window.open('https://pay.hotmart.com/U99377775X?off=zcbvhlbz', '_blank')}
              className="px-14 py-7 bg-white text-black rounded-full text-sm font-black uppercase tracking-widest shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:bg-neon-emerald hover:-translate-y-1 transition-all animate-shine mb-12"
            >
              Estoy listo para comenzar
            </button>
            
            <div className="space-y-4 text-xs uppercase font-black tracking-widest text-slate-500 max-w-sm mx-auto p-6 border border-white/5 rounded-2xl bg-black">
              <p>⚠️ Cupos limitados para mantener una experiencia cercana y personalizada.</p>
              <p>📅 Las inscripciones cierran pronto.</p>
              <p className="text-neon-amber pt-2 border-t border-white/5">🎨 Este puede ser el comienzo de algo muy hermoso para ti.</p>
            </div>
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
            © 2026 Rolo Quiñones. Todos los derechos reservados.
          </p>

          <div className="flex gap-6">
            <a href="https://instagram.com/rolo_acuarelas" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
