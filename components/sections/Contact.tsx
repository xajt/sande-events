/**
 * FORM VALIDATION DEPENDENCIES REQUIRED
 * =====================================
 * Install these packages before using this file:
 *
 * npm install zod react-hook-form @hookform/resolvers
 *
 * Or with pnpm:
 * pnpm add zod react-hook-form @hookform/resolvers
 */

"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, Sparkles, Instagram, Facebook, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useState, FormEvent } from "react";
// Uncomment after installing dependencies:
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { contactFormSchema, type ContactFormData } from "@/lib/validation";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Traditional form state (fallback when dependencies are not installed)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "",
    date: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form validation state
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [shake, setShake] = useState(false);

  /**
   * Validation function (when dependencies are installed, use react-hook-form instead)
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};

    // Name validation
    if (formData.name.length < 3) {
      newErrors.name = "Il nome deve avere almeno 3 caratteri";
    } else if (formData.name.length > 50) {
      newErrors.name = "Il nome può avere massimo 50 caratteri";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "L'email è richiesta";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Indirizzo email non valido";
    }

    // Phone validation (optional)
    if (formData.phone && !/^\+?[\d\s-]{9,15}$/.test(formData.phone)) {
      newErrors.phone = "Numero di telefono non valido";
    }

    // Occasion validation
    if (!formData.occasion) {
      newErrors.occasion = "Scegli il tipo di festa";
    }

    // Message validation
    if (formData.message.length < 10) {
      newErrors.message = "Il messaggio deve avere almeno 10 caratteri";
    } else if (formData.message.length > 500) {
      newErrors.message = "Massimo 500 caratteri";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setErrors({});

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        occasion: "",
        date: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof typeof newErrors];
        return newErrors;
      });
    }
  };

  /**
   * REACT-HOOK-FORM IMPLEMENTATION (ready to use after installing dependencies)
   * ============================================================================
   * Replace the useState-based form management with this code:
   *
   * ```tsx
   * const {
   *   register,
   *   handleSubmit: handleRhfSubmit,
   *   formState: { errors, isSubmitting },
   *   setError,
   * } = useForm<ContactFormData>({
   *   resolver: zodResolver(contactFormSchema),
   *   mode: "onBlur", // Validate on field blur
   * });
   *
   * const [submitted, setSubmitted] = useState(false);
   * const [shake, setShake] = useState(false);
   *
   * const onSubmit = async (data: ContactFormData) => {
   *   try {
   *     // Simulate API call
   *     await new Promise((resolve) => setTimeout(resolve, 1500));
   *
   *     setSubmitted(true);
   *
   *     // Reset form after 3 seconds
   *     setTimeout(() => {
   *       setSubmitted(false);
   *       // reset() - call react-hook-form's reset
   *     }, 3000);
   *   } catch (error) {
   *     setError("root", {
   *       type: "manual",
   *       message: "Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.",
   *     });
   *   }
   * };
   *
   * // In the form, replace onSubmit={handleSubmit} with:
   * // onSubmit={handleRhfSubmit(onSubmit)}
   *
   * // Replace all value/onChange props with:
   * // {...register("name")}
   * ```
   */

  const contactInfo = [
    {
      icon: Phone,
      label: "Telefono",
      value: "+39 3469758003 / +39 346 005 5062",
      href: "tel:+393469758003",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Mail,
      label: "Email",
      value: "sandeevents8@gmail.com",
      href: "mailto:sandeevents8@gmail.com",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: MapPin,
      label: "Posizione",
      value: "Varese, Como, Canton Ticino",
      href: "#",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  const occasions = [
    "Compleanno",
    "Baby Shower",
    "Battesimo",
    "Cresima",
    "Evento Aziendale",
    "Altro",
  ];

  /**
   * Error message component
   */
  const ErrorMessage = ({ message }: { message: string }) => (
    <motion.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-red-500 text-xs mt-1 flex items-center gap-1"
    >
      <AlertCircle className="w-3 h-3" />
      {message}
    </motion.p>
  );

  return (
    <section id="contact" ref={ref} className="py-20 bg-gradient-to-b from-pink-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-accent text-teal-500 text-sm tracking-widest uppercase mb-4">
            Contatti
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Creiamo <span className="text-pink-500">Insieme</span> la Magia
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Hai domande? Vuoi conoscere il preventivo? Contattaci e risponderemo il prima possibile!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                className="block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-body text-sm text-muted-foreground">
                          {info.label}
                        </div>
                        <div className="font-display font-semibold text-foreground">
                          {info.value}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.a>
            ))}

            {/* Social Media */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    Seguici sui social
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Guarda altri nostri lavori
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <motion.a
                    href="https://www.instagram.com/sande.events"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-none shadow-xl">
              <CardContent className="p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      Grazie!
                    </h3>
                    <p className="font-body text-muted-foreground">
                      Il tuo messaggio è stato inviato. Risponderemo il prima possibile!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    animate={shake ? {
                      x: [0, -10, 10, -10, 10, 0],
                    } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-body text-sm font-medium text-foreground mb-2"
                        >
                          Nome e Cognome *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Mario Rossi"
                          value={formData.name}
                          onChange={handleChange}
                          className={`rounded-full border-gray-200 focus:border-pink-500 focus:ring-pink-500 ${
                            errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                          }`}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && <ErrorMessage message={errors.name} />}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block font-body text-sm font-medium text-foreground mb-2"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="jan@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={`rounded-full border-gray-200 focus:border-pink-500 focus:ring-pink-500 ${
                            errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                          }`}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && <ErrorMessage message={errors.email} />}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block font-body text-sm font-medium text-foreground mb-2"
                        >
                          Telefon
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+39 123 456 7890"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`rounded-full border-gray-200 focus:border-pink-500 focus:ring-pink-500 ${
                            errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                          }`}
                          aria-invalid={!!errors.phone}
                        />
                        {errors.phone && <ErrorMessage message={errors.phone} />}
                      </div>

                      {/* Occasion */}
                      <div>
                        <label
                          htmlFor="occasion"
                          className="block font-body text-sm font-medium text-foreground mb-2"
                        >
                          Tipo di festa *
                        </label>
                        <select
                          id="occasion"
                          name="occasion"
                          value={formData.occasion}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 rounded-full border focus:ring-pink-500 bg-white font-body text-sm ${
                            errors.occasion
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-200 focus:border-pink-500"
                          }`}
                          aria-invalid={!!errors.occasion}
                        >
                          <option value="">Seleziona...</option>
                          {occasions.map((occasion) => (
                            <option key={occasion} value={occasion}>
                              {occasion}
                            </option>
                          ))}
                        </select>
                        {errors.occasion && <ErrorMessage message={errors.occasion} />}
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <label
                        htmlFor="date"
                        className="block font-body text-sm font-medium text-foreground mb-2"
                      >
                        Data prevista per la festa
                      </label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="rounded-full border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block font-body text-sm font-medium text-foreground mb-2"
                      >
                        Messaggio *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Raccontaci dei tuoi piani, preferenze, sogni..."
                        value={formData.message}
                        onChange={handleChange}
                        className={`rounded-2xl resize-none ${
                          errors.message
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                        }`}
                        aria-invalid={!!errors.message}
                      />
                      <div className="flex justify-between items-center mt-1">
                        {errors.message && <ErrorMessage message={errors.message} />}
                        {!errors.message && (
                          <span className="text-xs text-muted-foreground ml-auto">
                            {formData.message.length}/500
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full font-accent text-lg py-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            <Sparkles className="w-5 h-5" />
                          </motion.div>
                          Invio...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Invia Messaggio
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Inviando questo modulo, accetti di essere contattato per la tua richiesta.
                      I tuoi dati sono al sicuro e non saranno condivisi con terzi.
                    </p>
                  </motion.form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
