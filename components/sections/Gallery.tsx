"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useRef, useCallback, useEffect } from "react";
import { X, ZoomIn, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Gallery item interface with optional image
interface GalleryItem {
  id: number;
  category: string;
  title: string;
  gradient: string;
  emoji: string;
  description: string;
  image?: string;
}

// Gallery data - real event photos
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: "compleanni",
    title: "Compleanno Ciliegia",
    gradient: "from-red-400 to-pink-500",
    emoji: "🍒",
    description: "Palloncini a forma di ciliegia in rosso, bianco e rosa",
    image: "/images/gallery/disco.jpeg",
  },
  {
    id: 2,
    category: "compleanni",
    title: "Topiaria Elegante",
    gradient: "from-pink-300 to-rose-400",
    emoji: "🌸",
    description: "Scultura di palloncini rosa, salvia e argento con confetti dorati",
    image: "/images/gallery/peacock.jpeg",
  },
  {
    id: 3,
    category: "compleanni",
    title: "Bouquet Floreale",
    gradient: "from-pink-300 to-green-400",
    emoji: "🌷",
    description: "Fiori di palloncini rosa e argento tra il verde del giardino",
    image: "/images/gallery/comunione.jpeg",
  },
  {
    id: 4,
    category: "compleanni",
    title: "Cesto di Fiori",
    gradient: "from-pink-400 to-rose-300",
    emoji: "💐",
    description: "Bouquet di palloncini floreali in cesto azzurro con fiocco rosa",
    image: "/images/gallery/cuore.jpeg",
  },
  {
    id: 5,
    category: "compleanni",
    title: "Fiore in Giardino",
    gradient: "from-pink-300 to-fuchsia-400",
    emoji: "🌺",
    description: "Scultura floreale con orsetto rosa al tramonto nel giardino",
    image: "/images/gallery/flamingo.jpeg",
  },
  {
    id: 6,
    category: "compleanni",
    title: "Compleanno 9 Anni",
    gradient: "from-pink-400 to-purple-500",
    emoji: "🎂",
    description: "Palloncini con stivale rosa e numero 9 per un compleanno speciale",
    image: "/images/gallery/comunione-cuore.jpeg",
  },
  {
    id: 7,
    category: "compleanni",
    title: "Mucca Floreale",
    gradient: "from-pink-300 to-rose-400",
    emoji: "🐄",
    description: "Scultura a tre piani con fiori rosa e palloncini mucca",
    image: "/images/gallery/battesimo.jpeg",
  },
  {
    id: 8,
    category: "compleanni",
    title: "Sogno Ciliegia",
    gradient: "from-red-400 to-rose-500",
    emoji: "🍒",
    description: "Composizione con ciliegia argento e palloncini rossi e bianchi",
    image: "/images/gallery/unicorno.jpeg",
  },
];

const categories = [
  { id: "all", label: "Tutto", emoji: "✨" },
  { id: "compleanni", label: "Compleanni", emoji: "🎂" },
];

// Ripple Button Component
interface RippleButtonProps {
  category: { id: string; label: string; emoji: string };
  isSelected: boolean;
  onClick: () => void;
}

function RippleButton({ category, isSelected, onClick }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const rippleIdRef = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: rippleIdRef.current++,
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
        isSelected
          ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105"
          : "bg-white text-foreground hover:bg-pink-50 border border-gray-200"
      }`}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute pointer-events-none bg-white/30 rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            marginLeft: -10,
            marginTop: -10,
          }}
        ></motion.span>
      ))}
      <span>{category.emoji}</span>
      <span className="font-body">{category.label}</span>
    </button>
  );
}

// Gallery Item Component with Wave Stagger
interface GalleryItemProps {
  item: GalleryItem;
  index: number;
  filterKey: string;
  onClick: () => void;
}

function GalleryItem({ item, index, filterKey, onClick }: GalleryItemProps) {
  // Calculate wave delay based on position (creates diagonal wave effect)
  const row = Math.floor(index / 3);
  const col = index % 3;
  const waveDelay = (row + col) * 0.08;

  const hasImage = "image" in item && item.image;

  return (
    <motion.div
      key={`${filterKey}-${item.id}`}
      layoutId={`gallery-item-${item.id}`}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -30 }}
      transition={{
        duration: 0.5,
        delay: waveDelay,
        layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <div
        className={`relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ${hasImage ? "bg-white" : `bg-gradient-to-br ${item.gradient}`}`}
        onClick={onClick}
      >
        {hasImage ? (
          <>
            {/* Character Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20`} />
          </>
        ) : (
          <>
            {/* Emoji Pattern */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <span className="text-9xl">{item.emoji}</span>
            </div>
          </>
        )}

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
            {categories.find((c) => c.id === item.category)?.label}
          </span>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
          <p className="text-white/80 text-sm">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Swipeable Lightbox Component
