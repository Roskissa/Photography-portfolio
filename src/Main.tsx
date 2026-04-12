import { useState } from "react";
import "./App.css";

type PortfolioImage = {
  src: string;
  title: string;
};

const portfolioImages: PortfolioImage[] = [
  { src: "/images/Portfolio_1.webp", title: "Portfolio 1" },
  { src: "/images/Portfolio_2.webp", title: "Portfolio 2" },
  { src: "/images/Portfolio_3.webp", title: "Portfolio 3" },
  { src: "/images/Portfolio_4.webp", title: "Portfolio 4" },
  { src: "/images/Portfolio_5.webp", title: "Portfolio 5" },
  { src: "/images/Portfolio_6.webp", title: "Portfolio 6" },
  { src: "/images/Portfolio_7.webp", title: "Portfolio 7" },
  { src: "/images/Portfolio_8.webp", title: "Portfolio 8" },
  { src: "/images/Portfolio_9.webp", title: "Portfolio 9" },
  { src: "/images/Portfolio_10.webp", title: "Portfolio 10" },
  { src: "/images/Portfolio_11.webp", title: "Portfolio 11" },
  { src: "/images/Portfolio_12.webp", title: "Portfolio 12" },
  { src: "/images/Portfolio_13.webp", title: "Portfolio 13" },
  { src: "/images/Portfolio_14.webp", title: "Portfolio 14" },
  { src: "/images/Portfolio_15.webp", title: "Portfolio 15" },
  { src: "/images/Portfolio_16.webp", title: "Portfolio 16" },
  { src: "/images/Portfolio_17.webp", title: "Portfolio 17" },
];

function Main() {
  const featuredImages = portfolioImages.slice(0, 3);
  const heroBackgroundImages = portfolioImages.slice(0, 5);

  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(
    null,
  );
  const [isClosing, setIsClosing] = useState(false);

  function closeModal() {
    setIsClosing(true);

    setTimeout(() => {
      setSelectedImage(null);
      setIsClosing(false);
    }, 500);
  }

  return (
    <main className="site-shell" id="top">
      <div className="background-glow background-glow-1" />
      <div className="background-glow background-glow-2" />

      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand">IVAN SYNENKO</div>

          <nav className="nav">
            <a href="#portfolio">Portfolio</a>
            <a href="#services">Työ</a>
            <a href="#contact">Ota Yhteyttä</a>
          </nav>
        </div>
      </header>

      <section className="hero-section hero-section-enhanced">
        <div className="hero-background-slider" aria-hidden="true">
          {heroBackgroundImages.map((image, index) => (
            <div
              key={image.src}
              className="hero-background-slide"
              style={{
                backgroundImage: `url(${image.src})`,
                animationDelay: `${index * 5}s`,
              }}
            />
          ))}
          <div className="hero-background-overlay" />
        </div>

        <div className="container hero-grid hero-grid-enhanced">
          <div className="hero-copy reveal-up">
            <h1>IVAN SYNENKO</h1>

            <p className="eyebrow">
              Valokuvaus · Ilmakuvas · Projektin seuranta
            </p>
          </div>

          <div className="hero-visual hero-visual-enhanced reveal-up reveal-delay-1">
            <div className="hero-main-card hero-main-card-enhanced">
              <img
                src={featuredImages[0].src}
                alt={featuredImages[0].title}
                className="hero-main-image"
              />
            </div>

            <div className="hero-floating-card hero-floating-card-1">
              <img src={featuredImages[1].src} alt={featuredImages[1].title} />
            </div>

            <div className="hero-floating-card hero-floating-card-2">
              <img src={featuredImages[2].src} alt={featuredImages[2].title} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-intro" />

      <section id="portfolio" className="section portfolio-section">
        <div className="portfolio-heading-wrap">
          <div className="container">
            <div className="section-heading reveal-up">
              <p className="eyebrow">Portfolio</p>
              <h2>Valitut palat</h2>
            </div>
          </div>
        </div>

        <div className="portfolio-container-full">
          <div className="editorial-gallery reveal-up reveal-delay-1">
            {portfolioImages.map((image) => (
              <article
                key={image.src}
                className="gallery-card"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="gallery-image"
                  loading="lazy"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className={`image-modal-backdrop ${isClosing ? "closing" : ""}`}
          onClick={closeModal}
        >
          <div
            className="image-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="image-modal-close"
              onClick={closeModal}
              type="button"
            >
              ×
            </button>

            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="image-modal-img"
            />
          </div>
        </div>
      )}

      <section id="services" className="section">
        <div className="container">
          <div className="section-heading reveal-up">
            <p className="eyebrow">Työ</p>
            <h2>Projektin seuranta</h2>
          </div>

          <div className="services-grid">
            <div className="service-card reveal-up stagger-1">
              <h3>Valokuvaus</h3>
              <p>
                Dokumentaarinen tilannekuvaus rennoin ja lämpimällä tunnelmalla
                editoidut valokuvat.
              </p>
            </div>

            <div className="service-card reveal-up stagger-2">
              <h3>Ilmakuvaus</h3>
              <p>Ilmakuvaut, videot, ortokuvaprosessointi ja fotogrammetria.</p>
            </div>

            <div className="service-card reveal-up stagger-3">
              <h3>Projektiseuranta</h3>
              <p>
                Työmaan dokumentointi ja edistymisen seuranta säännöllisillä
                kuvauskerroilla ja kätevällä seurantatyökalulla.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div className="contact-panel reveal-up">
            <div>
              <p className="eyebrow">Kiinostuitko?</p>
              <h2>Ota yhteyttä</h2>
              <p className="contact-text">
                Vastaan kaikkina vuodenaikoina tiedusteluihin, tarjouspyyntöihin
                ja yhteistyöehdotuksiin.
              </p>
            </div>

            <div className="contact-actions">
              <a className="button button-primary" href="mailto:your@email.com">
                Lähetä sähköposti
              </a>

              <a className="button button-secondary" href="#top">
                Takaisin ylös
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
