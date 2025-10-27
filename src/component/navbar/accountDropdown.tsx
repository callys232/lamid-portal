import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const AccountDropdown = () => {
  return (
    <div className="absolute top-full right-0 bg-black border-t-2 border-red-700 shadow-lg rounded-b-lg w-56 text-white animate-fadeIn">
      <ul className="flex flex-col py-3">
        <li>
          <Link href="/signin" className="block px-4 py-2 hover:bg-red-700">
            Sign In
          </Link>
        </li>
        <li>
          <Link href="/signup" className="block px-4 py-2 hover:bg-red-700">
            Sign Up
          </Link>
        </li>
        <li className="text-center py-1 text-gray-400 text-sm italic">or</li>
        <li className="flex justify-center items-center gap-2 py-2 hover:bg-red-700 cursor-pointer">
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </li>
      </ul>
    </div>
  );
};

export default AccountDropdown;
