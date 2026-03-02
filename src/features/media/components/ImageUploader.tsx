import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, Image } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { generateId } from '@/lib/utils';
import { useMediaStore } from '../store/useMediaStore';
import { MediaFile } from '../types';

interface Props {
  onUploaded?: (files: MediaFile[]) => void;
}

export default function ImageUploader({ onUploaded }: Props) {
  const { language } = useStore();
  const isAr = language === 'ar';
  const { addFiles } = useMediaStore();

  const onDrop = useCallback((accepted: File[]) => {
    const newFiles: MediaFile[] = accepted.map(f => ({
      id: generateId(),
      url: URL.createObjectURL(f),
      name: f.name,
      size: f.size,
      type: 'image',
      uploadedAt: new Date().toISOString().split('T')[0],
    }));
    addFiles(newFiles);
    onUploaded?.(newFiles);
  }, [addFiles, onUploaded]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
    maxSize: 20 * 1024 * 1024,
  });

  return (
    <motion.div
      {...getRootProps()}
      whileHover={{ scale: 1.01 }}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-teal-400 bg-teal-500/10' : 'border-white/10 hover:border-white/20 hover:bg-white/2'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        {isDragActive ? (
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
            <Upload className="w-12 h-12 text-teal-400" />
          </motion.div>
        ) : (
          <Image className="w-12 h-12 text-slate-500" />
        )}
        <div>
          <p className="text-white text-sm font-medium">
            {isDragActive ? (isAr ? 'أفلت الصور هنا' : 'Drop images here') : (isAr ? 'اسحب الصور أو انقر للاختيار' : 'Drag images or click to select')}
          </p>
          <p className="text-slate-500 text-xs mt-1">{isAr ? 'PNG, JPG, WEBP حتى 20MB' : 'PNG, JPG, WEBP up to 20MB'}</p>
        </div>
        {acceptedFiles.length > 0 && (
          <p className="text-teal-400 text-xs">{acceptedFiles.length} {isAr ? 'ملف محدد' : 'file(s) selected'}</p>
        )}
      </div>
    </motion.div>
  );
}
