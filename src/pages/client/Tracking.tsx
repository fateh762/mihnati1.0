"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { useJobStore } from '@/store/useJobStore';
import MapView from '@/components/MapView';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Phone, MessageSquare, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import L from 'leaflet';

const Tracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useStore();
  const { jobs } = useJobStore();
  const isAr = language === 'ar';

  const job = jobs.find(j => j.id === id);
  
  const [workerPos, setWorkerPos] = useState<[number, number]>([24.7200, 46.6800]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWorkerPos(prev => [
        prev[0] - 0.0001,
        prev[1] - 0.0001
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const workerIcon = useMemo(() => L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #0d9488; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  }), []);

  const markers = useMemo(() => {
    if (!job) return [];
    return [
      { position: [job.location.lat, job.location.lng] as [number, number], title: isAr ? 'موقعك' : 'Your Location' },
      { position: workerPos, title: isAr ? 'الفني' : 'Expert', icon: workerIcon }
    ];
  }, [job, workerPos, isAr, workerIcon]);

  if (!job) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative">
      <header className="absolute top-0 left-0 right-0 p-6 z-20 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-800"
        >
          {isAr ? <ChevronRight /> : <ChevronLeft />}
        </button>
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg flex-1">
          <h1 className="text-sm font-bold text-slate-800">{isAr ? 'تتبع الفني' : 'Tracking Expert'}</h1>
          <p className="text-[10px] text-teal-600 font-medium">{isAr ? 'في الطريق إليك' : 'On the way to you'}</p>
        </div>
      </header>

      <div className="flex-1">
        <MapView 
          center={workerPos} 
          zoom={15}
          className="h-full w-full"
          markers={markers}
        />
      </div>

      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="absolute bottom-0 left-0 right-0 p-6 z-20 space-y-4"
      >
        <Card className="p-5 border-none shadow-2xl space-y-4 rounded-[32px]">
          <div className="flex items-center gap-4">
            <img src="https://i.pravatar.cc/150?u=worker" className="w-14 h-14 rounded-2xl object-cover" alt="worker" />
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">أحمد محمد</h3>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Clock size={12} className="text-teal-600" /> 8 {isAr ? 'دقائق' : 'mins'}</span>
                <span className="flex items-center gap-1"><MapPin size={12} className="text-teal-600" /> 1.2 km</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => navigate('/chat/1')}
                className="p-3 bg-teal-50 text-teal-600 rounded-xl"
              >
                <MessageSquare size={20} />
              </button>
              <button className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Phone size={20} /></button>
            </div>
          </div>
          
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-teal-600"
              initial={{ width: "30%" }}
              animate={{ width: "75%" }}
              transition={{ duration: 20, repeat: Infinity }}
            />
          </div>
          
          <Button 
            onClick={() => navigate(`/client/job/${id}/review`)}
            className="w-full h-12 bg-teal-600 hover:bg-teal-700 rounded-xl text-sm font-bold shadow-md gap-2"
          >
            <CheckCircle2 size={18} />
            {isAr ? 'تأكيد إنجاز المهمة' : 'Confirm Completion'}
          </Button>
        </Card>
      </motion.div>
    </div>
  );
};

export default Tracking;