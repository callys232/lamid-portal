export default function ProfileHeader() {
  return (
    <div className="bg-gray-900 border-b border-gray-800 p-6 flex flex-col md:flex-row items-center md:items-end justify-between">
      <div className="flex items-center gap-4">
        <img
          src="/avatar.png"
          alt="User Avatar"
          className="w-16 h-16 rounded-full border-2 border-red-600"
        />
        <div>
          <h1 className="text-xl font-semibold">Caleb Johnson</h1>
          <p className="text-sm text-gray-400">Full Stack Developer</p>
        </div>
      </div>

      {/* Progress / Stats */}
      <div className="mt-4 md:mt-0 w-full md:w-1/3">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Profile Completion</span>
          <span>70%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-red-600 h-2 rounded-full"
            style={{ width: "70%" }}
          />
        </div>
      </div>
    </div>
  );
}
