export type ProjectFocusPhase = "moving-card" | "revealing-details" | "open" | "concealing-details" | "returning-card" | "restoring-resume";

// Reuse each animation's timeline so dismissal reverses its current progress.
export function coordinateProjectFocus({ move, reveal, resume, phase, complete, reducedMotion }: {
  move: Animation;
  reveal: Animation;
  resume: Animation;
  phase: (phase: ProjectFocusPhase) => void;
  complete: () => void;
  reducedMotion: () => boolean;
}) {
  let closing = false;
  let disposed = false;
  let revealing = false;
  const play = async (animation: Animation, backwards = false) => {
    if (reducedMotion()) {
      animation.pause();
      animation.currentTime = backwards ? 0 : Number(animation.effect!.getTiming().duration);
    } else {
      if (backwards) {
        // Reversing an untouched timeline would seek to its end instead of closing immediately.
        if (animation.currentTime === 0) return;
        animation.reverse();
      } else {
        animation.play();
      }
      await animation.finished;
    }
  };
  const opening = async () => {
    phase("moving-card");
    void play(resume).catch(() => {});
    await play(move);
    if (closing || disposed) return;
    revealing = true;
    phase("revealing-details");
    await play(reveal);
    if (!closing && !disposed) phase("open");
  };
  void opening().catch(() => {});
  return {
    close() {
      if (closing || disposed) return;
      closing = true;
      const closingSequence = async () => {
        if (revealing) {
          phase("concealing-details");
          await play(reveal, true);
          if (disposed) return;
        }
        phase("returning-card");
        await play(move, true);
        if (disposed) return;
        phase("restoring-resume");
        await play(resume, true);
        if (!disposed) complete();
      };
      void closingSequence().catch(() => {});
    },
    dispose() {
      disposed = true;
      [move, reveal, resume].forEach(animation => {
        void animation.finished.catch(() => {});
        animation.cancel();
      });
    },
  };
}
