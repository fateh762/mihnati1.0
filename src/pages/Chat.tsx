"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, Phone, MoreVertical, Image as ImageIcon, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useStore();
  const isAr = language === 'ar';
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState([
    { id: 1, text: isAr ? 'مرحباً، هل أنت قريب من الموقع؟' : 'Hi, are you near the location?', sender: 'me', time: '10:00 AM' },
    { id: 2, text: isAr ? 'نعم، أنا على بعد 5 دقائق فقط' : 'Yes, I am only 5 minutes away', sender: 'them', time: '10:01 AM' },
    { id: 3, text: isAr ? 'ممتاز، أنا في انتظارك' : 'Great, I am waiting for you', sender: 'me', time: '10:02 AM' },
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: input,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setInput('');

    // Mock reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: isAr ? 'تم الاستلام، شكراً لك' : 'Received, thank you',
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto">
      <header className="p-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full">
            {isAr ? <ChevronRight /> : <ChevronLeft />}
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="https://i.pravatar.cc/150?u=worker" className="w-10 h-10 rounded-xl object-cover" alt="avatar" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">أحمد محمد</h2>
              <p className="text-[10px] text-emerald-600 font-medium">{isAr ? 'متصل الآن' : 'Online'}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-slate-400 hover:text-teal-600"><Phone size={20} /></button>
          <button className="p-2 text-slate-400 hover:text-teal-600"><MoreVertical size={20} /></button>
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth"
      >
        <div className="flex justify-center">
          <span className="px-3 py-1 bg-slate-200/50 text-[10px] text-slate-500 rounded-full font-medium">
            {isAr ? 'اليوم' : 'Today'}
          </span>
        </div>

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "flex flex-col max-w-[80%]",
              msg.sender === 'me' ? (isAr ? "mr-auto items-start" : "ml-auto items-end") : (isAr ? "ml-auto items-end" : "mr-auto items-start")
            )}
          >
            <div className={cn(
              "px-4 py-3 rounded-2xl text-sm shadow-sm",
              msg.sender === 'me' 
                ? "bg-teal-600 text-white rounded-br-none" 
                : "bg-white text-slate-800 rounded-bl-none border border-slate-100"
            )}>
              {msg.text}
            </div>
            <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.time}</span>
          </motion.div>
        ))}
      </div>

      <footer className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button type="button" className="p-2 text-slate-400 hover:text-teal-600"><ImageIcon size={22} /></button>
          <button type="button" className="p-2 text-slate-400 hover:text-teal-600"><MapPin size={22} /></button>
          <div className="flex-1 relative">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isAr ? 'اكتب رسالتك...' : 'Type a message...'}
              className="h-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-teal-600 pr-12"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all",
                input.trim() ? "bg-teal-600 text-white shadow-md" : "bg-slate-200 text-slate-400"
              )}
            >
              <Send size={18} className={isAr ? "rotate-180" : ""} />
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default Chat;