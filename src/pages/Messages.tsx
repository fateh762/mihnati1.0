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
        <h1 className="text-2xl font-bold text-slate-800">{isAr ? 'الرسائل' : 'Messages'}</h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input className="pl-10 h-11 rounded-xl border-slate-200 bg-white" placeholder={isAr ? 'بحث في المحادثات...' : 'Search conversations...'} />
        </div>

        <div className="space-y-2">
          {conversations.map((chat) => (
            <Link 
              key={chat.id} 
              to={`/chat/${chat.id}`}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div className="relative">
                <img src={chat.image} className="w-14 h-14 rounded-2xl object-cover" alt={chat.name} />
                {chat.unread > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {chat.unread}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-slate-800 truncate">{chat.name}</h3>
                  <span className="text-[10px] text-slate-400">{chat.time}</span>
                </div>
                <p className={cn(
                  "text-xs truncate",
                  chat.unread > 0 ? "text-slate-800 font-bold" : "text-slate-500"
                )}>
                  {chat.lastMsg}
                </p>
              </div>
              <div className="text-slate-300">
                {isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </div>
            </Link>
          ))}
        </div>

        {conversations.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <MessageSquare size={40} />
            </div>
            <p className="text-slate-500">{isAr ? 'لا توجد محادثات حالياً' : 'No conversations yet'}</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Messages;