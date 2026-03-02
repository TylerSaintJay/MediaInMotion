'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarCheck, ArrowDown } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";

export const CalendarSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const calContainerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [calLoaded, setCalLoaded] = useState(false);

    useEffect(() => {
        // Client-Only Guard: Ensures window object is ready
        if (!isInView || calLoaded || typeof window === 'undefined') return;

        let calInstance: any = null;
        const cleanupCallback = () => {
            window.location.href = "https://mediainmocion.com/thank-you";
        };

        (async function loadCal() {
            try {
                const cal = await getCalApi();

                if (!cal) return;
                calInstance = cal;

                // Namespace Safety: Prevent conflicts with other scripts
                cal("init", "audit", { origin: "https://cal.com" });

                // The "Preload" Command: Triggers data fetch early
                cal("preload", { calLink: "tyler-jay-b2hnuo/growth-audit" });

                cal("inline", {
                    elementOrSelector: "#cal-inline-embed",
                    calLink: "tyler-jay-b2hnuo/growth-audit",
                    config: {
                        theme: "dark",
                    },
                });

                cal("on", {
                    action: "bookingSuccessful",
                    callback: cleanupCallback,
                });

                cal("ui", {
                    theme: "dark",
                    styles: { branding: { brandColor: "#1E90FF" } },
                    hideEventTypeDetails: false,
                    layout: "month_view",
                });

                setCalLoaded(true);
            } catch (err) {
                console.error("Cal.com embed failed to load", err);
            }
        })();

        // Clean Up is inherently managed by avoiding duplicate inits 
        // through our `calLoaded` state guard & `getCalApi` singleton handling.
        return () => {
            if (calInstance) {
                calInstance("off", { action: "bookingSuccessful", callback: cleanupCallback });
            }
        };
    }, [isInView, calLoaded]);

    return (
        <section
            id="strategy-session"
            ref={sectionRef}
            className="relative py-32 px-6"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#1E90FF]/8 blur-[180px] rounded-full" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E90FF]/30 to-transparent" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#1E90FF]/30 bg-[#1E90FF]/5 backdrop-blur-sm rounded-full mb-8 font-inter text-[10px] tracking-[0.3em] uppercase text-[#1E90FF] font-bold">
                        <CalendarCheck className="w-3 h-3 animate-pulse" /> Reserve Your Slot
                    </div>

                    <h2 className="font-bodoni text-5xl md:text-[5.5rem] tracking-tighter mb-6 leading-[0.95]">
                        STRATEGY <br />
                        <span className="italic text-[#1E90FF] drop-shadow-[0_0_30px_rgba(30,144,255,0.35)]">SESSION</span>
                    </h2>

                    <p className="max-w-2xl mx-auto font-inter text-zinc-400 text-base md:text-lg leading-relaxed mb-4">
                        Book a <span className="text-white font-semibold">free 30-minute Growth Audit</span> — we'll diagnose your biggest conversion bottleneck and show you the infrastructure needed to break through it.
                    </p>

                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="text-[#1E90FF]/50"
                    >
                        <ArrowDown className="w-5 h-5 mx-auto" />
                    </motion.div>
                </motion.div>

                {/* Cal.com Embed Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="relative rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl shadow-[0_0_80px_-20px_rgba(30,144,255,0.15)]"
                    style={{ isolation: 'isolate', minHeight: '800px', zIndex: 50 }}
                >
                    {/* Skeleton Loader – visible until Cal loads */}
                    {!calLoaded && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-md rounded-3xl">
                            <div className="w-10 h-10 border-2 border-[#1E90FF]/30 border-t-[#1E90FF] rounded-full animate-spin mb-4" />
                            <p className="text-zinc-500 font-inter text-sm uppercase tracking-widest font-bold">Loading Calendar...</p>
                        </div>
                    )}

                    {/* Cal.com inline embed target */}
                    <div
                        id="cal-inline-embed"
                        ref={calContainerRef}
                        className="w-full h-full"
                        style={{ minHeight: '800px' }}
                    />
                </motion.div>

                {/* Trust Indicators under calendar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 flex flex-wrap justify-center gap-8 text-zinc-500 font-inter"
                >
                    {[
                        { label: "30 min · Free", icon: "⏱" },
                        { label: "No Obligation", icon: "✓" },
                        { label: "100% Confidential", icon: "🔒" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold"
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </div>
                    ))}
                </motion.div>

                {/* Urgency Pulse */}
                <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="mt-8 text-center text-zinc-600 font-inter text-[10px] uppercase tracking-[0.4em] font-bold"
                >
                    Only 2 infrastructure slots remaining for {new Date().toLocaleString('default', { month: 'long' })}
                </motion.div>
            </div>
        </section>
    );
};
