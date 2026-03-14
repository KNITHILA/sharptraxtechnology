import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const solutions = [
  {
    title: "Robotic Automation",
    desc: "At Sharptrax Technologies, we design and integrate robotic welding systems that deliver consistent weld quality, improved productivity, and reduced manual dependency.",
    img: "/screen5/5ma1.svg",
  },
  {
    title: "Welding Positioners",
    desc: "Custom-built welding positioners designed to improve accessibility, accuracy, and productivity in complex welding applications.",
    img: "/screen5/5ma2.svg",
  },
  {
    title: "Plasma Transferred Arc Welding",
    desc: "Our PTA welding systems provide precise hardfacing and cladding solutions with superior material control and repeatability.",
    img: "/screen5/5ma3.svg",
  },
  {
    title: "CNC Cutting Systems",
    desc: "Automated CNC cutting solutions delivering accuracy, efficiency, and clean cuts for industrial fabrication requirements.",
    img: "/screen5/5ma4.svg",
  },
  {
    title: "Welding Rotators",
    desc: "Engineered for safe and efficient rotation of cylindrical components, ensuring uniform weld quality and operator safety.",
    img: "/screen5/5ma5.svg",
  },
  {
    title: "Special Purpose Machines (SPMs)",
    desc: "Tailor-made automation and welding SPMs designed to meet unique production and process requirements.",
    img: "/screen5/5ma6.svg",
  },
];

const logos = [
  "/companylogo/logo (1).svg",
  "/companylogo/logo (2).svg",
  "/companylogo/logo (3).svg",
  "/companylogo/logo (4).svg",
  "/companylogo/logo (5).svg",
  "/companylogo/logo (6).png",
  "/companylogo/logo (7).svg",
  "/companylogo/logo (8).svg",
  "/companylogo/logo (9).svg",
  "/companylogo/logo (10).svg",
  "/companylogo/logo (11).svg",
  "/companylogo/logo (12).svg",
  "/companylogo/logo (13).svg",
  "/companylogo/logo (14).svg",
  "/companylogo/logo (15).svg",
  "/companylogo/logo (16).svg",
  "/companylogo/logo (17).svg",
  "/companylogo/logo (18).svg",
];

const faqs = [
  {
    question: "What Industries Do You Serve With Your Automation Solutions?",
    answer:
      "We provide automation solutions for industries including automotive, heavy manufacturing, fabrication, energy, and industrial production.",
  },
  {
    question: "Do You Offer Customized Welding Automation Solutions?",
    answer:
      "Yes. We specialize in designing fully customized welding automation systems tailored to your production needs.",
  },
  {
    question: "Can You Integrate Automation With Existing Industrial Systems?",
    answer:
      "Our automation solutions are built to integrate seamlessly with existing machines and production lines.",
  },
  {
    question: "How Can I Request A Consultation Or Quote?",
    answer:
      "You can submit a quote request through our website form or contact our engineering team directly.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "GANESAN",
    role: "Regional Markets Executive",
    text: "Their robotic welding solutions helped us reduce manual errors and increase output. Sharptrax is our go-to partner for all automation needs!",
    imgSrc: "/ceoimg.png", 
    initial: "G",
    bgColor: "bg-blue-600",
  },
  {
    id: 2,
    name: "Ram Kumar",
    role: "Client",
    text: "Sharptrax Technologies provided us with a seamless welding automation system that significantly improved our production efficiency. Their expertise and customer support are exceptional!",
    imgSrc: "", // Leave blank to show the initial "R"
    initial: "R",
    bgColor: "bg-slate-400",
  },
  {
    id: 3,
    name: "Elstin S",
    role: "Client",
    text: "We integrated their solutions into our plant, and the results were outstanding! The precision and reliability of their systems are truly commendable.",
    imgSrc: "", 
    initial: "E",
    bgColor: "bg-gray-600",
  },
  {
    id: 4,
    name: "Helana",
    role: "Client",
    text: "We have been working with Sharptrax for years, and their dedication to quality and innovation is unmatched. Highly recommend their services!",
    imgSrc: "", // Leave blank to show the initial "H"
    initial: "H",
    bgColor: "bg-blue-500",
  },
  {
    id: 5,
    name: "Peter Amala Anand",
    role: "Client",
    text: "The team at Sharptrax Technologies understands automation like no other. Their custom-built systems were a game-changer for our manufacturing unit.",
    imgSrc: "", 
    initial: "P",
    bgColor: "bg-gray-700",
  },
];

