
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Chat } from '@google/genai';
import { MessageCircle, X, Send, Sparkles, Bot, AlertTriangle, Loader2 } from 'lucide-react';
import { ChatMessage, VibeMode, THEMES } from '../types';
import { SLIDES, VOCABULARY } from '../constants';
import { playSound } from '../utils';

interface AIChatBotProps {
  vibe: VibeMode;
}

const AIChatBot: React.FC<AIChatBotProps> = ({ vibe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm your AI IELTS Tutor. I know everything about this course. Ask me about Task 1 strategies, vocabulary, or the Pauline Cullen approach!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Persistent chat session ref
  const chatSessionRef = useRef<Chat | null>(null);

  const theme = THEMES[vibe];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Initialize AI Session
  useEffect(() => {
    const initAI = () => {
      try {
        if (!process.env.API_KEY) {
          console.warn("API Key missing");
          return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // --- 1. PREPARE STRUCTURED CONTEXT ---
        
        // Format Vocabulary
        const vocabContext = VOCABULARY.map(v => 
          `- ${v.term}: ${v.definition} (Example usage: "${v.example}")`
        ).join("\n");

        // Format Slides by Section to give the AI better structural understanding
        const slidesBySection = SLIDES.reduce((acc, slide) => {
          const sec = slide.section || "General";
          if (!acc[sec]) acc[sec] = [];
          
          // Combine title (if exists) and lines, with explicit Slide ID
          const content = [
            `[Slide ${slide.id}]`,
            slide.title ? `Title: ${slide.title}` : null,
            ...slide.lines
          ].filter(Boolean).join(" ");
          
          acc[sec].push(content);
          return acc;
        }, {} as Record<string, string[]>);

        const slidesContext = Object.entries(slidesBySection).map(([section, contents]) => {
          return `SECTION: ${section.toUpperCase()}\n- ${contents.join("\n- ")}`;
        }).join("\n\n");

        // --- 2. DEFINE SYSTEM INSTRUCTION ---

        const systemInstruction = `
          You are an advanced AI Tutor for an IELTS Academic Writing Task 1 application.
          
          === YOUR KNOWLEDGE BASE (STRICTLY ADHERE TO THIS) ===
          
          [VOCABULARY DEFINITIONS]
          ${vocabContext}

          [COURSE STRATEGIES & CONTENT (Indexed by Slide ID)]
          ${slidesContext}

          === YOUR CORE INSTRUCTIONS ===
          1. **PEDAGOGY**: Adopt the "Pauline Cullen" approach.
             - **Task Achievement (Task 1)** vs **Task Response (Task 2)**: Emphasize that Task 1 is about accuracy and reporting facts, not opinions.
             - **Overview**: Stress that a clear overview of main trends is essential for Band 7+.
             - **Selection**: Warn against "mechanical recounts" (listing every number). Students must *select* main features.
             - **Precision**: Warn against "wild fluctuation" or using synonyms just for variety. Accuracy > Variety.
          
          2. **SUPER LEARNING**: You have instant access to the definitions above. If a user asks "What is Task Achievement?", use the provided definition from the vocabulary list.
             **Specific Slides**: If a user asks about a specific slide (e.g., "Slide 5"), look for the [Slide X] marker in the content above to find the exact text.

          3. **STRICT SAFETY & FILTERING**:
             - **Profanity/Hate Speech**: Immediately reply: "I cannot assist with that request. Let's focus on IELTS Task 1."
             - **Off-Topic**: If asked about coding, creative writing, or politics, reply: "I specialize in IELTS Task 1. Ask me about graphs, trends, or summaries!"
             - **No Essay Generation**: If asked to "Write an essay", guide them on *how* to write it using the strategies, but do not write the full essay for them.

          4. **RESPONSE FORMAT**:
             - Keep answers concise (under 100 words) unless asked for a detailed explanation.
             - Use bolding for key terms (e.g., **Overview**, **Precision**).
             - Use emojis occasionally to be friendly (e.g., 📊, ✍️).
        `;

        chatSessionRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
          }
        });

      } catch (err) {
        console.error("Failed to init AI", err);
        setError("AI functionality unavailable.");
      }
    };

    initAI();
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || !chatSessionRef.current) return;

    const userText = inputValue.trim();
    setInputValue('');
    setIsLoading(true);
    setError(null);
    playSound('click', vibe);

    // Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      // Basic client-side spam/profanity check (layer 1)
      const badWords = ['badword', 'spam', 'hate']; // Placeholder list
      if (badWords.some(w => userText.toLowerCase().includes(w))) {
         throw new Error("Content filtered");
      }

      const result = await chatSessionRef.current.sendMessage({ message: userText });
      const responseText = result.text;

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
      playSound('swoosh', vibe);

    } catch (err) {
      console.error(err);
      // Fallback response for errors or filtering
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I couldn't process that. Please ensure your message is related to IELTS Task 1 and follows our community guidelines.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
      playSound('wrong', vibe);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl flex items-center justify-center transition-all ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-blue-600'
        } text-white`}
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-24 right-4 md:right-6 w-[90vw] md:w-96 h-[60vh] md:h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10 z-40 backdrop-blur-md ${
              vibe === 'extrovert' ? 'bg-zinc-900/95 border-yellow-500/30' : 
              vibe === 'introvert' ? 'bg-[#1c1917]/95 border-stone-600' : 
              'bg-[#0f172a]/95 border-blue-400/30'
            }`}
          >
            {/* Header */}
            <div className={`p-4 flex items-center gap-3 border-b border-white/10 ${vibe === 'extrovert' ? 'bg-yellow-500/10' : 'bg-white/5'}`}>
              <div className={`p-2 rounded-lg ${vibe === 'extrovert' ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'}`}>
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className={`font-bold text-sm ${theme.text}`}>AI IELTS Mentor</h3>
                <div className="flex items-center gap-1 text-[10px] text-green-400">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Online
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                        isUser 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : `${vibe === 'extrovert' ? 'bg-zinc-800' : 'bg-white/10'} ${theme.text} rounded-bl-none`
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                 <div className="flex justify-start">
                   <div className={`p-3 rounded-2xl bg-white/5 ${theme.text} rounded-bl-none flex items-center gap-2`}>
                     <Loader2 size={16} className="animate-spin" />
                     <span className="text-xs opacity-70">Thinking...</span>
                   </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Task 1..."
                  className={`w-full p-3 pr-10 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500 focus:bg-white/10 text-sm resize-none ${theme.text}`}
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '100px' }}
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !inputValue.trim()}
                  className={`absolute right-2 bottom-2 p-1.5 rounded-lg transition-colors ${
                    !inputValue.trim() ? 'opacity-30 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400 text-white'
                  }`}
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="text-[10px] text-center mt-2 opacity-30">
                AI can make mistakes. Check important info.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBot;
