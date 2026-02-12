
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, BarChart3, Activity, Maximize2, ShieldCheck, Globe2, ArrowUpRight, Loader2, CheckCircle2 } from 'lucide-react';

const CountUp = ({ value, suffix = "", prefix = "" }: { value: number, suffix?: string, prefix?: string }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000;
            const stepTime = 20;
            const increment = value / (duration / stepTime);

            const timer = setInterval(() => {
                start += increment;
                if (start >= value) {
                    setDisplayValue(value);
                    clearInterval(timer);
                } else {
                    setDisplayValue(Math.floor(start));
                }
            }, stepTime);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref} className="font-bodoni font-bold text-5xl md:text-7xl tabular-nums">
            {prefix}{displayValue.toLocaleString()}{suffix}
        </span>
    );
};

const RoadmapStep = ({ number, title, desc, isActive, delay = 0 }: { number: string, title: string, desc: string, isActive?: boolean, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        viewport={{ once: true }}
        className={`flex gap-6 p-6 rounded-2xl border transition-all duration-500 group cursor-default glass-card ${isActive ? 'bg-white/10 border-[#1E90FF]/50 shadow-[0_0_30px_-10px_rgba(30,144,255,0.3)]' : 'border-white/5 hover:border-white/20'}`}
    >
        <div className={`text-3xl font-bodoni transition-all duration-300 ${isActive ? 'text-[#1E90FF] scale-110' : 'text-zinc-700 group-hover:text-zinc-500'}`}>{number}</div>
        <div>
            <h4 className="font-bold text-lg mb-1 group-hover:text-[#1E90FF] transition-colors">{title}</h4>
            <p className="text-sm text-zinc-400 font-inter">{desc}</p>
        </div>
    </motion.div>
);

const StrategyDeliverable = ({ title, icon: Icon, children }: { title: string, icon: any, children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="border-b border-zinc-800/50 py-12 last:border-0"
    >
        <div className="flex items-center gap-4 mb-8 group">
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl group-hover:border-[#1E90FF]/40 transition-colors">
                <Icon className="w-8 h-8 text-[#1E90FF]" />
            </div>
            <h3 className="font-bodoni text-3xl md:text-4xl font-medium uppercase tracking-tight">{title}</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
            {children}
        </div>
    </motion.div>
);

export const StrategySection = ({ buildStatus, handleBuildAsset }: { buildStatus: string, handleBuildAsset: () => void }) => {
    return (
        <>
            {/* --- Proof Section --- */}
            <section id="performance" className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#1E90FF]/5 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-bodoni text-5xl md:text-7xl mb-8 leading-tight">GLOBAL PROOF. <br /> CURRENCY <span className="text-[#1E90FF] italic">AGNOSTIC.</span></h2>
                            <p className="font-inter text-zinc-400 text-lg mb-12 leading-relaxed">
                                We don't talk about dollar amounts because our clients operate in 40+ countries. We talk about <span className="text-white font-bold underline decoration-[#1E90FF]/50 underline-offset-8">multipliers</span>. Whether it's USD, EUR, or JPY, the growth logic remains the same.
                            </p>
                            <div className="space-y-8">
                                <div className="flex items-center gap-6 text-zinc-300 group">
                                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-full group-hover:text-[#1E90FF] group-hover:border-[#1E90FF]/40 transition-all">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">Verified Architect</div>
                                        <div className="text-sm text-zinc-500">Industry-leading deployment standards.</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 text-zinc-300 group">
                                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-full group-hover:text-[#1E90FF] group-hover:border-[#1E90FF]/40 transition-all">
                                        <Globe2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">Cross-Border Scaling</div>
                                        <div className="text-sm text-zinc-500">Handling diverse market regulations & behaviors.</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                            {[
                                { label: "Conv. Increase", val: 350, suffix: "%" },
                                { label: "Avg. Multiplier", val: 7.5, suffix: "x", dec: true },
                                { label: "Leads Generated", val: 12, suffix: "k+" },
                                { label: "Retention Rate", val: 92, suffix: "%" }
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                    className="relative flex flex-col items-center justify-center p-12 glass-card rounded-[2.5rem] group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E90FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
                                    <CountUp value={stat.val} suffix={stat.suffix} />
                                    <div className="font-inter text-xs uppercase tracking-[0.3em] text-zinc-500 mt-4 text-center font-bold group-hover:text-[#1E90FF] transition-colors">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Strategic Deliverables --- */}
            <section id="strategy" className="py-32 px-6 max-w-7xl mx-auto">
                <div className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-[#1E90FF] font-inter uppercase tracking-[0.4em] text-xs mb-4 font-extrabold"
                    >
                        The Strategic Pivot
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-bodoni text-5xl md:text-[5.5rem] tracking-tight"
                    >
                        DYNAMIC <span className="italic text-zinc-600">GROWTH</span>
                    </motion.h2>
                </div>

                <div className="space-y-12">
                    <StrategyDeliverable title="Positioning Statement" icon={Target}>
                        <div className="text-zinc-400 space-y-6 font-inter text-lg">
                            <p>
                                "Media in Mocion moves from 'Website Designer' to <span className="text-white font-bold underline decoration-[#1E90FF] decoration-2 underline-offset-4">Infrastructure Architect</span>."
                            </p>
                            <p className="text-base text-zinc-500 leading-relaxed">
                                We frame the website not as a cost, but as an appreciating asset. It is the operating system that captures, nurtures, and converts—the primary lever for scaling.
                            </p>
                        </div>
                        <motion.div
                            whileHover={{ x: 5 }}
                            className="bg-zinc-900/40 p-8 border-l-4 border-[#1E90FF] rounded-r-2xl relative group"
                        >
                            <div className="absolute inset-0 bg-[#1E90FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h4 className="font-bold text-white mb-3 uppercase text-[10px] tracking-widest opacity-60">Client realization:</h4>
                            <p className="italic font-bodoni text-2xl text-[#1E90FF] leading-snug">"Without this asset, my ad spend is just a donation to the algorithm gods."</p>
                        </motion.div>
                    </StrategyDeliverable>

                    <StrategyDeliverable title="6-Month Value Ladder" icon={BarChart3}>
                        <div className="space-y-4">
                            <RoadmapStep number="01" title="Infrastructure Deployment" desc="30-day build focusing on core sales logic & conversion tracking." isActive={true} delay={0.1} />
                            <RoadmapStep number="02" title="The Conversion Squeeze" desc="90 days of A/B testing, heatmapping, and UX optimization." delay={0.2} />
                            <RoadmapStep number="03" title="Vertical Scaling" desc="Scaling traffic through paid channels using the high-performance asset." delay={0.3} />
                        </div>
                        <div className="flex flex-col justify-center gap-6 border border-zinc-800 p-8 rounded-[2rem] bg-zinc-900/20 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
                                    <Activity className="w-5 h-5 text-[#1E90FF]/40" />
                                </motion.div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 bg-[#1E90FF] rounded-full animate-ping" />
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#1E90FF] font-black">Projected Revenue Lift</span>
                            </div>
                            <div className="h-40 flex items-end gap-3 px-2">
                                {[25, 45, 75, 100].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ delay: 0.5 + (i * 0.1), duration: 0.8, ease: "circOut" }}
                                        className={`flex-1 rounded-t-lg shadow-lg ${i === 3 ? 'bg-gradient-to-t from-[#1E90FF] to-cyan-400' : 'bg-zinc-800'}`}
                                    >
                                        <div className="w-full h-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity cursor-help" />
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-zinc-600 font-bold uppercase tracking-widest pt-4 border-t border-zinc-800/50">
                                <span>Month 1</span>
                                <span>Month 6</span>
                            </div>
                        </div>
                    </StrategyDeliverable>

                    <StrategyDeliverable title="Pricing Psychology" icon={Maximize2}>
                        <div className="text-zinc-400 font-inter space-y-6">
                            <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.2em] opacity-60">The "Infrastructure Tax" Strategy:</h4>
                            <p className="text-lg">We price the website build as a high-friction reduction point—making it the obvious first step for any operator serious about scaling.</p>
                            <p className="text-sm text-zinc-500 leading-relaxed italic">By positioning it as the <span className="text-white">Growth Tax</span>, we eliminate the commodity pricing trap entirely.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <motion.div whileHover={{ y: -5 }} className="p-8 bg-zinc-900/60 border border-zinc-800 rounded-2xl group transition-all">
                                <div className="text-[10px] text-zinc-500 uppercase mb-4 font-bold tracking-widest">Legacy Model</div>
                                <div className="text-zinc-500 line-through font-bodoni text-xl opacity-40">Commodity Designer</div>
                            </motion.div>
                            <motion.div whileHover={{ y: -5 }} className="p-8 bg-zinc-900 border border-[#1E90FF]/30 rounded-2xl group transition-all shadow-xl shadow-[#1E90FF]/5">
                                <div className="text-[10px] text-[#1E90FF] uppercase mb-4 font-extrabold tracking-widest">Pivot Model</div>
                                <div className="text-white font-bodoni text-2xl font-bold">Growth Architect</div>
                            </motion.div>
                        </div>
                    </StrategyDeliverable>
                </div>
            </section>

            {/* --- Primary CTA --- */}
            <section className="py-40 px-6 overflow-hidden relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    <h2 className="font-bodoni text-6xl md:text-9xl mb-12 tracking-tighter drop-shadow-2xl">READY TO <br /><span className="text-[#1E90FF] italic">DEPLOY?</span></h2>
                    <p className="font-inter text-zinc-400 text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
                        Secure your infrastructure. Stop the leakage in your funnel and start building an asset that builds your empire while you sleep.
                    </p>
                    <motion.button
                        onClick={handleBuildAsset}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(30,144,255,0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className={`group relative ${buildStatus === 'success' ? 'bg-green-600' : 'bg-[#1E90FF]'} px-16 py-8 rounded-2xl overflow-hidden transition-colors duration-500`}
                    >
                        <span className="relative z-10 font-inter font-black uppercase tracking-[0.4em] flex items-center gap-4 text-white text-lg">
                            {buildStatus === 'idle' && <>Claim Entry Offer <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
                            {buildStatus === 'loading' && <Loader2 className="w-6 h-6 animate-spin" />}
                            {buildStatus === 'success' && <><CheckCircle2 className="w-6 h-6" /> Infrastructure Built</>}
                        </span>
                        <motion.div
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className="absolute top-0 bottom-0 w-20 bg-white/20 skew-x-[30deg]"
                        />
                    </motion.button>
                    <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="mt-12 text-zinc-500 font-inter text-xs uppercase tracking-[0.3em] font-bold"
                    >
                        Only 2 infrastructure slots remaining for {new Date().toLocaleString('default', { month: 'long' })}.
                    </motion.div>
                </motion.div>

                {/* Abstract Glow Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1E90FF]/10 blur-[150px] -z-10 rounded-full" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1E90FF] to-transparent opacity-30" />
            </section>
        </>
    );
};
