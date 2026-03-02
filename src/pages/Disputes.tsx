import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { useDisputeStore } from '@/store/useDisputeStore';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
  open: { color: 'bg-amber-500/10 text-amber-400', icon: Clock },
  under_review: { color: 'bg-blue-500/10 text-blue-400', icon: AlertCircle },
  resolved: { color: 'bg-emerald-500/10 text-emerald-400', icon: CheckCircle },
  closed: { color: 'bg-slate-500/10 text-slate-400', icon: XCircle },
  appealed: { color: 'bg-purple-500/10 text-purple-400', icon: AlertCircle },
};

const statusLabels = {
  ar: {
    open: 'مفتوح',
    under_review: 'قيد المراجعة',
    resolved: 'تم الحل',
    closed: 'مغلق',
    appealed: 'استئناف',
  },
  en: {
    open: 'Open',
    under_review: 'Under Review',
    resolved: 'Resolved',
    closed: 'Closed',
    appealed: 'Appealed',
  },
};

const reasonLabels = {
  ar: {
    not_completed: 'لم يكتمل العمل',
    poor_quality: 'جودة سيئة',
    no_show: 'عدم الحضور',
    overcharge: 'سعر مرتفع',
    damage: 'ضرر',
    other: 'أخرى',
  },
  en: {
    not_completed: 'Work not completed',
    poor_quality: 'Poor quality',
    no_show: 'No show',
    overcharge: 'Overcharge',
    damage: 'Damage',
    other: 'Other',
  },
};

const Disputes = () => {
  const { language } = useStore();
  const isAr = language === 'ar';
  const navigate = useNavigate();
  const { disputes } = useDisputeStore();

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-white tracking-tight">
            {isAr ? 'مركز النزاعات' : 'Dispute Center'}
          </h1>
          <Button
            onClick={() => navigate('/disputes/new')}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-10 px-4 text-xs font-bold flex items-center gap-1.5"
          >
            <Plus size={14} />
            {isAr ? 'نزاع جديد' : 'New Dispute'}
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              labelAr: 'مفتوح',
              labelEn: 'Open',
              count: disputes.filter((d) => d.status === 'open').length,
              color: 'text-amber-400',
            },
            {
              labelAr: 'قيد المراجعة',
              labelEn: 'In Review',
              count: disputes.filter((d) => d.status === 'under_review').length,
              color: 'text-blue-400',
            },
            {
              labelAr: 'تم الحل',
              labelEn: 'Resolved',
              count: disputes.filter((d) => d.status === 'resolved').length,
              color: 'text-emerald-400',
            },
          ].map((stat) => (
            <Card key={stat.labelEn} className="p-3 glass border-white/5 rounded-2xl text-center space-y-1">
              <p className={cn('text-2xl font-black', stat.color)}>{stat.count}</p>
              <p className="text-[10px] text-slate-500 font-medium">
                {isAr ? stat.labelAr : stat.labelEn}
              </p>
            </Card>
          ))}
        </div>

        {/* Disputes List */}
        {disputes.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <FileText size={36} className="text-slate-500" />
            </div>
            <p className="text-slate-400 font-medium">
              {isAr ? 'لا توجد نزاعات' : 'No disputes yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {disputes.map((dispute) => {
              const config = statusConfig[dispute.status] || statusConfig.open;
              const StatusIcon = config.icon;
              return (
                <motion.div
                  key={dispute.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass border-white/5 rounded-2xl p-4 space-y-3 cursor-pointer hover:border-teal-500/20 transition-all"
                  onClick={() => navigate(`/disputes/${dispute.id}`)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-white text-sm truncate">
                        {isAr ? dispute.jobTitleAr : dispute.jobTitleEn}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isAr
                          ? reasonLabels.ar[dispute.reason]
                          : reasonLabels.en[dispute.reason]}
                      </p>
                    </div>
                    <Badge className={cn('border-none text-[10px] flex items-center gap-1 flex-shrink-0', config.color)}>
                      <StatusIcon size={10} />
                      {(isAr ? statusLabels.ar : statusLabels.en)[dispute.status]}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {isAr ? dispute.descriptionAr : dispute.descriptionEn}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <MessageSquare size={12} />
                      {dispute.messages.length} {isAr ? 'رسائل' : 'messages'}
                    </div>
                    <div className="flex items-center gap-1 text-teal-400">
                      <span className="text-xs font-bold">{isAr ? 'التفاصيل' : 'Details'}</span>
                      {isAr ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Disputes;
