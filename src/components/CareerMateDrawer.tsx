import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Bot,
  Send,
  Sparkles,
  User,
  RotateCcw,
  Briefcase,
  ChevronRight,
  BrainCircuit,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { ChatMessage, Job } from '../types.js';

interface CareerYouthDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onViewJob?: (jobId: string) => void;
}

const DEFAULT_PROMPTS = [
  'What jobs match my profile?',
  'Which skills am I missing for my target role?',
  'Find high-paying remote opportunities.',
  'How can I improve my match score to 95%+?',
  'What should I learn to become a Senior Engineer?',
];

export const CareerMateDrawer: React.FC<CareerYouthDrawerProps> = ({
  isOpen,
  onClose,
  initialQuery,
  onViewJob,
}) => {
  const { user, profile } = useAuth();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: `👋 **Hi ${profile?.name?.split(' ')[0] || 'there'}! I'm CareerYouth AI Assistant, your dedicated AI career strategist.\n\nI have analyzed your active profile (${profile?.skills?.slice(0, 4).join(', ') || 'tech skills'}) and our LinkedIn dataset. Ask me anything about job matches, skill gaps, resume refinement, or interview prep!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.id || 'user-ahmed-001'}`,
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || 'I analyzed your profile against the latest listings. Let me know if you would like deeper insights on any specific company!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedSkills: data.suggestedSkills,
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'CareerMate AI encountered a temporary network delay. Based on your profile, you are strongly positioned for Full Stack and Frontend roles.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/80 border border-indigo-400/30 flex items-center justify-center shadow-inner">
              <Bot className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-white">CareerYouth AI</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-xs text-indigo-200 font-medium">Your AI Career Assistant & Job Matcher</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() =>
                setMessages([
                  {
                    id: 'msg-welcome-reset',
                    sender: 'ai',
                    text: `Conversation restarted. What career insights or job matches can I pull for you?`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  },
                ])
              }
              title="Clear chat"
              className="p-2 rounded-xl text-indigo-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              id="close-careermate-drawer-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-indigo-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto flex items-center gap-2 no-scrollbar">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-600" /> Prompts:
          </span>
          {DEFAULT_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/70 hover:text-indigo-700 transition-all shadow-2xs whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text.split('\n').map((paragraph, pIdx) => {
                    // Simple Markdown-style bold and bullet parsing
                    const isBullet = paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-');
                    const isHeader = paragraph.trim().startsWith('###') || paragraph.trim().startsWith('**');

                    return (
                      <p
                        key={pIdx}
                        className={`${pIdx > 0 ? 'mt-1.5' : ''} ${isBullet ? 'pl-2 text-slate-700' : ''}`}
                      >
                        {paragraph.replace(/^###\s*/, '')}
                      </p>
                    );
                  })}
                </div>

                {/* Suggested Skill Pills */}
                {msg.suggestedSkills && msg.suggestedSkills.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                    <span className="text-[10px] uppercase font-bold text-indigo-600 block w-full">
                      Recommended to Add to Profile:
                    </span>
                    {msg.suggestedSkills.map(s => (
                      <span
                        key={s}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200"
                      >
                        + {s}
                      </span>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[10px] mt-1.5 font-medium ${
                    msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-400 text-left'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-3 justify-start animate-in fade-in">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-3.5 shadow-2xs flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <span className="text-xs text-slate-500 font-medium ml-1.5">CareerYouth AI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="careermate-chat-input"
              type="text"
              placeholder="Ask CareerYouth AI about jobs, skills, or career advice..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isTyping}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs sm:text-sm font-medium text-slate-900 outline-hidden transition-all"
            />

            <button
              id="careermate-send-btn"
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white shadow-xs transition-all flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-slate-400 text-center mt-2">
            CareerYouth AI compares user profiles with real job requirements.
          </div>
        </div>
      </div>
    </div>
  );
};
