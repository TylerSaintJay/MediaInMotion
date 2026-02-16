
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Zap, Loader2, CheckCircle2 } from 'lucide-react';

export const Hero = ({ buildStatus, handleBuildAsset }: { buildStatus: string, handleBuildAsset: () => void }) => {
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.92]);
    const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

    return (
        <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
            <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#1E90FF]/30 bg-[#1E90FF]/5 backdrop-blur-sm rounded-full mb-8 font-inter text-[10px] tracking-[0.3em] uppercase text-[#1E90FF] font-bold"
                >
                    <Activity className="w-3 h-3 animate-pulse" /> Where Brands Become Empires
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
                    className="font-bodoni text-5xl md:text-[6.5rem] leading-[1] tracking-tighter mb-8 max-w-5xl mx-auto"
                >
                    YOUR BUSINESS. <br />
                    <span className="italic text-[#1E90FF] drop-shadow-[0_0_20px_rgba(30,144,255,0.4)]">UNSTOPPABLE.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="max-w-xl mx-auto font-inter text-zinc-400 text-base md:text-lg leading-relaxed mb-12"
                >
                    Imagine waking up to revenue that grew while you slept — a <span className="text-white font-medium">digital presence</span> so powerful, it turns strangers into loyal buyers on autopilot.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                    <motion.button
                        onClick={handleBuildAsset}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`group relative px-10 py-5 ${buildStatus === 'success' ? 'bg-green-600' : 'bg-[#1E90FF]'} rounded-lg shadow-[0_0_40px_-10px_rgba(30,144,255,0.5)] overflow-hidden transition-colors duration-500`}
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        <span className="relative z-10 font-inter font-bold uppercase tracking-widest text-sm flex items-center gap-3 text-white">
                            {buildStatus === 'idle' && <>Start Your Growth <Zap className="w-4 h-4 fill-white group-hover:scale-125 transition-transform" /></>}
                            {buildStatus === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
                            {buildStatus === 'success' && <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Built</div>}
                        </span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 border border-white/10 glass-panel rounded-lg transition-all font-inter font-bold uppercase tracking-widest text-sm text-zinc-300 hover:text-white"
                    >
                        See How It Works
                    </motion.button>
                </motion.div>
            </motion.div>


        </section>
    );
};
