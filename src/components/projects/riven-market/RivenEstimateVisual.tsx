import { ESTIMATE_MARKERS } from "./rivenEstimate";

export default function RivenEstimateVisual() {
  return (
    <figure className="riven-estimate-visual">
      <div className="riven-estimate-shot">
        <img
          src="/images/projects/riven-market/rm-price-estimator-torid-example.png"
          alt="Riven Market price estimate for a Torid Riven: 1501 to 2500 platinum with high confidence, stat weights, a market overview and comparable listings"
          width={611}
          height={1021}
        />
        {ESTIMATE_MARKERS.map(({ top, title }, index) => (
          <span key={title} className="riven-estimate-marker" style={{ top: `${top}%` }} aria-hidden="true">
            {index + 1}
          </span>
        ))}
      </div>
    </figure>
  );
}
