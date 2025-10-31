"use client";

import { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import EditProfileForm from "./EditProfileForm";
import SecuritySettings from "./SecuritySettings";
import PaymentInformation from "./payment";
import UploadResume from "./UploadResume";
import DeleteAccount from "./DeleteAccount";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return <EditProfileForm />;
      case "security":
        return <SecuritySettings />;
      case "payment":
        return <PaymentInformation />;
      case "resume":
        return <UploadResume />;
      case "delete":
        return <DeleteAccount />;
      default:
        return <EditProfileForm />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-950 text-white font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-800">
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">{renderTab()}</div>
    </div>
  );
}