const row1 = logos.slice(0, 9);
const row2 = logos.slice(9, 18);

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerCity: "",
    customerPhone: "",
    projectMessage: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    customerName?: string;
    customerEmail?: string;
    customerCity?: string;
    customerPhone?: string;
    projectMessage?: string;
  }>({});
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);

  // Testimonial State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleQuoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateQuoteForm();
    setValidationErrors(errors);

    // If no errors, proceed to send email
    if (Object.keys(errors).length === 0) {
      setIsSending(true);

      if (form.current) {
        emailjs
          .sendForm(
            "service_67r7kfg", // Your Service ID
            "template_xwnafxs", // Your Template ID
            form.current,
            "9bJ_hqjsB63RMeUH0" // Your Public Key
          )
          .then(() => {
            alert("Enquiry sent! We will get back to you soon.");
            form.current?.reset();
            // Clear state
            setQuoteFormData({
              customerName: "",
              customerEmail: "",
              customerCity: "",
              customerPhone: "",
              projectMessage: "",
            });
          })
          .catch((error) => {
            alert("Oops! Something went wrong.");
            console.error("Error:", error.text);
          })
          .finally(() => {
            setIsSending(false);
          });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuoteInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuoteFormData({
      ...quoteFormData,
      [e.target.name]: e.target.value,
    });
  };

  const validateQuoteForm = () => {
    let errors: {
      customerName?: string;
      customerEmail?: string;
      customerCity?: string;
      customerPhone?: string;
      projectMessage?: string;
    } = {};

    if (!quoteFormData.customerName.trim())
      errors.customerName = "Name is required";

    if (!quoteFormData.customerEmail.trim()) {
      errors.customerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(quoteFormData.customerEmail)) {
      errors.customerEmail = "Invalid email";
    }

    if (!quoteFormData.customerCity.trim())
      errors.customerCity = "City is required";

    if (!quoteFormData.customerPhone.trim()) {
      errors.customerPhone = "Phone number required";
    } else if (!/^\d{10}$/.test(quoteFormData.customerPhone)) {
      errors.customerPhone = "Number must be 10 digits";
    }

    if (!quoteFormData.projectMessage.trim())
      errors.projectMessage = "Message is required";

    return errors;
  };

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Testimonial Handlers
  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const activeTestimonial = testimonials[currentTestimonial];

  return (
    <div className="w-full min-h-screen hero-font">
      {/* NAVBAR */}

      {/* HERO SECTION */}
      <section className="relative h-screen overflow-hidden">
        {/* VIDEO BACKGROUND */}
        <video
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover"
          style={{
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        >
          <source src="/welding.mp4" type="video/mp4" />
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 /40"></div>

        {/* HERO TEXT */}
        <div className="relative z-10 mt-12 h-full flex items-center">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-7xl px-6 md:px-16 text-white"
          >
            <h1 className="text-5xl md:text-8xl font-bold leading-[1.1] md:leading-[0.9] hero-font">
              BEYOND JUST <br />
              <span className="md:ml-1">WELDING</span>
            </h1>

            <p className="mt-4 md:ml-4 text-xs md:text-sm tracking-widest text-gray-200 hero-font uppercase">
              YOUR ONE-STOP PARTNER FOR WELDING & CUTTING
              <br className="hidden md:block" />
              AUTOMATION SOLUTIONS
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 md:ml-10">
              <button
                onClick={() => setOpenForm(true)}
                className="bg-white text-black px-6 py-3 shadow-2xl rounded-lg font-semibold"
              >
                Enquire Now
              </button>

              {/* EXPLORE SOLUTIONS BUTTON */}
              <a 
                href="/services" 
                className="bg-black text-white shadow-2xl px-6 py-3 rounded-lg border border-white/10 flex items-center justify-center hover:bg-gray-900 transition-colors"
              >
                Explore Solutions
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {openForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setOpenForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Request an Enquiry
            </h2>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setOpenForm(false);
              }}
            >
              {/* Name */}
              <div>
                <label className="text-sm text-gray-600">Full Name *</label>
                <input
                  type="text"
                  required
                  minLength={3}
                  pattern=".*\S.*"
                  title="Please enter at least 3 characters"
                  className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:border-black"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-600">Email Address *</label>
                <input
                  type="email"
                  required
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  title="Please enter a valid email"
                  className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:border-black"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-600">Phone Number *</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  title="Enter a valid 10-digit phone number"
                  className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:border-black"
                />
              </div>

              {/* Requirement */}
              <div>
                <label className="text-sm text-gray-600">
                  Requirement Details *
                </label>
                <textarea
                  required
                  minLength={10}
                  title="Please enter at least 10 characters"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:border-black"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpenForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Engineering section */}
      <section className="relative w-full py-20 md:py-32 bg-gray-100 overflow-hidden">
        {/* BACKGROUND GRID */}
        <div
          className="absolute inset-0 opacity-60 md:-mt-30"
          style={{
            height: "100%",
            width: "100%",
            backgroundImage: "url('/2nd-bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 px-6 md:px-10 items-center">
          {/* LEFT SIDE IMAGE */}
          <div className="relative">
            <img
              src="/2nd-img1.svg"
              className="rounded-3xl w-full object-cover md:-mt-60"
              alt="Engineering Excellence"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1]">
              Engineering <br />
              Excellence Since <br />
              2005
            </h2>

            <p className="mt-6 text-gray-600 max-w-xl text-sm md:text-base">
              Since its establishment in 2005, Sharptrax Technologies has
              focused strongly on engineering excellence, automation quality,
              reliability, and long-term customer partnerships. Our core
              strength lies in delivering advanced welding and cutting
              automation systems for demanding industrial applications.
            </p>

            {/* STATS */}
            <div className="flex flex-row gap-8 md:gap-16 mt-10">
              <div>
                <h3 className="text-5xl md:text-7xl font-bold text-red-500">
                  20+
                </h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">
                  Years of Experience
                </p>
              </div>

              <div>
                <h3 className="text-5xl md:text-7xl font-bold text-red-500">
                  5+
                </h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">
                  Global automation partners
                </p>
              </div>
            </div>

            {/* SMALL IMAGE */}
            <div className="mt-8 md:mt-5">
              <img
                src="/2nd-img2.svg"
                className="rounded-2xl shadow-lg w-full max-w-sm md:ml-12"
                alt="Facility detail"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM TEXT */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 md:-mt-55 mt-16">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">
            The Sharptrax Technologies Facility
          </h3>

          <p className="text-gray-600 w-full md:max-w-[50%] mt-3 text-sm md:text-base">
            We specialize in the design and manufacturing of advanced welding
            automation systems, robotic welding solutions, and special purpose
            machines. Our systems are engineered for precision, durability, and
            seamless integration into industrial production environments.
          </p>
        </div>
      </section>

      <section
        className="relative min-h-screen lg:h-screen w-full text-white py-20 lg:py-0"
        style={{
          backgroundImage: "url('/3nd-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          {/* TITLE */}
          <div className="lg:absolute lg:top-32 lg:left-16 mb-12 lg:mb-0">
            <p className="text-[10px] md:text-xs tracking-[3px] uppercase text-gray-300 hero-font mb-4">
              Built on Precision, Engineering & Trust
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] hero-font">
              Sharptrax <br />
              Technologies
            </h1>
          </div>

          {/* FEATURE BOXES */}
          <div className="lg:absolute lg:bottom-20 lg:left-0 w-full px-0 lg:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              <div className="glass-box h-48 md:h-56 w-full flex flex-col justify-between p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg">
                <img
                  src="/Comp3/comp3-1.svg"
                  className="w-10 h-10 md:w-12 md:h-12"
                />
                <p className="text-lg md:text-xl leading-tight">
                  Advanced automation systems
                </p>
              </div>

              <div className="glass-box h-48 md:h-56 w-full flex flex-col justify-between p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg">
                <img
                  src="/Comp3/comp3-2.svg"
                  className="w-10 h-10 md:w-12 md:h-12"
                />
                <p className="text-lg md:text-xl leading-tight">
                  High-precision welding solutions
                </p>
              </div>

              <div className="glass-box h-48 md:h-56 w-full flex flex-col justify-between p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg">
                <img
                  src="/Comp3/comp3-3.svg"
                  className="w-10 h-10 md:w-12 md:h-12"
                />
                <p className="text-lg md:text-xl leading-tight">
                  Proven industrial performance
                </p>
              </div>

              <div className="glass-box h-48 md:h-56 w-full flex flex-col justify-between p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg">
                <img
                  src="/Comp3/comp3-4.svg"
                  className="w-10 h-10 md:w-12 md:h-12"
                />
                <p className="text-lg md:text-xl leading-tight">
                  Reliable project delivery
                </p>
              </div>

              <div className="glass-box h-48 md:h-56 w-full flex flex-col justify-between p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg">
                <img
                  src="/Comp3/comp3-5.svg"
                  className="w-10 h-10 md:w-12 md:h-12"
                />
                <p className="text-lg md:text-xl leading-tight">
                  Customer-focused engineering
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 5th page----Automation Solutions */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h2 className="text-center text-5xl font-semibold mb-20 hero-font">
            <span className="text-red-500">Automation</span>{" "}
            <span className="text-gray-800">Solutions</span>
          </h2>

          {/* Grid - UPDATED TO CLICKABLE LINKS */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {solutions.map((item, index) => (
              <a
                href={`/services?machine=${encodeURIComponent(item.title)}`}
                key={index}
                className="group flex items-center justify-between gap-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-100 cursor-pointer"
              >
                {/* Text */}
                <div className="max-w-sm">
                  <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed line-clamp-4">
                    {item.desc}
                  </p>
                  
                  {/* Read More button indicator */}
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-red-600 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    View Specifications <span>→</span>
                  </span>
                </div>

                {/* Image */}
                <div className="w-32 md:w-48 shrink-0 flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </a>
            ))}
          </div>

          {/* Bottom Button */}
          <div className="flex justify-center mt-16">
            <button
              className="border border-gray-300 bg-white shadow-sm px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              onClick={() => setOpenForm(true)}
            >
              Enquire Now
            </button>
          </div>
        </div>
      </section>

      {/* 6TH PAGE */}
      <section className="py-12 md:py-20 bg-gray-100 overflow-hidden">
        <h2 className="text-center text-2xl md:text-4xl mb-10 md:mb-16 tracking-widest px-4">
          OUR VALUABLE CLIENTS
        </h2>

        {/* ROW 1 */}
        <div className="overflow-hidden mb-8 md:mb-14">
          <div className="flex gap-10 md:gap-20 scroll-right w-max">
            {[...row1, ...row1].map((logo, i) => (
              <img
                key={i}
                src={logo}
                className="h-6 md:h-10 opacity-70 hover:opacity-100 transition object-contain"
                alt="client logo"
              />
            ))}
          </div>
        </div>

        {/* ROW 2 */}
        <div className="overflow-hidden">
          <div className="flex gap-10 md:gap-20 scroll-left w-max">
            {[...row2, ...row2].map((logo, i) => (
              <img
                key={i}
                src={logo}
                className="h-6 md:h-10 opacity-70 hover:opacity-100 transition object-contain"
                alt="client logo"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7th page */}
      <section
        className="relative min-h-screen bg-cover bg-center flex items-center py-20 lg:py-0"
        style={{ backgroundImage: "url('/3nd-bg.svg')" }}
      >
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="text-white max-w-xl lg:-mt-75 text-center lg:text-left">
            <p className="text-xs tracking-widest mb-2 inline-block border border-white/20 px-2 py-1 rounded">
              REQUEST A QUOTE
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-6">
              Ready to Start Your <br /> Automation Project?
            </h1>
            <p className="text-gray-200 text-sm leading-relaxed lg:mr-3">
              For more information about our automation solutions or to request
              a quote, connect with the Sharptrax Technologies team today.
            </p>
          </div>

          <form
            ref={form}
            onSubmit={handleQuoteSubmit}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 w-full lg:w-105 text-white"
          >
            <h2 className="text-2xl font-semibold mb-6">Request a Quote</h2>

            {/* NAME + EMAIL */}
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <div className="flex flex-col w-full md:w-1/2">
                <input
                  name="customerName"
                  value={quoteFormData.customerName}
                  onChange={handleQuoteInputChange}
                  type="text"
                  placeholder="Your Name *"
                  className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 placeholder-gray-300 outline-none focus:border-white/60 transition"
                />
                {validationErrors.customerName && (
                  <span className="text-red-400 text-xs mt-1">
                    {validationErrors.customerName}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-full md:w-1/2">
                <input
                  name="customerEmail"
                  value={quoteFormData.customerEmail}
                  onChange={handleQuoteInputChange}
                  type="email"
                  placeholder="Your Email *"
                  className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 placeholder-gray-300 outline-none focus:border-white/60 transition"
                />
                {validationErrors.customerEmail && (
                  <span className="text-red-400 text-xs mt-1">
                    {validationErrors.customerEmail}
                  </span>
                )}
              </div>
            </div>

            {/* CITY */}
            <div className="flex flex-col mb-4">
              <input
                name="customerCity"
                value={quoteFormData.customerCity}
                onChange={handleQuoteInputChange}
                type="text"
                placeholder="City *"
                className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 placeholder-gray-300 outline-none focus:border-white/60 transition"
              />
              {validationErrors.customerCity && (
                <span className="text-red-400 text-xs mt-1">
                  {validationErrors.customerCity}
                </span>
              )}
            </div>

            {/* PHONE */}
            <div className="flex flex-col mb-4">
              <input
                name="customerPhone"
                value={quoteFormData.customerPhone}
                onChange={handleQuoteInputChange}
                type="text"
                placeholder="Phone number *"
                className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 placeholder-gray-300 outline-none focus:border-white/60 transition"
              />
              {validationErrors.customerPhone && (
                <span className="text-red-400 text-xs mt-1">
                  {validationErrors.customerPhone}
                </span>
              )}
            </div>

            {/* MESSAGE */}
            <div className="flex flex-col mb-5">
              <textarea
                name="projectMessage"
                value={quoteFormData.projectMessage}
                onChange={handleQuoteInputChange}
                placeholder="Message *"
                rows={3}
                className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 placeholder-gray-300 outline-none focus:border-white/60 transition resize-none"
              />
              {validationErrors.projectMessage && (
                <span className="text-red-400 text-xs mt-1">
                  {validationErrors.projectMessage}
                </span>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition active:scale-[0.98] disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send"}
            </button>

            <p className="text-[10px] text-gray-300 mt-4 text-center lg:text-left leading-relaxed">
              At Sharptrax Technologies, your privacy is important to us. All
              shared information is kept confidential and secure.
            </p>
          </form>
        </div>
      </section>

      {/* 8th PAGE */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <h2 className="text-6xl font-semibold text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="border border-gray-400 rounded-2xl bg-white overflow-hidden"
                >
                  {/* Question */}
                  <div
                    className="flex justify-between items-center px-8 py-6 cursor-pointer"
                    onClick={() => toggle(index)}
                  >
                    <p className="font-medium text-gray-800">{faq.question}</p>

                    {/* Rotating Icon */}
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full bg-black text-white text-xl transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </div>
                  </div>

                  {/* Animated Answer */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-8 pb-6 text-gray-600 text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9th PAGE: TESTIMONIAL SECTION SLIDER */}
      <section className="relative py-20 bg-gradient-to-tr from-gray-100 to-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
          
          {/* LEFT IMAGE BLOCK (Circle Photo) */}
          <div className="relative w-full max-w-sm shrink-0 flex justify-center items-center">
            {/* Animated Circle Container */}
            <motion.div 
              key={activeTestimonial.id}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-full shadow-2xl flex items-center justify-center border-8 border-white overflow-hidden drop-shadow-xl"
            >
              {activeTestimonial.imgSrc ? (
                <img
                  src={activeTestimonial.imgSrc}
                  alt={activeTestimonial.name}
                  className="absolute inset-0 w-80 h-75 object-cover object-center scale-[1.0]"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${activeTestimonial.bgColor} text-white text-8xl font-bold`}>
                  {activeTestimonial.initial}
                </div>
              )}
            </motion.div>
          </div>

          {/* RIGHT CONTENT (Text & Review) */}
          <div className="relative max-w-lg w-full">
            {/* SECTION HEADING */}
            <h4 className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3">
              Testimonials
            </h4>

            {/* Animated Text Wrapper */}
            <motion.div
              key={`text-${activeTestimonial.id}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* NAME */}
              <h2 className="text-4xl font-bold tracking-wide text-gray-900 uppercase">
                {activeTestimonial.name}
              </h2>

              {/* 5-STAR RATING */}
              <div className="flex gap-1 mt-2 mb-2 text-yellow-500 text-2xl drop-shadow-sm">
                ★★★★★
              </div>

              {/* ROLE */}
              <p className="text-gray-500 text-lg mb-8">
                {activeTestimonial.role}
              </p>

              {/* TESTIMONIAL BOX */}
              <div className="bg-white shadow-lg px-8 py-6 rounded-2xl border border-gray-50 text-gray-700 text-base leading-relaxed min-h-[140px] flex items-center">
                <div className="relative w-full">
                  <span className="text-4xl text-blue-400 font-serif leading-none absolute -top-4 -left-4">"</span>
                  <p className="relative z-10">{activeTestimonial.text}</p>
                  <span className="text-4xl text-blue-400 font-serif leading-none absolute -bottom-6 right-0 translate-y-2">"</span>
                </div>
              </div>
            </motion.div>

            {/* SLIDER CONTROLS (Dots & Arrows) */}
            <div className="flex items-center gap-6 mt-8">
              <button 
                onClick={handlePrevTestimonial} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 hover:bg-blue-50 transition text-gray-600 font-bold"
              >
                &#8592;
              </button>
              
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial ? "bg-blue-600 w-6" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={handleNextTestimonial} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 hover:bg-blue-50 transition text-gray-600 font-bold"
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}