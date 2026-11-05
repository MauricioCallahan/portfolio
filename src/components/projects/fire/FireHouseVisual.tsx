// FIRE's house reacts to spending, from clean to burned down (see the FIRE README).
const STATES = [
  { file: "house-1-clean.svg", name: "On budget", note: "Every bucket has room left." },
  { file: "house-2-smoky.svg", name: "Getting warm", note: "A bucket is close to its limit." },
  { file: "house-3-fire.svg", name: "On fire", note: "A bucket has hit its limit." },
  { file: "house-4-burned.svg", name: "Burned down", note: "A bucket is over budget." },
];

export default function FireHouseVisual() {
  return (
    <figure className="fire-visual">
      <ol className="fire-visual-states">
        {STATES.map(({ file, name, note }) => (
          <li key={file}>
            <img
              src={`/images/projects/fire/${file}`}
              alt={`FIRE house, ${name.toLowerCase()}`}
              width={280}
              height={304}
            />
            <p className="fire-visual-name">{name}</p>
            <p className="fire-visual-note">{note}</p>
          </li>
        ))}
      </ol>
      <figcaption>The house reacts to spending, from clean to burned down.</figcaption>
    </figure>
  );
}
