import { useLayoutEffect, useEffect, useMemo, useState } from "react";
import "./Work.css";

type CategoryId = "ilmakuvat" | "dem" | "ortokuvat" | "mallit3d";

type WorkCategory = {
  id: CategoryId;
  title: string;
  description: string;
};

type WorkImageItem = {
  src: string;
  date: string;
  category: CategoryId;
  filename: string;
};

const categories: WorkCategory[] = [
  {
    id: "ilmakuvat",
    title: "Ilmakuvat",
    description: "Yleiskuvat työmaasta ja sen etenemisestä.",
  },
  {
    id: "dem",
    title: "Syvyyskartan peittokuvat",
    description: "Korkeuserojen ja pinnanmuotojen havainnollistaminen.",
  },
  {
    id: "ortokuvat",
    title: "Ortokuvat",
    description:
      "Tarkka sateelliittityylinen kuvamosaiikki kuvatusta alueesta.",
  },
  {
    id: "mallit3d",
    title: "3D mallit",
    description: "Rakenteen ja ympäristön hahmottaminen kolmiulotteisesti.",
  },
];

// Reads a date like 22.3.2026 from a file path or file name
function extractDateFromPath(path: string): string | null {
  const match = path.match(/(\d{1,2}\.\d{1,2}\.\d{4})/);
  return match ? match[1] : null;
}

// Converts dd.mm.yyyy into a numeric timestamp for sorting
function dateStringToTime(dateString: string): number {
  const [day, month, year] = dateString.split(".").map(Number);
  return new Date(year, month - 1, day).getTime();
}

function formatTimelineDate(dateString: string): string {
  return dateString;
}

// Import all images from each category folder.
// These folders should be under src/assets/work/...
const ilmakuvatModules = import.meta.glob(
  "./assets/work/ilmakuvat/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const demModules = import.meta.glob(
  "./assets/work/dem/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const ortokuvatModules = import.meta.glob(
  "./assets/work/ortokuvat/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const mallit3dModules = import.meta.glob(
  "./assets/work/3d mallit/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

function buildImageList(
  modules: Record<string, string>,
  category: CategoryId,
): WorkImageItem[] {
  return Object.entries(modules)
    .map(([path, src]) => {
      const date = extractDateFromPath(path);

      if (!date) {
        return null;
      }

      const filename = path.split("/").pop() ?? path;

      return {
        src,
        date,
        category,
        filename,
      };
    })
    .filter((item): item is WorkImageItem => item !== null);
}

export default function Work() {
  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const allImages = useMemo(() => {
    return [
      ...buildImageList(ilmakuvatModules, "ilmakuvat"),
      ...buildImageList(demModules, "dem"),
      ...buildImageList(ortokuvatModules, "ortokuvat"),
      ...buildImageList(mallit3dModules, "mallit3d"),
    ];
  }, []);

  const dates = useMemo(() => {
    const uniqueDates = Array.from(new Set(allImages.map((item) => item.date)));
    return uniqueDates.sort(
      (a, b) => dateStringToTime(a) - dateStringToTime(b),
    );
  }, [allImages]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentDate = dates[currentIndex] ?? "";

  // Keeps page valid even if there are no images yet
  useEffect(() => {
    if (dates.length > 0 && currentIndex > dates.length - 1) {
      setCurrentIndex(dates.length - 1);
    }
  }, [dates, currentIndex]);

  const currentImagesByCategory = useMemo(() => {
    const map = new Map<CategoryId, WorkImageItem>();

    for (const image of allImages) {
      if (image.date === currentDate) {
        map.set(image.category, image);
      }
    }

    return map;
  }, [allImages, currentDate]);

  return (
    <main className="site-shell work-page" id="top">
      <div className="background-glow background-glow-1" />
      <div className="background-glow background-glow-2" />

      {/* Same topbar structure as main page */}
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="/#top" className="brand work-brand-link">
            IVAN SYNENKO
          </a>

          <nav className="nav">
            <a href="/#portfolio-photo">Valokuvaus</a>
            <a href="/#portfolio-aerial">Ilmakuvaus</a>
            <a href="/#seuranta">Projektiseuranta</a>
            <a href="/#contact">Ota yhteyttä</a>
          </nav>
        </div>
      </header>

      <section className="work-hero">
        <div className="container work-hero-grid">
          <div className="work-copy">
            <p className="work-eyebrow">Projektiseuranta</p>

            <h1 className="work-title">Esimerkkiprojekti</h1>

            <p className="work-lead">
              Projektien seuranta kätevällä selainpohjaisella työkalulla. Pystyt
              tarkastelemaan kaikkia käynnissä olevia projektejasi mistä tahansa
              laitteesta.
            </p>

            <p className="work-lead work-lead-secondary">
              Kaikki aineistot ovat koottu helposti luettaviksi ja
              tarkastettaviksi eri päivämäärien välillä.
            </p>

            <button
              type="button"
              className="work-cta"
              onClick={() => {
                window.open(
                  "https://niinhyvaadronea.duckdns.org/",
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              Tutustu työkaluun tästä
            </button>
          </div>

          <div className="work-timeline-card">
            <div className="work-timeline-header">
              <span className="work-timeline-label">Aikajana</span>
              <span className="work-timeline-date">
                {currentDate || "Ei kuvia"}
              </span>
            </div>

            {dates.length > 0 ? (
              <>
                <div className="work-slider-wrap">
                  <div className="work-slider-track">
                    <div
                      className="work-slider-progress"
                      style={{
                        width:
                          dates.length > 1
                            ? `${(currentIndex / (dates.length - 1)) * 100}%`
                            : "0%",
                      }}
                    />
                  </div>

                  <input
                    className="work-range"
                    type="range"
                    min={0}
                    max={Math.max(dates.length - 1, 0)}
                    step={1}
                    value={currentIndex}
                    onChange={(event) =>
                      setCurrentIndex(Number(event.target.value))
                    }
                    aria-label="Valitse päivämäärä"
                  />

                  <div className="work-slider-dots" aria-hidden="true">
                    {dates.map((date, index) => (
                      <button
                        key={date}
                        type="button"
                        className={`work-slider-dot ${
                          index === currentIndex ? "is-active" : ""
                        }`}
                        style={{
                          left:
                            dates.length > 1
                              ? `${5 + (index / (dates.length - 1)) * 90}%`
                              : "5%",
                        }}
                        onClick={() => setCurrentIndex(index)}
                      />
                    ))}
                  </div>
                </div>

                <div className="work-date-list">
                  {dates.map((date, index) => (
                    <button
                      key={date}
                      type="button"
                      className={`work-date-item ${
                        index === currentIndex ? "is-active" : ""
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      {formatTimelineDate(date)}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="work-empty-state">
                Lisää kuvat kansioihin, niin aikajana rakentuu automaattisesti
                tiedostonimien päivämääristä.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="work-gallery-section">
        <div className="container">
          <div className="work-gallery-grid">
            {categories.map((category) => {
              const image = currentImagesByCategory.get(category.id);

              return (
                <article className="work-card" key={category.id}>
                  <div className="work-card-media">
                    {image ? (
                      <img
                        key={`${category.id}-${currentDate}`}
                        src={image.src}
                        alt={`${category.title} ${currentDate}`}
                        className="work-card-image"
                      />
                    ) : (
                      <div className="work-card-placeholder">
                        <span>Ei kuvaa tälle päivälle</span>
                      </div>
                    )}
                  </div>

                  <div className="work-card-body">
                    <h2 className="work-card-title">{category.title}</h2>
                    <p className="work-card-text">{category.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
