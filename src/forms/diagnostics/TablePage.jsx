import { useState } from "react";
import { motion } from "framer-motion";

const TablePage = ({ formData, handleChange, handleProceed }) => {
  const [tableData, setTableData] = useState(formData.tableData || []);
  const [errors, setErrors] = useState({});

  // Handle Table Data Updates
  const handleTableChange = (e, rowIndex, colIndex) => {
    const updatedTable = [...tableData];
    updatedTable[rowIndex][colIndex] = e.target.value;
    setTableData(updatedTable);
    handleChange({ target: { id: "tableData", value: updatedTable } });

    // Inline validation: each cell can show an error if left blank after typing
    if (!e.target.value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [`${rowIndex}-${colIndex}`]: "This field is required.",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`${rowIndex}-${colIndex}`];
        return newErrors;
      });
    }
  };

  // Add a new row
  const addRow = () => {
    setTableData([...tableData, Array(5).fill("")]);
  };

  // Validate before proceeding
  const validateTable = () => {
    const hasData = tableData.flat().some((cell) => cell.trim() !== "");
    if (!hasData) {
      setErrors({ general: "Please fill in at least one table field." });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateTable()) {
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
          Table Data Entry
        </h2>
        <p className="text-gray-300 mb-6 text-center">
          Fill in the table below. Click Add Row to expand.
        </p>

        {/* General Error */}
        {errors.general && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {errors.general}
          </p>
        )}

        {/* Table Styling */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-600 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-700 text-white text-sm">
                <th className="p-2">Column 1</th>
                <th className="p-2">Column 2</th>
                <th className="p-2">Column 3</th>
                <th className="p-2">Column 4</th>
                <th className="p-2">Column 5</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border border-gray-600">
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="p-2 text-center">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) =>
                          handleTableChange(e, rowIndex, colIndex)
                        }
                        className="w-full p-2 border border-gray-400 rounded-lg text-black 
                                   focus:ring-2 focus:ring-red-400 focus:border-red-500 
                                   hover:shadow-md transition-all duration-300 ease-in-out"
                      />
                      {errors[`${rowIndex}-${colIndex}`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`${rowIndex}-${colIndex}`]}
                        </p>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Row Button */}
        <button
          onClick={addRow}
          className="mt-4 w-full px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg text-lg font-medium 
                     shadow-md hover:shadow-lg transition-all duration-300 ease-in-out 
                     hover:from-red-500 hover:to-red-600 hover:scale-105 active:scale-95"
        >
          Add Row +
        </button>

        {/* Proceed Button */}
        <button
          onClick={handleNext}
          className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg 
                     shadow-md hover:shadow-lg transition-all duration-300 ease-in-out 
                     hover:from-red-500 hover:to-red-600 hover:scale-105 active:scale-95"
        >
          Next →
        </button>
      </div>
    </motion.div>
  );
};

export default TablePage;
