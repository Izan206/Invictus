import logo from '../../assets/logo/logo-footer.png';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

function AuthCard({ title, description, error, children }) {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-black via-neutral-950 to-[#00FFFF]/20 flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative w-full max-w-[420px] bg-container px-10 pb-10 pt-16 rounded-[2rem] flex flex-col items-center shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-neutral-900"
      >
        <Link
          to="/"
          className="absolute -top-16 left-1/2 -translate-x-1/2 group"
        >
          <img
            src={logo}
            alt="Invictus Logo"
            className="w-32 drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="w-full flex flex-col ">
          <h1 className="text-xl font-bold text-center text-white mb-1">
            {title}
          </h1>
          <span className="text-sm text-center text-neutral-500 mb-8 block">
            {description}
          </span>

          {children}

          {error && (
            <div className="w-full p-3 mt-4 text-sm text-red-400 bg-red-900/30 border border-red-900/50 rounded-xl text-center">
              {error}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default AuthCard;
