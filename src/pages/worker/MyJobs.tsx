import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { useJobStore } from '@/store/useJobStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { MapPin, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const WorkerJobs = () => {
  const { language } = useStore();
  const { jobs } = useJobStore();
  const isAr = language === 'ar';

  const tabs = [
    { id: 'active', label: isAr ? 'نشطة' : 'Active' },
    { id: 'pending', label: isAr ? 'معلقة' : 'Pending' },
    { id: 'completed', label: isAr ? 'مكتملة' : 'Completed' },
  ];

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">{isAr ? 'مهامي' : 'My Jobs'}</h1>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full bg-slate-100 p-1 rounded-xl h-12">
            {tabs.map(tab => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex-1 rounded-lg data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="active" className="mt-6 space-y-4">
            {jobs.filter(j => j.status === 'in_progress').length > 0 ? (
              jobs.filter(j => j.status === 'in_progress').map(job => (
                <JobCard key={job.id} job={job} isAr={isAr} />
              ))
            ) : (
              <EmptyState isAr={isAr} />
            )}
          </TabsContent>

          <TabsContent value="pending" className="mt-6 space-y-4">
            {jobs.filter(j => j.status === 'open').map(job => (
              <JobCard key={job.id} job={job} isAr={isAr} />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="mt-6 space-y-4">
            <EmptyState isAr={isAr} />
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

const JobCard = ({ job, isAr }: { job: any, isAr: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3"
  >
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <Badge variant="outline" className="bg-teal-50 text-teal-700 border-none text-[10px]">
          {job.category}
        </Badge>
        <h3 className="font-bold text-slate-800">{job.title}</h3>
      </div>
      <div className="text-teal-600 font-bold">
        {job.price ? `${job.price} SAR` : (isAr ? 'مزايدة' : 'Bidding')}
      </div>
    </div>
    <div className="flex items-center gap-4 text-xs text-slate-400">
      <span className="flex items-center gap-1"><MapPin size={12} /> {job.location.address}</span>
      <span className="flex items-center gap-1"><Clock size={12} /> {isAr ? 'اليوم، 2:00 م' : 'Today, 2:00 PM'}</span>
    </div>
    <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="https://i.pravatar.cc/150?u=client" className="w-6 h-6 rounded-full" alt="client" />
        <span className="text-xs font-medium text-slate-600">سارة الأحمد</span>
      </div>
      <button className="text-teal-600 text-xs font-bold flex items-center gap-1">
        {isAr ? 'التفاصيل' : 'Details'}
        {isAr ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>
    </div>
  </motion.div>
);

const EmptyState = ({ isAr }: { isAr: boolean }) => (
  <div className="py-12 text-center space-y-4">
    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
      <Clock size={40} />
    </div>
    <p className="text-slate-500">{isAr ? 'لا توجد مهام حالياً' : 'No jobs found'}</p>
  </div>
);

export default WorkerJobs;