import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { useJobStore } from '@/store/useJobStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { MapPin, Clock, ChevronRight, ChevronLeft, Users, Navigation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const ClientJobs = () => {
  const { language } = useStore();
  const { jobs } = useJobStore();
  const isAr = language === 'ar';

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">{isAr ? 'طلباتي' : 'My Requests'}</h1>

        <Tabs defaultValue="open" className="w-full">
          <TabsList className="w-full bg-slate-100 p-1 rounded-xl h-12">
            <TabsTrigger value="open" className="flex-1 rounded-lg">{isAr ? 'مفتوحة' : 'Open'}</TabsTrigger>
            <TabsTrigger value="active" className="flex-1 rounded-lg">{isAr ? 'قيد التنفيذ' : 'Active'}</TabsTrigger>
            <TabsTrigger value="history" className="flex-1 rounded-lg">{isAr ? 'السجل' : 'History'}</TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="mt-6 space-y-4">
            {jobs.filter(j => j.status === 'open').map(job => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <Badge className="bg-orange-50 text-orange-700 border-none">{job.category}</Badge>
                    <h3 className="font-bold text-slate-800">{job.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-teal-600 font-bold">{job.price ? `${job.price} SAR` : (isAr ? 'مزايدة' : 'Bidding')}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-teal-600 font-bold text-sm">
                    <Users size={16} />
                    {job.bidsCount} {isAr ? 'عروض مستلمة' : 'bids received'}
                  </div>
                  <Link 
                    to={`/client/job/${job.id}/bids`}
                    className="text-teal-600 text-xs font-bold flex items-center gap-1"
                  >
                    {isAr ? 'إدارة الطلب' : 'Manage'}
                    {isAr ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                  </Link>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="active" className="mt-6 space-y-4">
            {jobs.filter(j => j.status === 'in_progress').length > 0 ? (
              jobs.filter(j => j.status === 'in_progress').map(job => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <Badge className="bg-teal-50 text-teal-700 border-none">{job.category}</Badge>
                      <h3 className="font-bold text-slate-800">{job.title}</h3>
                    </div>
                    <div className="text-teal-600 font-bold">{job.price} SAR</div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <img src="https://i.pravatar.cc/150?u=worker" className="w-8 h-8 rounded-full" alt="worker" />
                      <span className="text-xs font-medium text-slate-600">أحمد محمد</span>
                    </div>
                    <Link 
                      to={`/client/job/${job.id}/tracking`}
                      className="bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
                    >
                      <Navigation size={14} />
                      {isAr ? 'تتبع الفني' : 'Track Expert'}
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-400">
                {isAr ? 'لا توجد مهام قيد التنفيذ حالياً' : 'No active jobs at the moment'}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="py-12 text-center text-slate-400">
              {isAr ? 'سجل الطلبات فارغ' : 'Request history is empty'}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default ClientJobs;