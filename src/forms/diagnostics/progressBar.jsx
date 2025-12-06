import { motion } from "framer-motion";
import "./progress.css";

const ProgressBar = ({ step, totalSteps }) => {
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="progress-container w-full max-w-md mx-auto mt-6">
      {/* Step Indicator */}
      <p className="progress-text text-gray-300 text-sm mb-2 text-center">
        Step {step} of {totalSteps}
      </p>

      {/* Progress Bar */}
      <div
        className="relative progress-bar bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
      >
        {/* Animated Fill */}
        <motion.div
          className="progress-fill h-4 rounded-full bg-gradient-to-r from-red-600 to-red-700"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Step Ticks */}
        <div className="absolute top-0 left-0 w-full flex justify-between px-1">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-0.5 h-4 ${
                i + 1 <= step ? "bg-red-400" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Milestone Labels */}
      <div className="flex justify-between mt-1 text-xs text-gray-400">
        {Array.from({ length: totalSteps }, (_, i) => (
          <span
            key={i}
            className={i + 1 <= step ? "text-red-400 font-semibold" : ""}
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
