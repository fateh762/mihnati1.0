import { useState } from 'react';
import { motion } from 'framer-motion';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import ImageUploader from '../components/ImageUploader';
import Gallery from '../components/Gallery';
import PortfolioManager from '../components/PortfolioManager';
import MediaPreview from '../components/MediaPreview';

type Tab = 'gallery' | 'portfolio' | 'upload';

export default function MediaPage() {
  const { language } = useStore();
  const isAr = language === 'ar';
  const [tab, setTab] = useState<Tab>('gallery');

  const tabs = [
    { key: 'gallery' as Tab, label: isAr ? 'المعرض' : 'Gallery' },
    { key: 'portfolio' as Tab, label: isAr ? 'الأعمال' : 'Portfolio' },
    { key: 'upload' as Tab, label: isAr ? 'رفع' : 'Upload' },
  ];

  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-white">
          {isAr ? 'الوسائط' : 'Media'}
        </motion.h1>

        <div className="flex gap-1 bg-white/5 rounded-xl p-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? 'bg-teal-500 text-white' : 'text-slate-400'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'gallery' && <Gallery />}
        {tab === 'portfolio' && <PortfolioManager />}
        {tab === 'upload' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ImageUploader onUploaded={() => setTab('gallery')} />
          </motion.div>
        )}
      </div>
      <MediaPreview />
    </MobileLayout>
  );
}
