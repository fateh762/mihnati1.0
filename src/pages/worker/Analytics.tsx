import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  Star,
  Clock,
  CheckCircle,
  Award,
  BarChart2,
  Download,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { cn } from '@/lib/utils';

const earningsData = [
  { month: 'Jan', amount: 1200 },
  { month: 'Feb', amount: 1800 },
  { month: 'Mar', amount: 1400 },
  { month: 'Apr', amount: 2200 },
  { month: 'May', amount: 1900 },
  { month: 'Jun', amount: 2450 },
];

const jobsData = [
  { month: 'Jan', completed: 8, cancelled: 1 },
  { month: 'Feb', completed: 12, cancelled: 2 },
  { month: 'Mar', completed: 10, cancelled: 1 },
  { month: 'Apr', completed: 15, cancelled: 0 },
  { month: 'May', completed: 13, cancelled: 2 },
  { month: 'Jun', completed: 17, cancelled: 1 },
];

const categoryData = [
  { name: 'Plumbing', value: 35, color: '#14b8a6' },
  { name: 'Electrical', value: 25, color: '#6366f1' },
  { name: 'AC', value: 20, color: '#f59e0b' },
  { name: 'Other', value: 20, color: '#64748b' },
];

const StatCard = ({
  icon: Icon,
  labelAr,
  labelEn,
  value,
  trend,
  color,
  isAr,
}: {
  icon: React.ElementType;
  labelAr: string;
  labelEn: string;
  value: string;
  trend?: number;
  color: string;
  isAr: boolean;
}) => (
  <Card className="p-4 glass border-white/5 rounded-2xl space-y-3">
    <div className="flex items-center justify-between">
      <div className={cn('p-2 rounded-xl', color)}>
        <Icon size={16} />
      </div>
      {trend !== undefined && (
        <div
          className={cn(
            'flex items-center gap-1 text-[10px] font-bold',
            trend >= 0 ? 'text-emerald-400' : 'text-red-400'
          )}
        >
          {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div>
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="text-xs text-slate-500 font-medium mt-0.5">{isAr ? labelAr : labelEn}</p>
    </div>
  </Card>
);

const WorkerAnalytics = () => {
  const { language } = useStore();
  const isAr = language === 'ar';

  return (
    <MobileLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-white tracking-tight">
            {isAr ? 'لوحة التحليلات' : 'Analytics Dashboard'}
          </h1>
          <button className="flex items-center gap-1.5 text-teal-400 text-xs font-bold">
            <Download size={14} />
            {isAr ? 'تصدير' : 'Export'}
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={TrendingUp}
            labelAr="إجمالي الأرباح"
            labelEn="Total Earnings"
            value="11,000 SAR"
            trend={12}
            color="bg-teal-500/10 text-teal-400"
            isAr={isAr}
          />
          <StatCard
            icon={Briefcase}
            labelAr="المهام المنجزة"
            labelEn="Completed Jobs"
            value="75"
            trend={8}
            color="bg-indigo-500/10 text-indigo-400"
            isAr={isAr}
          />
          <StatCard
            icon={Star}
            labelAr="متوسط التقييم"
            labelEn="Avg. Rating"
            value="4.8 ★"
            trend={2}
            color="bg-amber-500/10 text-amber-400"
            isAr={isAr}
          />
          <StatCard
            icon={Clock}
            labelAr="وقت الاستجابة"
            labelEn="Response Time"
            value="12 min"
            trend={-5}
            color="bg-purple-500/10 text-purple-400"
            isAr={isAr}
          />
        </div>

        {/* Earnings Chart */}
        <Card className="p-5 glass border-white/5 rounded-3xl space-y-4">
          <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <TrendingUp size={16} className="text-teal-400" />
            {isAr ? 'الأرباح الشهرية' : 'Monthly Earnings (SAR)'}
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#14b8a6' }}
              />
              <Area type="monotone" dataKey="amount" stroke="#14b8a6" strokeWidth={2} fill="url(#analyticsGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Jobs Bar Chart */}
        <Card className="p-5 glass border-white/5 rounded-3xl space-y-4">
          <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <BarChart2 size={16} className="text-indigo-400" />
            {isAr ? 'أداء المهام' : 'Job Performance'}
          </h3>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={jobsData} barGap={4}>
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Bar dataKey="completed" fill="#6366f1" radius={[4, 4, 0, 0]} name={isAr ? 'مكتمل' : 'Completed'} />
              <Bar dataKey="cancelled" fill="#f43f5e" radius={[4, 4, 0, 0]} name={isAr ? 'ملغي' : 'Cancelled'} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-indigo-500 rounded" />
              {isAr ? 'مكتمل' : 'Completed'}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-rose-500 rounded" />
              {isAr ? 'ملغي' : 'Cancelled'}
            </div>
          </div>
        </Card>

        {/* Category Pie Chart */}
        <Card className="p-5 glass border-white/5 rounded-3xl space-y-4">
          <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Award size={16} className="text-amber-400" />
            {isAr ? 'توزيع التخصصات' : 'Job Categories'}
          </h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                    <span className="text-xs text-slate-400">{cat.name}</span>
                  </div>
                  <span className="text-xs font-black text-white">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card className="p-5 glass border-white/5 rounded-3xl space-y-4">
          <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-400" />
            {isAr ? 'مقاييس الأداء' : 'Performance Metrics'}
          </h3>
          {[
            { labelAr: 'معدل إتمام المهام', labelEn: 'Completion Rate', value: 94, color: 'bg-teal-400' },
            { labelAr: 'معدل رضا العملاء', labelEn: 'Client Satisfaction', value: 96, color: 'bg-indigo-400' },
            { labelAr: 'معدل الرد على الطلبات', labelEn: 'Response Rate', value: 88, color: 'bg-amber-400' },
          ].map((metric) => (
            <div key={metric.labelEn} className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>{isAr ? metric.labelAr : metric.labelEn}</span>
                <span className="text-white font-bold">{metric.value}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={cn('h-full rounded-full', metric.color)}
                />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </MobileLayout>
  );
};

export default WorkerAnalytics;
