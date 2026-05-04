"use client";

import { Sparkles, Heart, Mail, Phone, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-pink-500 via-purple-500 to-teal-500 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold">
                Sande Events
              </span>
            </div>
            <p className="font-body text-white/80 text-sm leading-relaxed">
              Creiamo decorazioni con palloncini magiche che rendono ogni festa indimenticabile.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold mb-4">Contatti</h3>
            <div className="space-y-3">
              <a
                href="tel:+393469758003"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-body text-sm">+39 3469758003 / +39 346 005 5062</span>
              </a>
              <a
                href="mailto:sandeevents8@gmail.com"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="font-body text-sm">sandeevents8@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display font-semibold mb-4">Seguici</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-white/80">
            © {currentYear} Sande Events. Tutti i diritti riservati.
          </p>
          <p className="font-body text-sm text-white/80 flex items-center gap-1">
            Creato con <Heart className="w-4 h-4 fill-red-400 text-red-400" /> per piccoli eroi
          </p>
        </div>
      </div>
    </footer>
  );
}
