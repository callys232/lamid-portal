"use client";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileSidebar({
  activeTab,
  setActiveTab,
}: SidebarProps) {
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "settings", label: "Settings" },
    { key: "teams", label: "Teams" },
    { key: "notifications", label: "Notifications" },
    { key: "escrow", label: "Escrow" },
    { key: "invitations", label: "Invitations" },
  ];

  return (
    <nav className="h-full p-2" role="navigation" aria-label="Client dashboard">
      <ul className="space-y-1">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <button
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`w-full text-left px-4 py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-800 ${
                activeTab === tab.key
                  ? "bg-red-600 text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
              aria-current={activeTab === tab.key ? "page" : undefined}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
