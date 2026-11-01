import { GROUND, type Rect, SCENE_HEIGHT, SCENE_WIDTH, scenes } from "@/components/pixel/sceneArt";

// Size of one scenery art pixel in CSS pixels.
const PX = 4;

interface SceneryProps {
  // Chapter id of the active level (a key of `scenes`).
  active: string;
  visible: boolean;
}

// A faint horizon pinned to the bottom-left of the viewport while the journey
// is on screen. It sits behind the character column and fades out before the
// story text, so the text always has a plain background. Desktop only.
export function Scenery({ active, visible }: SceneryProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-0 -z-10 hidden text-line transition-opacity duration-[400ms] ease-[steps(4,end)] motion-reduce:transition-none md:block"
      style={{
        left: "max(0px, calc((100vw - 64rem) / 2 - 48px))",
        width: SCENE_WIDTH * PX,
        height: SCENE_HEIGHT * PX,
        opacity: visible ? 1 : 0,
        maskImage: "linear-gradient(to right, #000 30%, transparent 66%)",
        WebkitMaskImage: "linear-gradient(to right, #000 30%, transparent 66%)",
      }}
    >
      {Object.entries(scenes).map(([id, scene]) => (
        <svg
          key={id}
          viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
          width={SCENE_WIDTH * PX}
          height={SCENE_HEIGHT * PX}
          shapeRendering="crispEdges"
          className="absolute inset-0 transition-opacity duration-[400ms] ease-[steps(4,end)] motion-reduce:transition-none"
          style={{ opacity: id === active ? 1 : 0 }}
        >
          <Rects rects={scene.fill} fill="currentColor" />
          {scene.cut && <Rects rects={scene.cut} fill="var(--canvas)" />}
        </svg>
      ))}
      <svg
        viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
        width={SCENE_WIDTH * PX}
        height={SCENE_HEIGHT * PX}
        shapeRendering="crispEdges"
        className="absolute inset-0"
      >
        <Rects rects={[GROUND]} fill="currentColor" />
      </svg>
    </div>
  );
}

function Rects({ rects, fill }: { rects: Rect[]; fill: string }) {
  return (
    <g fill={fill}>
      {rects.map(([x, y, w, h]) => (
        <rect key={`${x}-${y}-${w}-${h}`} x={x} y={y} width={w} height={h} />
      ))}
    </g>
  );
}
