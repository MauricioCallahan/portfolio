"use client";

import type { PointerEvent } from "react";
import { getLineProximity } from "@/lib/lineProximity";

const steps = [
  ["Live auctions", "Start with current listings for the selected weapon."],
  ["Comparable rolls", "Compare attributes, rerolls, and listing age."],
  ["Validated bids", "Check bidding evidence and filter outlier asking prices."],
  ["Price range", "Turn comparable market data into an estimated range."],
  ["Confidence", "Show how much evidence supports the estimate."],
];

export default function RivenProcess() {
  function updateProximity(event: PointerEvent<HTMLOListElement>) {
    for (const item of event.currentTarget.querySelectorAll<HTMLElement>("li")) {
      const { top, height } = item.getBoundingClientRect();
      const effect = event.type === "pointerleave" || event.pointerType === "touch"
        ? 0
        : getLineProximity(event.clientY, top + height / 2);
      item.style.setProperty("--line-proximity", String(effect));
    }
  }

  return (
    <div className="riven-process">
      <ol className="riven-lines" role="list" onPointerMove={updateProximity} onPointerLeave={updateProximity}>
        {steps.map(([title, description], index) => (
          <li key={title}>
            <span className="riven-line-marker" aria-hidden="true" />
            <div className="riven-line-copy">
              <span className="riven-line-number" aria-hidden="true">0{index + 1}</span>
              <div>
                <p className="riven-line-title">{title}</p>
                <p className="riven-line-description">{description}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
