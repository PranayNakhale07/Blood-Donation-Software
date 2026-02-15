# Blood Donation Management System | JNMF

A robust web application built for the **Jagadguru Ramanandacharya Narendracharyaji Foundation (JNMF)** to manage blood donation campaigns efficiently. The system bridges the gap between donors and those in need, ensuring a safe and streamlined process.

## 🩸 Features

- **User Registration & Authentication**: Secure login and registration for donors.
- **Blood Analysis Dashboard**: Detailed tracking and analysis of blood donations.
- **Twilio Integration**: SMS notifications and communication management.
- **Interactive Charts**: Visual representation of donation data using Chart.js.
- **PDF Generation**: Export donation details and reports using jsPDF.
- **Responsive Design**: Polished UI built with Tailwind CSS for all devices.
- **SEO Optimized**: Built-in best practices for search engine visibility.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database**: SQLite with [Prisma ORM](https://www.prisma.io/)
- **Styling**: Vanilla CSS & [Tailwind CSS](https://tailwindcss.com/)
- **Communications**: [Twilio SDK](https://www.twilio.com/)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)
- **PDF Export**: [jsPDF](https://github.com/parallax/jsPDF) & [jspdf-autotable](https://github.com/simonbengtsson/jspdf-autotable)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DevForsure/Blood-Donation---JNMF.git
   cd Blood-Donation---JNMF
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your configurations (refer to `.env.example` if available).

4. **Initialize Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### Running the App

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/app`: Next.js App Router pages and API routes.
- `/prisma`: Database schema and migrations.
- `/public`: Static assets like images and icons.
- `/lib`: Utility functions and shared logic.

## 📖 Learn More -

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Developed with ❤️ for **JNMF**.

