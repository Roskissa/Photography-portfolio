import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

type Pf_valokuva = {
  src: string;
};

type Pf_ilmakuva = {
  src: string;
};

const pf_valokuvat: Pf_valokuva[] = Array.from({ length: 17 }, (_, i) => ({
  src: `/valokuvat/pf_valokuva_${i + 1}.webp`,
}));

const pf_ilmakuvat: Pf_ilmakuva[] = Array.from({ length: 82 }, (_, i) => ({
  src: `/ilmakuvat/pf_ilmakuva_${i + 1}.webp`,
}));

const secondsPerImage = 5;

function Main() {
  const heroBackgroundImages = pf_valokuvat.slice(0, 50);
  const totalDuration = heroBackgroundImages.length * secondsPerImage;

  const [selectedImage, setSelectedImage] = useState<
    Pf_valokuva | Pf_ilmakuva | null
  >(null);
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
          <div className="brand">
            <a href="#top">IVAN SYNENKO</a>
          </div>

          <nav className="nav">
            <a href="#portfolio-photo">Valokuvaus</a>
            <a href="#portfolio-aerial">Ilmakuvaus</a>
            <a href="#seuranta">Projektisuranta</a>
            <a href="#contact">Ota yhteyttä</a>
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

        {heroBackgroundImages.map((image, index) => (
          <div
            key={image.src}
            className="hero-background-slide"
            style={{
              backgroundImage: `url(${image.src})`,
              animationDelay: `${index * secondsPerImage}s`,
              animationDuration: `${totalDuration}s`,
            }}
          />
        ))}

        <div className="container hero-grid hero-grid-enhanced">
          <div className="hero-copy reveal-up">
            <h1>IVAN SYNENKO</h1>

            <p className="eyebrow">
              Valokuvaus · Ilmakuvaus · Projektiseuranta
            </p>
          </div>

          <div className="hero-floating-images">
            <img
              src="/images/Portfolio_1.webp"
              alt=""
              className="hero-float-img hero-float-img-1"
            />
            <img
              src="/images/Portfolio_2.webp"
              alt=""
              className="hero-float-img hero-float-img-2"
            />
            <img
              src="/images/Portfolio_3.webp"
              alt=""
              className="hero-float-img hero-float-img-3"
            />
          </div>
        </div>
      </section>

      <section className="section section-intro" />

      <section id="portfolio-photo" className="section portfolio-section">
        <div className="portfolio-heading-wrap">
          <div className="container">
            <div className="section-heading reveal-up">
              <p className="eyebrow">Portfolio</p>
              <h2>Valokuvaus</h2>
            </div>
          </div>
        </div>

        <div className="portfolio-container-full">
          <div className="editorial-gallery reveal-up reveal-delay-1">
            {pf_valokuvat.map((image) => (
              <article
                key={image.src}
                className="gallery-card"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt="Valokuva"
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
              alt="Avattu kuva"
              className="image-modal-img"
            />
          </div>
        </div>
      )}

      <section id="portfolio-aerial" className="section portfolio-section">
        <div className="portfolio-heading-wrap">
          <div className="container">
            <div className="section-heading reveal-up">
              <p className="eyebrow">Portfolio</p>
              <h2>Ilmakuvaus</h2>
            </div>
          </div>
        </div>

        <div className="portfolio-container-full">
          <div className="editorial-gallery reveal-up reveal-delay-1">
            {pf_ilmakuvat.map((image) => (
              <article
                key={image.src}
                className="gallery-card"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt="Ilmakuva"
                  className="gallery-image"
                  loading="lazy"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="seuranta" className="section">
        <div className="container">
          <div className="section-heading reveal-up">
            <p className="eyebrow">Palvelut</p>
            <h2>Seuranta</h2>
          </div>

          <div className="services-grid">
            <div className="service-card reveal-up stagger-1">
              <h3>Valokuvaus</h3>
              <p>
                Dokumentaarinen tilannekuvaus rennoin ja lämpimällä tunnelmalla
                editoidut valokuvat.
              </p>
            </div>

            <div className="services-subheader">
              <h3 className="services-subtitle">Työ</h3>

              <Link to="/work" className="services-button">
                Avaa →
              </Link>
            </div>

            <div className="service-card reveal-up stagger-2">
              <h3>Ilmakuvaukset</h3>
              <p>Ilmakuvat, videot, ortokuvaprosessointi ja fotogrammetria.</p>
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
              <p className="eyebrow">Kiinnostuitko?</p>
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
