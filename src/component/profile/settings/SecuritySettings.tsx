"use client";

import { useState } from "react";

interface SecurityForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SecuritySettings() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [formData, setFormData] = useState<SecurityForm>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name as keyof SecurityForm]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("✅ Password updated:", formData);
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-black/30 backdrop-blur-xl border border-red-900/30 rounded-xl shadow-xl text-white space-y-6">
      <h2 className="text-xl font-semibold tracking-wide">SECURITY SETTINGS</h2>

      {/* 2FA Toggle */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>

        <button
          type="button"
          onClick={() => setTwoFAEnabled(!twoFAEnabled)}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            twoFAEnabled
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          {twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
        </button>
      </div>

      {/* Change Password */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {(
          [
            ["oldPassword", "Old Password"],
            ["newPassword", "New Password"],
            ["confirmPassword", "Confirm Password"],
          ] as [keyof SecurityForm, string][]
        ).map(([key, label]) => (
          <div key={key} className="space-y-1">
            <label htmlFor={key} className="text-sm font-medium block">
              {label}
            </label>
            <input
              id={key}
              name={key}
              type="password"
              placeholder={label}
              title={label}
              value={formData[key]}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-black/40 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-[#C12129]"
            />
          </div>
        ))}

        <div className="flex flex-col sm:flex-row gap-3 pt-3">
          <button
            type="submit"
            className="flex-1 py-2 rounded-md bg-[#C12129] hover:bg-red-700 transition font-semibold"
          >
            Update Password
          </button>

          <button
            type="reset"
            onClick={() =>
              setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              })
            }
            className="flex-1 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
