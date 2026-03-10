export default function Location() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Sharptrax Technologies Location
        </h1>

        {/* MAP */}
        <div className="overflow-hidden rounded-xl border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9542037089814!2d80.07953307485444!3d12.974780987340864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f80c9ad912f%3A0x2cdbf0af50a7f1eb!2sSharp%20Trax%20Technologies!5e0!3m2!1sen!2sin!4v1773156222789!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{}}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
