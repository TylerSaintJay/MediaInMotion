
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, Menu, X, ShoppingBag } from 'lucide-react';

export const Header = ({ buildStatus, handleBuildAsset, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-6 transition-all duration-300 ${scrolled ? 'glass-panel border-b border-white/5 bg-black/50 backdrop-blur-xl' : 'bg-transparent'}`}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bodoni font-bold tracking-tighter relative z-50"
                >
                    MEDIA <span className="text-[#1E90FF]">IN MOCION</span>
                </motion.div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {[{ label: 'Our Approach', href: '#approach' }, { label: 'Results', href: '#performance' }, { label: 'Services', href: '#infrastructure' }, { label: 'Insights', href: '#strategy' }].map((item, i) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="text-sm font-medium hover:text-[#1E90FF] transition-colors uppercase tracking-widest relative group"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1E90FF] transition-all group-hover:w-full" />
                        </motion.a>
                    ))}

                    <motion.button
                        onClick={handleBuildAsset}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-2 bg-gradient-to-r ${buildStatus === 'success' ? 'from-green-500 to-emerald-600' : 'from-[#1E90FF] to-[#0066CC]'} text-white font-bold transition-all shadow-lg ${buildStatus === 'success' ? 'shadow-green-500/20' : 'shadow-[#1E90FF]/20'} flex items-center gap-2 min-w-[150px] justify-center rounded-lg`}
                    >
                        {buildStatus === 'idle' && "Get Started"}
                        {buildStatus === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
                        {buildStatus === 'success' && <><CheckCircle2 className="w-5 h-5" /> Built</>}
                    </motion.button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl md:hidden pt-32 px-6 flex flex-col gap-8"
                    >
                        {[{ label: 'Our Approach', href: '#approach' }, { label: 'Results', href: '#performance' }, { label: 'Services', href: '#infrastructure' }, { label: 'Insights', href: '#strategy' }].map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-3xl font-bodoni font-bold hover:text-[#1E90FF] transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                handleBuildAsset();
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full py-4 bg-[#1E90FF] rounded-xl font-bold uppercase tracking-widest text-white mt-4"
                        >
                            Get Started
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
