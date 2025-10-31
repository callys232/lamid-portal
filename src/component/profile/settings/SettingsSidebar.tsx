"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Shield, CreditCard, Upload, Trash } from "lucide-react";
import { useState, type ReactNode } from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

type TabItem = {
  key: string;
  label: string;
  icon: ReactNode; // ✅ safer than JSX.Element
};

export default function SettingsSidebar({
  activeTab,
  setActiveTab,
}: SidebarProps) {
  const [open, setOpen] = useState(false);

  const tabs: TabItem[] = [
    { key: "profile", label: "Edit Profile", icon: <User size={18} /> },
    { key: "security", label: "2FA / Security", icon: <Shield size={18} /> },
    {
      key: "payment",
      label: "Payment Information",
      icon: <CreditCard size={18} />,
    },
    { key: "resume", label: "Upload Resume", icon: <Upload size={18} /> },
    { key: "delete", label: "Delete Account", icon: <Trash size={18} /> },
  ];

  const groupedTabs: TabItem[][] = [];
  for (let i = 0; i < tabs.length; i += 2) {
    groupedTabs.push(tabs.slice(i, i + 2));
  }

  const SidebarContent = (
    <div
      className="
      h-full p-2 
      bg-black/50
      backdrop-blur-xl 
      border-r border-red-900/40 
      shadow-[inset_0_0_30px_rgba(193,33,41,0.2)] 
    "
    >
      {groupedTabs.map((group, idx) => (
        <div
          key={idx}
          className="mb-4 rounded-md border border-red-900/40 bg-black/40 overflow-hidden"
        >
          <ul>
            {group.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <li
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setOpen(false);
                  }}
                  className={`relative px-4 py-3 cursor-pointer flex items-center gap-2 transition-colors ${
                    isActive ? "text-white" : "text-gray-300 hover:bg-black/40"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="left-glow"
                      className="absolute left-0 top-0 h-full w-1 bg-[#c12129] shadow-[0_0_20px_4px_rgba(193,33,41,0.7)]"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="sidebar-highlight"
                      className="absolute inset-0 bg-[#c12129]/30 backdrop-blur-sm -z-10"
                      transition={{ type: "spring", duration: 0.4 }}
                    />
                  )}

                  {tab.icon}
                  {tab.label}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-2 flex justify-between items-center">
        <button
          type="button"
          aria-label="Open settings menu"
          title="Open menu"
          onClick={() => setOpen(true)}
          className="text-white flex items-center gap-2"
        >
          <Menu size={24} /> Menu
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64">{SidebarContent}</div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="fixed inset-y-0 left-0 w-64 z-[999] bg-black/60 backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close menu"
              title="Close menu"
              className="absolute top-4 right-4 text-white"
              onClick={() => setOpen(false)}
            >
              <X size={26} />
            </button>

            {SidebarContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay when menu open */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[998] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
