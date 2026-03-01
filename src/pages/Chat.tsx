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
    <div className="min-h-screen bg-[#02040a] flex flex-col max-w-md mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      
      <header className="p-4 glass border-b border-white/5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 text-slate-400 hover:text-white transition-colors">
            {isAr ? <ChevronRight /> : <ChevronLeft />}
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="https://i.pravatar.cc/150?u=worker" className="w-10 h-10 rounded-xl object-cover border border-white/10" alt="avatar" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-teal-500 border-2 border-[#02040a] rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white tracking-tight">أحمد محمد</h2>
              <p className="text-[9px] text-teal-400 font-black uppercase tracking-widest">{isAr ? 'متصل' : 'Syncing'}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-slate-500 hover:text-teal-400 transition-colors"><Phone size={20} /></button>
          <button className="p-2 text-slate-500 hover:text-teal-400 transition-colors"><MoreVertical size={20} /></button>
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-6 scroll-smooth relative z-10"
      >
        <div className="flex justify-center">
          <span className="px-4 py-1 glass text-[9px] text-slate-500 rounded-full font-black uppercase tracking-[0.2em] border-white/5">
            {isAr ? 'اليوم' : 'Cycle: Today'}
          </span>
        </div>

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "flex flex-col max-w-[85%]",
              msg.sender === 'me' ? (isAr ? "mr-auto items-start" : "ml-auto items-end") : (isAr ? "ml-auto items-end" : "mr-auto items-start")
            )}
          >
            <div className={cn(
              "px-5 py-3 rounded-[1.5rem] text-sm font-medium shadow-xl",
              msg.sender === 'me' 
                ? "bg-teal-600 text-white rounded-br-none shadow-teal-500/10" 
                : "glass text-white rounded-bl-none border-white/10"
            )}>
              {msg.text}
            </div>
            <span className="text-[8px] font-bold text-slate-600 mt-1.5 px-2 uppercase tracking-widest">{msg.time}</span>
          </motion.div>
        ))}
      </div>

      <footer className="p-4 glass border-t border-white/5 relative z-20">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <button type="button" className="p-2 text-slate-500 hover:text-teal-400 transition-colors"><ImageIcon size={22} /></button>
          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-teal-500 rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isAr ? 'اكتب رسالتك...' : 'Input data stream...'}
              className="h-12 rounded-2xl bg-white/5 border-white/5 text-white placeholder:text-slate-600 focus:ring-teal-500/50 pr-12"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all",
                input.trim() ? "bg-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.4)]" : "bg-white/5 text-slate-600"
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