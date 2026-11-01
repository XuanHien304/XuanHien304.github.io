import { GROUND, type Rect, SCENE_HEIGHT, SCENE_WIDTH, scenes } from "@/components/pixel/sceneArt";

// Size of one scenery art pixel in CSS pixels.
const PX = 8;

interface SceneryProps {
  // Chapter id of the active level (a key of `scenes`).
  active: string;
  visible: boolean;
}

// A faint landscape along the bottom of the viewport while the journey is on
// screen. The scene sits at the screen's right edge, so on wide screens most
// of it fills the empty space beside the story text; the ground line runs the
// full width of the screen. Desktop only.
export function Scenery({ active, visible }: SceneryProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 hidden text-line transition-opacity duration-[400ms] ease-[steps(4,end)] motion-reduce:transition-none md:block"
      style={{ height: SCENE_HEIGHT * PX, opacity: visible ? 1 : 0 }}
    >
      <div className="absolute inset-y-0 right-0" style={{ width: SCENE_WIDTH * PX }}>
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
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-current" style={{ height: GROUND[3] * PX }} />
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
