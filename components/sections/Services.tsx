"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Crown, Shield, Trees, Cake, Star, X, ZoomIn } from "lucide-react";
import { useState } from "react";
import Card3D from "@/components/ui/Card3D";

// Lightbox Modal Component
interface Theme {
  name: string;
  description: string;
  icon: any;
  colors: string;
  accent: string;
  occasions: string[];
  image?: string;
}

function LightboxModal({ theme, onClose }: { theme: Theme; onClose: () => void }) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  useState(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
          <img
            src={theme.image}
            alt={theme.name}
            className="w-full h-auto object-cover"
          />

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="font-display text-3xl font-bold text-white mb-2">{theme.name}</h3>
            <p className="text-white/90 text-lg">{theme.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {theme.occasions.map((occasion: string) => (
                <span
                  key={occasion}
                  className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white"
                >
                  {occasion}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const themes: Theme[] = [];

  const occasions = [
    "Compleanno",
    "Baby Shower",
    "Battesimo",
    "Cresima",
    "Eventi Aziendali",
    "Altre Occasioni",
  ];

  return (
    <section id="services" ref={ref} className="py-20 bg-gradient-to-b from-pink-50/30 to-teal-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-accent text-teal-500 text-sm tracking-widest uppercase mb-4">
            I Nostri Temi
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Scegli il <span className="text-pink-500">Tuo Tema</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Offriamo una vasta gamma di temi decorativi unici. Ciascuno può essere personalizzato secondo le tue esigenze!
          </p>
        </motion.div>

        {/* Occasion Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {occasions.map((occasion) => (
            <span
              key={occasion}
              className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-pink-200 text-sm font-medium text-foreground hover:bg-pink-50 hover:border-pink-300 transition-colors cursor-default"
            >
              {occasion}
            </span>
          ))}
        </motion.div>

        {/* Theme Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {themes.map((theme, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card3D
                intensity={10}
                glowColor="rgba(255, 107, 157, 0.4)"
                shimmer={true}
                className="h-full"
              >
                <Card className="h-full border-2 border-pink-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:border-pink-300">
                {/* Image Header */}
                <div
                  className="h-64 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer"
                  onClick={() => theme.image && setSelectedTheme(theme)}
                >
                  {theme.image ? (
                    <>
                      <img
                        src={theme.image}
                        alt={theme.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Zoom Hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Fallback gradient if no image */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme.colors}`} />
                      {/* Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <theme.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Gradient Overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Shimmer Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                <CardContent className="p-6">
                  {/* Theme Name */}
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-pink-500 transition-colors">
                    {theme.name}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-muted-foreground mb-4 text-sm leading-relaxed">
                    {theme.description}
                  </p>

                  {/* Occasions */}
                  <div className="flex flex-wrap gap-2">
                    {theme.occasions.map((occasion) => (
                      <span
                        key={occasion}
                        className={`inline-flex items-center px-3 py-1 bg-${theme.accent}-50 text-${theme.accent}-600 rounded-full text-xs font-medium`}
                      >
                        {occasion}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Card3D>
            </motion.div>
          ))}
        </div>

        {/* Custom Theme CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-3xl mx-auto border-none shadow-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white">
            <CardContent className="p-8 md:p-12">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Hai un'altra idea?
              </h3>
              <p className="font-body text-white/90 mb-6 max-w-xl mx-auto">
                Nessun problema! Creiamo anche decorazioni su misura. Dicci i tuoi sogni e noi li realizzeremo!
              </p>
              <button
                className="inline-flex items-center gap-2 bg-white text-pink-600 font-accent px-8 py-3 rounded-full hover:bg-pink-50 transition-colors shadow-lg"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contattaci
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedTheme && (
          <LightboxModal
            theme={selectedTheme}
            onClose={() => setSelectedTheme(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
