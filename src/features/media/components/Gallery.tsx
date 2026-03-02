import { motion } from 'framer-motion';
import { Trash2, Eye } from 'lucide-react';
import { MediaFile } from '../types';
import { useMediaStore } from '../store/useMediaStore';
import { useStore } from '@/store/useStore';

interface Props {
  files?: MediaFile[];
  onSelect?: (file: MediaFile) => void;
}

export default function Gallery({ files, onSelect }: Props) {
  const { files: storeFiles, deleteFile, setPreview } = useMediaStore();
  const { language } = useStore();
  const isAr = language === 'ar';
  const items = files ?? storeFiles;

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500 text-sm">{isAr ? 'لا توجد صور' : 'No images yet'}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((file, i) => (
        <motion.div
          key={file.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="relative rounded-xl overflow-hidden aspect-square group bg-white/5"
        >
          <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => { setPreview(file); onSelect?.(file); }}
              className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Eye className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => deleteFile(file.id)}
              className="p-1.5 bg-red-500/80 rounded-lg hover:bg-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
