# Hero Background Assets - Setup Guide

## Overview

The Hero section now supports AI-generated video and image backgrounds. The synthetic CSS elements (confetti, speed lines, blobs, sparkles) have been removed in favor of authentic, professional-looking assets.

## Current State

The Hero is currently set to use a **gradient fallback** (default). To use video or image backgrounds, follow the instructions below.

---

## Option A: Video Background (Recommended)

### Asset Specifications

| Property | Value |
|----------|-------|
| **Duration** | 10-15 seconds (seamless loop) |
| **Resolution** | 1920x1080 minimum (4K preferred) |
| **Format** | MP4 (H.264 codec) or WebM |
| **File Size** | Under 10MB recommended |

### Content Guidelines

- Balloons floating, confetti falling, party atmosphere
- Color Palette: Pink (#FF6B9D), Teal (#4ECDC4), Yellow (#FFE66D), Purple
- Keep it subtle - not too distracting from text
- Avoid busy patterns that make text hard to read

### AI Generation Prompt Example

```
Professional balloon decoration party scene, colorful balloons floating gently, confetti falling softly, bright and celebratory atmosphere, seamless loop, 4K quality, branded colors hot pink teal yellow purple, subtle motion, cinematic lighting, professional product photography style
```

### Setup Steps

1. **Generate your video** using the specifications above
2. **Save** as `hero-background.mp4` in `public/videos/`
3. **Generate a poster image** (fallback thumbnail) as `hero-background.jpg` in `public/images/`
4. **Update Hero.tsx** configuration:

```tsx
const HERO_CONFIG: BackgroundConfig = {
  type: "video", // Changed from "gradient"
  videoSrc: "/videos/hero-background.mp4",
  posterSrc: "/images/hero-background.jpg",
  gradient: "from-pink-100 via-purple-50 to-teal-100", // Fallback
};
```

---

## Option B: Static Image with Parallax

### Asset Specifications

| Property | Value |
|----------|-------|
| **Resolution** | 1920x1080+ |
| **Format** | WebP (preferred), JPG, or PNG |
| **File Size** | Under 2MB recommended |

### Content Guidelines

- High-quality balloon arrangement or party scene
- Good lighting and color representation
- Space for text overlay (center area should be relatively clear)

### Setup Steps

1. **Generate your image** using the specifications above
2. **Save** as `hero-background.jpg` (or .webp) in `public/images/`
3. **Update Hero.tsx** configuration:

```tsx
const HERO_CONFIG: BackgroundConfig = {
  type: "image", // Changed from "gradient"
  imageSrc: "/images/hero-background.jpg",
  parallax: true, // Enable parallax effect on scroll
  gradient: "from-pink-100 via-purple-50 to-teal-100", // Fallback
};
```

---

## Option C: Hybrid - Video + Balloon Images

### Setup Steps

1. **Follow Option A** for the background video
2. **Generate 5-7 individual balloon images** (transparent PNG preferred)
3. **Save** in `public/images/balloons/`:
   - `balloon-1.png`
   - `balloon-2.png`
   - ...
   - `balloon-7.png`

### Balloon Image Specifications

| Property | Value |
|----------|-------|
| **Resolution** | 400-600px each |
| **Format** | PNG with transparency (preferred) |
| **Style** | Realistic or semi-realistic balloons |
| **Colors** | Brand colors (pink, teal, yellow, purple) |

4. **Update Hero.tsx** balloon configuration:

```tsx
const BALLOON_IMAGES: BalloonImage[] = [
  { src: "/images/balloons/balloon-1.png", alt: "Pink balloon", x: 10, y: 20, size: 80, delay: 0 },
  { src: "/images/balloons/balloon-2.png", alt: "Teal balloon", x: 85, y: 15, size: 100, delay: 0.5 },
  { src: "/images/balloons/balloon-3.png", alt: "Yellow balloon", x: 15, y: 70, size: 90, delay: 1 },
  { src: "/images/balloons/balloon-4.png", alt: "Purple balloon", x: 80, y: 65, size: 85, delay: 1.5 },
  { src: "/images/balloons/balloon-5.png", alt: "Blue balloon", x: 50, y: 80, size: 70, delay: 2 },
];
```

### Positioning Guide

| Property | Description | Range |
|----------|-------------|-------|
| `x` | Horizontal position (%) | 0-100 |
| `y` | Vertical position (%) | 0-100 |
| `size` | Display size (px) | 60-120 |
| `delay` | Animation delay (sec) | 0-3 |

---

## File Structure

```
public/
├── videos/
│   └── hero-background.mp4      # Video background (Option A/C)
├── images/
│   ├── hero-background.jpg      # Poster/image background (Option A/B)
│   └── balloons/
│       ├── balloon-1.png        # Floating balloon images (Option C)
│       ├── balloon-2.png
│       ├── balloon-3.png
│       ├── balloon-4.png
│       ├── balloon-5.png
│       ├── balloon-6.png
│       └── balloon-7.png
```

---

## Verification Checklist

After implementation, verify:

- [ ] Video/image background loads correctly
- [ ] Text remains readable with overlay
- [ ] Video loops seamlessly (no gaps)
- [ ] Fallback gradient works if video fails
- [ ] Performance: smooth scrolling, no lag
- [ ] Mobile: video doesn't consume excessive data
- [ ] Reduced motion preference respected (static fallback)

---

## Troubleshooting

### Video not playing
- Check browser console for errors
- Verify video file is in correct directory
- Ensure video format is MP4 (H.264)
- Some browsers block autoplay; check browser settings

### Text not readable
- Increase overlay opacity (edit `overlayOpacity` prop)
- Check if background image has too much contrast

### Poor performance on mobile
- Consider using a lighter video file
- Use image background instead of video for mobile
- Enable data saver mode detection (future enhancement)

---

## Recommended AI Tools

| Tool | Best For |
|------|----------|
| **Runway ML** | Video generation, style transfer |
| **Pika Labs** | AI video from text prompts |
| **Midjourney** | High-quality image generation |
| **DALL-E 3** | Text-to-image, precise control |
| **Stable Diffusion** | Open-source, local generation |

---

## Quick Test (Phase 1)

Before generating custom assets, you can test with a stock/free video:

1. Download a free party/balloon video from:
   - Pexels: https://www.pexels.com/search/videos/balloons/
   - Pixabay: https://pixabay.com/videos/search/balloons/
   - Coverr: https://coverr.co/videos/birthday

2. Save as `hero-background.mp4` in `public/videos/`

3. Update `HERO_CONFIG.type` to `"video"`

4. Test the implementation, then replace with your custom AI-generated assets

---

## Support

For issues or questions, refer to:
- Project: `sande-events/components/sections/Hero.tsx`
- Documentation: `CLAUDE.md`
- Tailwind config: `tailwind.config.ts`
