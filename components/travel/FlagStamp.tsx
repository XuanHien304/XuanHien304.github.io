import type { Flag } from "@/content/travel";

const W = 20;
const H = 12;
const PX = 4;

// Colour of one flag pixel at column x, row y.
const painters: Record<Flag, (x: number, y: number) => string> = {
  fr: (x) => (x < 7 ? "#0055a4" : x < 13 ? "#ffffff" : "#ef4135"),
  de: (_, y) => (y < 4 ? "#000000" : y < 8 ? "#dd0000" : "#ffce00"),
  uk: (x, y) => {
    // Union Jack: red cross on a white cross, over red-on-white diagonals.
    if (x >= 9 && x <= 10) return "#c8102e";
    if (y >= 5 && y <= 6) return "#c8102e";
    if (x >= 8 && x <= 11) return "#ffffff";
    if (y >= 4 && y <= 7) return "#ffffff";
    const d = Math.min(Math.abs(y - (x * (H - 1)) / (W - 1)), Math.abs(y - ((W - 1 - x) * (H - 1)) / (W - 1)));
    if (d < 0.5) return "#c8102e";
    if (d < 1.3) return "#ffffff";
    return "#012169";
  },
};

// A pixel-art flag in a stamp frame.
export function FlagStamp({ flag }: { flag: Flag }) {
  const paint = painters[flag];
  const cells = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={paint(x, y)} />);
  }
  return (
    <span className="pixel-border inline-block shrink-0 bg-card p-2">
      <svg aria-hidden width={W * PX} height={H * PX} viewBox={`0 0 ${W} ${H}`} shapeRendering="crispEdges" className="block">
        {cells}
      </svg>
    </span>
  );
}
