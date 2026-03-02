
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';

export const MobileStickyCTA = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show sticky CTA after scrolling past the hero (roughly 80vh)
            setVisible(window.scrollY > window.innerHeight * 0.8);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
                    style={{ WebkitBackfaceVisibility: 'hidden' }}
                >
                    <a
                        href="tel:+1234567890"
                        id="mobile-sticky-cta"
                        className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#1E90FF] to-[#0066CC] rounded-2xl font-inter font-black uppercase tracking-widest text-sm text-white shadow-[0_-4px_40px_rgba(30,144,255,0.3)] active:scale-95 transition-transform"
                    >
                        <Phone className="w-5 h-5" />
                        Call Now — Free Audit
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
