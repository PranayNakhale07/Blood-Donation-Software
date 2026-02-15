"use client";

import { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./update-info.css";

type Donor = {
    Id: number;
    Name: string;
    PhoneNumber: string;
    AdharNumber: string;
    Address: string;
    Bloodgroup: string;
    Sevakendra: string;
    DateofBirth: string;
    Email?: string;
};
export default function UpdateInfoPage() {
    const [donors, setDonors] = useState<Donor[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    async function loadData() {
        const res = await fetch("/api/donors");
        const data = await res.json();
        setDonors(data);
        setCurrentPage(1);
    }

    const filteredDonors = donors.filter((d) => {
        const term = searchTerm.toLowerCase();
        return (
            d.Id.toString().includes(term) ||
            (d.Name && d.Name.toLowerCase().includes(term)) ||
            (d.PhoneNumber && d.PhoneNumber.includes(term)) ||
            (d.Bloodgroup && d.Bloodgroup.toLowerCase().includes(term))
        );
    });

    function printPDF() {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "pt",
            format: "a4",
        });

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(
            "Jagadguru Ramanandacharya Narendracharyaji Foundation",
            doc.internal.pageSize.getWidth() / 2,
            40,
            { align: "center" }
        );

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(
            "(Bhandewadi Sevakendra)",
            doc.internal.pageSize.getWidth() / 2,
            60,
            { align: "center" }
        );

        const currentDate = new Date().toLocaleDateString();
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Donor Registration Detail", 40, 90);
        doc.text(
            currentDate,
            doc.internal.pageSize.getWidth() - 40,
            90,
            { align: "right" }
        );

        autoTable(doc, {
            startY: 110,
            head: [[
                "ID",
                "Name",
                "Phone",
                "Adhar",
                "Address",
                "Blood Group",
                "Sevakendra",
                "DOB",
                "Email",
            ]],
            body: donors.map(d => [
                d.Id,
                d.Name,
                d.PhoneNumber,
                d.AdharNumber,
                d.Address,
                d.Bloodgroup,
                d.Sevakendra,
                d.DateofBirth,
                d.Email || "",
            ]),
            styles: { fontSize: 10 },
        });

        doc.save("donor_details.pdf");
    }

    const [editingDonor, setEditingDonor] = useState<Donor | null>(null);

    function handleEdit(donor: Donor) {
        setEditingDonor({ ...donor });
    }

    function handleCloseModal() {
        setEditingDonor(null);
    }

    async function handleSave() {
        if (!editingDonor) return;

        try {
            const res = await fetch("/api/donors", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingDonor)
            });

            if (res.ok) {
                alert("Donor updated successfully");
                handleCloseModal();
                loadData();
            } else {
                const data = await res.json();
                alert("Failed to update: " + data.error);
            }
        } catch (err: any) {
            alert("Error updating donor: " + err.message);
        }
    }

    return (
        <div className="details-page-container">
            <header className="details-header">
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

            <main className="details-content">
                <div className="details-card">
                    <div className="card-header">
                        <div className="card-title-section">
                            <h1 className="card-title">Update Donor Details</h1>
                            <p className="card-subtitle">Manage and update registered donor information.</p>
                        </div>
                        <div className="action-buttons">
                            <div className="search-box">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search by ID, Name, Contact..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                                {searchTerm && (
                                    <button
                                        className="clear-search-btn"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setCurrentPage(1);
                                        }}
                                        title="Clear search"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <button className="btn view-btn" onClick={loadData}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                View Records
                            </button>
                        </div>
                    </div>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Adhar</th>
                                    <th>Address</th>
                                    <th>Blood Group</th>
                                    <th>Sevakendra</th>
                                    <th>DOB</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donors.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                            Click "View Records" to load donor data.
                                        </td>
                                    </tr>
                                ) : filteredDonors.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                            No donors found matching "{searchTerm}"
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDonors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((d) => (
                                        <tr key={d.Id}>
                                            <td>{d.Id}</td>
                                            <td>{d.Name}</td>
                                            <td>{d.PhoneNumber}</td>
                                            <td>{d.AdharNumber}</td>
                                            <td>{d.Address}</td>
                                            <td>{d.Bloodgroup}</td>
                                            <td>{d.Sevakendra}</td>
                                            <td>{d.DateofBirth}</td>
                                            <td>
                                                <button
                                                    className="btn view-btn"
                                                    style={{ padding: '4px 12px', fontSize: '12px' }}
                                                    onClick={() => handleEdit(d)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {filteredDonors.length > itemsPerPage && (
                        <div className="pagination">
                            <button
                                className="pag-btn"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                            >
                                Previous
                            </button>
                            <span className="pag-info">
                                Page {currentPage} of {Math.ceil(filteredDonors.length / itemsPerPage)}
                            </span>
                            <button
                                className="pag-btn"
                                disabled={currentPage === Math.ceil(filteredDonors.length / itemsPerPage)}
                                onClick={() => setCurrentPage(p => p + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {editingDonor && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Edit Donor Details</h2>
                            <button className="close-btn" onClick={handleCloseModal}>&times;</button>
                        </div>

                        <div className="modal-form">
                            <div className="form-group">
                                <label>Registration ID</label>
                                <input
                                    type="text"
                                    value={editingDonor.Id}
                                    disabled
                                    title="ID cannot be changed"
                                />
                            </div>

                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={editingDonor.Name || ""}
                                    onChange={e => setEditingDonor({ ...editingDonor, Name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    value={editingDonor.PhoneNumber || ""}
                                    onChange={e => setEditingDonor({ ...editingDonor, PhoneNumber: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Aadhar Number</label>
                                <input
                                    type="text"
                                    value={editingDonor.AdharNumber || ""}
                                    onChange={e => setEditingDonor({ ...editingDonor, AdharNumber: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Blood Group</label>
                                <select
                                    value={editingDonor.Bloodgroup || ""}
                                    onChange={e => setEditingDonor({ ...editingDonor, Bloodgroup: e.target.value })}
                                >
                                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Rh_ve"].map(bg => (
                                        <option key={bg} value={bg}>{bg}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    value={editingDonor.DateofBirth || ""}
                                    onChange={e => setEditingDonor({ ...editingDonor, DateofBirth: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={editingDonor.Email || ''}
                                    onChange={e => setEditingDonor({ ...editingDonor, Email: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Sevakendra</label>
                                <input
                                    type="text"
                                    value={editingDonor.Sevakendra || ""}
                                    onChange={e => setEditingDonor({ ...editingDonor, Sevakendra: e.target.value })}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Address</label>
                                <textarea
                                    rows={3}
                                    value={editingDonor.Address || ""}
                                    onChange={e => setEditingDonor({ ...editingDonor, Address: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={handleCloseModal}>Cancel</button>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
