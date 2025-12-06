import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SuccessPage = ({ setShowForm, setShowModal }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fade-out animation after 4 seconds
    const fadeTimer = setTimeout(() => setIsFading(true), 4000);

    // Close form and modal after fade-out completes
    const closeTimer = setTimeout(() => {
      setShowForm(false);
      setShowModal(false);
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [setShowForm, setShowModal]);

  const handleCloseNow = () => {
    setShowForm(false);
    setShowModal(false);
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`flex justify-center items-center min-h-screen ${
        isFading
          ? "opacity-0 transition-opacity duration-1000 ease-in-out"
          : "opacity-100"
      }`}
    >
      {/* Success Page Frame */}
      <div className="bg-black p-6 rounded-xl shadow-xl w-full max-w-md backdrop-blur-lg border border-white/20 text-white text-center">
        {/* Celebratory Emoji with Pulse */}
        <motion.span
          className="text-5xl mb-2 text-red-500 inline-block"
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🎉
        </motion.span>

        <h2 className="text-3xl font-bold mb-3">Success!</h2>
        <p className="text-gray-300 mb-6">
          Your form has been submitted successfully.
        </p>

        {/* Exit Timer Indicator */}
        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden mt-4">
          <motion.div
            className="bg-gradient-to-r from-red-500 to-red-700 h-4 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "easeInOut" }}
          />
        </div>

        {/* Manual Close Button */}
        <button
          onClick={handleCloseNow}
          className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg 
                     shadow-md hover:shadow-lg transition-all duration-300 ease-in-out 
                     hover:from-red-500 hover:to-red-600 hover:scale-105 active:scale-95"
        >
          Close Now →
        </button>
      </div>
    </motion.div>
  );
};

export default SuccessPage;