interface SwipeableLightboxProps {
  item: GalleryItem;
  currentIndex: number;
  filteredItems: GalleryItem[];
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

function SwipeableLightbox({ item, currentIndex, filteredItems, onClose, onNext, onPrevious }: SwipeableLightboxProps) {
  const x = useMotionValue(0);
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(null);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        setDragDirection("right");
        onPrevious();
      } else {
        setDragDirection("left");
        onNext();
      }
    }
    setTimeout(() => setDragDirection(null), 100);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrevious();
      if (e.key === "Escape") onClose();
    },
    [onNext, onPrevious, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const hasMultiple = filteredItems.length > 1;
  const hasImage = "image" in item && item.image;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        layoutId={`gallery-item-${item.id}`}
        drag={hasMultiple ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Arrows (Desktop) */}
        {hasMultiple && currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4 text-white hover:text-pink-400 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
        )}

        {hasMultiple && currentIndex < filteredItems.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-4 text-white hover:text-pink-400 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Image/Preview */}
        <div
          className={`relative aspect-video rounded-2xl overflow-hidden shadow-2xl ${hasImage ? "bg-white" : `bg-gradient-to-br ${item.gradient}`}`}
        >
          {hasImage ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[12rem] opacity-50">{item.emoji}</span>
            </div>
          )}

          {/* Swipe Hint for Mobile */}
          {hasMultiple && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden flex items-center gap-2 text-white/50 text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Swipe</span>
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          )}

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
            <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white mb-3">
              {categories.find((c) => c.id === item.category)?.label}
            </span>
            <h3 className="font-display text-3xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-white/80">{item.description}</p>

            {/* Counter */}
            {hasMultiple && (
              <div className="mt-4 text-white/60 text-sm">
                {currentIndex + 1} z {filteredItems.length}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [filterKey, setFilterKey] = useState("all-0");

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const selectedImage = selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFilterKey(`${categoryId}-${Date.now()}`);
    setSelectedImageIndex(null);
  };

  const handleImageClick = (item: typeof galleryItems[0]) => {
    const index = filteredItems.findIndex((i) => i.id === item.id);
    setSelectedImageIndex(index);
  };

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! + 1) % filteredItems.length);
  };

  const handlePrevious = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  return (
    <section id="gallery" ref={ref} className="py-20 bg-gradient-to-b from-white to-pink-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block font-accent text-pink-500 text-sm tracking-widest uppercase mb-4">
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            I Nostri <span className="text-pink-500">Lavori</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Scopri come creiamo momenti magici. Ogni decorazione è unica e adatta alle esigenze dei nostri clienti.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <RippleButton
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => handleCategoryChange(category.id)}
            />
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <GalleryItem
                key={item.id}
                item={item}
                index={index}
                filterKey={filterKey}
                onClick={() => handleImageClick(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <p className="font-body text-muted-foreground">
              Nessun lavoro in questa categoria. Guarda altri nostri lavori!
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="font-body text-muted-foreground mb-6">Vuoi vedere più dei nostri lavori?</p>
          <Button
            size="lg"
            className="font-accent bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full px-8"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contattaci
          </Button>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && selectedImageIndex !== null && (
          <SwipeableLightbox
            item={selectedImage}
            currentIndex={selectedImageIndex}
            filteredItems={filteredItems}
            onClose={handleCloseLightbox}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
