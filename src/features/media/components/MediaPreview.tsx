import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useMediaStore } from '../store/useMediaStore';
import { useState } from 'react';

export default function MediaPreview() {
  const { previewFile, files, setPreview } = useMediaStore();
  const [currentIndex, setCurrentIndex] = useState(() => files.findIndex(f => f.id === previewFile?.id));

  const current = files[currentIndex] ?? previewFile;

  const prev = () => setCurrentIndex(i => Math.max(0, i - 1));
  const next = () => setCurrentIndex(i => Math.min(files.length - 1, i + 1));

  return (
    <AnimatePresence>
      {previewFile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setPreview(null)}
        >
          <button className="absolute top-4 right-4 p-2 text-white hover:text-slate-300" onClick={() => setPreview(null)}>
            <X className="w-6 h-6" />
          </button>

          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 p-2 text-white hover:text-slate-300 disabled:opacity-30" disabled={currentIndex <= 0}>
            <ChevronLeft className="w-8 h-8" />
          </button>

          <motion.div
            key={current?.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
            className="max-w-[90vw] max-h-[80vh]"
          >
            {current && <img src={current.url} alt={current.name} className="max-w-full max-h-[80vh] rounded-xl object-contain" />}
          </motion.div>

          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 p-2 text-white hover:text-slate-300 disabled:opacity-30" disabled={currentIndex >= files.length - 1}>
            <ChevronRight className="w-8 h-8" />
          </button>

          {current && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <p className="text-slate-400 text-sm">{current.name}</p>
              <a href={current.url} download={current.name} onClick={e => e.stopPropagation()} className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20">
                <Download className="w-4 h-4 text-white" />
              </a>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
