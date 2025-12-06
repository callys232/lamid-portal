import { useState } from "react";
import { motion } from "framer-motion";

const BusinessDocsPage = ({ formData, handleChange, handleProceed }) => {
  const [fileError, setFileError] = useState("");
  const [tableError, setTableError] = useState("");

  // Handle File Upload Validation
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      setFileError("Only PDF or DOCX files are allowed.");
      e.target.value = ""; // Reset input
    } else {
      setFileError("");
      handleChange({ target: { id: "businessDocs", value: file?.name || "" } });
    }
  };

  const radioOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
  ];

  // Validate table selection before proceeding
  const validateTable = () => {
    const rows = document.querySelectorAll("tbody tr");
    let valid = true;
    rows.forEach((row) => {
      const checked = row.querySelector("input[type='radio']:checked");
      if (!checked) valid = false;
    });
    if (!valid) {
      setTableError("Please select one option in each row.");
      return false;
    }
    setTableError("");
    return true;
  };

  const handleNext = () => {
    if (!fileError && validateTable()) {
      handleProceed();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex justify-center items-center min-h-screen"
    >
      {/* Form Frame */}
      <div className="bg-black p-6 rounded-xl shadow-xl w-full max-w-md backdrop-blur-lg border border-white/20">
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
          Upload Business Documents
        </h2>
        <p className="text-gray-300 mb-6 text-center">
          Upload required business files (PDF/DOCX only).
        </p>

        {/* File Upload */}
        <input
          type="file"
          id="businessDocs"
          className="w-full p-3 border border-gray-400 rounded-lg mb-2 text-black 
                     focus:ring-2 focus:ring-red-400 hover:shadow-md transition-all duration-300 ease-in-out"
          onChange={handleFileUpload}
        />
        {fileError && <p className="text-red-500 text-xs mb-4">{fileError}</p>}

        {/* Business Selection Table */}
        <h3 className="text-lg font-semibold text-gray-400 mb-4">
          Business Selection Table
        </h3>
        <table className="w-full border border-gray-600 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700 text-white text-sm">
              {radioOptions.map((option, index) => (
                <th key={index} className="p-2">
                  {option}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, rowIndex) => (
              <tr key={rowIndex} className="border border-gray-600">
                {radioOptions.map((option, colIndex) => (
                  <td key={colIndex} className="p-2 text-center">
                    <input
                      type="radio"
                      name={`row${rowIndex}`}
                      value={option}
                      onChange={handleChange}
                      className="accent-red-600"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {tableError && (
          <p className="text-red-500 text-xs mt-2">{tableError}</p>
        )}

        {/* Proceed Button */}
        <button
          onClick={handleNext}
          className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg 
                     shadow-md hover:shadow-lg transition-all duration-300 ease-in-out 
                     hover:from-red-500 hover:to-red-600 hover:scale-105 active:scale-95"
        >
          Next →
        </button>
      </div>
    </motion.div>
  );
};

export default BusinessDocsPage;
