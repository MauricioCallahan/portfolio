import type { CSSProperties } from "react";

// Radar Pose illustration, drawn in code instead of captured as a screenshot.
// A sensor at the lower left sends radar waves toward a person whose 17 joints are marked by
// Gaussian heatmap targets. The pose is hand-placed for illustration, not output from the model.

// Same figure as "Results and scope" in src/data/projects.ts. Change both together.
const PCK_SCORE = "0.931";

const VIEW_W = 300;
const VIEW_H = 372;
const SENSOR = { x: 36, y: 338 };
const PULSE_RADIUS = 70;
const ARCS = [50, 100, 150, 200, 250, 300, 350];

// The 17 COCO keypoints, left before right, in the order MMVR labels them.
const JOINT_NAMES = [
  "nose", "left eye", "right eye", "left ear", "right ear",
  "left shoulder", "right shoulder", "left elbow", "right elbow", "left wrist", "right wrist",
  "left hip", "right hip", "left knee", "right knee", "left ankle", "right ankle",
];

const RAW_JOINTS: [number, number][] = [
  [100, 40], [94, 34], [106, 34], [86, 38], [114, 38],
  [78, 70], [122, 70], [66, 105], [138, 96], [60, 138], [150, 66],
  [86, 135], [114, 135], [82, 175], [120, 175], [80, 215], [124, 215],
];

const SCALE = 1.7;
const JOINTS = RAW_JOINTS.map(([x, y]) => [103 + (x - 50) * SCALE, 28 + (y - 28) * SCALE] as const);

const BONES: [number, number][] = [
  [5, 6], [5, 7], [7, 9], [6, 8], [8, 10], [5, 11], [6, 12], [11, 12],
  [11, 13], [13, 15], [12, 14], [14, 16], [0, 1], [0, 2], [1, 3], [2, 4],
];

const CELL = 10;

// Each joint is a training target blurred into its neighbours. Three flat steps, no gradients.
const HEAT_CELLS = (() => {
  const cells: { x: number; y: number; level: number }[] = [];
  for (let col = 0; col < VIEW_W / CELL; col++) {
    for (let row = 0; row < VIEW_H / CELL; row++) {
      const cx = col * CELL + CELL / 2;
      const cy = row * CELL + CELL / 2;
      const distance = Math.min(...JOINTS.map(([x, y]) => Math.hypot(x - cx, y - cy)));
      const level = distance < CELL * 0.7 ? 3 : distance < CELL * 1.4 ? 2 : distance < CELL * 2.1 ? 1 : 0;
      if (level) cells.push({ x: col * CELL, y: row * CELL, level });
    }
  }
  return cells;
})();

const HEAT_OPACITY = [0, 0.12, 0.26, 0.5];

// The pulse is an HTML ring, not an SVG circle, so its scale and fade can run on the compositor.
// Percentages keep it centered on the sensor at any width.
const pulseStyle: CSSProperties = {
  left: `${(SENSOR.x / VIEW_W) * 100}%`,
  top: `${(SENSOR.y / VIEW_H) * 100}%`,
  width: `${((PULSE_RADIUS * 2) / VIEW_W) * 100}%`,
};

export default function RadarPoseVisual() {
  return (
    <figure className="radar-visual">
      <div className="radar-visual-art">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-labelledby="radar-visual-title radar-visual-desc"
        >
          <title id="radar-visual-title">Radar Pose pipeline</title>
          <desc id="radar-visual-desc">
            Illustration: radar waves spread from a sensor toward a person. Gaussian heatmaps mark
            17 body joints, and the model outputs a skeleton from them.
          </desc>

          {ARCS.map(radius => (
            <circle key={radius} cx={SENSOR.x} cy={SENSOR.y} r={radius} className="radar-visual-arc" />
          ))}

          <g aria-hidden="true">
            {HEAT_CELLS.map(({ x, y, level }) => (
              <rect
                key={`${x}-${y}`}
                x={x + 1}
                y={y + 1}
                width={CELL - 2}
                height={CELL - 2}
                rx={2}
                className="radar-visual-heat"
                opacity={HEAT_OPACITY[level]}
              />
            ))}
          </g>

          <g aria-hidden="true">
            {BONES.map(([a, b]) => (
              <line
                key={`${a}-${b}`}
                x1={JOINTS[a][0]}
                y1={JOINTS[a][1]}
                x2={JOINTS[b][0]}
                y2={JOINTS[b][1]}
                className="radar-visual-bone"
              />
            ))}
            {JOINTS.map(([x, y], index) => (
              <circle key={JOINT_NAMES[index]} cx={x} cy={y} r={index < 5 ? 3.5 : 5.5} className="radar-visual-joint">
                <title>{JOINT_NAMES[index]}</title>
              </circle>
            ))}
          </g>

          <rect
            x={SENSOR.x - 22}
            y={SENSOR.y - 14}
            width={44}
            height={28}
            rx={14}
            className="radar-visual-sensor"
            aria-hidden="true"
          />
        </svg>
        <span className="radar-visual-pulse" style={pulseStyle} aria-hidden="true" />
      </div>

      <figcaption className="radar-visual-metric">
        <span>{PCK_SCORE}</span>
        <span>PCK@5% on a 200-sample subset</span>
      </figcaption>
    </figure>
  );
}
