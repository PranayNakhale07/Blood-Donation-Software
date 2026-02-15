import type { Metadata } from "next";
import DashboardContent from "./dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard - Blood Donation Management | JNMF",
  description: "Manage blood donation activities, including enquiry registration, donor registration, blood analysis, and more at Jagadguru Narendracharyaji Foundation.",
};

export default function DashboardPage() {
  return <DashboardContent />;
}
