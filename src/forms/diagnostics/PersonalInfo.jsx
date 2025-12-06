import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const PersonalInfo = ({ handleChange, handleProceed, handleSocialLogin }) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    fullname: "",
    address: "",
    city: "",
    state: "",
    email: "",
    gender: "",
    BusinessCategory: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateField = (id, value) => {
    let message = "";
    if (!value) {
      message = `${id.charAt(0).toUpperCase() + id.slice(1)} is required.`;
    } else if (id === "email" && !value.includes("@")) {
      message = "Enter a valid email address.";
    }
    setErrors((prev) => ({ ...prev, [id]: message }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
    validateField(id, value);
    handleChange(e); // still trigger parent validation
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex justify-center items-center min-h-screen"
    >
      {/* Form Frame */}
      <div className="bg-black p-6 rounded-xl shadow-xl w-full max-w-md backdrop-blur-lg border border-white/20">
        <h1 className="text-3xl font-bold text-red-600 mb-2 text-center">
          Get Free Diagnostics
        </h1>
        <p className="text-gray-300 mb-6 text-center">
          Fill in your details or log in using social media.
        </p>

        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => handleSocialLogin("google")}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:bg-red-600 hover:scale-105 active:scale-95"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => handleSocialLogin("facebook")}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-700 hover:scale-105 active:scale-95"
          >
            Sign in with Facebook
          </button>
        </div>

        {/* Input Fields */}
        {[
          {
            id: "fullname",
            type: "text",
            placeholder: "Full Name",
            icon: <FaUser />,
          },
          {
            id: "address",
            type: "text",
            placeholder: "Address",
            icon: <FaMapMarkerAlt />,
          },
          {
            id: "city",
            type: "text",
            placeholder: "City",
            icon: <FaMapMarkerAlt />,
          },
          {
            id: "state",
            type: "text",
            placeholder: "State",
            icon: <FaMapMarkerAlt />,
          },
          {
            id: "email",
            type: "email",
            placeholder: "Email",
            icon: <FaEnvelope />,
          },
        ].map(({ id, type, placeholder, icon }) => (
          <div key={id} className="relative mb-4">
            <span className="absolute left-3 top-3 text-gray-500">{icon}</span>
            <input
              type={type}
              id={id}
              placeholder={placeholder}
              value={values[id]}
              className="w-full pl-10 p-3 border border-gray-400 rounded-lg text-black 
                         focus:border-red-500 focus:ring-2 focus:ring-red-400 
                         hover:shadow-md transition-all duration-300 ease-in-out"
              onChange={handleInputChange}
              aria-label={placeholder}
            />
            {errors[id] && (
              <p className="text-red-500 text-xs mt-1">{errors[id]}</p>
            )}
          </div>
        ))}

        {/* Select Fields */}
        {[
          { id: "gender", options: ["Male", "Female", "Other"] },
          {
            id: "BusinessCategory",
            options: ["Business", "Human Resource", "Social Development"],
          },
        ].map(({ id, options }) => (
          <div key={id} className="mb-4">
            <select
              id={id}
              value={values[id]}
              className="w-full p-3 border border-gray-400 rounded-lg text-black 
                         focus:border-red-500 focus:ring-2 focus:ring-red-400 
                         hover:shadow-md transition-all duration-300 ease-in-out"
              onChange={handleInputChange}
              aria-label={`Select ${id}`}
            >
              <option value="">{`Select ${id}`}</option>
              {options.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
            {errors[id] && (
              <p className="text-red-500 text-xs mt-1">{errors[id]}</p>
            )}
          </div>
        ))}

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg 
                     shadow-md hover:shadow-lg transition-all duration-300 ease-in-out 
                     hover:from-red-500 hover:to-red-600 hover:scale-105 active:scale-95"
        >
          Next →
        </button>
      </div>
    </motion.div>
  );
};

export default PersonalInfo;
