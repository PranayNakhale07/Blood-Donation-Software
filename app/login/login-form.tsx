"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./login.css";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState<"success" | "error" | "">("");

    useEffect(() => {
        if (popupMessage) {
            const t = setTimeout(() => {
                setPopupMessage("");
                setPopupType("");
            }, 3000);
            return () => clearTimeout(t);
        }
    }, [popupMessage]);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        if (!username.trim()) {
            showFormPopup("Please enter your username.");
            return;
        }
        if (!password.trim()) {
            showFormPopup("Please enter your password.");
            return;
        }

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            setPopupType("success");
            setPopupMessage("Login success! Welcome to Blood Donation Camp.");
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1200);
        } else {
            setPopupType("error");
            setPopupMessage(
                "Wrong credentials! Please enter valid username and password."
            );
        }
    }

    function showFormPopup(msg: string) {
        const popup = document.getElementById("form-popup");
        if (!popup) return;
        popup.textContent = msg;
        popup.style.display = "block";
        setTimeout(() => (popup.style.display = "none"), 2500);
    }

    function togglePassword() {
        const field = document.getElementById("password") as HTMLInputElement;
        if (field) field.type = field.type === "password" ? "text" : "password";
    }

    return (
        <>
            <div id="popup">
                <div id="popup-content">
                    <Image
                        src="/raja.avif"
                        className="popup-image"
                        alt="Startup Animation"
                        width={190}
                        height={190}
                        priority
                    />
                    🙏🙏 Jai Shri Ram 🙏🙏
                </div>
            </div>

            <div id="form-popup"></div>

            {popupMessage && (
                <div id="popup-message" className={popupType}>
                    {popupMessage}
                </div>
            )}

            <div className="container">
                <div className="left-panel">
                    <Image
                        src="/mphoto.png"
                        className="logo"
                        alt="Blood Donation Logo"
                        width={400}
                        height={300}
                        priority
                    />
                    <div className="title">
                        Blood Donation
                        <br />
                        Jagadguru Ramanandacharya Narendracharyaji Foundation
                    </div>
                    <div className="marathi-quote">❀ तुम्ही जगा दुसऱ्याला जगवा ❀</div>
                </div>

                <div className="right-panel">
                    <Image
                        src="/positive-blood-group-3d-icon-png-download-4897215.webp"
                        className="blood-logo"
                        alt="Blood Group Icon"
                        width={90}
                        height={90}
                    />

                    <form className="login-form" onSubmit={handleLogin}>
                        <h1>Login</h1>

                        <label htmlFor="username">Enter Username:</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />

                        <label htmlFor="password">Enter Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />

                        <label className="show-password">
                            <input type="checkbox" onClick={togglePassword} /> Show Password
                        </label>

                        <input type="submit" value="Login" />
                    </form>
                </div>
            </div>
        </>
    );
}
