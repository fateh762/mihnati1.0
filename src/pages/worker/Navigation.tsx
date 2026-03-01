"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { useJobStore } from '@/store/useJobStore';
import MapView from '@/components/MapView';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Navigation as NavIcon, Phone, CheckCircle2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Navigation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useStore();
  const { jobs, updateJobStatus } = useJobStore();
  const isAr = language === 'ar';

  const job = jobs.find(j => j.id === id);
  const [myPos, setMyPos] = useState<[number, number]>([24.7200, 46.6800]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMyPos(prev => [
        prev[0] - 0.0001,
        prev[1] - 0.0001
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!job) return null;

  const handleArrived = () => {
    showSuccess(isAr ? 'تم تأكيد الوصول' : 'Arrival confirmed');
    // In a real app, this would update status to 'arrived'
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative">
      <header className="absolute top-0 left-0 right-0 p-6 z-20 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-800"
        >
          {isAr ? <ChevronRight /> : <ChevronLeft />}
        </button>
        <div className="bg-teal-600 px-4 py-2 rounded-2xl shadow-lg flex-1 text-white">
          <div className="flex items-center gap-2">
            <NavIcon size={16} className="animate-pulse" />
            <h1 className="text-sm font-bold">{isAr ? 'جاري التوجه للموقع' : 'Navigating to Job'}</h1>
          </div>
          <p className="text-[10px] opacity-80">{job.location.address}</p>
        </div>
      </header>

      <div className="flex-1">
        <MapView 
          center={myPos} 
          zoom={16}
          className="h-full w-full"
          markers={[
            { position: [job.location.lat, job.location.lng], title: isAr ? 'موقع العميل' : 'Client Location' },
            { position: myPos, title: isAr ? 'موقعك' : 'Your Location' }
          ]}
        />
      </div>

      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="absolute bottom-0 left-0 right-0 p-6 z-20"
      >
        <Card className="p-6 border-none shadow-2xl space-y-6 rounded-[32px]">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>
              <p className="text-sm text-slate-500">سارة الأحمد</p>
            </div>
            <button className="p-4 bg-orange-50 text-orange-600 rounded-2xl">
              <Phone size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-[10px] text-slate-400 mb-1">{isAr ? 'المسافة' : 'Distance'}</p>
              <p className="font-bold text-slate-800">1.2 km</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-[10px] text-slate-400 mb-1">{isAr ? 'الوقت المتوقع' : 'ETA'}</p>
              <p className="font-bold text-slate-800">8 min</p>
            </div>
          </div>

          <Button 
            onClick={handleArrived}
            className="w-full h-14 bg-teal-600 hover:bg-teal-700 rounded-2xl text-lg shadow-lg gap-2"
          >
            <CheckCircle2 size={20} />
            {isAr ? 'لقد وصلت للموقع' : 'I have arrived'}
          </Button>
        </Card>
      </motion.div>
    </div>
  );
};

export default Navigation;