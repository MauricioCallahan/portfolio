export function getWelcomeProgress(scrollY: number) {
  return Math.max(0, Math.min(1, scrollY / 240));
}
