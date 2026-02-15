import type { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "Contact Us - Jagadguru Narendracharyaji Foundation",
  description: "Get in touch with Jagadguru Narendracharyaji Foundation (JNMF) for blood donation inquiries, support, and locations in Ratnagiri and Pune.",
};

export default function ContactPage() {
  return <ContactContent />;
}
