
import React from 'react';
import { motion } from 'framer-motion';

export const Footer = () => {
    return (
        <footer className="py-20 px-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 bg-black/80 backdrop-blur-xl relative z-10">
            <div className="flex flex-col items-center md:items-start gap-2">
                <div className="font-bodoni font-bold text-3xl uppercase tracking-tighter text-white">
                    Media <span className="text-[#1E90FF]">in Mocion</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold group hover:text-white transition-colors cursor-default">
                    Where Growth Is Engineered
                </div>
            </div>

            <div className="flex flex-col items-center gap-6">
                <div className="flex gap-12 text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black">
                    {['Instagram', 'LinkedIn', 'X Platform'].map(social => (
                        <a key={social} href="#" className="hover:text-[#1E90FF] hover:scale-110 transition-all duration-300">{social}</a>
                    ))}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-700 font-bold">
                    © {new Date().getFullYear()} Media in Mocion. All rights reserved.
                </div>

                {/* SYSTEM STATUS INDICATOR - LINKED WITH PHASE 2 */}
                <div className="flex items-center gap-2 mt-4 text-[9px] uppercase tracking-[0.2em] text-green-500 font-bold bg-green-950/20 px-3 py-1 rounded-full border border-green-900/50">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    SYSTEMS ONLINE · ALL SERVICES OPERATIONAL
                </div>
            </div>

            <div className="hidden lg:block w-48 h-1 bg-zinc-900 rounded-full overflow-hidden relative group">
                <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="w-1/2 h-full bg-[#1E90FF]/40 group-hover:bg-[#1E90FF] transition-colors"
                />
            </div>
        </footer>
    );
};
