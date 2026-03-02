import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Trash2, FolderOpen } from 'lucide-react';
import { useMediaStore } from '../store/useMediaStore';
import { useStore } from '@/store/useStore';
import ImageUploader from './ImageUploader';
import Gallery from './Gallery';

export default function PortfolioManager() {
  const { portfolio, deletePortfolioItem, addPortfolioItem } = useMediaStore();
  const { language } = useStore();
  const isAr = language === 'ar';
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    if (!newTitle) return;
    addPortfolioItem({ title: newTitle, titleAr: newTitle, description: '', images: [], category: 'general' });
    setNewTitle('');
    setShowAdd(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold text-sm">{isAr ? 'معرض الأعمال' : 'Portfolio'}</h3>
        <button onClick={() => setShowAdd(s => !s)} className="flex items-center gap-1 bg-teal-500 hover:bg-teal-600 text-white rounded-xl px-3 py-1.5 text-xs">
          <PlusCircle className="w-3.5 h-3.5" />
          {isAr ? 'إضافة' : 'Add'}
        </button>
      </div>

      {showAdd && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-4 rounded-2xl border-white/5 space-y-3">
          <input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder={isAr ? 'عنوان المشروع' : 'Project Title'}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500/50"
          />
          <ImageUploader />
          <button onClick={handleAdd} className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-xl py-2 text-sm font-medium">
            {isAr ? 'حفظ' : 'Save'}
          </button>
        </motion.div>
      )}

      <div className="space-y-3">
        {portfolio.map(item => (
          <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-4 rounded-2xl border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-teal-400" />
                <p className="text-white font-medium text-sm">{isAr ? item.titleAr : item.title}</p>
              </div>
              <button onClick={() => deletePortfolioItem(item.id)} className="text-slate-600 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {item.images.length > 0 && <Gallery files={item.images} />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
