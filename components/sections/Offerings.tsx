"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { useState } from "react";
import Card3D from "@/components/ui/Card3D";

export default function Offerings() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const tiers = [
    {
      name: "Base",
      tagline: "Eleganza semplice",
      price: "A partire da 100€",
      description: "Decorazione essenziale per eventi intimi",
      color: "from-teal-400 to-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      icon: "✨",
      features: [
        "Arco semplice o organico",
        "Mezzaluna",
        "Backdrop semplice",
        "2/3 colori coordinati",
        "Numero maxi",
      ],
      excluded: [],
      ideal: "Ideale per: Battesimo, compleanni intimi",
    },
    {
      name: "Medio",
      tagline: "Scelta più popolare",
      price: "A partire da 500€",
      description: "Decorazione completa con elementi tematici",
      color: "from-pink-500 to-purple-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      icon: "🎈",
      popular: true,
      features: [
        "Backdrop con arco organico strutturato",
        "3/4 colori coordinati con palloncini speciali",
        "Nome personalizzato + numero maxi",
        "Mini decorazioni a tema",
        "Cilindri",
      ],
      excluded: [],
      ideal: "Ideale per: Compleanno, baby shower, cresima",
    },
    {
      name: "Avanzato",
      tagline: "Magia completa",
      price: "A partire da 1000€",
      description: "Scenografia premium su misura",
      color: "from-purple-600 to-indigo-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      icon: "👑",
      features: [
        "Scenografia balloon su misura con backdrop multipli",
        "Palette premium con finiture speciali",
        "Personalizzazione completa con nome e frase",
        "Tavolo torta coordinato",
        "4/5 colori studiati",
        "Inserti decorativi (fiori, pampas, tessuti, foglie, luci)",
        "Cilindri",
      ],
      excluded: [],
      ideal: "Ideale per: Grandi compleanni, eventi aziendali, occasioni speciali",
    },
  ];

  return (
    <section id="offerings" ref={ref} className="py-20 bg-gradient-to-b from-teal-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-accent text-purple-500 text-sm tracking-widest uppercase mb-4">
            Pacchetti
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Scegli il <span className="text-pink-500">Tuo Pacchetto</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
    Ogni pacchetto è adatto alle dimensioni della festa e al budget. Contattaci per conoscere i dettagli!
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative h-full"
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full shadow-lg text-sm">
                    <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                    <span className="font-accent font-medium">Più Popolare</span>
                  </div>
                </div>
              )}

              <Card3D
                intensity={tier.popular ? 12 : 8}
                glowColor={tier.popular ? "rgba(255, 107, 157, 0.6)" : "rgba(78, 205, 196, 0.4)"}
                shimmer={true}
                className="h-full"
              >
                <Card
                  className={`h-full border-2 transition-all duration-300 flex flex-col ${
                    tier.popular
                      ? "border-pink-300 shadow-2xl"
                      : `${tier.borderColor} shadow-lg`
                  }`}
                >
                  {/* Color Header */}
                  <div className={`h-2 bg-gradient-to-r ${tier.color}`} />

                  <CardContent className="p-5 flex flex-col h-full">
                    {/* Header */}
                    <div className="text-center mb-4">
                      {/* Icon */}
                      <motion.div
                        className="text-4xl mb-2"
                        animate={
                          hoveredIndex === index
                            ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        {tier.icon}
                      </motion.div>

                      {/* Tier Name */}
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {tier.name}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs text-muted-foreground">
                        {tier.tagline}
                      </p>

                      {/* Price */}
                      <div className="mt-3">
                        <span
                          className={`font-display text-xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}
                        >
                          {tier.price}
                        </span>
                      </div>
                    </div>

                    {/* Features List - grows to fill space */}
                    <div className="flex-grow">
                      <ul className="space-y-2">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer - always at bottom */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      {/* Ideal For */}
                      <p className="text-xs text-muted-foreground text-center mb-3 italic">
                        {tier.ideal}
                      </p>

                      {/* CTA Button */}
                      <button
                        className={`w-full py-2.5 px-4 rounded-full font-accent text-sm font-medium transition-all ${
                          tier.popular
                            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg"
                            : `bg-gradient-to-r ${tier.color} text-white hover:shadow-lg`
                        }`}
                        onClick={() =>
                          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                        }
                      >
                        Richiedi Preventivo
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* Simple text CTA - no card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-sm">
            Hai domande o vuoi personalizzare qualcosa? Scrivici — ogni pacchetto può essere modificato.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
