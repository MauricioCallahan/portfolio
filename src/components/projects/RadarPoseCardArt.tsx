const ink = "#1a1a1a";
const floor = "#33332f";
const bodyFill = "#5c5c56";
const legFill = "#4c4c47";
const chair = "#6a6a62";
const fog = "#8a8a80";
const lavender = "#f0d7ff";

type Point3 = readonly [number, number, number];
type Point2 = readonly [number, number];

// A seated person, seen from about 45 degrees, with a dot on each joint and a 3D tracking box.
// Drawn in code from a 3D pose (meters, y up, facing -z) projected through a simple camera.

// The 17 COCO keypoints, left before right.
const JOINTS: Point3[] = [
  [0, 1.22, -0.1], [-0.035, 1.25, -0.08], [0.035, 1.25, -0.08], [-0.075, 1.23, -0.01], [0.075, 1.23, -0.01],
  [-0.19, 1.0, 0], [0.19, 1.0, 0], [-0.24, 0.76, -0.04], [0.24, 0.76, -0.04], [-0.13, 0.58, -0.27], [0.13, 0.58, -0.27],
  [-0.12, 0.5, 0], [0.12, 0.5, 0], [-0.14, 0.52, -0.42], [0.14, 0.52, -0.42], [-0.15, 0.08, -0.46], [0.15, 0.08, -0.46],
];

const SCALE = 1.25;
const YAW = (-40 * Math.PI) / 180;
const PITCH = (22 * Math.PI) / 180;
const DISTANCE = 3.6;
const FOCAL = 420;
const TARGET: Point3 = [0, 0.62, -0.1];

function project([px, py, pz]: Point3): Point2 {
  let x = px - TARGET[0];
  let y = py - TARGET[1];
  let z = pz - TARGET[2];
  [x, z] = [x * Math.cos(YAW) - z * Math.sin(YAW), x * Math.sin(YAW) + z * Math.cos(YAW)];
  [y, z] = [y * Math.cos(PITCH) + z * Math.sin(PITCH), -y * Math.sin(PITCH) + z * Math.cos(PITCH)];
  z += DISTANCE;
  return [200 + (x * FOCAL) / z, 140 - (y * FOCAL) / z];
}

const round = (value: number) => Math.round(value * 10) / 10;

function segment(a: Point3, b: Point3) {
  const [x1, y1] = project(a);
  const [x2, y2] = project(b);
  return { x1: round(x1), y1: round(y1), x2: round(x2), y2: round(y2) };
}

function polygon(points: Point3[]) {
  return points.map(point => project(point).map(round).join(" ")).join(" ");
}

const FLOOR_LINES = (() => {
  const lines: Point3[][] = [];
  for (let step = 0; step <= 8; step++) {
    const offset = -1.2 + step * 0.3;
    lines.push([[offset, 0, -1.2], [offset, 0, 1.2]], [[-1.2, 0, offset], [1.2, 0, offset]]);
  }
  return lines.map(([a, b]) => segment(a, b));
})();

// Chair seat and backrest corners.
const SEAT = { x0: -0.24, x1: 0.24, z0: -0.32, z1: 0.14, y: 0.44 };
const CHAIR_LEGS = [SEAT.x0, SEAT.x1].flatMap(x =>
  [SEAT.z0, SEAT.z1].map(z => segment([x, 0, z], [x, SEAT.y, z])),
);
const CHAIR_POSTS = [SEAT.x0 + 0.03, SEAT.x1 - 0.03].map(x => segment([x, SEAT.y, SEAT.z1], [x, 0.95, SEAT.z1 + 0.06]));
const CHAIR_SEAT = polygon([
  [SEAT.x0, SEAT.y, SEAT.z0], [SEAT.x1, SEAT.y, SEAT.z0], [SEAT.x1, SEAT.y, SEAT.z1], [SEAT.x0, SEAT.y, SEAT.z1],
]);
const CHAIR_BACK = polygon([
  [SEAT.x0 + 0.02, 0.7, SEAT.z1 + 0.03], [SEAT.x1 - 0.02, 0.7, SEAT.z1 + 0.03],
  [SEAT.x1 - 0.02, 0.95, SEAT.z1 + 0.07], [SEAT.x0 + 0.02, 0.95, SEAT.z1 + 0.07],
]);

