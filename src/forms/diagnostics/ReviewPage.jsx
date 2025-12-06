import { motion } from "framer-motion";

const ReviewPage = ({ formData, handlePrevious, handleSubmit }) => {
  const fields = [
    { label: "Full Name", value: formData.fullname },
    { label: "Email", value: formData.email },
    { label: "Phone", value: formData.phone },
    {
      label: "Address",
      value: `${formData.address}, ${formData.city}, ${formData.state}`,
    },
    { label: "Gender", value: formData.gender },
    { label: "Event Category", value: formData.eventCategory },
    { label: "Resume", value: formData.resume || "Not uploaded" },
    {
      label: "Business Documents",
      value: formData.businessDocs || "Not uploaded",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen"
    >
      <div className="bg-black p-6 rounded-xl shadow-xl w-full max-w-md backdrop-blur-lg border border-white/20 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Review Your Submission
        </h2>
        <p className="text-gray-300 mb-6">
          Please confirm your details before submitting.
        </p>

        {/* Details List */}
        <div className="text-left w-full space-y-2">
          {fields.map(({ label, value }, idx) => (
            <p key={idx} className="text-sm text-white">
              <strong className="text-red-400">{label}:</strong>{" "}
              <span
                className={
                  value === "Not uploaded" || value === ""
                    ? "text-red-500"
                    : "text-gray-200"
                }
              >
                {value || "Missing"}
              </span>
            </p>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 gap-4">
          <button
            onClick={handlePrevious}
            className="w-1/2 px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg text-lg font-medium 
                       shadow-md hover:shadow-lg transition-all duration-300 ease-in-out 
                       hover:from-gray-600 hover:to-gray-700 hover:scale-105 active:scale-95"
          >
            ← Edit Details
          </button>

          <button
            onClick={handleSubmit}
            className="w-1/2 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg text-lg font-semibold 
                       shadow-md hover:shadow-lg transition-all duration-300 ease-in-out 
                       hover:from-red-500 hover:to-red-600 hover:scale-105 active:scale-95"
          >
            Submit →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewPage;
