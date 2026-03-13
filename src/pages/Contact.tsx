import { type FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_67r7kfg",
        "template_xwnafxs",
        formRef.current,
        "9bJ_hqjsB63RMeUH0",
      )
      .then(() => {
        alert("Enquiry sent successfully!");
        formRef.current?.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send enquiry. Please try again.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="w-full min-h-screen bg-[#2b3035] hero-font py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mt-10">
            Let's Build Something Together
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl">
            Have a project in mind? Reach out to our team at Sharptrax
            Technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          {/* LEFT COLUMN: LOCATION & MAP */}
          <section className="flex flex-col">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 h-full flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Our Office
                </h3>
                <p className="text-gray-400">
                  Visit us at Sharptrax Technologies HQ. We’re always open for a
                  professional consultation.
                </p>
              </div>

              {/* MAP IFRAME */}
              <div className="grow overflow-hidden rounded-2xl border border-white/10 grayscale-[0.2] hover:grayscale-0 transition-all duration-500">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.384666526131!2d77.6214534!3d12.9472305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzUwLjAiTiA3N8KwMzcnMTcuMiJF!5e0!3m2!1sen!2sin!4v1647254552000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className="min-h-100"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <section>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/10"
            >
              <h3 className="text-2xl font-semibold text-white mb-6">
                Send an Enquiry
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  name="user_name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  name="user_email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  name="user_phone"
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="1234567890"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Project Details
                </label>
                <textarea
                  name="project_details"
                  required
                  rows={4}
                  placeholder="Tell us about your requirements..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-[0.98] disabled:bg-gray-600 disabled:cursor-not-allowed shadow-lg shadow-white/5"
                >
                  {isSending ? "SUBMITTING..." : "SEND ENQUIRY"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
