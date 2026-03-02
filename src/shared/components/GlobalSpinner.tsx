import { motion } from 'framer-motion';

export default function GlobalSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-400 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    </motion.div>
  );
}