// Body as flat limbs: [from joint, to joint, stroke width, fill].
const LIMBS: [number, number, number, string][] = [
  [11, 13, 7.5, legFill], [12, 14, 7.5, legFill], [13, 15, 6.5, legFill], [14, 16, 6.5, legFill],
  [5, 7, 5.5, bodyFill], [6, 8, 5.5, bodyFill], [7, 9, 5, bodyFill], [8, 10, 5, bodyFill],
];
const FEET = [15, 16].map(index => {
  const [x, , z] = JOINTS[index];
  return segment([x, 0.03, z + 0.02], [x, 0.03, z - 0.1]);
});
const TORSO = polygon([
  JOINTS[5], JOINTS[6],
  [JOINTS[12][0] + 0.02, JOINTS[12][1], JOINTS[12][2]],
  [JOINTS[11][0] - 0.02, JOINTS[11][1], JOINTS[11][2]],
]);
const NECK = segment([0, 1.0, 0], [0, 1.1, -0.02]);
const HEAD = (() => {
  const [cx, cy] = project([0, 1.2, -0.04]);
  const [edge] = project([0.1, 1.2, -0.04]);
  return { cx: round(cx), cy: round(cy), r: round(Math.abs(edge - cx) * 1.05) };
})();

// Tracking box around the seated body. Edges along the back face are drawn lighter.
const BOX = { min: [-0.3, 0.35, -0.5] as Point3, max: [0.3, 1.32, 0.18] as Point3 };
const BOX_EDGES = (() => {
  const corner = (i: number, j: number, k: number): Point3 => [
    i ? BOX.max[0] : BOX.min[0], j ? BOX.max[1] : BOX.min[1], k ? BOX.max[2] : BOX.min[2],
  ];
  const edges: { back: boolean; line: ReturnType<typeof segment> }[] = [];
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) {
    const from = [i, j, k];
    for (let axis = 0; axis < 3; axis++) {
      if (from[axis]) continue;
      const to = [...from];
      to[axis] = 1;
      edges.push({ back: k === 1 && to[2] === 1, line: segment(corner(i, j, k), corner(to[0], to[1], to[2])) });
    }
  }
  return edges;
})();

const DOTS = JOINTS.map((joint, index) => {
  const [cx, cy] = project(joint);
  return { cx: round(cx), cy: round(cy), r: (index < 5 ? 1.6 : 2.8) * SCALE };
});

export default function RadarPoseCardArt() {
  return (
    <svg
      viewBox="0 0 400 260"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A person seated in a chair, seen at an angle, with a dot on each joint and a 3D tracking box around them"
    >
      <rect width="400" height="260" fill={ink} />

      <g stroke={floor} strokeWidth="1">
        {FLOOR_LINES.map((line, index) => <line key={index} {...line} />)}
      </g>

      <g stroke={chair} strokeWidth={1.4 * SCALE} strokeLinecap="round">
        {CHAIR_LEGS.map((line, index) => <line key={index} {...line} />)}
      </g>
      <polygon points={CHAIR_SEAT} fill={chair} stroke={chair} strokeWidth="2" strokeLinejoin="round" />
      <g stroke={chair} strokeWidth={1.4 * SCALE} strokeLinecap="round">
        {CHAIR_POSTS.map((line, index) => <line key={index} {...line} />)}
      </g>
      <polygon points={CHAIR_BACK} fill={chair} stroke={chair} strokeWidth="2" strokeLinejoin="round" />

      <g strokeLinecap="round">
        {LIMBS.slice(0, 4).map(([a, b, width, color]) => (
          <line key={`${a}-${b}`} {...segment(JOINTS[a], JOINTS[b])} stroke={color} strokeWidth={width * SCALE} />
        ))}
        {FEET.map((line, index) => <line key={index} {...line} stroke={fog} strokeWidth={4 * SCALE} />)}
      </g>
      <polygon points={TORSO} fill={bodyFill} stroke={bodyFill} strokeWidth="2" strokeLinejoin="round" />
      <g strokeLinecap="round">
        {LIMBS.slice(4).map(([a, b, width, color]) => (
          <line key={`${a}-${b}`} {...segment(JOINTS[a], JOINTS[b])} stroke={color} strokeWidth={width * SCALE} />
        ))}
        <line {...NECK} stroke={bodyFill} strokeWidth={4 * SCALE} />
      </g>
      <circle {...HEAD} fill={bodyFill} />

      <g stroke={lavender} strokeLinecap="round">
        {BOX_EDGES.map(({ back, line }, index) => (
          <line key={index} {...line} strokeWidth={(back ? 1.1 : 1.8) * SCALE} opacity={back ? 0.7 : 1} />
        ))}
      </g>

      <g fill={lavender}>
        {DOTS.map(({ cx, cy, r }, index) => (
          <g key={index}>
            <circle cx={cx} cy={cy} r={r + 2.5 * SCALE} opacity=".25" />
            <circle cx={cx} cy={cy} r={r} />
          </g>
        ))}
      </g>
    </svg>
  );
}
