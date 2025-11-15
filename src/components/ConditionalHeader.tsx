"use client"
import { usePathname } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import LandingPageHeader from "./LandingPageHeader";

const ConditionalHeader = () => {
  const pathname = usePathname();
  const { isModalOpen } = useModal();
  const isAdminRoute = pathname.startsWith('/admin');

  return isAdminRoute || isModalOpen ? null : <LandingPageHeader />;
};

export default ConditionalHeader;