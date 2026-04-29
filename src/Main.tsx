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
            <a href="#portfolio-about">Minusta</a>
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

      <section className="about-section" id="portfolio-about">
        <div className="container">
          <div className="section-heading reveal-up">
            <h2>Minusta</h2>
          </div>

          <div className="about-container">
            <div className="about-text">
              <p>
                Olen Uudellamaalla toimiva valokuvaaja. Olen kuvannut jo
                nuoresta asti ja vuosien varrella se on muuttunut harrastuksesta
                enemmän tekemiseksi.
              </p>

              <p>
                Kuvaustilanteissa olen aika rento ja pyrin pysymään pois tieltä.
                En ohjaa turhaan tai tee tilanteesta isoa numeroa, vaan annan
                asioiden mennä omalla painollaan. Usein parhaat kuvat syntyvät
                silloin, kun ihmiset tai paikat ovat sellaisia kuin ne oikeasti
                ovat, eikä mitään tarvitse erikseen rakentaa.
              </p>

              <p>
                Minun pääasiallinen tyyli on dokumentaarinen kuvaus erilaisissa
                tapahtumissa ja menoissa. Näin kuvasarjasta muodostuu tarina,
                josta jää mukava muisto koko tapahtumasta.
              </p>
            </div>

            <div className="about-photo-swap">
              <img
                src="/valokuvat/pf_ivan1.webp"
                alt="Kuva minusta 1"
                className="about-photo about-photo-a"
              />

              <img
                src="/valokuvat/pf_ivan2.webp"
                alt="Kuva minusta 2"
                className="about-photo about-photo-b"
              />
            </div>
          </div>
        </div>
      </section>

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
            <p className="eyebrow">ivan.synenko@gmail.com</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
