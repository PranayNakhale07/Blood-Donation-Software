import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./home.css";

export const metadata: Metadata = {
  title: "Welcome - Blood Donation Management | JNMF",
  description: "Join the Jagadguru Narendracharyaji Foundation (JNMF) blood donation campaign. Donate blood, save lives, and manage your registrations with ease.",
};

export default function Home() {
  return (
    <main>
      <nav className="navbar">
        <div className="nav-brand">
          <Image
            src="/positive-blood-group-3d-icon-png-download-4897215.webp"
            alt="JNMF Logo"
            width={50}
            height={50}
          />
          <span>Blood Donation</span>
        </div>
        <div className="nav-links">
          <Link href="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Jagadguru Ramanandacharya Narendracharyaji Foundation
            </h1>
            <p className="hero-subtitle">
              Bridging the gap between donors and those in need. Join our mission to ensure a safe and healthy blood supply for society.
            </p>
            <span className="marathi-quote-hero">
              "तुम्ही जगा दुसऱ्याला जगवा"
            </span>
            <div className="hero-buttons">
              <Link href="/login" className="btn btn-primary btn-large">
                Donate Now (Login)
              </Link>
            </div>
          </div>
          <div className="founder-image-container">
            <Image
              src="/raja.png"
              alt="Founder"
              width={400}
              height={500}
              className="founder-image"
              priority
            />
          </div>
        </div>
        <footer className="footer">
          <div className="footer-content">

            <p>
              Bhandewadi Sevakendra
            </p>
          </div>
        </footer>
      </section>
    </main>
  );
}
