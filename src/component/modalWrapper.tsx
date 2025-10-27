"use client";

import { useState, useEffect, useCallback } from "react";
import BizSphereModal from "@/component/BizSphereModal";

type ModalWrapperProps = Record<string, never>;

export default function ModalWrapper({}: ModalWrapperProps) {
  // Initialize from sessionStorage so it resets each browser session
  const [hasShownModal, setHasShownModal] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !!sessionStorage.getItem("hasShownBizSphereModal");
    }
    return false;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const handleScroll = useCallback(() => {
    if (hasShownModal) return;

    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const bottomThreshold = 100; // px from bottom
    if (scrollPosition + windowHeight >= documentHeight - bottomThreshold) {
      setIsModalOpen(true);
      setHasShownModal(true);
    }
  }, [hasShownModal]);

  useEffect(() => {
    if (!hasShownModal) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [hasShownModal, handleScroll]);

  useEffect(() => {
    if (hasShownModal) {
      sessionStorage.setItem("hasShownBizSphereModal", "true");
    }
  }, [hasShownModal]);

  return <BizSphereModal isOpen={isModalOpen} onClose={closeModal} />;
}
