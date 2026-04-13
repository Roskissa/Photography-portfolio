import { useMemo, useState } from "react";
import "./Work.css";

type Stage = {
  id: string;
  date: string;
  title: string;
  summary: string;
  orthophoto: string;
  generalPhotos: string[];
  modelPreview?: string;
};

const stages: Stage[] = [
  {
    id: "stage-1",
    date: "12 Apr 2026",
    title: "Site preparation",
    summary:
      "Initial documentation phase. Ground conditions, access routes, material storage areas and early site layout are clearly visible.",
    orthophoto: "/work/ortho_1.webp",
    generalPhotos: [
      "/work/general_1.webp",
      "/work/general_2.webp",
      "/work/general_3.webp",
    ],
    modelPreview: "/work/model_preview_1.webp",
  },
  {
    id: "stage-2",
    date: "03 May 2026",
    title: "Groundworks",
    summary:
      "Earthworks and early structural preparation. Orthophoto gives a clean overall view, while oblique images show depth and working conditions.",
    orthophoto: "/work/ortho_2.webp",
    generalPhotos: [
      "/work/general_4.webp",
      "/work/general_5.webp",
      "/work/general_6.webp",
    ],
    modelPreview: "/work/model_preview_2.webp",
  },
  {
    id: "stage-3",
    date: "24 May 2026",
    title: "Structural progress",
    summary:
      "Major visual changes become easy to compare over time. Repeated capture positions help make progress understandable at a glance.",
    orthophoto: "/work/ortho_3.webp",
    generalPhotos: [
      "/work/general_7.webp",
      "/work/general_8.webp",
      "/work/general_9.webp",
    ],
    modelPreview: "/work/model_preview_3.webp",
  },
  {
    id: "stage-4",
    date: "14 Jun 2026",
    title: "Later-stage development",
    summary:
      "This stage highlights how timeline-based drone documentation makes change tracking much easier for both internal review and external communication.",
    orthophoto: "/work/ortho_4.webp",
    generalPhotos: [
      "/work/general_10.webp",
      "/work/general_11.webp",
      "/work/general_12.webp",
    ],
    modelPreview: "/work/model_preview_4.webp",
  },
];

export default function WorkDocumentationSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const activeStage = useMemo(() => stages[activeIndex], [activeIndex]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 6;
    const rotateX = ((centerY - y) / centerY) * 6;

    setTilt({ rotateX, rotateY });
  }

  function handleMouseLeave() {
    setTilt({ rotateX: 0, rotateY: 0 });
  }

  return (
    <section className="work-doc-section" id="work-documentation">
      <div className="work-doc-shell">
        <div className="work-doc-header">
          <span className="work-doc-eyebrow">
            Work-oriented drone documentation
          </span>
          <h2>Progress tracking that stays readable over time</h2>
          <p>
            Orthophotos provide the clearest project-wide timeline, while
            general drone photographs add context, scale and detail. This layout
            is built to make change easy to understand instead of just showing
            individual images.
          </p>
        </div>

        <div className="work-doc-layout">
          <div
            className="work-stack-panel"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="work-stack-scene"
              style={{
                transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              }}
            >
              {stages.map((stage, index) => {
                const offsetFromTop = stages.length - 1 - index;
                const isActive = index === activeIndex;

                return (
                  <button
                    key={stage.id}
                    type="button"
                    className={`work-stack-layer ${isActive ? "is-active" : ""}`}
                    style={{
                      transform: `translateY(${offsetFromTop * 28}px) scale(${1 - offsetFromTop * 0.03})`,
                      zIndex: 100 - offsetFromTop,
                      backgroundImage: `linear-gradient(
                        to bottom,
                        rgba(10, 14, 20, 0.18),
                        rgba(10, 14, 20, 0.42)
                      ), url(${stage.orthophoto})`,
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    aria-label={`Show documentation stage from ${stage.date}`}
                  >
                    <span className="work-stack-layer-label">
                      <span>{stage.date}</span>
                      <strong>{stage.title}</strong>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="work-stack-hint">
              Hover the layers to move through the timeline
            </div>
          </div>

          <div className="work-detail-panel">
            <div className="work-preview-card">
              <div className="work-preview-image-wrap">
                <img
                  src={activeStage.orthophoto}
                  alt={`${activeStage.title} orthophoto from ${activeStage.date}`}
                  className="work-preview-image"
                />
                <div className="work-preview-overlay">
                  <span>{activeStage.date}</span>
                  <h3>{activeStage.title}</h3>
                </div>
              </div>

              <div className="work-preview-text">
                <p>{activeStage.summary}</p>
              </div>
            </div>

            <div className="work-support-grid">
              <div className="work-support-card">
                <div className="work-support-head">
                  <h4>Supporting photographs</h4>
                  <span>Same stage</span>
                </div>

                <div className="work-photo-grid">
                  {activeStage.generalPhotos.map((photo, index) => (
                    <div key={photo} className="work-photo-tile">
                      <img
                        src={photo}
                        alt={`${activeStage.title} supporting drone photo ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {activeStage.modelPreview && (
                <div className="work-support-card">
                  <div className="work-support-head">
                    <h4>Photogrammetry model preview</h4>
                    <span>Optional supporting output</span>
                  </div>

                  <div className="work-model-preview">
                    <img
                      src={activeStage.modelPreview}
                      alt={`${activeStage.title} photogrammetry model preview`}
                    />
                    <div className="work-model-badge">3D model available</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
