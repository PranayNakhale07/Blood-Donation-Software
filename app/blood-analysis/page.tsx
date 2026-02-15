"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import "./blood-analysis.css";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function BloodAnalysisPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [yearlyData, setYearlyData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const target = 200;

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await fetch("/api/blood-analysis");
    const data = await res.json();
    setRows(data.data);
    setYearlyData(data.yearlyData || []);
    setTotal(data.total);
  }

  const chartColors = [
    "rgba(139, 0, 0, 0.8)",
    "rgba(182, 165, 72, 0.8)",
    "rgba(51, 51, 51, 0.8)",
    "rgba(168, 50, 50, 0.8)",
    "rgba(212, 193, 91, 0.8)",
    "rgba(85, 85, 85, 0.8)",
  ];

  const chartBorderColors = chartColors.map(c => c.replace("0.8", "1"));

  const labels = rows.map(r => r.label);
  const values = rows.map(r => r.count);

  const yearlyLabels = yearlyData.map(y => y.year || 'Unknown');
  const yearlyPercentages = yearlyData.map(y => ((y.count / target) * 100).toFixed(1));

  return (
    <div className="analysis-page-container">
      <header className="analysis-header">
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Back to Dashboard</span>
        </Link>
      </header>

      <main className="analysis-content">
        <div className="controls-row">
          <button className="refresh-btn" onClick={loadData}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            Refresh Data
          </button>
        </div>

        <div className="charts-grid">

          <div className="chart-card">
            <h3>Registered Donors</h3>
            <div className="summary-value">
              <span className="summary-number">{total}</span>
              <span className="summary-target">Target: {target} entries</span>
            </div>
          </div>


          <div className="chart-card">
            <h3>Mission Progress</h3>
            <Doughnut
              data={{
                labels: ["Completed", "Remaining"],
                datasets: [
                  {
                    data: [
                      Math.min(total, target),
                      Math.max(target - total, 0),
                    ],
                    backgroundColor: ["#4CAF50", "#eee"],
                    hoverBackgroundColor: ["#45a049", "#e0e0e0"],
                    borderWidth: 0,
                  },
                ],
              }}
              options={{
                cutout: "75%",
                plugins: {
                  legend: { position: 'bottom' }
                }
              }}
            />
          </div>


          <div className="chart-card">
            <h3>Blood Group Distribution</h3>
            <Pie
              data={{
                labels,
                datasets: [
                  {
                    data: values,
                    backgroundColor: chartColors,
                    borderColor: "white",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { position: 'bottom' }
                }
              }}
            />
          </div>


          <div className="chart-card">
            <h3>Donor Counts by Group</h3>
            <Bar
              data={{
                labels,
                datasets: [
                  {
                    label: "Count",
                    data: values,
                    backgroundColor: "rgba(139, 0, 0, 0.7)",
                    borderColor: "rgba(139, 0, 0, 1)",
                    borderWidth: 1,
                    borderRadius: 8,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { precision: 0 }
                  }
                },
                plugins: {
                  legend: { display: false }
                }
              }}
            />
          </div>

          <div className="chart-card">
            <h3>Yearly Donation %</h3>
            <Bar
              data={{
                labels: yearlyLabels,
                datasets: [
                  {
                    label: "Percentage",
                    data: yearlyPercentages,
                    backgroundColor: "rgba(54, 162, 235, 0.7)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                    borderRadius: 8,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { callback: (v) => v + '%' }
                  }
                },
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (context) => context.raw + '%'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
