import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

type Pf_valokuva = {
  src: string;
};

type Pf_ilmakuva = {
  src: string;
};

const pf_valokuvat: Pf_valokuva[] = Array.from({ length: 149 }, (_, i) => ({
  src: `/valokuvat/pf_valokuva_${i + 1}.webp`,
}));

const pf_ilmakuvat: Pf_ilmakuva[] = Array.from({ length: 87 }, (_, i) => ({
  src: `/ilmakuvat/pf_ilmakuva_${i + 1}.webp`,
}));

const secondsPerImage = 5;

function Main() {
  const heroBackgroundImages = pf_valokuvat.slice(0, 20);
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
    }, 100);
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Sending failed");
      }

      alert("Viesti lähetetty!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Viestin lähetys epäonnistui.");
    }
  };

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
            <a href="#seuranta">Projektiseuranta</a>
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
                animationDelay: `${index * secondsPerImage}s`,
                animationDuration: `${totalDuration}s`,
              }}
            />
          ))}
          <div className="hero-background-overlay" />
        </div>

        <div className="container hero-grid hero-grid-enhanced">
          <div className="hero-copy reveal-up">
            <h1>IVAN SYNENKO</h1>

            <p className="eyebrow">
              Valokuvaus · Ilmakuvaus · Projektiseuranta
            </p>
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
            <p className="eyebrow">Portfolio</p>
            <h2>Projektiseuranta</h2>
            <h2 className="tracking-preview-subtitle"></h2>
          </div>
        </div>

        <div className="container">
          <Link
            to="/work"
            className="tracking-card-link"
            aria-label="Avaa projektiseurannan työ-sivu"
          >
            <article className="tracking-card">
              <div className="tracking-card-imageWrap">
                <img
                  src="/ilmakuvat/skeittipuisto.webp"
                  alt="Skeittipuiston ilmakuva"
                  className="tracking-card-image"
                />
              </div>

              <div className="tracking-card-content">
                <div className="tracking-card-top">
                  <div>
                    <p className="tracking-card-label">Kohde</p>
                    <h3 className="tracking-card-name">Skeittipuisto</h3>
                    <p className="tracking-card-location">
                      Luhtaniityntie 6, Kerava
                    </p>
                  </div>

                  <span className="tracking-card-open">
                    Avaa projekti <span aria-hidden="true">→</span>
                  </span>
                </div>

                <div className="tracking-card-pills">
                  <span className="tracking-card-pill">
                    Viimeisin päivitys: 10.4.2026
                  </span>
                  <span className="tracking-card-pill">
                    Seuraava lento: 17.4.2026
                  </span>
                  <span className="tracking-card-pill">
                    Arvioitu valmistuminen: Kesäkuu 2026
                  </span>
                </div>

                <p className="tracking-card-description">
                  Salaoja-, sadevesi- ja viemäritöiden asennukset jatkuvat.
                  Styroksielementtejä odotetaan paikalle betonivalua varten.
                  Kohteen etenemistä seurataan viikoittaisilla ilmakuvilla,
                  vidoilla, ortokuvilla ja 3D-malleilla.
                </p>

                <div className="tracking-card-footer">
                  <div className="tracking-card-progressBlock">
                    <div className="tracking-card-progressHeader">
                      <span>Projektin eteneminen</span>
                      <strong>8%</strong>
                    </div>

                    <div className="tracking-card-progressTrack">
                      <div
                        className="tracking-card-progressFill"
                        style={{ width: "8%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Kiinnostuitko?</p>
            <h2>Ota yhteyttä</h2>
            <p className="contact-intro">
              Vastaan mielelläni heränneisiin kysymyksiin, tarjouspyyntöihin tai
              yhteistyöehdotuksiin.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-layout">
              <div className="contact-left">
                <div className="contact-field">
                  <label htmlFor="message">Viesti</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Kirjoita viesti..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="contact-right">
                <div className="contact-field">
                  <label htmlFor="name">Nimesi</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Kirjoita nimesi..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="email">Sähköposti</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Kirjoita sähköpostisi..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="contact-actions">
              <button type="submit" className="contact-send-button">
                Lähetä
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Main;
