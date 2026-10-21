type EntryPosition = { id: string; top: number; bottom: number };

export function getProjectFocusTransform(source: { left: number; top: number; width: number; height: number }, target: { left: number; top: number; width: number; height: number }) {
  return `translate(${source.left - target.left}px, ${source.top - target.top}px) scale(${source.width / target.width}, ${source.height / target.height})`;
}

export function getActiveResumeEntry(entries: EntryPosition[], viewportHeight: number) {
  if (!entries.length) return undefined;
  const last = entries[entries.length - 1];
  if (last.bottom <= viewportHeight) return last.id;

  let active = entries[0].id;
  for (const entry of entries) {
    if (entry.top <= viewportHeight * 0.35) active = entry.id;
  }
  return active;
}
