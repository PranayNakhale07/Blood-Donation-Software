"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./save-old-data.css";

export default function SaveOldDataPage() {
    const [id, setId] = useState<number | "">("");
    const [form, setForm] = useState({
        Name: "",
        PhoneNumber: "",
        Gender: "",
        Bloodgroup: "",
        Year: ""
    });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNextId();
    }, []);

    async function fetchNextId() {
        try {
            const res = await fetch("/api/olddata/next-id");
            const data = await res.json();
            setId(data.next_id);
        } catch (error) {
            console.error("Failed to fetch next ID", error);
        }
    }

    function update(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/olddata", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    name: form.Name,
                    phone: form.PhoneNumber,
                    gender: form.Gender,
                    bloodgroup: form.Bloodgroup,
                    year: form.Year
                })
            });

            if (res.ok) {
                setSuccess(true);
                setForm({
                    Name: "",
                    PhoneNumber: "",
                    Gender: "",
                    Bloodgroup: "",
                    Year: ""
                });
                fetchNextId();
                setTimeout(() => setSuccess(false), 3000);
            } else {
                alert("Failed to save data");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving data");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="registration-page-container">
            <header className="registration-header">
                <div className="logo-section">
                    <img
                        src="/positive-blood-group-3d-icon-png-download-4897215.webp"
                        className="logo-img"
                        alt="JNMF Logo"
                    />
                    <div className="logo-text">
                        <div>Blood Donation</div>
                    </div>
                </div>

                <Link href="/dashboard" className="back-btn">
                    <span>Back to Dashboard</span>
                </Link>
            </header>

            <main className="registration-content">
                <div className="registration-card">
                    <div className="card-header">
                        <h1 className="card-title">Save Old Data</h1>
                        <p className="card-subtitle">
                            Enter historical donor records to maintain the archive.
                        </p>
                    </div>

                    <form onSubmit={submit}>
                        <div className="form-group">
                            <label>Registration ID<span className="required">*</span></label>
                            <input value={id} readOnly />
                        </div>

                        <div className="form-group">
                            <label>Name of Donor<span className="required">*</span></label>
                            <input
                                name="Name"
                                placeholder="Full Name"
                                value={form.Name}
                                onChange={update}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number<span className="required">*</span></label>
                            <input
                                name="PhoneNumber"
                                type="tel"
                                maxLength={10}
                                placeholder="10-digit number"
                                value={form.PhoneNumber}
                                onChange={update}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Gender<span className="required">*</span></label>
                            <select name="Gender" value={form.Gender} onChange={update} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Blood Group<span className="required">*</span></label>
                            <select name="Bloodgroup" value={form.Bloodgroup} onChange={update} required>
                                <option value="">Select Group</option>
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Rh_ve"].map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Year<span className="required">*</span></label>
                            <input
                                name="Year"
                                type="number"
                                placeholder="YYYY"
                                min="1900"
                                max="2099"
                                value={form.Year}
                                onChange={update}
                                required
                            />
                        </div>

                        <div className="buttons">
                            <button type="submit" className="save-btn" disabled={loading}>
                                {loading ? "Saving..." : "Save Record"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            {success && (
                <div className="success-message">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Data saved successfully!
                </div>
            )}
        </div>
    );
}
