import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, MessageCircle, Calendar, Send, CheckCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import contactBg from "@/assets/contact-bg.jpg";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().max(1000).optional(),
});

type BookingData = z.infer<typeof bookingSchema>;

const services = [
  "Cinematography",
  "Drone Shoots",
  "Video Editing",
  "Creative Direction",
  "Wedding Film",
  "Brand Shoot",
];

const socialButtons = [
  { icon: Instagram, label: "DM on Instagram", href: "https://instagram.com" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/" },
];

const ContactSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<BookingData>>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: keyof BookingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      console.log("Form submitted:", result.data);
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const inputClass =
    "w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={contactBg}
          alt="Contact background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-6">
            Let's Create Together
          </p>
          <h2 className="font-display text-6xl md:text-8xl text-foreground glow-text mb-4">
            Ready?
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto mb-12">
            Got a story to tell? Let's make it cinematic.
          </p>
        </motion.div>

        {/* Social buttons + Book a Shoot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          {socialButtons.map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-button glass-card px-8 py-4 rounded-full flex items-center gap-3 font-body text-sm tracking-wider uppercase text-foreground hover:text-primary-foreground transition-colors duration-300 min-w-[220px] justify-center"
            >
              <btn.icon size={18} />
              {btn.label}
            </a>
          ))}
          <button
            onClick={() => setShowForm(!showForm)}
            className="glow-button glass-card px-8 py-4 rounded-full flex items-center gap-3 font-body text-sm tracking-wider uppercase text-foreground hover:text-primary-foreground transition-colors duration-300 min-w-[220px] justify-center"
          >
            <Calendar size={18} />
            Book a Shoot
          </button>
        </motion.div>

        {/* Booking Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="glass-card rounded-2xl p-10 text-center"
                >
                  <CheckCircle className="text-primary mx-auto mb-4" size={48} />
                  <h3 className="font-display text-3xl text-foreground mb-2">
                    Booking Received!
                  </h3>
                  <p className="font-body text-muted-foreground">
                    We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="glass-card rounded-2xl p-8 space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={formData.name || ""}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={inputClass}
                        maxLength={100}
                      />
                      {errors.name && (
                        <p className="text-destructive text-xs font-body mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address *"
                        value={formData.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={inputClass}
                        maxLength={255}
                      />
                      {errors.email && (
                        <p className="text-destructive text-xs font-body mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone (optional)"
                        value={formData.phone || ""}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className={inputClass}
                        maxLength={20}
                      />
                    </div>
                    <div>
                      <select
                        value={formData.service || ""}
                        onChange={(e) =>
                          handleChange("service", e.target.value)
                        }
                        className={inputClass}
                      >
                        <option value="">Select Service *</option>
                        {services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-destructive text-xs font-body mt-1">
                          {errors.service}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <textarea
                      placeholder="Tell me about your project (optional)"
                      value={formData.message || ""}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={4}
                      className={inputClass + " resize-none"}
                      maxLength={1000}
                    />
                  </div>

                  {errors.form && (
                    <p className="text-destructive text-sm font-body text-center">
                      {errors.form}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    {isSubmitting ? "Sending..." : "Submit Booking"}
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="font-display text-2xl gradient-text mb-2">SKB</p>
          <p className="font-body text-xs text-muted-foreground tracking-wider">
            © 2025 SKB Visuals. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
