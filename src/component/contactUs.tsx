"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | {
    success: boolean;
    message: string;
  }>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitStatus({ success: true, message: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitStatus({
        success: false,
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <section className="bg-black text-white min-h-screen flex items-center justify-center py-16 px-4 sm:px-8 relative overflow-hidden">
      <div className="w-full max-w-6xl relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold inline-block border border-[#c12129] px-8 py-3 mb-12 rounded-xl tracking-wide shadow-[0_0_25px_rgba(193,33,41,0.25)]"
        >
          CONTACT US
        </motion.h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-stretch gap-10">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex-1 hidden sm:flex justify-center items-end"
          >
            <Image
              src="/contact.png"
              alt="Contact Illustration"
              width={450}
              height={400}
              className="object-contain"
              unoptimized
            />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(193,33,41,0.15)]"
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 font-sans"
            >
              <input
                type="text"
                name="name"
                placeholder="NAME:"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-300 rounded-xl border border-transparent 
                           focus:border-[#c12129] focus:ring-2 focus:ring-[#c12129] hover:bg-white/30 
                           outline-none transition transform focus:scale-[1.01] focus:shadow-[0_0_15px_rgba(193,33,41,0.25)]"
              />

              <input
                type="email"
                name="email"
                placeholder="EMAIL:"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-300 rounded-xl border border-transparent 
                           focus:border-[#c12129] focus:ring-2 focus:ring-[#c12129] hover:bg-white/30 
                           outline-none transition transform focus:scale-[1.01] focus:shadow-[0_0_15px_rgba(193,33,41,0.25)]"
              />

              <textarea
                name="message"
                placeholder="MESSAGE:"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-300 rounded-xl border border-transparent 
                           focus:border-[#c12129] focus:ring-2 focus:ring-[#c12129] hover:bg-white/30 
                           outline-none resize-none transition transform focus:scale-[1.01] focus:shadow-[0_0_15px_rgba(193,33,41,0.25)]"
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#c12129] to-[#8b1118] text-white font-semibold py-3 px-12 w-fit rounded-xl 
                           hover:opacity-90 focus:ring-2 focus:ring-[#c12129] focus:ring-offset-2 focus:ring-offset-black 
                           transition disabled:opacity-70 shadow-[0_0_15px_rgba(193,33,41,0.3)] hover:shadow-[0_0_25px_rgba(193,33,41,0.5)]"
              >
                {isSubmitting ? "SENDING..." : "SEND"}
              </motion.button>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-2 p-3 text-sm font-medium rounded-xl border border-white/20 ${
                    submitStatus.success
                      ? "bg-green-700 text-white"
                      : "bg-red-700 text-white"
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#c12129]/10 via-transparent to-transparent pointer-events-none" />
    </section>
  );
};

export default ContactSection;
