export function getLineProximity(pointerY: number, centerY: number) {
  const proximity = Math.max(0, 1 - Math.abs(pointerY - centerY) / 120);
  return proximity * proximity * (3 - 2 * proximity);
}
