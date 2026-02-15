"use client";

import { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./seedetails.css";

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
export default function SeeDetailsPage() {
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
              <h1 className="card-title">Donor Registration Details</h1>
              <p className="card-subtitle">Comprehensive list of all registered blood donors.</p>
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
              <button className="btn print-btn" onClick={printPDF}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download PDF
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
                  <th>Email</th>
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
                      <td>{d.Email || ""}</td>
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
