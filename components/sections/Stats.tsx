"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Calendar, Sparkles, Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function Stats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [counts, setCounts] = useState({ clients: 0, events: 0, themes: 0, reviews: 0 });

  const stats: StatItem[] = [
    {
      value: 500,
      suffix: "+",
      label: "Zadowolonych Klientów",
      icon: Users,
      color: "pink",
      gradientFrom: "from-pink-500",
      gradientTo: "to-rose-500",
    },
    {
      value: 1000,
      suffix: "+",
      label: "Zrealizowanych Eventów",
      icon: Calendar,
      color: "teal",
      gradientFrom: "from-teal-500",
      gradientTo: "to-cyan-500",
    },
    {
      value: 50,
      suffix: "+",
      label: "Unikalnych Motywów",
      icon: Sparkles,
      color: "purple",
      gradientFrom: "from-purple-500",
      gradientTo: "to-violet-500",
    },
    {
      value: 98,
      suffix: "%",
      label: "Pozytywnych Opinii",
      icon: Heart,
      color: "red",
      gradientFrom: "from-red-500",
      gradientTo: "to-orange-500",
    },
  ];

  // Animated counter hook
  useEffect(() => {
    if (inView) {
      const duration = 2000; // 2 seconds animation
      const steps = 60; // 60 frames
      const increment = {
        clients: 500 / steps,
        events: 1000 / steps,
        themes: 50 / steps,
        reviews: 98 / steps,
      };

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setCounts({
          clients: Math.min(500, Math.floor(500 * (currentStep / steps))),
          events: Math.min(1000, Math.floor(1000 * (currentStep / steps))),
          themes: Math.min(50, Math.floor(50 * (currentStep / steps))),
          reviews: Math.min(98, Math.floor(98 * (currentStep / steps))),
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView]);

  return (
    <section id="stats" ref={ref} className="relative py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-teal-100" />

      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.4, 0.3, 0.4],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-accent text-pink-500 text-sm tracking-widest uppercase mb-4">
            Nasze Osiągnięcia
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Liczby, które{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              Mówią Same za Siebie
            </span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Latami doświadczeń i setkami zrealizowanych wydarzeń budujemy zaufanie naszych klientów.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const countValue =
              index === 0
                ? counts.clients
                : index === 1
                  ? counts.events
                  : index === 2
                    ? counts.themes
                    : counts.reviews;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Stat Card */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 group">
                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Icon Container */}
                  <motion.div
                    className={`relative mb-6 w-16 h-16 bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} rounded-2xl flex items-center justify-center shadow-lg`}
                    animate={inView ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    } : {}}
                    transition={{
                      duration: 2,
                      delay: index * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Number with Pulse Effect */}
                  <motion.div
                    className="mb-2"
                    animate={inView ? {
                      scale: [1, 1.05, 1],
                    } : {}}
                    transition={{
                      duration: 2,
                      delay: index * 0.2 + 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className={`font-display text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.gradientFrom} ${stat.gradientTo} bg-clip-text text-transparent`}>
                      {countValue}
                    </span>
                    <span className={`font-display text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.gradientFrom} ${stat.gradientTo} bg-clip-text text-transparent`}>
                      {stat.suffix}
                    </span>
                  </motion.div>

                  {/* Label */}
                  <p className="font-body text-base font-medium text-muted-foreground">
                    {stat.label}
                  </p>

                  {/* Decorative Dot */}
                  <motion.div
                    className={`absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r ${stat.gradientFrom} ${stat.gradientTo}`}
                    animate={inView ? {
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    } : {}}
                    transition={{
                      duration: 2,
                      delay: index * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-pink-200">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </motion.div>
              ))}
            </div>
            <span className="font-body text-sm font-medium text-foreground">
              Dołącz do setek zadowolonych rodzin
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
