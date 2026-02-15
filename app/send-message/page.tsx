"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./send-message.css";

type Donor = {
    Id: number;
    Name: string;
    PhoneNumber: string;
    Bloodgroup: string;
    Year: string;
};

export default function SendMessagePage() {
    const [donors, setDonors] = useState<Donor[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [years, setYears] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState("");

    useEffect(() => {
        fetch("/api/olddata/years")
            .then(res => res.json())
            .then(data => setYears(data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (!selectedYear) {
            setDonors([]);
            return;
        }

        async function fetchDonors() {
            try {
                const res = await fetch(`/api/olddata/list?year=${selectedYear}`);
                const data = await res.json();
                setDonors(data);
                setCurrentPage(1);
            } catch (error) {
                console.error(error);
            }
        }
        fetchDonors();
    }, [selectedYear]);

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [sending, setSending] = useState(false);

    const filteredDonors = donors.filter((d) => {
        const term = searchTerm.toLowerCase();
        return (
            d.Id.toString().includes(term) ||
            (d.Name && d.Name.toLowerCase().includes(term)) ||
            (d.PhoneNumber && d.PhoneNumber.includes(term)) ||
            (d.Bloodgroup && d.Bloodgroup.toLowerCase().includes(term))
        );
    });

    function toggleSelectAll() {
        if (selectedIds.length === filteredDonors.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredDonors.map(d => d.Id));
        }
    }

    function toggleSelect(id: number) {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    }
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
        doc.text(`Old Donor Data - ${selectedYear}`, 40, 90);
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
                "Year",
                "Blood Group"
            ]],
            body: donors.map(d => [
                d.Id,
                d.Name,
                d.PhoneNumber,
                d.Year || "-",
                d.Bloodgroup
            ]),
            styles: { fontSize: 10 },
        });

        const fileName = selectedYear ? `old_donor_data_${selectedYear}.pdf` : "old_donor_data.pdf";
        doc.save(fileName);
    }
    async function handleSendMessage() {
        if (selectedIds.length === 0) return;
        setSending(true);

        alert("Comming Soon");
        setSending(false);
        setSelectedIds([]);
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
                            <h1 className="card-title">Send Messages</h1>
                            <p className="card-subtitle">Select donors to send SMS updates.</p>
                        </div>
                        <div className="action-buttons">
                            <button
                                className="btn print-btn"
                                onClick={handleSendMessage}
                                disabled={selectedIds.length === 0 || sending}
                                style={{ opacity: selectedIds.length === 0 ? 0.6 : 1 }}
                            >
                                {sending ? "Sending..." : `Send Message`}
                            </button>
                            <button className="btn print-btn" onClick={printPDF}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Download PDF
                            </button>

                            <select
                                className="year-select"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '30px',
                                    border: '1px solid #e0e0e0',
                                    outline: 'none',
                                    marginRight: '15px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    color: '#555'
                                }}
                            >
                                <option value="">Select Year</option>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>

                            <div className="search-box">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '50px', textAlign: 'center' }}>
                                        <input
                                            type="checkbox"
                                            checked={filteredDonors.length > 0 && selectedIds.length === filteredDonors.length}
                                            onChange={toggleSelectAll}
                                        />
                                    </th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Year</th>
                                    <th>Blood Group</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donors.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                            Loading donors...
                                        </td>
                                    </tr>
                                ) : filteredDonors.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                            No donors found using "{searchTerm}"
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDonors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((d) => (
                                        <tr key={d.Id} onClick={() => toggleSelect(d.Id)} style={{ cursor: 'pointer', backgroundColor: selectedIds.includes(d.Id) ? '#fff8f8' : 'inherit' }}>
                                            <td style={{ textAlign: 'center' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(d.Id)}
                                                    onChange={() => { }}
                                                />
                                            </td>
                                            <td>{d.Id}</td>
                                            <td>{d.Name}</td>
                                            <td>{d.PhoneNumber}</td>
                                            <td>{d.Year || "-"}</td>
                                            <td>{d.Bloodgroup}</td>
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
        </div>
    );
}
