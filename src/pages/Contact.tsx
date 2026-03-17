import { type FormEvent, useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

// Animation Variants for smooth loading
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isMapOpen, setIsMapOpen] = useState(false); // Controls the floating map box

  // Lock body scroll when map modal is open
  useEffect(() => {
    if (isMapOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMapOpen]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus("idle");

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_67r7kfg", // Replace if different
        "template_xwnafxs", // Replace if different
        formRef.current,
        "9bJ_hqjsB63RMeUH0" // Replace if different
      )
      .then(() => {
        setSubmitStatus("success");
        formRef.current?.reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setSubmitStatus("error");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  // Google Maps Exact Location Embed URL for Sharptrax Technologies
  const mapEmbedUrl = "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Sharp%20Trax%20Technologies,%20166,%2011th%20Main%20Rd,%20SIDCO%20Industrial%20Estate,%20Thirumudivakkam,%20Chennai,%20Tamil%20Nadu%20600132&t=&z=16&ie=UTF8&iwloc=B&output=embed";

  return (
    <div className="relative w-full min-h-screen bg-gray-50 flex items-center justify-center py-24 px-4 md:px-8 hero-font selection:bg-red-100 overflow-hidden">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 -z-10 pointer-events-none"></div>

      {/* FLOATING MAP MODAL */}
      <AnimatePresence>
        {isMapOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            {/* Modal Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMapOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            ></motion.div>
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-6xl h-[75vh] md:h-[85vh] bg-white rounded-[30px] shadow-2xl overflow-hidden z-10 flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-5 md:p-6 border-b border-gray-100">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900">Sharptrax Technologies HQ</h3>
                  <p className="text-sm md:text-base text-gray-500 font-medium mt-1">SIDCO Industrial Estate, Thirumudivakkam, Chennai</p>
                </div>
                <button 
                  onClick={() => setIsMapOpen(false)} 
                  className="w-12 h-12 bg-gray-50 hover:bg-red-50 hover:text-red-600 rounded-full flex items-center justify-center transition-colors border border-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              
              {/* Actual Interactive Map */}
              <div className="flex-1 w-full h-full bg-gray-200">
                <iframe 
                  src={mapEmbedUrl}
                  className="w-full h-full border-0" 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN UNIFIED SPLIT CARD */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={cardVariant}
        className="max-w-7xl w-full bg-white rounded-[40px] shadow-2xl shadow-gray-200/60 flex flex-col lg:flex-row overflow-hidden border border-gray-100 z-10"
      >
        
        {/* LEFT SIDE: MAP PREVIEW (Click to open floating box) */}
        <div 
          onClick={() => setIsMapOpen(true)}
          className="w-full lg:w-5/12 relative min-h-[400px] lg:min-h-[700px] bg-gray-100 cursor-pointer group overflow-hidden"
        >
          {/* Static-looking map background (Pointer events none so it doesn't trap scroll) */}
          <iframe
            src={mapEmbedUrl}
            className="absolute inset-0 w-full h-full grayscale opacity-60 pointer-events-none group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[800ms]"
            style={{ border: 0 }}
          ></iframe>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-red-600/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
             <div className="bg-white/95 backdrop-blur px-6 py-3 rounded-full shadow-2xl font-bold text-red-600 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                Click to View Exact Location
             </div>
          </div>

          {/* Floating Address Box */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl border border-white/50 transition-transform duration-500 group-hover:-translate-y-2">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 border border-red-100">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Sharptrax</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              166, 11th Main Rd, SIDCO Industrial Estate,<br/>
              Thirumudivakkam, Chennai,<br/>
              Tamil Nadu 600132
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: SPACIOUS FORM */}
        <div className="w-full lg:w-7/12 p-8 md:p-14 lg:p-20 flex flex-col justify-center bg-white relative">
          
          <div className="relative z-10 mb-10">
            <span className="text-red-600 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
              Contact Engineering
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
              Ready to automate <br className="hidden md:block" /> your workflow?
            </h2>
            <div className="w-16 h-1.5 bg-red-600 rounded-full mt-6"></div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            {/* Name */}
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-2 mb-2 block">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="user_name"
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-red-50 focus:border-red-400 transition-all shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-2 mb-2 block">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="user_email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-red-50 focus:border-red-400 transition-all shadow-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-2 mb-2 block">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="user_phone"
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit number"
                  className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-red-50 focus:border-red-400 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-2 mb-2 block">
                Project Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                name="project_details"
                required
                rows={4}
                placeholder="Tell us about your machinery requirements or technical challenges..."
                className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-red-50 focus:border-red-400 transition-all resize-none shadow-sm"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSending}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm md:text-base transition-all shadow-xl flex justify-center items-center gap-3 ${
                  isSending 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none" 
                    : "bg-gray-900 text-white hover:bg-red-600 hover:shadow-red-200 active:scale-[0.98]"
                }`}
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Processing...
                  </>
                ) : (
                  "Submit Technical Enquiry"
                )}
              </button>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-4 mt-4 overflow-hidden">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <p className="text-green-800 text-sm font-bold">Thank you! Your enquiry has been sent successfully.</p>
                </motion.div>
              )}
              
              {submitStatus === "error" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4 mt-4 overflow-hidden">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </div>
                  <p className="text-red-800 text-sm font-bold">Failed to send enquiry. Please try again later.</p>
                </motion.div>
              )}
            </AnimatePresence>

          </form>
        </div>
      </motion.div>
    </div>
  );
}
