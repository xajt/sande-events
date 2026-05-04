"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

// ============================================
// TYPES
// ============================================
type BackgroundType = "video" | "image" | "gradient";

interface BackgroundConfig {
  type: BackgroundType;
  // For video
  videoSrc?: string;
  mobileVideoSrc?: string;
  posterSrc?: string;
  // For image
  imageSrc?: string;
  parallax?: boolean;
  // For gradient (fallback)
  gradient?: string;
}

interface BalloonImage {
  src: string;
  alt: string;
  x: number; // percentage position
  y: number; // percentage position
  size: number; // px
  delay: number; // animation delay
}

// ============================================
// VIDEO BACKGROUND COMPONENT
// ============================================
interface VideoBackgroundProps {
  src: string;
  mobileSrc?: string;
  poster: string;
  overlayOpacity?: string;
}

function VideoBackground({ src, mobileSrc, poster, overlayOpacity = "bg-black/30" }: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPlaying(true);
      return;
    }

    const video = document.getElementById("hero-video") as HTMLVideoElement;
    if (video) {
      video.play().then(() => {
        setIsPlaying(true);
        setIsLoaded(true);
      }).catch(() => {
        // Autoplay failed, user may need to interact
        setIsLoaded(true);
      });
    }
  }, [prefersReducedMotion]);

  const videoSrc = mobileSrc && isMobile ? mobileSrc : src;

  return (
    <div className="absolute inset-0 -z-10">
      <video
        id="hero-video"
        autoPlay
        muted
        loop
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        poster={poster}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {/* Overlay for text readability */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayOpacity} from-black/85 via-black/70 to-black/80`} />
    </div>
  );
}

// ============================================
// IMAGE BACKGROUND WITH PARALLAX COMPONENT
// ============================================
interface ImageBackgroundProps {
  src: string;
  overlayOpacity?: string;
  parallax?: boolean;
}

function ImageBackground({ src, overlayOpacity = "bg-black/20", parallax = true }: ImageBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="absolute inset-0 -z-10">
      <motion.div
        className="w-full h-full"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src={src}
          alt="Hero background"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${parallax ? "fixed" : ""}`}
          style={{ objectPosition: "center" }}
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>
      {/* Overlay for text readability */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayOpacity} from-black/85 via-black/70 to-black/80`} />
    </div>
  );
}

// ============================================
// GRADIENT FALLBACK BACKGROUND
// ============================================
interface GradientBackgroundProps {
  gradient?: string;
}

function GradientBackground({ gradient = "from-pink-100 via-purple-50 to-teal-100" }: GradientBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <motion.div
        className={`w-full h-full bg-gradient-to-br ${gradient}`}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ backgroundSize: "200% 200%" }}
      />
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-white/10" />
    </div>
  );
}

// ============================================
// FLOATING BALLOON IMAGE COMPONENT
// ============================================
interface FloatingBalloonProps {
  src: string;
  alt: string;
  x: number;
  y: number;
  size: number;
  delay: number;
}

function FloatingBalloon({ src, alt, x, y, size, delay }: FloatingBalloonProps) {
  const prefersReducedMotion = useReducedMotion();

  const animation = prefersReducedMotion
    ? {
        y: [0, -5, 0],
        rotate: [0, 2, -2, 0],
      }
    : {
        y: [0, -30, 0],
        x: [0, 10, -5, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      };

  const transition = prefersReducedMotion
    ? {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay,
      }
    : {
        duration: 6 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay,
      };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
      }}
      animate={animation}
      transition={transition}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain drop-shadow-lg"
        loading="lazy"
      />
    </motion.div>
  );
}

// ============================================
// GRADIENT TEXT ANIMATION COMPONENT (Simplified)
// ============================================
interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

function AnimatedGradientText({ children, className = "" }: AnimatedGradientTextProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      className={`bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-transparent bg-[length:200%_100%] ${className}`}
      animate={!prefersReducedMotion ? {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
      } : {}}
      transition={!prefersReducedMotion ? {
        duration: 6,
        repeat: Infinity,
        ease: "linear"
      } : {}}
    >
      {children}
    </motion.span>
  );
}

// ============================================
// MAIN HERO COMPONENT
// ============================================
// Configuration - User can modify these values
const HERO_CONFIG: BackgroundConfig = {
  type: "video",

  // For video background:
  videoSrc: "/videos/hero-background.mp4",
  mobileVideoSrc: "/videos/hero-background-mobile.mp4",
  posterSrc: "/images/logo.png",

  // Gradient fallback (always used as backup)
  gradient: "from-pink-100 via-purple-50 to-teal-100",
};

// Balloon images configuration (optional - add when images are ready)
const BALLOON_IMAGES: BalloonImage[] = [
  // Uncomment and modify when you have balloon images:
  // { src: "/images/balloons/balloon-1.png", alt: "Pink balloon", x: 10, y: 20, size: 80, delay: 0 },
  // { src: "/images/balloons/balloon-2.png", alt: "Teal balloon", x: 85, y: 15, size: 100, delay: 0.5 },
  // { src: "/images/balloons/balloon-3.png", alt: "Yellow balloon", x: 15, y: 70, size: 90, delay: 1 },
  // { src: "/images/balloons/balloon-4.png", alt: "Purple balloon", x: 80, y: 65, size: 85, delay: 1.5 },
  // { src: "/images/balloons/balloon-5.png", alt: "Blue balloon", x: 50, y: 80, size: 70, delay: 2 },
];

export default function Hero() {
  const [backgroundType, setBackgroundType] = useState<BackgroundType>(HERO_CONFIG.type);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    // Check if video/image assets exist, fall back to gradient if not
    const checkAssets = async () => {
      if (HERO_CONFIG.type === "video" && HERO_CONFIG.videoSrc) {
        try {
          const response = await fetch(HERO_CONFIG.videoSrc, { method: "HEAD" });
          if (!response.ok) {
            console.warn("Video asset not found, falling back to gradient");
            setBackgroundType("gradient");
          } else {
            setBackgroundLoaded(true);
          }
        } catch {
          setBackgroundType("gradient");
        }
      } else if (HERO_CONFIG.type === "image" && HERO_CONFIG.imageSrc) {
        try {
          const response = await fetch(HERO_CONFIG.imageSrc, { method: "HEAD" });
          if (!response.ok) {
            console.warn("Image asset not found, falling back to gradient");
            setBackgroundType("gradient");
          } else {
            setBackgroundLoaded(true);
          }
        } catch {
          setBackgroundType("gradient");
        }
      }
    };

    checkAssets();
  }, []);

  const renderBackground = () => {
    switch (backgroundType) {
      case "video":
        if (HERO_CONFIG.videoSrc && HERO_CONFIG.posterSrc) {
          return <VideoBackground src={HERO_CONFIG.videoSrc} mobileSrc={HERO_CONFIG.mobileVideoSrc} poster={HERO_CONFIG.posterSrc} />;
        }
        return <GradientBackground gradient={HERO_CONFIG.gradient} />;

      case "image":
        if (HERO_CONFIG.imageSrc) {
          return <ImageBackground src={HERO_CONFIG.imageSrc} parallax={HERO_CONFIG.parallax} />;
        }
        return <GradientBackground gradient={HERO_CONFIG.gradient} />;

      case "gradient":
      default:
        return <GradientBackground gradient={HERO_CONFIG.gradient} />;
    }
  };

  const hasBalloons = BALLOON_IMAGES.length > 0;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      {renderBackground()}

      {/* Optional: Floating Balloon Images */}
      {hasBalloons && (
        <div className="absolute inset-0 pointer-events-none">
          {BALLOON_IMAGES.map((balloon, index) => (
            <FloatingBalloon
              key={index}
              src={balloon.src}
              alt={balloon.alt}
              x={balloon.x}
              y={balloon.y}
              size={balloon.size}
              delay={balloon.delay}
            />
          ))}
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg mb-8"
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-800">Decorazioni con palloncini professionali</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight drop-shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatedGradientText>
              Crea Momenti
            </AnimatedGradientText>
            <br />
            <span className="text-white">Magici</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="font-body text-lg md:text-xl text-white/95 max-w-2xl mx-auto mb-10 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Trasformiamo feste ordinarie in ricordi indimenticabili.
            Decorazioni uniche con palloncini che incanteranno ognuno di voi.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              size="lg"
              className="font-accent text-lg px-8 py-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
            >
              Vedi Le Nostre Decorazioni
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-accent text-lg px-8 py-6 rounded-full border-2 border-teal-400 text-white hover:bg-teal-500/20 transition-all"
              onClick={() => document.getElementById("offerings")?.scrollIntoView({ behavior: "smooth" })}
            >
              Scopri i Pacchetti
            </Button>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-8 h-8 text-white/70" />
      </motion.div>
    </section>
  );
}
