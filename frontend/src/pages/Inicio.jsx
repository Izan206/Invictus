import { Link } from 'react-router-dom';
import { ArrowDown, Play, Target } from 'lucide-react';
import imagen1 from '../assets/home/press-banca-home.jpg';
import imagen2 from '../assets/home/baki-home.jpg';
// eslint-disable-next-line no-unused-vars
import { easeInOut, motion } from 'framer-motion'; //esto es una libreria de react que me trae las animaciones ya hechas

function Inicio() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <div className="w-full bg-black flex flex-col">
      <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="w-full max-w-[1200px] h-[700px] bg-[#00ffff]/10 rounded-full blur-[300px]"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-primary text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-8"
          >
            El primer paso para el cambio
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-[7.5rem] font-black text-white uppercase tracking-tighter leading-[0.85] mb-10"
          >
            <div className="block">Explota tu</div>
            <div className="block text-primary">Potencial</div>
            <div className="block">Físico</div>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-white/60 text-sm md:text-lg font-medium max-w-2xl leading-relaxed mb-12"
          >
            Crea tus propias rutinas personalizadas y descubre nuevos ejercicios
            <br className="hidden md:block" /> adaptados a tu nivel y objetivos.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link
              to="/registro"
              className="px-10 py-4 border border-white/20 rounded-full text-white font-bold text-xs tracking-[0.2em] uppercase hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
            >
              Comenzar Ahora
            </Link>

            <Link
              to="/catalogo"
              className="px-10 py-4 border border-white/20 rounded-full text-white font-bold text-xs tracking-[0.2em] uppercase hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
            >
              Ver Ejercicios
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full bg-black py-24 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.5, ease: easeInOut }}
            className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
          >
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] bg-zinc-900/50 rounded-3xl border border-white/10 overflow-hidden relative">
                <img
                  src={imagen1}
                  alt="Press Banca Home"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-6 text-left">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                Descubre nuevos <br />
                <span className="text-primary">ejercicios</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-md">
                Explora nuestra biblioteca con diversos ejercicios y filtra por
                grupo muscular!
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.5, ease: easeInOut }}
            className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20"
          >
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] bg-zinc-900/50 rounded-3xl border border-white/10 overflow-hidden relative">
                <img
                  src={imagen2}
                  alt="Baki Home"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-6 text-left">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                Crea rutinas <br />
                <span className="text-primary">perfectas</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-md">
                Combina ejercicios, ajusta series y repeticiones. Diseña el plan
                exacto que tu cuerpo necesita para romper estancamientos.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative w-full py-40 px-4 flex flex-col items-center justify-center text-center overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-full max-w-[600px] h-[400px] bg-[#00ffff]/10 rounded-full blur-[200px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-primary mb-10 opacity-50" />
          <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
            Únete <br /> <span className="text-primary">Ahora</span>
          </h2>
          <p className="text-white/40 text-sm max-w-sm mb-12">
            Da el primer paso para el cambio. Tu versión más fuerte te esta
            esperando.
          </p>
          <Link
            to="/registro"
            className="px-12 py-5 bg-primary text-black rounded-full font-black text-sm tracking-[0.2em] uppercase hover:bg-transparent hover:text-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]"
          >
            Comenzar Gratis
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

export default Inicio;
