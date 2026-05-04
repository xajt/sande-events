"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Award, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Heart,
      title: "Passione per i Dettagli",
      description: "Ogni decorazione è creata con la massima cura, prestiamo attenzione a ogni dettaglio, anche il più piccolo.",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
    {
      icon: Award,
      title: "Esperienza e Fiducia",
      description: "Anni di lavoro e centinaia di famiglie soddisfate testimoniano il nostro servizio professionale.",
      color: "text-teal-500",
      bgColor: "bg-teal-50",
    },
    {
      icon: Users,
      title: "Approccio Personale",
      description: "Ascoltiamo le tue esigenze e sogni per creare una decorazione perfetta per il tuo bambino.",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Sparkles,
      title: "Magia nei Dettagli",
      description: "Aggiungiamo accenti unici che rendono ogni festa magica.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <section id="about" ref={ref} className="py-20 bg-gradient-to-b from-white to-pink-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-accent text-pink-500 text-sm tracking-widest uppercase mb-4">
            Chi Siamo
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Perché <span className="text-pink-500">Sande Events</span>?
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Ogni evento che realizziamo nasce dalla passione, cresce con la dedizione e prende forma attraverso la creatività.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full border-none shadow-lg hover:shadow-xl transition-shadow ${feature.bgColor}`}>
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-4 rounded-full ${feature.bgColor} mb-4`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
