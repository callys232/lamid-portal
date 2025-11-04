import { FaLinkedin, FaGithub, FaTwitter, FaCheckCircle } from "react-icons/fa";
import StatCard from "./statCard";

export default function ProfileHeader() {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 p-8 rounded-lg shadow-lg overflow-hidden">
      {/* Premium Ribbon */}
      <div className="absolute top-4 left-0 bg-red-600 text-white text-xs font-semibold px-4 py-1 rounded-r-lg shadow-md">
        Premium Member
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Avatar + Info */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src="/avatar.png"
              alt="User Avatar"
              className="w-20 h-20 rounded-full border-4 border-red-500 shadow-md"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">Caleb Johnson</h1>
              <FaCheckCircle
                className="text-blue-500"
                title="Verified Profile"
              />
            </div>
            <p className="text-gray-400 text-sm">Full Stack Developer</p>
            <p className="text-xs text-gray-500 mt-1">Lagos, Nigeria</p>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="w-full md:w-1/3">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Profile Completion</span>
            <span className="font-medium text-white">70%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: "70%" }}
            />
          </div>
        </div>

        {/* Stats Section */}
        {/* Stats Section */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            value={24}
            label="Projects"
            details={["Project A", "Project B", "Project C"]}
          />
          <StatCard
            value={18}
            label="Completed"
            details={["Completed A", "Completed B", "Completed C"]}
          />
          <StatCard
            value="4.9"
            label="Avg. Rating"
            details={["Review 1: ⭐⭐⭐⭐⭐", "Review 2: ⭐⭐⭐⭐"]}
          />
          <StatCard
            value="3 yrs"
            label="Experience"
            details={["React", "Node.js", "MongoDB"]}
          />
        </div>
        {/* ... CTA Buttons + Social Links ... */}
      </div>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
        <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition">
          Hire Me
        </button>
        <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow-md transition">
          Message
        </button>
        <button className="px-6 py-2 border border-gray-600 hover:border-red-500 text-gray-300 hover:text-white font-medium rounded-lg shadow-md transition">
          Download CV
        </button>
      </div>

      {/* Social Media Links */}
      <div className="mt-6 flex gap-6 justify-center md:justify-start text-gray-400">
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition"
        >
          <FaTwitter size={24} />
        </a>
      </div>
    </div>
  );
}
