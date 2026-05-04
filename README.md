# Sande Events - Dekoracje Balonowe

Nowoczesna, responsywna strona WWW dla Sande Events - firmy zajmującej się profesjonalnymi dekoracjami balonowymi na przyjęcia dla dzieci (urodziny, baby shower, chrzciny, bierzmowania, imprezy firmowe).

## 🎈 O Projekcie

Sande Events to nowoczesna platforma prezentująca usługi dekoracji balonowych. Strona została zaprojektowana z myślą o rodzicach, którzy szukają wyjątkowych dekoracji na przyjęcia swoich dzieci.

### Kluczowe Funkcje

- **Sekcja Hero** z animowanymi balonami i gradientowym tłem
- **O Nas** - budowanie zaufania z opiniami klientów
- **Motywy** - karty tematyczne (Piraci, Księżniczka, Superbohater, itp.)
- **Pakiety** - 3 poziomy oferty (Baza, Średni, Zaawansowany)
- **Galeria** - portfolio z filtrowaniem i lightbox
- **Kontakt** - formularz z walidacją

## 🛠️ Tech Stack

| Technologia | Wersja | Zastosowanie |
|-------------|--------|--------------|
| **Next.js** | 15+ | Framework SSR/SSG |
| **TypeScript** | 5.0+ | Type safety |
| **Tailwind CSS** | 4+ | Styling |
| **shadcn/ui** | latest | UI Components |
| **Framer Motion** | latest | Animacje |
| **react-intersection-observer** | latest | Scroll animations |

## 🚀 Rozpoczęcie

```bash
# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego
npm run dev

# Budowa produkcyjna
npm run build

# Start produkcyjny
npm start
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## 📁 Struktura Projektu

```
sande-events/
├── app/
│   ├── layout.tsx         # Root layout z fontami
│   ├── page.tsx           # Główna strona (one-page)
│   └── globals.css        # Global styles + custom animations
├── components/
│   ├── sections/
│   │   ├── Hero.tsx       # Sekcja powitalna z animacjami
│   │   ├── About.tsx      # O nas + opinie
│   │   ├── Services.tsx   # Karty tematyczne
│   │   ├── Offerings.tsx  # Pakiety cenowe
│   │   ├── Gallery.tsx    # Portfolio z lightbox
│   │   └── Contact.tsx    # Formularz kontaktowy
│   ├── common/
│   │   ├── Navigation.tsx # Sticky navigation
│   │   └── Footer.tsx     # Footer z social media
│   └── ui/                # shadcn/ui components
├── lib/
│   └── utils.ts           # Utility functions
├── types/
│   └── index.ts           # TypeScript types
└── public/
    └── [assets]           # Obrazy, ikony
```

## 🎨 Typografia

Projekt używa unikalnych fontów Google, unikając typowych "AI" fontów:

- **Fredoka** - Display font, playful i rounded
- **Quicksand** - Body font, readable ale friendly
- **Righteous** - Accent font dla CTAs

## 🎨 Kolorystyka

```css
/* Primary */
--sande-primary: #FF6B9D;    /* Hot Pink */
--sande-secondary: #4ECDC4;  /* Teal */
--sande-accent: #FFE66D;     /* Gold */

/* Theme Colors */
--sande-purple: #A855F7;
--sande-blue: #3B82F6;
--sande-yellow: #FBBF24;
```

## ✨ Animacje

Niestandardowe animacje CSS:

- `.animate-float` - unoszenie się elementów
- `.animate-gradient` - przesuwanie gradientu
- `.animate-sparkle` - efekty iskier
- `.animate-balloon` - machanie balonów

## 📱 Responsywność

Strona jest w pełni responsywna:

- **Mobile**: 375px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large**: 1920px+

## 🔧 Dostępne Skrypty

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

## 📦 Deployment

Najlepszy sposób deploy to **Vercel**:

1. Push kod do GitHub
2. Import project na Vercel
3. Auto-deploy z każdej zmiany na main

Alternatywnie: Netlify, Railway, lub dowolny hosting Node.js.

## 🌤️ Environment Variables

Twórz plik `.env.local`:

```env
# Kontakt (opcjonalnie)
NEXT_PUBLIC_CONTACT_EMAIL=kontakt@sandeevents.pl
NEXT_PUBLIC_CONTACT_PHONE=+48123456789

# Social Media (opcjonalnie)
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/sandeevents
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/sandeevents
```

## 📝 Licencja

Projekt stworzony dla Sande Events. Wszelkie prawa zastrzeżone.

---

**Stworzono z ❤️ dla Sande Events**
