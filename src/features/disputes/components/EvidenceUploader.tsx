import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, X, FileImage } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useDisputeStore } from '../store/useDisputeStore';

interface Props {
  disputeId: string;
}

export default function EvidenceUploader({ disputeId }: Props) {
  const { language } = useStore();
  const isAr = language === 'ar';
  const { uploadEvidence } = useDisputeStore();
  const [uploading, setUploading] = useState(false);
  const [localFiles, setLocalFiles] = useState<{ name: string; preview: string }[]>([]);

  const onDrop = useCallback(async (accepted: File[]) => {
    setUploading(true);
    for (const file of accepted) {
      await uploadEvidence(disputeId, file);
      setLocalFiles(prev => [...prev, { name: file.name, preview: URL.createObjectURL(file) }]);
    }
    setUploading(false);
  }, [disputeId, uploadEvidence]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'application/pdf': [] },
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-teal-400 bg-teal-500/10' : 'border-white/10 hover:border-white/20'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
        <p className="text-slate-400 text-sm">{isAr ? 'اسحب الملفات أو انقر للاختيار' : 'Drag files or click to select'}</p>
        <p className="text-slate-600 text-xs mt-1">{isAr ? 'صور وPDF، حد 10MB' : 'Images & PDF, max 10MB'}</p>
        {uploading && <p className="text-teal-400 text-xs mt-2 animate-pulse">{isAr ? 'جارٍ الرفع...' : 'Uploading...'}</p>}
      </div>

      {localFiles.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {localFiles.map((f, i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative rounded-xl overflow-hidden bg-white/5 aspect-square">
              {f.preview.startsWith('blob:') ? (
                <img src={f.preview} alt={f.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileImage className="w-6 h-6 text-slate-400" />
                </div>
              )}
              <button
                onClick={() => setLocalFiles(prev => prev.filter((_, j) => j !== i))}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
