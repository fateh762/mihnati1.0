import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAnalyticsStore } from '../store/useAnalyticsStore';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

export default function EarningsChart() {
  const { earningsData } = useAnalyticsStore();
  const { language } = useStore();
  const isAr = language === 'ar';
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');

  return (
    <div className="glass p-4 rounded-2xl border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold text-sm">{isAr ? 'الأرباح الشهرية' : 'Monthly Earnings'}</h3>
        <div className="flex gap-1 bg-white/5 rounded-lg p-1">
          {(['area', 'bar'] as const).map(t => (
            <button key={t} onClick={() => setChartType(t)} className={`px-2 py-1 rounded text-xs transition-colors ${chartType === t ? 'bg-teal-500 text-white' : 'text-slate-400'}`}>
              {t === 'area' ? (isAr ? 'خط' : 'Line') : (isAr ? 'عمود' : 'Bar')}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        {chartType === 'area' ? (
          <AreaChart data={earningsData}>
            <defs>
              <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }} />
            <Area type="monotone" dataKey="earnings" stroke="#14b8a6" fill="url(#earningsGrad)" strokeWidth={2} />
          </AreaChart>
        ) : (
          <BarChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }} />
            <Bar dataKey="earnings" fill="#14b8a6" radius={[6, 6, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
