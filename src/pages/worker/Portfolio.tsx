import React, { useState, useRef } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Upload,
  Trash2,
  Image,
  FileVideo,
  Plus,
  X,
  CheckCircle,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
  size: string;
}

const samplePortfolio: MediaFile[] = [
  { id: 'm1', url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', type: 'image', name: 'plumbing-job-1.jpg', size: '1.2 MB' },
  { id: 'm2', url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400', type: 'image', name: 'electrical-work.jpg', size: '980 KB' },
  { id: 'm3', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', type: 'image', name: 'renovation.jpg', size: '1.5 MB' },
  { id: 'm4', url: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400', type: 'image', name: 'ac-cleaning.jpg', size: '870 KB' },
];

const WorkerPortfolio = () => {
  const { language } = useStore();
  const isAr = language === 'ar';
  const inputRef = useRef<HTMLInputElement>(null);

  const [portfolio, setPortfolio] = useState<MediaFile[]>(samplePortfolio);
  const [selected, setSelected] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState('https://i.pravatar.cc/150?u=worker');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const sizeKB = file.size / 1024;
      const sizeLabel = sizeKB >= 1024
        ? `${(sizeKB / 1024).toFixed(1)} MB`
        : `${sizeKB.toFixed(0)} KB`;
      const url = URL.createObjectURL(file);
      const newFile: MediaFile = {
        id: `m${Date.now()}-${file.name}`,
        url,
        type: file.type.startsWith('video') ? 'video' : 'image',
        name: file.name,
        size: sizeLabel,
      };
      setPortfolio((prev) => [...prev, newFile]);
    });
    showSuccess(isAr ? 'تم رفع الملفات بنجاح' : 'Files uploaded successfully');
    e.target.value = '';
  };

  const handleDelete = (id: string) => {
    setPortfolio((prev) => prev.filter((f) => f.id !== id));
    if (selected === id) setSelected(null);
  };

  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <h1 className="text-2xl font-black text-white tracking-tight">
          {isAr ? 'معرض أعمالي' : 'My Portfolio'}
        </h1>

        {/* Profile Picture */}
        <Card className="p-5 glass border-white/5 rounded-3xl">
          <h3 className="font-black text-white text-sm mb-4 uppercase tracking-wider">
            {isAr ? 'صورة الملف الشخصي' : 'Profile Picture'}
          </h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={profilePic}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-teal-500/30"
              />
              <button
                className="absolute -bottom-1 -right-1 p-2 bg-teal-500 rounded-full text-white shadow-lg hover:bg-teal-600 transition-colors"
                onClick={() => inputRef.current?.click()}
              >
                <Camera size={14} />
              </button>
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                {isAr ? 'أحمد محمد' : 'Ahmed Mohamed'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {isAr ? 'سباك محترف' : 'Professional Plumber'}
              </p>
              <Badge className="bg-amber-500/10 text-amber-400 border-none text-[10px] mt-1.5">
                ★ 4.9 · 75 {isAr ? 'مهمة' : 'jobs'}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Upload Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-white uppercase tracking-wider text-sm">
              {isAr ? 'أعمالي' : 'Work Samples'}
            </h3>
            <Badge className="bg-teal-500/10 text-teal-400 border-none text-xs">
              {portfolio.length} {isAr ? 'ملفات' : 'files'}
            </Badge>
          </div>

          {/* Hidden file input */}
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />

          {/* Upload Button */}
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full border-2 border-dashed border-white/10 rounded-2xl p-5 flex items-center justify-center gap-3 text-slate-500 hover:border-teal-500/30 hover:text-teal-400 transition-all"
          >
            <Plus size={20} />
            <span className="text-sm font-bold">
              {isAr ? 'إضافة صور أو مقاطع' : 'Add photos or videos'}
            </span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence>
            {portfolio.map((file) => (
              <motion.div
                key={file.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={cn(
                  'relative rounded-2xl overflow-hidden cursor-pointer group',
                  selected === file.id && 'ring-2 ring-teal-400'
                )}
                onClick={() => setSelected(selected === file.id ? null : file.id)}
              >
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-40 object-cover"
                />
                {file.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <FileVideo size={32} className="text-white" />
                  </div>
                )}
                {/* Overlay on select */}
                {selected === file.id && (
                  <div className="absolute inset-0 bg-teal-500/20 flex items-center justify-center">
                    <CheckCircle size={28} className="text-teal-400" />
                  </div>
                )}
                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(file.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={12} />
                </button>
                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-[10px] text-white/80 truncate font-medium">{file.name}</p>
                  <p className="text-[9px] text-white/50">{file.size}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {portfolio.length === 0 && (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <Image size={28} className="text-slate-500" />
            </div>
            <p className="text-slate-400 text-sm font-medium">
              {isAr ? 'لا توجد صور في معرض أعمالك' : 'No photos in your portfolio yet'}
            </p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default WorkerPortfolio;
