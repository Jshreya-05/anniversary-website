import { useMemo } from 'react';

const BALLOON_COLORS = [
  'rgba(255, 105, 180, 0.7)',
  'rgba(255, 143, 163, 0.65)',
  'rgba(240, 192, 96, 0.7)',
  'rgba(255, 255, 255, 0.6)',
  'rgba(255, 99, 99, 0.6)',
];

const BALLOON_TEXTS = ['❤️ Aai', '❤️ Baba', '❤️ Forever', '❤️ 24 Years', '❤️ Love'];

function HeartBalloon({ balloon, index }) {
  const depthStyle = {
    near: { blur: 0, opacity: balloon.opacity, zIndex: 3 },
    mid: { blur: 1, opacity: balloon.opacity * 0.75, zIndex: 2 },
    far: { blur: 3, opacity: balloon.opacity * 0.45, zIndex: 1 },
  }[balloon.depth];

  return (
    <div
      className="absolute pointer-events-none animate-float-up"
      style={{
        left: `${balloon.left}%`,
        '--duration': `${balloon.duration}s`,
        '--sway': `${balloon.sway}px`,
        '--rotate': `${balloon.rotate}deg`,
        animationDelay: `${balloon.delay}s`,
        zIndex: depthStyle.zIndex,
        bottom: '-10%',
        filter: depthStyle.blur ? `blur(${depthStyle.blur}px)` : undefined,
      }}
    >
      <div
        className="relative animate-sway"
        style={{
          animationDuration: `${3 + index * 0.3}s`,
          transform: `scale(${balloon.depthScale})`,
        }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            width: balloon.size,
            height: balloon.size * 1.1,
            filter: `drop-shadow(0 0 ${balloon.size * 0.2}px ${balloon.color})`,
          }}
        >
          <svg viewBox="0 0 60 66" className="w-full h-full" style={{ opacity: depthStyle.opacity }}>
            <path
              d="M30 60 C30 60 5 40 5 22 C5 10 15 2 30 2 C45 2 55 10 55 22 C55 40 30 60 30 60Z"
              fill={balloon.color}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
            <ellipse cx="22" cy="18" rx="8" ry="6" fill="rgba(255,255,255,0.25)" transform="rotate(-20 22 18)" />
          </svg>
          {balloon.text && (
            <span
              className="absolute font-cormorant font-semibold text-white drop-shadow-md"
              style={{
                top: '35%',
                fontSize: Math.max(7, balloon.size * 0.22),
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              }}
            >
              {balloon.text}
            </span>
          )}
        </div>
        <div
          className="mx-auto"
          style={{
            width: 1,
            height: balloon.size * 0.8,
            background: 'linear-gradient(to bottom, rgba(150,150,150,0.4), rgba(150,150,150,0.1))',
            opacity: depthStyle.opacity,
          }}
        />
      </div>
    </div>
  );
}

export default function FloatingHeartBalloons({ count = 14, intense = false, showText = false }) {
  const balloons = useMemo(() => {
    const baseCount = intense ? 112 : Math.round(count * 1.4);
    const textInterval = Math.max(3, Math.floor(baseCount / BALLOON_TEXTS.length));

    return Array.from({ length: baseCount }, (_, i) => {
      const depthRoll = Math.random();
      const depth = depthRoll < 0.3 ? 'far' : depthRoll < 0.65 ? 'mid' : 'near';
      const depthScale = depth === 'far' ? 0.6 : depth === 'mid' ? 0.85 : 1;

      return {
        id: i,
        left: Math.random() * 100,
        size: (intense ? 20 + Math.random() * 40 : 25 + Math.random() * 35) * depthScale,
        duration: (intense ? 8 + Math.random() * 12 : 15 + Math.random() * 20) * (depth === 'far' ? 1.3 : 1),
        delay: intense ? Math.random() * 5 : Math.random() * 15,
        sway: (Math.random() - 0.5) * (depth === 'near' ? 80 : 40),
        rotate: (Math.random() - 0.5) * 20,
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
        opacity: 0.5 + Math.random() * 0.4,
        depth,
        depthScale,
        text: (showText || i % textInterval === 0) && i % textInterval < BALLOON_TEXTS.length
          ? BALLOON_TEXTS[Math.floor(i / textInterval) % BALLOON_TEXTS.length]
          : (i < 8 ? BALLOON_TEXTS[i % BALLOON_TEXTS.length] : null),
      };
    });
  }, [count, intense, showText]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {balloons.map((balloon, i) => (
        <HeartBalloon key={balloon.id} balloon={balloon} index={i} />
      ))}
    </div>
  );
}