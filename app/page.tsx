import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./home.css";

export const metadata: Metadata = {
  title: "Welcome - Blood Donation Management | JNMF",
  description: "Join the Jagadguru Narendracharyaji Foundation (JNMF) blood donation campaign. Donate blood, save lives, and manage your registrations with ease.",
};

export default function Home() {
  return (
    <main>
      <nav className="navbar">
        <div className="nav-brand">
          <Image
            src="/positive-blood-group-3d-icon-png-download-4897215.webp"
            alt="JNMF Logo"
            width={50}
            height={50}
          />
          <span>Blood Donation</span>
        </div>
        <div className="nav-center">
          <h1 className="nav-campaign-title">2026 Camp & Memories</h1>
          <svg preserveAspectRatio="xMidYMid meet" data-bbox="20 96.999 160 6.001" viewBox="20 96.999 160 6.001" style={{ width: '100%', height: 'auto' }} xmlns="http://www.w3.org/2000/svg" data-type="color" role="presentation" aria-hidden="true" aria-label="">
            <g>
              <path fill="#524944" d="M103.348 102.986c-1.154 0-2.254-.283-2.926-1.038a2.5 2.5 0 0 1-.427-.679c-.334-.715-.632-2.226.388-3.309.754-.803 2.169-1.285 3.228-.703.598.323.86.891.945 1.121.046.123.435 1.232-.348 2.016-.57.576-1.358.554-1.586.535a.223.223 0 0 1-.208-.241.227.227 0 0 1 .251-.201c.124.011.772.044 1.211-.4.6-.601.262-1.52.247-1.559-.068-.184-.275-.635-.739-.885-.849-.466-2.041-.043-2.659.615-.861.913-.597 2.212-.306 2.836.092.216.206.398.354.565 1.085 1.22 3.73 1.084 5.659.248a6.7 6.7 0 0 0 1.451-.864.24.24 0 0 1 .145-.049l66.192-.021c.127 0 .231.099.231.222s-.103.222-.231.222l-66.111.021a7.2 7.2 0 0 1-1.487.874 8.7 8.7 0 0 1-3.274.674" data-color="1"></path>
              <path fill="#524944" d="M96.428 103a8.5 8.5 0 0 1-3.253-.688 7.3 7.3 0 0 1-1.483-.874l-65.911-.021c-.127 0-.231-.099-.231-.222s.103-.222.231-.222l65.992.021c.053 0 .105.018.146.05.297.235.789.575 1.445.864 1.929.834 4.576.968 5.664-.25.194-.22.294-.435.353-.564.288-.626.546-1.928-.311-2.837-.617-.657-1.809-1.08-2.658-.616-.508.275-.699.779-.732.878-.017.046-.354.968.239 1.566.446.446 1.087.412 1.21.4.13-.01.239.078.252.2a.225.225 0 0 1-.207.242c-.161.015-.994.059-1.587-.535-.776-.782-.389-1.893-.342-2.017.057-.17.3-.774.941-1.121 1.061-.579 2.474-.097 3.227.704 1.016 1.077.724 2.59.391 3.314a2.6 2.6 0 0 1-.424.672c-.664.744-1.762 1.053-2.952 1.053Z" data-color="1"></path>
              <path fill="#524944" d="M175.793 102.413q-.151.001-.326-.027c-.616-.102-1.511-.567-1.477-1.242.033-.646.9-.998 1.354-1.095.456-.096.831-.015.955.011 1.28.276 2.903.768 3.541.966.097.03.162.118.16.216a.22.22 0 0 1-.169.209c-.453.121-2.047.544-3.527.898-.076.018-.263.063-.511.063Zm-.005-1.965c-.104 0-.221.009-.345.035-.391.082-.976.356-.993.682-.017.331.585.699 1.095.784.308.051.554-.008.648-.03.997-.239 2.047-.509 2.762-.696a41 41 0 0 0-2.757-.729 2 2 0 0 0-.41-.046" data-color="1"></path>
              <path fill="#524944" d="M24.207 102.413c-.248 0-.435-.045-.511-.063a151 151 0 0 1-3.527-.898.22.22 0 0 1-.169-.209.22.22 0 0 1 .16-.216c.639-.198 2.264-.69 3.542-.966.123-.027.498-.107.954-.011.454.096 1.322.448 1.355 1.095.034.675-.861 1.14-1.477 1.242a2 2 0 0 1-.326.027Zm-3.162-1.189c.733.192 1.768.458 2.762.696.092.022.338.081.647.03.51-.084 1.112-.453 1.095-.784-.016-.326-.602-.6-.993-.682a1.8 1.8 0 0 0-.754.011c-.902.194-1.983.499-2.757.729" data-color="1"></path>
            </g>
          </svg>
        </div>

        <div className="nav-links">
          <Link href="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </nav>

      <section className="hero1">
        <div className="hero-container1">
          <div className="hero-content1">
            <h1 className="hero-title1">
              Jagadguru Ramanandacharya Narendracharyaji Foundation
            </h1>
            <p className="hero-subtitle1">
              Bridging the gap between donors and those in need. Join our mission to ensure a safe and healthy blood supply for society.
            </p>
            <span className="marathi-quote-hero1">
              "तुम्ही जगा दुसऱ्याला जगवा"
            </span>
            <div className="hero-buttons1">
              <Link href="/login" className="btn btn-primary btn-large">
                Donate Now (Login)
              </Link>
            </div>
          </div>
          <div className="founder-image-container1">
            <Image
              src="/raja.png"
              alt="Founder"
              width={400}
              height={500}
              className="founder-image1"
              priority
            />
          </div>
        </div>
      </section>

      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Blood Donation Camp at Bhandewadi Sevakendra
              On 11 January 2026
            </h1>
            <p className="hero-subtitle">
              the Jagadguru Ramanandacharya Maharaj Sansthan organized a blood donation camp at Bhandewadi Sevakendra, Gajanan Mandir, Pardi, Nagpur (Prabhag 7).
              With the support of Sai Blood Bank, the camp successfully collected blood from 122 donors . This achievement was made possible through the dedicated efforts of both the organizing team and the Sai Blood Bank staff, who ensured smooth management and safe collection.
              The event highlighted the power of community service and the importance of working together for a noble cause.
            </p>
          </div>
          <div className="founder-image-container">
            <Image
              src="/hero.jpeg"
              alt="Founder"
              width={400}
              height={500}
              className="founder-image"
              priority
            />
          </div>
        </div>
        <div>

        </div>
      </section>
      <section className="memory-gallery">
        <h2 className="section-title">Camp Memories</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            <Image
              src="/camp/photo1.jpeg"
              alt="Camp Memory 1"
              width={400}
              height={300}
              className="gallery-image"
            />
          </div>
          <div className="gallery-item">
            <Image
              src="/camp/photo2.jpeg"
              alt="Camp Memory 2"
              width={400}
              height={300}
              className="gallery-image"
            />
          </div>
          <div className="gallery-item">
            <Image
              src="/camp/photo3.jpeg"
              alt="Camp Memory 3"
              width={400}
              height={300}
              className="gallery-image"
            />
          </div>
          <div className="gallery-item">
            <Image
              src="/camp/photo4.jpeg"
              alt="Camp Memory 4"
              width={400}
              height={300}
              className="gallery-image"
            />
          </div>
          <div className="gallery-item">
            <Image
              src="/camp/photo5.jpeg"
              alt="Camp Memory 5"
              width={400}
              height={300}
              className="gallery-image"
            />
          </div>
          <div className="gallery-item">
            <Image
              src="/camp/photo6.jpeg"
              alt="Camp Memory 6"
              width={400}
              height={300}
              className="gallery-image"
            />
          </div>
        </div>
      </section>

      <section className="feature-section alt-bg">
        <div className="feature-content">
          <div style={{ display: 'inline-block', textAlign: 'center' }}>
            <h2 className="section-title">Blood Bank Awarded for 122 Donors</h2>
            <svg
              className="section-divider"
              preserveAspectRatio="xMidYMid meet"
              viewBox="20 96.999 160 6.001"
              style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto 30px' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path fill="#8B0000" d="M103.348 102.986c-1.154 0-2.254-.283-2.926-1.038a2.5 2.5 0 0 1-.427-.679c-.334-.715-.632-2.226.388-3.309.754-.803 2.169-1.285 3.228-.703.598.323.86.891.945 1.121.046.123.435 1.232-.348 2.016-.57.576-1.358.554-1.586.535a.223.223 0 0 1-.208-.241.227.227 0 0 1 .251-.201c.124.011.772.044 1.211-.4.6-.601.262-1.52.247-1.559-.068-.184-.275-.635-.739-.885-.849-.466-2.041-.043-2.659.615-.861.913-.597 2.212-.306 2.836.092.216.206.398.354.565 1.085 1.22 3.73 1.084 5.659.248a6.7 6.7 0 0 0 1.451-.864.24.24 0 0 1 .145-.049l66.192-.021c.127 0 .231.099.231.222s-.103.222-.231.222l-66.111.021a7.2 7.2 0 0 1-1.487.874 8.7 8.7 0 0 1-3.274.674"></path>
                <path fill="#8B0000" d="M96.428 103a8.5 8.5 0 0 1-3.253-.688 7.3 7.3 0 0 1-1.483-.874l-65.911-.021c-.127 0-.231-.099-.231-.222s.103-.222.231-.222l65.992.021c.053 0 .105.018.146.05.297.235.789.575 1.445.864 1.929.834 4.576.968 5.664-.25.194-.22.294-.435.353-.564.288-.626.546-1.928-.311-2.837-.617-.657-1.809-1.08-2.658-.616-.508.275-.699.779-.732.878-.017.046-.354.968.239 1.566.446.446 1.087.412 1.21.4.13-.01.239.078.252.2a.225.225 0 0 1-.207.242c-.161.015-.994.059-1.587-.535-.776-.782-.389-1.893-.342-2.017.057-.17.3-.774.941-1.121 1.061-.579 2.474-.097 3.227.704 1.016 1.077.724 2.59.391 3.314a2.6 2.6 0 0 1-.424.672c-.664.744-1.762 1.053-2.952 1.053Z"></path>
              </g>
            </svg>
          </div>
          <div className="feature-image-container">
            <Image
              src="/camp/photo9.jpeg"
              alt="Award Ceremonyn"
              width={600}
              height={400}
              className="feature-image"
            />
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="feature-content">
          <div style={{ display: 'inline-block', textAlign: 'center' }}>
            <h2 className="section-title">Bhandewadi Sevakendra Team</h2>
            <svg
              className="section-divider"
              preserveAspectRatio="xMidYMid meet"
              viewBox="20 96.999 160 6.001"
              style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto 30px' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path fill="#b6a548" d="M103.348 102.986c-1.154 0-2.254-.283-2.926-1.038a2.5 2.5 0 0 1-.427-.679c-.334-.715-.632-2.226.388-3.309.754-.803 2.169-1.285 3.228-.703.598.323.86.891.945 1.121.046.123.435 1.232-.348 2.016-.57.576-1.358.554-1.586.535a.223.223 0 0 1-.208-.241.227.227 0 0 1 .251-.201c.124.011.772.044 1.211-.4.6-.601.262-1.52.247-1.559-.068-.184-.275-.635-.739-.885-.849-.466-2.041-.043-2.659.615-.861.913-.597 2.212-.306 2.836.092.216.206.398.354.565 1.085 1.22 3.73 1.084 5.659.248a6.7 6.7 0 0 0 1.451-.864.24.24 0 0 1 .145-.049l66.192-.021c.127 0 .231.099.231.222s-.103.222-.231.222l-66.111.021a7.2 7.2 0 0 1-1.487.874 8.7 8.7 0 0 1-3.274.674"></path>
                <path fill="#b6a548" d="M96.428 103a8.5 8.5 0 0 1-3.253-.688 7.3 7.3 0 0 1-1.483-.874l-65.911-.021c-.127 0-.231-.099-.231-.222s.103-.222.231-.222l65.992.021c.053 0 .105.018.146.05.297.235.789.575 1.445.864 1.929.834 4.576.968 5.664-.25.194-.22.294-.435.353-.564.288-.626.546-1.928-.311-2.837-.617-.657-1.809-1.08-2.658-.616-.508.275-.699.779-.732.878-.017.046-.354.968.239 1.566.446.446 1.087.412 1.21.4.13-.01.239.078.252.2a.225.225 0 0 1-.207.242c-.161.015-.994.059-1.587-.535-.776-.782-.389-1.893-.342-2.017.057-.17.3-.774.941-1.121 1.061-.579 2.474-.097 3.227.704 1.016 1.077.724 2.59.391 3.314a2.6 2.6 0 0 1-.424.672c-.664.744-1.762 1.053-2.952 1.053Z"></path>
              </g>
            </svg>
          </div>
          <div className="feature-image-container">
            <Image
              src="/camp/photo10.jpeg"
              alt="Team Photo"
              width={600}
              height={400}
              className="feature-image"
            />
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-container">


          <div className="footer-bottom">
            <p>Bhandewadi Sevakendra</p>
          </div>
        </div>
      </footer>
    </main >
  );
}
