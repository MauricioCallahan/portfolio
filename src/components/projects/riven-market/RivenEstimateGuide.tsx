import { ESTIMATE_MARKERS } from "./rivenEstimate";

export default function RivenEstimateGuide() {
  return (
    <section>
      <h2>Reading an estimate</h2>
      <p>This is the estimate for one Torid Riven roll, crita-acriata. The numbers match the markers on the screenshot.</p>
      <ol className="riven-estimate-keys">
        {ESTIMATE_MARKERS.map(({ title, text }) => (
          <li key={title}>
            <strong>{title}</strong>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
