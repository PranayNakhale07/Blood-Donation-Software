"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./dashboard.css";

export default function DashboardContent() {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (showPopup) {
            const t = setTimeout(() => setShowPopup(false), 3000);
            return () => clearTimeout(t);
        }
    }, [showPopup]);

    useEffect(() => {
        const slides = document.querySelectorAll(".slider-img");
        let index = 0;

        const interval = setInterval(() => {
            slides.forEach((s) => s.classList.remove("active"));
            if (slides[index]) slides[index].classList.add("active");
            index = (index + 1) % slides.length;
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    async function handleLogout() {
        await fetch("/api/logout", { method: "POST" });
        window.location.href = "/login";
    }

    function handleComingSoon(e: React.MouseEvent) {
        e.preventDefault();
        setPopupMessage("This feature will be Coming Soon!");
        setShowPopup(true);
        setSidebarOpen(false);
    }

    return (
        <div className="dashboard-container">

            <div
                className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
            ></div>


            <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <Image
                        src="/positive-blood-group-3d-icon-png-download-4897215.webp"
                        className="sidebar-logo"
                        alt="JNMF Logo"
                        width={50}
                        height={50}
                    />
                    <div className="sidebar-title">
                        Blood Donation
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-group">
                        <Link href="/dashboard" className="nav-item active" onClick={() => setSidebarOpen(false)}>
                            Dashboard
                        </Link>
                    </div>

                    <div className="nav-group">
                        <div className="nav-group-title">Services</div>
                        <Link href="/blood-analysis" className="nav-item" onClick={() => setSidebarOpen(false)}>
                            Blood Analysis
                        </Link>
                    </div>

                    <div className="nav-group">
                        <div className="nav-group-title">Donors</div>
                        <Link href="/registration" className="nav-item" onClick={() => setSidebarOpen(false)}>
                            Donor Registration
                        </Link>
                        <Link href="/update-info" className="nav-item" onClick={() => setSidebarOpen(false)}>
                            Update Information
                        </Link>
                    </div>

                    <div className="nav-group">
                        <div className="nav-group-title">Communication</div>
                        <Link href="/seedetails" className="nav-item" onClick={() => setSidebarOpen(false)}>
                            Call Details
                        </Link>
                        <Link href="/send-message" className="nav-item" onClick={() => setSidebarOpen(false)}>
                            Send Message
                        </Link>
                    </div>

                    <div className="nav-group">
                        <div className="nav-group-title">Others</div>
                        <Link href="/contact" className="nav-item" onClick={() => setSidebarOpen(false)}>
                            Contact Support
                        </Link>
                        <Link href="/save-old-data" className="nav-item" onClick={() => setSidebarOpen(false)}>
                            Save Old Data
                        </Link>
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <span>Logout</span>
                    </button>
                </div>
            </aside>


            <main className="main-content">

                <header className="mobile-header">
                    <div className="logo-section">
                        <Image
                            src="/positive-blood-group-3d-icon-png-download-4897215.webp"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                        <span style={{ fontWeight: 'bold', marginLeft: '10px', color: '#8B0000' }}>JNMF</span>
                    </div>
                    <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
                        ☰
                    </button>
                </header>

                <div className="content-scroll-area">
                    {showPopup && (
                        <div id="popup-message">
                            {popupMessage || "Login success! Welcome to Blood Donation Camp."}
                        </div>
                    )}

                    <div className="dashboard-header">
                        <h1 className="page-title">
                            Jagadguru Ramanandacharya Narendracharyaji Foundation
                        </h1>
                        <p className="page-subtitle">
                            The Jagadguru Ramanandacharya Narendracharyaji Foundation at Nanijdham, Ratnagiri, Maharashtra, was founded by Shrimad Jagadguru Ramanandacharya Narendracharyaji Maharaj. It serves society through education, healthcare, blood donation, food distribution,
                            de-addiction programs, and spiritual guidance, working on the principle of “Spirituality in the Service of Humanity.” The foundation supports the poor and needy,
                            runs schools and Vedic learning centers, and has been honored with awards like the International Peace Honour, Veer Savarkar Award, and Indian Red Cross Society Award.
                        </p>
                    </div>

                    <div className="slider-container">
                        <Image src="/nanij-math-01.jpg" alt="Math Image 1" width={900} height={500} className="slider-img active" />
                        <Image src="/maxresdefault (2).jpg" alt="Math Image 2" width={900} height={500} className="slider-img" />
                        <Image src="/FAi7tziUYAIWM6W.jpg" alt="Math Image 3" width={900} height={500} className="slider-img" />
                        <Image src="/maxresdefault.jpg" alt="Math Image 4" width={900} height={500} className="slider-img" />
                        <Image src="/maxresdefault (1).jpg" alt="Math Image 5" width={900} height={500} className="slider-img" />
                    </div>

                    <div className="card">
                        <h2>🌿 Vasundhara Paayi Dindi</h2>
                        <p className="card-text">
                            The Jagadguru Ramanandacharya Narendracharyaji Foundation is deeply engaged in
                            both spiritual and social service, with initiatives like the Vasundhara Paayi Dindi and
                            large-scale blood donation drives forming its core activities. <br /><br />

                            The Vasundhara Paayi Dindi is one of the foundation’s most distinctive spiritual and
                            social movements. It is a mass pilgrimage walk (Padayatra) where thousands of devotees
                            march together, chanting bhajans and spreading awareness about environmental protection,
                            social harmony, and spiritual discipline. The Dindi is not just a religious procession
                            but a campaign for ecological balance, urging people to respect nature, reduce pollution,
                            and live sustainably. Maharaj emphasizes that protecting Mother Earth is a sacred duty,
                            and through this initiative, the foundation has inspired communities across Maharashtra
                            to plant trees, conserve water, and adopt eco-friendly practices. The Dindi also strengthens
                            unity among devotees, reminding them that spirituality must be expressed through service to
                            society and the environment.This initiative, often organized around Maharaj’s birthday
                            celebrations, emphasizes the protection of Mother Earth and highlights the importance of
                            balancing industrial progress with ecological preservation. Through this Dindi, the
                            foundation inspires people to live in harmony with nature, reminding them that
                            spirituality is not only about rituals but also about safeguarding the environment for
                            future generations.
                        </p>
                    </div>

                    <div className="card">
                        <h2>🩸 Blood Donation & Healthcare Service</h2>
                        <p className="card-text">
                            Blood donation is a cornerstone of the foundation’s humanitarian work. Regular blood
                            donation camps are organized in both rural and urban areas, often in collaboration with
                            hospitals and health organizations. These camps have collected hundreds of units of
                            blood at a time, ensuring that patients in need—especially those from underprivileged
                            backgrounds—receive timely support. Beyond blood donation, the foundation provides free
                            ambulance services, medical check-ups, de-addiction programs, and healthcare awareness
                            drives. Maharaj stresses that true devotion lies in saving lives, and the foundation’s
                            volunteers embody this by mobilizing communities to participate in life-saving initiatives.
                            The blood donation drives are often paired with food distribution and health awareness
                            programs, creating a holistic approach to service. By combining spiritual teachings with
                            practical humanitarian action, the foundation has become a beacon of compassion, ensuring
                            that no one is left behind in times of medical need.Equally impactful are the
                            foundation’s blood donation initiatives, which have become a hallmark of its humanitarian
                            service. Camps are regularly organized in both rural and urban areas, including Mumbai,
                            Chandivali, and Goregaon, where hundreds of units of blood are collected to support
                            hospitals and patients in need. For example, a recent camp successfully gathered 190
                            units of blood across multiple locations, demonstrating the foundation’s ability to
                            mobilize communities for life-saving causes. These drives are part of a larger mission
                            to provide free healthcare services, ambulance facilities, and medical aid to the poor
                            and needy. By combining spiritual guidance with practical social service, the foundation
                            ensures that its followers not only engage in devotion but also actively contribute to
                            saving lives. This dual focus on environmental conservation and blood donation reflects
                            Maharaj’s vision of “Spirituality in the Service of Humanity”, making the foundation a
                            beacon of compassion and service.
                        </p>
                    </div>

                    <footer className="dashboard-footer">
                        © 2025 Blood Donation Software By Team JRNMF. All Rights Reserved. <br />
                        📞 Helpline: +919373830912 | 📞 Blood Issue: +919619171004 | 📍 Nanijdham, Ratnagiri
                    </footer>
                </div>
            </main>
        </div>
    );
}
