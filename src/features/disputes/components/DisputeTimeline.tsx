import { motion } from 'framer-motion';
import { DisputeEvent } from '../types';
import { useStore } from '@/store/useStore';
import { User, Shield, Briefcase } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const byConfig = {
  client: { icon: User, color: 'bg-blue-500/20 text-blue-400' },
  worker: { icon: Briefcase, color: 'bg-teal-500/20 text-teal-400' },
  admin: { icon: Shield, color: 'bg-purple-500/20 text-purple-400' },
};

export default function DisputeTimeline({ events }: { events: DisputeEvent[] }) {
  const { language } = useStore();
  const isAr = language === 'ar';

  return (
    <div className="space-y-0">
      {events.map((event, i) => {
        const { icon: Icon, color } = byConfig[event.by];
        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-3"
          >
            <div className="flex flex-col items-center">
              <div className={`p-1.5 rounded-full ${color}`}>
                <Icon className="w-3 h-3" />
              </div>
              {i < events.length - 1 && <div className="w-px flex-1 bg-white/10 my-1" />}
            </div>
            <div className="pb-4 flex-1">
              <p className="text-white text-sm font-medium">{isAr ? event.titleAr : event.title}</p>
              <p className="text-slate-400 text-xs">{isAr ? event.descriptionAr : event.description}</p>
              <p className="text-slate-600 text-xs mt-0.5">{formatDistanceToNow(new Date(event.date), { addSuffix: true })}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
