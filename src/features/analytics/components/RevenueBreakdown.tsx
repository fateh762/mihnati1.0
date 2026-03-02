import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAnalyticsStore } from '../store/useAnalyticsStore';
import { useStore } from '@/store/useStore';

export default function RevenueBreakdown() {
  const { revenueCategories } = useAnalyticsStore();
  const { language } = useStore();
  const isAr = language === 'ar';

  const data = revenueCategories.map(c => ({ name: isAr ? c.nameAr : c.name, value: c.value, color: c.color }));

  return (
    <div className="glass p-4 rounded-2xl border-white/5 space-y-3">
      <h3 className="text-white font-semibold text-sm">{isAr ? 'توزيع الإيرادات' : 'Revenue Breakdown'}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
            {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
          </Pie>
          <Tooltip
            contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
            formatter={(v: number) => [`${v} SAR`, '']}
          />
          <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 11 }}>{v}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
