"use client";

import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Search, MessageSquare, ChevronRight, ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Messages = () => {
  const { language } = useStore();
  const isAr = language === 'ar';

  const conversations = [
    { id: '1', name: 'أحمد محمد', lastMsg: isAr ? 'أنا في الطريق إليك الآن' : 'I am on my way now', time: '2m', unread: 2, image: 'https://i.pravatar.cc/150?u=worker' },
    { id: '2', name: 'سارة الأحمد', lastMsg: isAr ? 'شكراً جزيلاً لك' : 'Thank you very much', time: '1h', unread: 0, image: 'https://i.pravatar.cc/150?u=client' },
    { id: '3', name: 'خالد العتيبي', lastMsg: isAr ? 'هل الموقع دقيق؟' : 'Is the location accurate?', time: 'Yesterday', unread: 0, image: 'https://i.pravatar.cc/150?u=2' },
  ];

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-black text-white tracking-tight">{isAr ? 'الرسائل' : 'Neural Chat'}</h1>
        
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-teal-500 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <Input className="pl-12 h-12 rounded-xl border-white/5 bg-white/5 text-white placeholder:text-slate-600 focus:ring-teal-500/50" placeholder={isAr ? 'بحث في المحادثات...' : 'Search encrypted logs...'} />
          </div>
        </div>

        <div className="space-y-3">
          {conversations.map((chat) => (
            <Link 
              key={chat.id} 
              to={`/chat/${chat.id}`}
              className="flex items-center gap-4 p-4 glass rounded-[2rem] border-white/5 hover:border-teal-500/30 transition-all group"
            >
              <div className="relative">
                <img src={chat.image} className="w-14 h-14 rounded-2xl object-cover border border-white/10" alt={chat.name} />
                {chat.unread > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 text-white text-[10px] font-black rounded-lg flex items-center justify-center border-2 border-[#02040a] shadow-[0_0_10px_rgba(20,184,166,0.5)]">
                    {chat.unread}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-white truncate group-hover:text-teal-400 transition-colors">{chat.name}</h3>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{chat.time}</span>
                </div>
                <p className={cn(
                  "text-xs truncate font-medium",
                  chat.unread > 0 ? "text-teal-400" : "text-slate-500"
                )}>
                  {chat.lastMsg}
                </p>
              </div>
              <div className="text-slate-600 group-hover:text-teal-400 transition-colors">
                {isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </div>
            </Link>
          ))}
        </div>

        {conversations.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 glass rounded-[2rem] flex items-center justify-center mx-auto text-slate-600">
              <MessageSquare size={40} />
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{isAr ? 'لا توجد محادثات حالياً' : 'No active streams'}</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Messages;