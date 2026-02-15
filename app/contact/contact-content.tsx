"use client";

import Link from "next/link";
import Image from "next/image";
import "./contact.css";

export default function ContactContent() {
    return (
        <div className="contact-page-container">
            <header className="contact-header">
                <div className="logo-section">
                    <Image
                        src="/positive-blood-group-3d-icon-png-download-4897215.webp"
                        alt="JNMF Logo"
                        width={50}
                        height={50}
                    />
                    <div className="logo-text">
                        <div style={{ color: '#ffd700' }}>Blood Donation</div>
                    </div>
                </div>

                <Link href="/dashboard" className="back-btn">
                    <span>Back to Dashboard</span>
                </Link>
            </header>

            <main className="contact-content">
                <div className="contact-card">
                    <div className="card-header">
                        <h1 className="card-title">Get in Touch</h1>
                        <p className="card-subtitle">
                            We are here to help. Reach out to the Jagadguru Narendracharyaji Foundation for any assistance regarding blood donation or our services.
                        </p>
                    </div>

                    <div className="info-grid">

                        <div className="info-item">
                            <div className="icon-wrapper">
                                <svg className="info-icon" viewBox="0 0 24 24">
                                    <path d="M12 2C8.7 2 6 4.7 6 8c0 5.3 6 12 6 12s6-6.7 6-12c0-3.3-2.7-6-6-6zm0 8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                                </svg>
                            </div>
                            <h3 className="info-title">Visit Us</h3>
                            <div className="info-text">
                                Ramanandacharya Dakshinpeeth,<br />
                                Nanij Dham, Ratnagiri – 415803,<br />
                                Maharashtra, India
                            </div>
                        </div>


                        <div className="info-item">
                            <div className="icon-wrapper">
                                <svg className="info-icon" viewBox="0 0 24 24">
                                    <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2c1.1.4 2.3.6 3.5.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.9 21 3 12.1 3 2a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.6 3.5a1 1 0 0 1-.3 1l-2.2 2.3z" />
                                </svg>
                            </div>
                            <h3 className="info-title">Call Us</h3>
                            <div className="info-text">
                                <a href="tel:+917774032355" className="contact-link">+91 777 403 2355</a>
                                <br />
                                <a href="tel:+918805410196" className="contact-link">+91 880 541 0196</a>
                            </div>
                        </div>


                        <div className="info-item">
                            <div className="icon-wrapper">
                                <svg className="info-icon" viewBox="0 0 24 24">
                                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5.9 6H14.7a15.7 15.7 0 0 0-1.5-3.4A8 8 0 0 1 17.9 8zM12 4.1c.9 1.1 1.6 2.5 2 3.9h-4c.4-1.4 1.1-2.8 2-3.9z" />
                                </svg>
                            </div>
                            <h3 className="info-title">Online</h3>
                            <div className="info-text">
                                <a href="https://www.ramanandacharyananijdham.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                                    www.ramanandacharyananijdham.com
                                </a>
                            </div>
                        </div>
                    </div>


                </div>
            </main>
        </div>
    );
}
