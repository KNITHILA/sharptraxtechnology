import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "welding-automation",
    title: "Welding Automation",
    products: [
      {
        name: "Robotic Automation",
        desc: "Robotic automation is at the core of Sharptrax Technologies’ advanced welding solutions. With cutting-edge robotic welding systems, we help industries achieve higher precision, efficiency, and productivity in their manufacturing processes.                                Sharptrax Technologies offers over 20 years of experience as a leader and innovator integrating automation and robotics for the welding industry.",
        features: [
          "Our robotic systems can be seamlessly integrated into existing production lines, ensuring minimal disruption and maximum efficiency.",
          "Robots deliver consistent weld quality, reducing errors and minimizing material wastage.",
        ],
        imgs: [
          "/servicemachines/welding automation/1/mac1.1.jpg",
          "/servicemachines/welding automation/1/mac1.2.jpg",
          "/servicemachines/welding automation/1/mac1.3.jpg",
          "/servicemachines/welding automation/1/mac1.4.jpg",
        ],
        video: "/servicemachines/welding automation/1/mac1.mp4",
      },
      {
        name: "Plasma Transferred Arc Welding System",
        desc: " Plasma Transferred Arc (PTA) Welding is a highly advanced and precise welding process designed for hard-facing, cladding, and high-quality metal deposition. At Sharptrax Technologies, we specialize in PTA welding solutions that enhance the durability and performance of industrial components, reducing wear and tear in extreme working conditions.   ",
        features: [
          "The system enables high-precision metering of metallic powder, significantly reducing material waste and lowering overall costs compared to traditional welding methods.",
          "Designed for seamless integration into automated workflows, PTAW ensures consistent, high-quality hardfacing results with exceptional repeatability.",
        ],
        imgs: [
          "/servicemachines/welding automation/2/mac2.1.jpg",
          "/servicemachines/welding automation/2/mac2.2.jpg",
          "/servicemachines/welding automation/2/mac2.3.jpg",
          "/servicemachines/welding automation/2/mac2.4.jpg",
        ],
        video: "/servicemachines/welding automation/2/mac2.mp4",
      },
      {
        name: "Welding Rotator",
        desc: "At Sharptrax Technologies, our welding Welding rotators are designed to enhance efficiency, precision, and safety in welding operations. These automated positioning systems help in rotating cylindrical workpieces, ensuring uniform welding and reduced manual effort..",
        features: [
          "Available in various weight load capacities ranging from 5 tonnes to 200 tonnes to suit heavy-duty industrial needs.",
          "Offers versatile variants including Self-centric Welding Rotators and Conventional Rotator systems.",
          "Highly adaptable design capable of accommodating vessel diameters ranging from 150 mm to 8000 mm.",
          "Fully customizable configurations available to meet specific project requirements and workshop layouts.",
        ],
        imgs: [
          "/servicemachines/welding automation/3/mac3.1.jpg",
          "/servicemachines/welding automation/3/mac3.2.jpg",
          "/servicemachines/welding automation/3/mac3.3.jpg",
          "/servicemachines/welding automation/3/mac3.4.jpg",
        ],
        video: "https://www.youtube.com/embed/cBOZVaN1GsM?si=LuCX_UTH5Y9NGtGj",
      },
      {
        name: "Pull-Through Welding Automation System",
        desc: "At Sharptrax Technologies, our Pull-Through Welding Automation System is designed to enhance productivity, consistency, and precision in welding applications. This advanced system automates the welding process for long and continuous workpieces, ensuring seamless joint quality and reduced manual intervention.",
        imgs: [
          "/servicemachines/welding automation/4/mac4.1.jpg",
          "/servicemachines/welding automation/4/mac4.2.jpg",
          "/servicemachines/welding automation/4/mac4.3.jpg",
          "/servicemachines/welding automation/4/mac4.4.jpg",
        ],
        video: "https://www.youtube.com/embed/G5TqVsDJ62o?si=METj7Kg_ixayYyuS",
      },
      {
        name: "MIG-Welding System",
        desc: "At Sharptrax Technologies, our MIG-Welding System is designed for high-speed, high-quality welding, making it ideal for industrial and manufacturing applications. Using Metal Inert Gas (MIG) welding, this system provides strong, precise, and efficient welds across various materials, including mild steel, stainless steel, and aluminum.",
        imgs: [
          "/servicemachines/welding automation/5/mac5.1.jpg",
          "/servicemachines/welding automation/5/mac5.2.jpg",
          "/servicemachines/welding automation/5/mac5.3.jpg",
          "/servicemachines/welding automation/5/mac5.4.jpg",
        ],
        video: "https://www.youtube.com/embed/Z9gzJC5pDxM?si=ww20AIUTtnhd93lq",
      },
      {
        name: "TIG Longitudinal Welding SPM",
        desc: "At Sharptrax Technologies, our TIG-Linear Welding SPM (Special Purpose Machine) is designed for high-precision linear welding applications. This system utilizes Tungsten Inert Gas (TIG) welding, ensuring clean, strong, and defect-free welds with superior control and consistency. It is ideal for industries requiring fine, high-quality welding on long and straight workpieces.",
        imgs: [
          "/servicemachines/welding automation/6/mac6.1.jpg",
          "/servicemachines/welding automation/6/mac6.2.jpg",
          "/servicemachines/welding automation/6/mac6.3.jpg",
          "/servicemachines/welding automation/6/mac6.4.jpg",
        ],
        video: "https://www.youtube.com/embed/cwhK_j6G0Jk?si=U_lvArkXTWm9FX8j",
      },
      {
        name: "SAW-Submerged Arc Welding",
        desc: "At Sharptrax Technologies, our Submerged Arc Welding (SAW) system is engineered for high-deposition, deep-penetration welding that ensures strong, defect-free welds with minimal spatter. SAW is widely used in industries that require high-strength, heavy-duty welding applications, such as shipbuilding, structural fabrication, and pipeline construction.",
        imgs: [
          "/servicemachines/welding automation/7/mac7.1.jpg",
          "/servicemachines/welding automation/7/mac7.2.jpg",
          "/servicemachines/welding automation/7/mac7.3.jpg",
          "/servicemachines/welding automation/7/mac7.4.jpg",
        ],
      },
      {
        name: "Column And Boom",
        desc: "At Sharptrax Technologies, we provide high-performance Column and Boom welding systems, designed to enhance precision, efficiency, and automation in welding processes. Our customized solutions cater to industries requiring high-quality, consistent, and automated welding operations for large structures and complex fabrication.",
        imgs: [
          "/servicemachines/welding automation/8/mac8.1.jpg",
          "/servicemachines/welding automation/8/mac8.2.jpg",
          "/servicemachines/welding automation/8/mac8.3.jpg",
          "/servicemachines/welding automation/8/mac8.4.jpg",
        ],
      },
      {
        name: "Port Welding Machine SPM",
        desc: "At Sharptrax Technologies, we specialize in providing customized Port Welding Machine SPM (Special Purpose Machine) designed for high-precision and efficient welding operations in various industries. Our SPM solutions ensure enhanced productivity, accuracy, and automation, reducing manual labor and operational costs.",
        features: [
          "Automated & High-Precision Welding – Ensures consistent weld quality and high accuracy with minimal human intervention.",
          "Custom-Built for Specific Applications – Provides tailored engineering solutions designed to meet unique and complex industrial requirements.",
        ],
        imgs: [
          "/servicemachines/welding automation/9/mac9.1.jpg",
          "/servicemachines/welding automation/9/mac9.2.jpg",
          "/servicemachines/welding automation/9/mac9.3.jpg",
          "/servicemachines/welding automation/9/mac9.4.jpg",
        ],
        video: "/servicemachines/welding automation/9/mac9.mp4",
      },
      {
        name: "Head & Tailstock Units",
        desc: "Sharptrax offers very high quality Head & Tailstock Units, which can be used to hold various components for welding, customised solution is also available in Sharptrax.",
        features: [
          "Synchronized Vertical Adjustment – Features precise vertical height control synchronized across both Head & Tailstock units.",
          "High Payload Versatility – Available in various configurations to support load capacities ranging up to 50 tonnes.",
          "Robust Construction – Engineered with a solid frame designed specifically for superior weight balancing and durability.",
          "Precision Positioning – Motorized and Servo-driven options are available to ensure micron-level positioning accuracy.",
          "Economical Pipe Handling – Provides a practical and cost-effective solution for all industrial pipe holding requirements.",
          "Robotic Integration – Designed for seamless synchronization with external robots to create fully automated welding cells.",
          "High Operational Efficiency – Delivers a high strength-to-weight ratio ensuring efficient handling of heavy workpieces.",
        ],
        imgs: [
          "/servicemachines/welding automation/10/mac10.1.jpg",
          "/servicemachines/welding automation/10/mac10.2.jpg",
          "/servicemachines/welding automation/10/mac10.3.jpg",
          "/servicemachines/welding automation/10/mac10.4.jpg",
        ],
      },

      {
        name: "Hydraulic End Cap Welding SPM",
        desc: "The Hydraulic End Cap Welding SPM is a specialized machine designed for precise and efficient welding of end caps with hydraulic control. It ensures stable positioning, uniform weld quality, and enhanced productivity for industrial applications.",
        features: [
          "Versatile Application Range – Engineered to be suitable for a wide range of industrial welding jobs and workpiece types.",
          "Specialized Hydraulic Solutions – Specifically designed for high-precision welding of hydraulic cylinder components.",
          "Integrated Steady Rest – Equipped with a steady rest to ensure stable support and ease of operation during loading and unloading.",
          "Flexible Diameter Capacity – Available in various sizes to accommodate workpiece diameters ranging from 50 mm to 300 mm.",
          "Heavy-Duty Construction – Features a solid, robust build optimized for superior weight balancing and vibration-free operation.",
          "Advanced PLC Control – Utilizes a PLC-controlled weld sequence for precise automation and consistent weld bead quality.",
          "Multi-Job Programming – Supports multi-program storage, allowing users to program and switch between different job specifications easily.",
        ],
        imgs: [
          "/servicemachines/welding automation/11/mac11.1.jpg",
          "/servicemachines/welding automation/11/mac11.2.jpg",
          "/servicemachines/welding automation/11/mac11.3.jpg",
          "/servicemachines/welding automation/11/mac11.4.jpg",
        ],
      },
    ],
  },
  {
    id: "welding-positioners",
    title: "Welding Positioners",
    products: [
      {
        name: "Welding Positioners",
        desc: "At Sharptrax Technologies, our welding positioners are designed to enhance efficiency, precision, and safety in welding operations. These advanced positioning systems allow welders to rotate and tilt workpieces into the optimal position, ensuring better accessibility, reduced strain, and improved weld quality..",
        features: [
          "Wide Load Capacity Range – Available in various weight load capacities ranging from 50 kg to 20 tons.",
          "Adjustable Center of Gravity – Engineered to accommodate a center of gravity from 75 mm to 300 mm.",
          "Versatile Loading Options – Designed to handle both eccentric and non-eccentric job loads with precision.",
          "Customizable Tilt Table – Features a tilt table design that can be fully customized to meet specific project requirements.",
        ],
        imgs: [
          "/servicemachines/welding positioners/1/pos1.1.jpg",
          "/servicemachines/welding positioners/1/pos1.2.jpg",
          "/servicemachines/welding positioners/1/pos1.3.jpg",
          "/servicemachines/welding positioners/1/pos1.4.jpg",
        ],
        video: "https://www.youtube.com/embed/o1akniqVvt0?si=mPwanL_oIURSJjcU",
      },
      {
        name: "L-Type Positioner",
        desc: "Sharptrax offers extensive range of L type Positioners for manipulating various types of components, Servo/VFD driven for positioning the arms. We also integrate/synchronize with third party Robot to accomplish complete welding process.",
        features: [
          "High Positioning Accuracy – Engineered for precision-driven operations with exceptional position accuracy.",
          "Dual-Axis Servo Control – Features two-axis control powered by high-performance servo drives and motors.",
          "Advanced PLC Integration – Includes a PLC control option for automated and reliable sequence management.",
          "Robotic Compatibility – Designed for seamless integration with industrial robots to enhance automation.",
          "Maximum Efficiency – Optimized to maximize both operational efficiency and welding accuracy.",
          "Superior Material Handling – Provides excellent material handling capabilities for various workpiece sizes.",
          "Full Rotational Range – Equipped with 360-degree rotation ability for unrestricted access and positioning.",
        ],
        imgs: [
          "/servicemachines/welding positioners/2/pos2.1.jpg",
          "/servicemachines/welding positioners/2/pos2.2.jpg",
          "/servicemachines/welding positioners/2/pos2.3.jpg",
          "/servicemachines/welding positioners/2/pos2.4.jpg",
        ],
      },
      {
        name: "Scissor Rollers",
        desc: "Sharptrax offers very high quality Scissor Rollers, which can be used to hold your pipe as a support for your existing machines and can be used as standalone device for pipe support.",
        imgs: [
          "/servicemachines/welding positioners/3/pos3.1.jpg",
          "/servicemachines/welding positioners/3/pos3.2.jpg",
          "/servicemachines/welding positioners/3/pos3.3.jpg",
          "/servicemachines/welding positioners/3/pos3.4.jpg",
        ],
      },
      {
        name: "Welding Turn Table",
        desc: "We offer excellent quality range of Welding Positioners (Manipulators) that are made from quality raw material. Widely used in various industrial applications, our Positioners position you for maximum flexibility and efficiency. This can also be integrated with Robotic welding automation.",
        imgs: [
          "/servicemachines/welding positioners/4/pos4.1.jpg",
          "/servicemachines/welding positioners/4/pos4.2.jpg",
          "/servicemachines/welding positioners/4/pos4.3.jpg",
          "/servicemachines/welding positioners/4/pos4.4.jpg",
        ],
      },
    ],
  },
  {
    id: "cnc-cutting",
    title: "Plasma CNC Cutting Machine",
    products: [
      {
        name: "Plasma CNC Machine",
        desc: "At Sharptrax Technologies, we specialize in trading high-quality Plasma CNC Cutting Machines designed for precision cutting, high-speed performance, and superior efficiency. Our Plasma CNC machines are ideal for industries requiring accurate metal cutting solutions with advanced automation.",
        features: [
          "High-Precision Cutting – Delivers smooth, clean, and accurate cuts across various metal thicknesses with minimal material wastage.",
          "CNC-Controlled Automation – Ensures highly efficient and repeatable cutting processes through advanced, user-friendly programming interfaces.",
          "Heavy-Duty Build – Constructed with a robust frame to handle high-speed industrial operations while maintaining long-term stability.",
          "Clean Edge Finish – Optimized plasma technology reduces dross and secondary finishing requirements, saving operational time.",
        ],
        imgs: [
          "/servicemachines/plasma cnc/mac1.1.jpg",
          "/servicemachines/plasma cnc/mac1.2.jpg",
          "/servicemachines/plasma cnc/mac1.3.jpg",
          "/servicemachines/plasma cnc/mac1.4.jpg",
        ],
      },
    ],
  },
  {
    id: "accessories",
    title: "Machine Accessories",
    products: [
      {
        name: "Torch Weaving Unit",
        desc: "At Sharptrax Technologies, our Torch Weaving Unit, also known as the Welding Weaving Unit, is designed to enhance welding precision and efficiency by introducing a controlled weaving motion to the welding torch. This advanced system ensures uniform bead formation, improved penetration, and better fusion, making it ideal for critical and high-strength welding applications.",
        features: [
          "High Precision Torch Weaving – Specifically engineered for PTAW, TIG, MIG, and SAW applications with superior accuracy.",
          "Advanced Linear Motion – Achieved through standard LM bush/linear bearings combined with ball screw transmission for maximum durability.",
          "Precise Width Control – Offers a 0 – 40 mm weaving width precisely managed via micro-controller or PLC integration.",
          "Industrial Grade Reliability – Built for high-performance welding environments requiring consistent and repeatable motion.",
        ],
        imgs: [
          "/servicemachines/machine accessories/1/acc1.1.jpg",
          "/servicemachines/machine accessories/1/acc1.2.jpg",
          "/servicemachines/machine accessories/1/acc1.3.jpg",
          "/servicemachines/machine accessories/1/acc1.4.jpg",
        ],
      },
      {
        name: "AVC Unit",
        desc: "At Sharptrax Technologies, we manufacture Automatic Voltage Controller (AVC) unit for TIG and Plasma welding process. AVC units are built with LM guideway slides and Servo Motors for precise control height adjustments. AVC units are being used for moving the welding torch vertically, in order to maintain gap between the torch and the job irrespective of its ovality.",
        imgs: [
          "/servicemachines/machine accessories/2/acc2.1.jpg",
          "/servicemachines/machine accessories/2/acc2.2.jpg",
        ],
      },
      {
        name: "Laser Seam Tracking Unit",
        desc: "At Sharptrax Technologies, our Laser Seam Tracking Unit enables tracking of almost all weld joints to avoid manual intervention. It is independently developed, convenient to operate and easy to teach. It features premium optical components compatible with all major robot brands. The unit includes seam finding and tracking functions, a host control unit with an accurate algorithm, and an internal airway design.",
        features: [
          "Automatic Real-Time Detection – Enhances welding precision by automatically detecting and adjusting to seam variations during operation.",
          "Consistent Weld Quality – Engineered to maintain high-quality, repeatable weld beads by compensating for real-time changes.",
          "Error Reduction – Significantly reduces defects and manual rework through advanced automated tracking sensors.",
          "High Process Efficiency – Improves the overall speed and reliability of automated welding workflows.",
          "Precision Laser Guidance – Utilizes high-precision laser technology to ensure the torch follows the exact seam path.",
        ],
        imgs: [
          "/servicemachines/machine accessories/3/acc3.1.jpg",
          "/servicemachines/machine accessories/3/acc3.2.jpg",
          "/servicemachines/machine accessories/3/acc3.3.jpg",
          "/servicemachines/machine accessories/3/acc3.4.jpg",
        ],
      },
      {
        name: "Welding Torch",
        desc: "At Sharptrax Technologies, we manufacture high quality PTA (Plasma Transferred Arc) welding Torches for all your hardfacing/cladding applications, we also build customised water cooled PTA OD and ID Torches for high deposition stellite, colmonoy and various alloy powder overlaying.",
        imgs: [
          "/servicemachines/machine accessories/4/acc4.1.jpg",
          "/servicemachines/machine accessories/4/acc4.2.jpg",
          "/servicemachines/machine accessories/4/acc4.3.jpg",
        ],
      },
      {
        name: "Cross Slides",
        desc: "At Sharptrax Technologies, we manufacture cross slide Units for Torch manipulation, LM rails and lead screw combination makes the transmission so smooth, Different payloads and various stroke length slides are being made for several applications.",
        imgs: ["/servicemachines/machine accessories/5/acc5.1.jpg"],
      },
    ],
  },
];
export default function Services() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const initialCat = categories[0] || { id: "", products: [] };
  const [activeCat, setActiveCat] = useState(initialCat.id);
  const [activeProd, setActiveProd] = useState(
    initialCat.products[0] || { name: "", desc: "", imgs: [""] },
  );
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  // URL Parameter Handling
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const catId = params.get("cat");
    const prodName = params.get("prod");

    if (catId) {
      const selectedCat = categories.find((c) => c.id === catId);
      if (selectedCat) {
        setActiveCat(selectedCat.id);
        if (prodName) {
          const selectedProd = selectedCat.products.find(
            (p) => p.name.toLowerCase() === prodName.toLowerCase(),
          );
          if (selectedProd) setActiveProd(selectedProd);
        }
      }
    }
  }, []);

  const handleCatClick = (cat: any) => {
    setActiveCat(cat.id);
    setActiveProd(cat.products[0]);
    setActiveImgIndex(0);
  };

  const handleProdClick = (prod: any) => {
    setActiveProd(prod);
    setActiveImgIndex(0);
  };

  // Validation Logic
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = "Full name is required (min 3 chars).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!formData.details.trim() || formData.details.trim().length < 10) {
      newErrors.details = "Please provide more details (min 10 chars).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);

    const templateParams = {
      user_name: formData.name.trim(),
      user_email: formData.email.trim(),
      user_phone: formData.phone.trim(),
      project_details: formData.details.trim(),
      product_interest: activeProd.name, // Sends the currently viewed product info
    };

    emailjs
      .send(
        "service_67r7kfg",
        "template_xwnafxs",
        templateParams,
        "9bJ_hqjsB63RMeUH0",
      )
      .then(() => {
        alert("Enquiry Sent Successfully!");
        setFormData({ name: "", email: "", phone: "", details: "" });
        setErrors({});
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send. Please try again later.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="w-full min-h-screen bg-white hero-font pb-20">
      <div className="h-16 md:h-20 w-full bg-white"></div>

      <section className="py-8 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 uppercase tracking-tight text-gray-900">
          Product and Services
        </h2>

        {/* 1. SLIDING & EXPANDING SECTION */}
        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-112.5 mb-12 md:mb-20 overflow-hidden">
          {categories.map((cat) => {
            const isActive = activeCat === cat.id;
            return (
              <motion.div
                key={cat.id}
                animate={{
                  flex: isActive ? 15 : 1,
                  backgroundColor: isActive ? "#ffffff" : "#f3f4f6",
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-4xl md:rounded-[40px] border border-gray-200 flex flex-col md:flex-row shadow-sm overflow-hidden"
              >
                <div
                  onClick={() => handleCatClick(cat)}
                  className={`relative z-20 flex flex-row md:flex-col items-center justify-between md:justify-center p-5 md:p-6 cursor-pointer transition-all duration-500 bg-inherit ${
                    isActive ? "w-full md:w-62.5 md:border-r" : "w-full h-full"
                  }`}
                >
                  <motion.h3
                    layout
                    className={`font-bold uppercase tracking-widest text-center ${
                      isActive
                        ? "text-base md:text-lg text-red-500"
                        : "text-sm md:text-lg text-gray-400 md:-rotate-90 whitespace-nowrap"
                    }`}
                  >
                    {cat.title}
                  </motion.h3>
                  {isActive && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCat("");
                      }}
                      className="md:absolute md:bottom-8 w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      ←
                    </motion.button>
                  )}
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex-1 bg-white overflow-x-auto flex flex-row items-center gap-4 px-6 py-2 scrollbar-hide"
                    >
                      {cat.products.map((prod, idx) => (
                        <motion.div
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProdClick(prod);
                          }}
                          className={`min-w-70 h-[calc(100%-4px)] p-6 rounded-[35px] border-2 cursor-pointer flex flex-col items-center justify-center text-center transition-all ${
                            activeProd.name === prod.name
                              ? "bg-red-500 border-red-500 text-white shadow-xl scale-[1.02]"
                              : "bg-gray-50 border-transparent text-gray-600 hover:border-red-400"
                          }`}
                        >
                          <div
                            className={`w-full flex-1 rounded-[25px] flex items-center justify-center mb-4 ${activeProd.name === prod.name ? "bg-white/20" : "bg-white shadow-sm"}`}
                          >
                            <img
                              src={prod.imgs[0]}
                              alt={prod.name}
                              className="max-h-40 object-contain"
                            />
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-wider">
                            {prod.name}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* 2. PRODUCT DETAILS SECTION */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProd.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-gray-50 p-6 md:p-16 rounded-[40px] border border-gray-100"
          >
            <div className="space-y-6">
              <div className="bg-white rounded-4xl p-6 md:p-12 shadow-inner flex items-center justify-center min-h-75 md:min-h-125">
                <motion.img
                  key={activeImgIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={activeProd.imgs[activeImgIndex]}
                  alt={activeProd.name}
                  className="max-h-87.5 w-auto object-contain transition-transform duration-700"
                />
              </div>
              {activeProd.imgs.length > 1 && (
                <div className="flex gap-4 justify-center">
                  {activeProd.imgs.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`w-20 h-20 rounded-2xl border-2 p-2 cursor-pointer transition-all bg-white ${activeImgIndex === idx ? "border-red-500 scale-110 shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <img src={img} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col h-full">
              <span className="text-red-500 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">
                Product Specifications
              </span>
              <h4 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mt-2">
                {activeProd.name}
              </h4>
              <div className="w-16 md:w-20 h-1.5 bg-red-500 rounded-full my-6"></div>
              <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-8 text-justify">
                {activeProd.desc}
              </p>
              {activeProd.features && (
                <div className="bg-white/50 rounded-3xl p-6 md:p-8 border border-gray-200">
                  <h5 className="font-bold text-gray-900 mb-4 uppercase tracking-wide text-sm">
                    Key Capabilities:
                  </h5>
                  <ul className="space-y-3">
                    {activeProd.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-600 text-sm md:text-base text-justify"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 3. VIDEO + ENQUIRY FORM SECTION */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-[40px] overflow-hidden bg-black aspect-video lg:aspect-auto relative shadow-2xl min-h-75">
            {activeProd.video ? (
              activeProd.video.includes("youtube.com") ||
              activeProd.video.includes("youtu.be") ? (
                <iframe
                  key={activeProd.video}
                  className="w-full h-full object-cover"
                  src={activeProd.video}
                  title={activeProd.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  key={activeProd.video}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                >
                  <source src={activeProd.video} type="video/mp4" />
                </video>
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-900">
                <p>Video demonstration coming soon for {activeProd.name}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-200 shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Ready to Upgrade?
            </h3>
            <p className="text-gray-500 mb-8 text-justify">
              Fill out the form below and our technical experts will get back to
              you shortly.
            </p>

            <form
              ref={formRef}
              className="space-y-5"
              onSubmit={handleFormSubmit}
              noValidate
            >
              <div>
                <label className="text-sm font-semibold text-gray-700 block ml-1 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  className={`w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 transition-all ${errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-red-500"}`}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-[10px] mt-1 ml-2 uppercase font-bold">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block ml-1 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className={`w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 transition-all ${errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-red-500"}`}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[10px] mt-1 ml-2 uppercase font-bold">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block ml-1 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className={`w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 transition-all ${errors.phone ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-red-500"}`}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="9876543210"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-[10px] mt-1 ml-2 uppercase font-bold">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block ml-1 mb-1">
                  Project Details *
                </label>
                <textarea
                  rows={4}
                  className={`w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 transition-all ${errors.details ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-red-500"}`}
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  placeholder="Tell us about your welding requirements..."
                ></textarea>
                {errors.details && (
                  <p className="text-red-500 text-[10px] mt-1 ml-2 uppercase font-bold">
                    {errors.details}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`w-full bg-black text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95 ${isSending ? "bg-gray-500 cursor-not-allowed" : "hover:bg-red-500"}`}
              >
                {isSending ? "Processing..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
