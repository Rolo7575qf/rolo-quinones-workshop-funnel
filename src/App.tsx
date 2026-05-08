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
  X,
  Play,
  Shield,
  Video,
  Users,
  Award,
  ChevronDown,
  Sparkles
} from "lucide-react";

// --- Constants & Data ---

const PAINTING_WORLD = [
  { id: 1, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1778088670/Madrid.jpg", location: "Madrid, España" },
  { id: 2, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1774399238/Bolsa%20Valparaiso.jpg", location: "Valparaíso, Chile" },
  { id: 3, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1778088669/Londres.jpg", location: "Londres, Reino Unido" },
  { id: 4, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1776096698/Rouen___Francia.jpg", location: "Rouen, Francia" },
  { id: 5, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1778088669/Liverpool.jpg", location: "Liverpool, Reino Unido" },
  { id: 6, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1774572770/Acuarela_Cesky.jpg", location: "Cesky Krumlov, R. Checa" }
];

const GALLERY = [
  { id: 1, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1776098579/Bajo_la_luz_de_Paris_1.jpg", title: "Bajo la Luz de París" },
  { id: 2, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1774402985/Baja_Marea.jpg", title: "Baja Marea" },
  { id: 3, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1774402778/IMG_20260310_161727918_AE_1_-_copia.jpg", title: "Atmósfera Urbana" },
  { id: 4, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1774402877/Sierra_India_-_copia.jpg", title: "Sierra India" },
  { id: 5, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1774572108/Valle_en_Inverno.jpg", title: "Valle en Invierno" },
  { id: 6, url: "https://res.cloudinary.com/diqwlgqig/image/upload/v1778088669/Cambrich_1.jpg", title: "Cambridge" }
];

const FAQ = [
  {
    q: "¿Necesito tener experiencia pintando?",
    a: "No. Empezaremos desde cero. Este espacio es precisamente para quitarte el miedo al papel en blanco, no para evaluar tu técnica."
  },
  {
    q: "¿Qué materiales necesito?",
    a: "Un par de pinceles, papel de acuarela básico y pigmentos. No necesitas las marcas más caras para comenzar. Al inscribirte, te enviaré mi lista de recomendaciones."
  },
  {
    q: "¿Las sesiones quedan grabadas?",
    a: "Sí. Entiendo que a veces la vida se interpone. Tendrás acceso de por vida a las grabaciones para que repitas la experiencia cuando quieras."
  },
  {
    q: "¿Cómo accedo al workshop y la comunidad?",
    a: "Al inscribirte recibirás acceso inmediato a una plataforma privada (Hotmart) donde estarán los bonos, los enlaces para las sesiones en vivo y el acceso a nuestra comunidad."
  },
  {
    q: "¿Cuándo son las sesiones?",
    a: "Nos reuniremos en vivo los días 20, 21 y 22 de mayo, de 19:30 a 21:30 (hora Chile). Si no puedes asistir, las grabaciones estarán disponibles para ti de por vida."
  }
];

// --- Subcomponents ---

const SectionTitle = ({ children, subtitle, accent = "emerald" }: { children: React.ReactNode, subtitle?: string, accent?: "emerald" | "amber" | "rose" }) => {
  const accentColors = {
    emerald: "text-neon-orange",
    amber: "text-neon-amber",
    rose: "text-rose-500"
  };

  return (
    <div className="mb-20">
      {subtitle && (
        <div className="flex items-center gap-4 mb-4">
          <span className={`w-8 h-[1px] bg-current ${accentColors[accent]}`}></span>
          <span className={`${accentColors[accent]} text-[9px] font-black uppercase tracking-[0.5em]`}>{subtitle}</span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-display font-bold text-white max-w-2xl leading-tight">
        {children}
      </h2>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePurchase = () => {
    window.open('https://pay.hotmart.com/U99377775X?off=zcbvhlbz', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans selection:bg-neon-orange/30 overflow-x-hidden pb-20 md:pb-0">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-orange/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-amber/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-black/80 backdrop-blur-2xl py-4 border-b border-white/5" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
             <div className="text-2xl font-display font-black tracking-tighter uppercase">
              Rolo<span className="text-neon-orange">Quiñones</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-bold">
            <a href="#programa" className="hover:text-neon-orange transition-colors">Workshop</a>
            <button 
              onClick={handlePurchase}
              className="px-8 py-3 bg-white text-black rounded-full hover:bg-neon-orange hover:text-black transition-all font-black text-[9px] uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Sí, quiero atreverme
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
                  handlePurchase();
                }}
                className="w-full py-5 bg-neon-orange text-black rounded-full text-sm font-black uppercase tracking-widest"
              >
                Sí, quiero atreverme
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center pt-32 pb-10 relative">
          <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-neon-orange"></span>
                <span className="text-neon-orange text-[9px] font-black uppercase tracking-[0.5em]">El Despertar del Artista</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-display font-bold tracking-tighter leading-[1.1] mb-8">
                ¿Y si todavía no es demasiado tarde para convertirte en artista?
              </h1>
              
              <div className="space-y-4 text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-10 max-w-xl">
                <p>Un espacio íntimo y en vivo donde el agua, el color y tú finalmente encontrarán su propio idioma.</p>
                <p className="text-white italic font-display">En solo 3 sesiones descubrirás que, sin presiones, sí eres capaz de crear algo hermoso con tus propias manos.</p>
              </div>
              
              <div className="flex flex-col gap-4 items-start">
                <button 
                  onClick={handlePurchase}
                  className="px-10 md:px-12 py-6 bg-neon-orange text-black rounded-full text-xs font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(0,255,157,0.2)] hover:shadow-[0_20px_60px_rgba(0,255,157,0.4)] hover:-translate-y-1 transition-all animate-shine"
                >
                  Hoy decido empezar
                </button>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-neon-orange animate-pulse mr-2"></span>
                  Inscripciones Abiertas • Iniciamos el 20 de Mayo • Solo 15 cupos
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
              </div>
              <div className="relative z-10 w-full max-w-sm mx-auto aspect-[9/16] rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(0,255,157,0.1)] neon-border-emerald group">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/ykAVF2wwZPo?autoplay=1&mute=1&controls=0&loop=1" 
                    title="Rolo Quiñones" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                  </iframe>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MINI BLOQUE DE OFERTA */}
        <section className="py-8 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-xs font-black tracking-widest uppercase text-slate-400">
              <span className="flex items-center gap-2"><Video className="w-4 h-4 text-neon-orange"/> 3 Sesiones en Vivo</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4 text-neon-orange"/> Grupo Reducido</span>
              <span className="flex items-center gap-2"><Award className="w-4 h-4 text-neon-amber"/> Curso Bonus</span>
              <span className="flex items-center gap-2 text-white"><Sparkles className="w-4 h-4 text-neon-orange"/> Acceso: 147 USD</span>
            </div>
          </div>
        </section>

        {/* MICRO-REFLEXIÓN 1 */}
        <div className="py-20 text-center">
          <p className="text-slate-500 italic font-display text-2xl opacity-60">¿Hace cuánto tiempo llevas ignorando esa parte de ti?</p>
        </div>

        {/* EL DOLOR SILENCIOSO */}
        <section className="py-24 relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-12">Lo más triste no es no saber pintar...</h2>
              
              <div className="space-y-6 text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
                <p className="text-white text-2xl font-display mb-8">Lo más triste es pasar años creyendo que ya es demasiado tarde.</p>
                <p>Sé lo que se siente mirar el papel en blanco como si fuera el enemigo.</p>
                <p>Guardar pinceles en un cajón.<br/>Comprar materiales “para algún día”.<br/>Mirar artistas en Instagram pensando:<br/><span className="italic">“ojalá yo pudiera hacer eso.”</span></p>
                <p>Y mientras tanto... los años pasan. La rutina ocupa todo el espacio. Y esa parte tuya que quería crear empieza a quedarse en silencio.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PANTALLA CINEMATOGRÁFICA 1 */}
        <section className="min-h-[70vh] flex items-center justify-center bg-black border-y border-white/5">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center px-6"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter">No era falta de talento.</h2>
            <h2 className="text-5xl md:text-7xl font-display font-light text-slate-500 italic mt-4">Era miedo.</h2>
          </motion.div>
        </section>

        {/* STORYTELLING DE ROLO */}
        <section className="py-32 relative overflow-hidden bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1">
                <div className="aspect-[4/5] w-full max-w-md mx-auto rounded-[40px] overflow-hidden border border-white/10 relative shadow-2xl">
                  <img src="https://res.cloudinary.com/diqwlgqig/image/upload/v1774398410/Rolo%20_Historia.jpg" alt="Rolo pintando en el taller" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700" />
                </div>
                <p className="text-center text-slate-500 text-sm italic mt-6">A veces, el primer trazo es el más difícil.</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-10">Yo también pensé que no era capaz.</h2>
                <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed">
                  <p>Desde niño, el olor a óleo en el taller de mi abuelo se quedó grabado dentro de mí. Lo veía pintar y pensaba: <span className="italic">“Él tiene un don. Yo no nací para eso.”</span></p>
                  <p>Hasta que llegó el año 2020. El mundo se detuvo... y por primera vez tuve que mirar de frente todo lo que llevaba años postergando. Ahí entendí algo que cambió mi vida:</p>
                  
                  <div className="py-6 border-l-2 border-neon-orange/50 pl-6 my-8">
                    <h3 className="text-2xl font-display text-white font-bold mb-4">La acuarela no se trata de pintar perfecto. Se trata de atreverse a sentir.</h3>
                  </div>

                  <p>Dejar de pelear con el agua. Soltar el miedo. Aceptar el error. Volver a jugar. Volver a crear.</p>
                  <p className="text-white font-display text-xl">Mi mayor logro fue descubrir que nunca era demasiado tarde para empezar.</p>
                  
                  <div className="pt-8">
                    <button 
                      onClick={handlePurchase}
                      className="text-neon-orange hover:text-white transition-colors uppercase tracking-[0.3em] font-bold text-[10px] pb-2 border-b border-neon-orange/30 hover:border-white"
                    >
                      Quiero dar el primer paso
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MICRO-REFLEXIÓN 2 */}
        <div className="py-20 text-center bg-black">
          <p className="text-slate-500 italic font-display text-2xl opacity-60">¿Y si esta vez fuera diferente?</p>
        </div>

        {/* PRESENTACIÓN DEL WORKSHOP */}
        <section id="programa" className="py-32 relative bg-black border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Esto no es un curso más.</h2>
              <h3 className="text-2xl md:text-4xl font-display text-neon-orange">Es una experiencia de transformación.</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <div className="p-10 rounded-[40px] glass-vanguard border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><Palette className="w-32 h-32 text-neon-orange" /></div>
                  <h4 className="text-3xl font-display font-bold mb-8 relative z-10">¿Qué Incluye?</h4>
                  
                  <div className="flex items-start gap-6 mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-neon-orange/20 flex items-center justify-center shrink-0 border border-neon-orange/30">
                      <Calendar className="w-5 h-5 text-neon-orange" />
                    </div>
                    <div>
                      <h5 className="text-xl font-bold mb-2">3 Sesiones EN VIVO junto a Rolo</h5>
                      <p className="text-slate-400 font-light text-sm mb-2">20, 21 y 22 de mayo | 19:30 a 21:30 hora Chile.</p>
                      <p className="text-slate-400 font-light text-sm italic">Pintarás paso a paso acompañado personalmente. No estarás solo.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6 mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-neon-amber/20 flex items-center justify-center shrink-0 border border-neon-amber/30">
                      <Play className="w-5 h-5 text-neon-amber" />
                    </div>
                    <div>
                      <h5 className="text-xl font-bold mb-2">BONO 1: "Los 4 Pilares de la Acuarela"</h5>
                      <p className="text-slate-400 font-light text-sm mb-2">Más de 40 lecciones grabadas para dominar el agua y el color.</p>
                      <p className="text-xs uppercase tracking-widest font-black text-neon-amber">Valor real: 27 USD — <span className="text-white bg-white/10 px-2 py-1 rounded">Incluido GRATIS</span></p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-neon-amber/20 flex items-center justify-center shrink-0 border border-neon-amber/30">
                      <MessageCircle className="w-5 h-5 text-neon-amber" />
                    </div>
                    <div>
                      <h5 className="text-xl font-bold mb-2">BONO 2: Comunidad Privada</h5>
                      <p className="text-slate-400 font-light text-sm mb-2">Un espacio íntimo para compartir inspiración y crear acompañado.</p>
                      <p className="text-xs uppercase tracking-widest font-black text-neon-amber">Valor real: 47 USD — <span className="text-white bg-white/10 px-2 py-1 rounded">Incluido GRATIS</span></p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* GRUPO PIONERO */}
                <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.02]">
                  <h4 className="text-2xl font-display font-bold mb-4 text-white">Un grupo pequeño. Una experiencia íntima.</h4>
                  <p className="text-slate-300 font-light mb-4 text-sm leading-relaxed">
                    No quiero crear un curso masivo. Quiero conocer tu proceso, ver tus avances y ayudarte personalmente a desbloquear tu creatividad. Por eso los cupos son limitados a 15 personas.
                  </p>
                  <p className="text-neon-orange font-display italic text-lg">Este será el comienzo de una comunidad artística real.</p>
                </div>

                {/* PRECIO */}
                <div className="p-10 rounded-[40px] border border-neon-orange/30 bg-neon-orange/5 shadow-[0_0_50px_rgba(0,255,157,0.05)] text-center relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-orange/20 blur-[50px] rounded-full"></div>
                  <h4 className="text-xl font-display font-bold mb-2 text-white relative z-10">Esto puede acompañarte toda la vida.</h4>
                  <p className="text-xs text-neon-orange uppercase tracking-widest font-black mb-4 relative z-10 mt-6">Acceso completo de por vida</p>
                  <div className="flex justify-center items-baseline gap-2 mb-8 relative z-10">
                    <span className="text-xl font-display font-bold text-neon-orange/50">USD</span>
                    <span className="text-7xl font-display font-black tracking-tighter text-white">147</span>
                  </div>
                  <button 
                    onClick={handlePurchase}
                    className="w-full py-5 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest shadow-2xl hover:bg-neon-orange hover:text-black transition-all relative z-10"
                  >
                    Quiero mi lugar en el grupo pionero
                  </button>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-4 relative z-10">Pago único y seguro.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LO QUE REALMENTE ESTÁS COMPRANDO */}
        <section className="py-32 bg-white/[0.02] border-b border-white/5">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-10 text-center">Esto va mucho más allá de la acuarela.</h2>
            <div className="text-lg text-slate-300 font-light leading-relaxed space-y-6 text-center max-w-2xl mx-auto">
              <p>No estás invirtiendo solamente en clases en vivo o teoría del color.</p>
              <p>Estás invirtiendo en **tiempo sagrado para ti**, lejos del ruido. En recuperar **confianza creativa** y darte el **permiso de equivocarte**.</p>
              <p className="text-white font-display text-2xl pt-8 italic">"Porque a veces... lo que más necesitamos no es aprender algo nuevo. Es volver a encontrarnos con nosotros mismos."</p>
            </div>
          </div>
        </section>

        {/* FUTURE PACING */}
        <section className="py-24 bg-black">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-display font-bold text-neon-amber mb-8">Imagina esto...</h3>
            <p className="text-2xl text-slate-300 font-light leading-relaxed">
              Alguien llega a tu casa, mira la pared del pasillo, y te pregunta:<br/><br/>
              <span className="text-white font-bold">"¿Tú pintaste eso?"</span><br/><br/>
              Y tú sonríes, respiras profundo, y respondes:<br/><br/>
              <span className="text-neon-orange font-display text-4xl">"Sí."</span>
            </p>
          </div>
        </section>

        {/* PANTALLA CINEMATOGRÁFICA 2 */}
        <section className="min-h-[60vh] flex items-center justify-center bg-black border-y border-white/5">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center px-6"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter mb-4">Todavía estás a tiempo.</h2>
          </motion.div>
        </section>

        {/* FAQ SECCIÓN */}
        <section className="py-32 bg-white/[0.02]">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold text-white">¿Tienes alguna duda?</h2>
              <p className="text-slate-400 mt-4 font-light">Quiero que des este paso con total tranquilidad.</p>
            </div>
            
            <div className="space-y-4">
              {FAQ.map((item, idx) => (
                <div key={idx} className="border border-white/10 rounded-2xl bg-black overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-bold text-white pr-4">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 text-neon-orange transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-slate-400 font-light border-t border-white/5 mt-2">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GARANTÍA */}
        <section className="py-24 bg-black border-y border-white/5">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="w-16 h-16 mx-auto bg-neon-orange/10 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-neon-orange" />
            </div>
            <h2 className="text-3xl font-display font-bold mb-6">Garantía de Paz Mental</h2>
            <p className="text-lg text-slate-300 font-light leading-relaxed mb-6">
              Quiero que tomes esta decisión desde la ilusión, no desde la presión. Únete a nuestra primera sesión en vivo. Conoce el método y pinta con nosotros. Si al terminar sientes que este espacio no es lo que buscabas, te devolveré el 100% de tu inversión. Riesgo cero.
            </p>
          </div>
        </section>

        {/* PINTANDO EN TERRENO */}
        <section className="py-32 bg-white/[0.02] text-white overflow-hidden border-b border-white/5 hidden md:block">
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

        {/* CIERRE CINEMATOGRÁFICO */}
        <section className="py-40 bg-black text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <div className="space-y-8 text-2xl md:text-4xl font-display font-light text-slate-300 leading-relaxed mb-20">
              <p>El artista que vive dentro de ti sigue ahí.</p>
              <p className="text-white font-bold">Esperando.</p>
            </div>
            
            <button 
              onClick={handlePurchase}
              className="px-14 py-7 bg-white text-black rounded-full text-sm font-black uppercase tracking-widest shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:bg-neon-orange hover:-translate-y-1 transition-all animate-shine mb-6"
            >
              Sí, quiero atreverme
            </button>
            <p className="text-slate-500 italic">Quizá hoy sea el día en que finalmente te atreviste.</p>
          </div>
        </section>
        
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black pb-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-display font-black tracking-tighter uppercase">
            Rolo<span className="text-neon-orange">Quiñones</span>
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

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 p-4">
        <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-4 rounded-3xl flex items-center justify-between shadow-2xl">
          <div>
            <p className="text-white font-bold text-sm">Workshop en Vivo</p>
            <p className="text-neon-orange text-xs font-black uppercase tracking-widest">Cupos Limitados</p>
          </div>
          <button 
            onClick={handlePurchase}
            className="px-6 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-neon-orange transition-colors"
          >
            Comenzar
          </button>
        </div>
      </div>

    </div>
  );
}
