"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./registration.css";

export default function RegistrationPage() {
  const [id, setId] = useState<number>(1);
  const [form, setForm] = useState<any>({ Sevakendra: "Bhandewadi" });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchNextId();
  }, []);

  async function fetchNextId() {
    const res = await fetch("/api/get-next-number", { method: "POST" });
    const data = await res.json();
    if (data?.next) setId(data.next);
  }

  function update(e: any) {
    let value = e.target.value;
    if (e.target.name === "Name") {
      value = value.replace(/\b\w/g, (c: string) => c.toUpperCase());
    }
    setForm({ ...form, [e.target.name]: value });
  }

  async function submit(e: any) {
    e.preventDefault();

    const required = [
      "Name",
      "PhoneNumber",
      "Address",
      "Bloodgroup",
      "Sevakendra",
      "DateofBirth",
    ];

    const missing = required.filter((r) => !form[r]);
    if (missing.length) {
      alert("Please fill required fields");
      return;
    }

    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ID: id }),
      });

      const contentType = res.headers.get("content-type");
      let data: any = {};

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("Non-json response received:", text);
        throw new Error("Server returned an invalid response. Please try again later.");
      }

      if (res.ok) {
        setSuccess(true);
        setForm({ Sevakendra: "Bhandewadi" });
        fetchNextId();
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert(data.error || "Error saving data");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      alert(err.message || "Something went wrong. Please check your connection or try again.");
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
            <h1 className="card-title">Donation Registration</h1>
            <p className="card-subtitle">
              Join our mission to save lives. Please provide accurate registration details.
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
                value={form.Name || ""}
                onChange={update}
              />
            </div>

            <div className="form-group">
              <label>Phone Number<span className="required">*</span></label>
              <input
                name="PhoneNumber"
                type="tel"
                maxLength={10}
                placeholder="10-digit number"
                value={form.PhoneNumber || ""}
                onChange={update}
              />
            </div>

            <div className="form-group">
              <label>Aadhaar Number</label>
              <input
                name="AdharNumber"
                maxLength={12}
                placeholder="12-digit Aadhaar"
                value={form.AdharNumber || ""}
                onChange={update}
              />
            </div>

            <div className="form-group">
              <label>Blood Group<span className="required">*</span></label>
              <select name="Bloodgroup" value={form.Bloodgroup || ""} onChange={update}>
                <option value="">Select Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth<span className="required">*</span></label>
              <input
                type="date"
                name="DateofBirth"
                value={form.DateofBirth || ""}
                onChange={update}
              />
            </div>

            <div className="form-group">
              <label>Sevakendra<span className="required">*</span></label>
              <select name="Sevakendra" value={form.Sevakendra || ""} onChange={update}>
                <option value="">Select Kendra</option>
                <option>Bhandewadi</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="Email"
                placeholder="example@mail.com"
                value={form.Email || ""}
                onChange={update}
              />
            </div>

            <div className="form-group full-width">
              <label>Residential Address<span className="required">*</span></label>
              <textarea
                name="Address"
                placeholder="Enter full address"
                value={form.Address || ""}
                onChange={update}
              />
            </div>

            <div className="buttons">
              <button type="submit" className="save-btn">Save Registration</button>
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
