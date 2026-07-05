import React, { useMemo } from "react";

/**
 * Deterministic decorative "QR" pattern generated from a code string.
 * NOT a real scannable QR — swap in a library like `qrcode.react` if a
 * functional scannable code is needed for production ticketing.
 */
export default function QRCode({ value = "SAM80-VIP-0128", size = 168 }) {
  const cells = useMemo(() => {
    const gridSize = 21;
    let seed = 0;
    for (let i = 0; i < value.length; i++) seed += value.charCodeAt(i) * (i + 7);

    function rand() {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return (seed % 1000) / 1000;
    }

    const grid = [];
    for (let y = 0; y < gridSize; y++) {
      const row = [];
      for (let x = 0; x < gridSize; x++) {
        const inFinder =
          (x < 7 && y < 7) || (x > gridSize - 8 && y < 7) || (x < 7 && y > gridSize - 8);
        row.push(inFinder ? 0 : rand() > 0.56 ? 1 : 0);
      }
      grid.push(row);
    }
    return { grid, gridSize };
  }, [value]);

  function finder(ox, oy, key) {
    return (
      <g key={key}>
        <rect x={ox} y={oy} width="7" height="7" fill="#101B33" />
        <rect x={ox + 1} y={oy + 1} width="5" height="5" fill="#F6F1E4" />
        <rect x={ox + 2} y={oy + 2} width="3" height="3" fill="#101B33" />
      </g>
    );
  }

  const { grid, gridSize } = cells;

  return (
    <svg
      viewBox={`0 0 ${gridSize} ${gridSize}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`QR code for ${value}`}
    >
      <rect x="0" y="0" width={gridSize} height={gridSize} fill="#F6F1E4" />
      {grid.map((row, y) =>
        row.map(
          (c, x) =>
            c === 1 && <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#101B33" />
        )
      )}
      {finder(0, 0, "tl")}
      {finder(gridSize - 7, 0, "tr")}
      {finder(0, gridSize - 7, "bl")}
    </svg>
  );
}
