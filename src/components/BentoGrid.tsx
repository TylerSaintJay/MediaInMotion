
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layout, Target, Rocket, Cpu, TrendingUp } from 'lucide-react';

const BentoItem = ({ children, className, title, icon: Icon }: { children?: React.ReactNode, className?: string, title: string, icon: any }) => {
    const mouseX = useRef<number>(0);
    const mouseY = useRef<number>(0);
    const [hovering, setHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.current = e.clientX - rect.left;
        mouseY.current = e.clientY - rect.top;

        containerRef.current.style.setProperty('--mouse-x', `${mouseX.current}px`);
        containerRef.current.style.setProperty('--mouse-y', `${mouseY.current}px`);
    };

    return (
        <motion.div
            ref={containerRef}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden rounded-3xl glass-card p-8 transition-colors group ${className}`}
            style={{
                background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(30, 144, 255, 0.06), transparent 40%)`
            } as any}
        >
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:bg-[#1E90FF] group-hover:text-white transition-all duration-300 shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)]">
                        <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>
                    <motion.div
                        animate={hovering ? { rotate: 45, scale: 1.2 } : { rotate: 0, scale: 1 }}
                    >
                        <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                    </motion.div>
                </div>
                <h3 className="font-bodoni text-2xl mb-4 leading-tight text-white group-hover:text-[#1E90FF] transition-colors">{title}</h3>
                {children}
            </div>

            {/* Dynamic Glow Spot */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                style={{
                    background: `radial-gradient(circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(30, 144, 255, 0.1) 0%, transparent 80%)`
                } as any}
            />
        </motion.div>
    );
};

export const BentoGrid = () => {
    return (
        <section id="approach" className="py-32 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20 text-center md:text-left"
            >
                <h2 className="font-bodoni text-5xl md:text-7xl mb-6">EVERYTHING YOU NEED <br /> <span className="text-zinc-500 italic">TO GROW</span></h2>
                <div className="w-24 h-1.5 bg-[#1E90FF] mx-auto md:mx-0" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BentoItem title="Revenue on Autopilot" icon={Layout} className="md:col-span-2">
                    <p className="text-zinc-400 font-inter leading-relaxed text-lg">
                        A digital engine that captures leads, nurtures relationships, and closes sales — all working for you 24/7, even while you sleep.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        {['Found Online', 'Always Connected', 'Lightning Fast'].map(tag => (
                            <div key={tag} className="px-3 py-1 bg-zinc-800/80 border border-zinc-700 rounded-md text-[10px] uppercase tracking-wider text-zinc-300 font-bold">
                                {tag}
                            </div>
                        ))}
                    </div>
                </BentoItem>

                <BentoItem title="More Revenue, Same Traffic" icon={Target} className="md:col-span-1">
                    <p className="text-zinc-400 font-inter leading-relaxed">
                        We continuously refine every pixel and pathway so your existing visitors convert at higher and higher rates — more profit without spending another dollar on ads.
                    </p>
                    <div className="mt-8 flex justify-end">
                        <motion.div
                            animate={{
                                y: [0, -5, 0],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <TrendingUp className="w-12 h-12 text-[#1E90FF]" />
                        </motion.div>
                    </div>
                </BentoItem>

                <BentoItem title="Ads That Actually Pay You Back" icon={Rocket} className="md:col-span-1">
                    <p className="text-zinc-400 font-inter leading-relaxed">
                        When you are ready to scale, your digital presence is battle-tested to turn cold clicks into warm customers — so every ad dollar works harder.
                    </p>
                </BentoItem>

                <BentoItem title="Know Your Next Dollar" icon={Cpu} className="md:col-span-2">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-zinc-400 font-inter leading-relaxed">
                                Clear, real-time insights that show you exactly where your growth is coming from and where to invest next. No guesswork, just certainty.
                            </p>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-black/60 p-6 rounded-2xl border border-[#1E90FF]/20 backdrop-blur-md shadow-inner"
                        >
                            <div className="text-[10px] uppercase text-zinc-500 mb-2 font-bold tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live Multiplier
                            </div>
                            <div className="text-4xl font-bodoni text-white">7.5x <span className="text-sm text-[#1E90FF] uppercase tracking-tighter">Growth</span></div>
                            <div className="w-full h-1 bg-zinc-800 mt-4 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '75%' }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className="h-full bg-gradient-to-r from-[#1E90FF] to-cyan-400"
                                />
                            </div>
                        </motion.div>
                    </div>
                </BentoItem>
            </div>
        </section>
    );
};
