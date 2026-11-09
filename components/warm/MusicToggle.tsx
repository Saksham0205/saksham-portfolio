import { useEffect, useRef, useState } from "react";

// Gentle lo-fi chord loop generated live in the browser (no audio file needed).
const CHORDS = [
  [261.63, 329.63, 392.0, 493.88],
  [220.0, 261.63, 329.63, 392.0],
  [174.61, 220.0, 261.63, 329.63],
  [196.0, 246.94, 293.66, 392.0],
];
const MELODY = [659.25, 587.33, 523.25, 493.88, 523.25, 587.33, 392.0, 440.0];

export function MusicToggle() {
  const [on, setOn] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const timer = useRef<number | null>(null);

  const stop = () => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    ctxRef.current?.close();
    ctxRef.current = null;
  };

  const start = () => {
    if (ctxRef.current) return;
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.value = 0.12;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1400;
    master.connect(lp).connect(ctx.destination);

    const tone = (f: number, t: number, d: number, v: number, type: OscillatorType) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.value = f;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(v, t + 0.08);
      g.gain.exponentialRampToValueAtTime(0.001, t + d);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + d + 0.05);
    };

    let bar = 0;
    const playBar = () => {
      const t = ctx.currentTime + 0.05;
      CHORDS[bar % 4]!.forEach((f) => tone(f, t, 2.3, 0.18, "triangle"));
      tone(CHORDS[bar % 4]![0]! / 2, t, 2.3, 0.3, "sine");
      [0, 0.6, 1.2, 1.8].forEach((o, i) => tone(MELODY[(bar * 2 + i) % 8]!, t + o, 0.5, 0.1, "sine"));
      bar++;
    };
    // Start automatically when allowed; if autoplay is blocked, retry after the first user gesture.
    void ctx.resume().then(() => {
      if (ctxRef.current !== ctx || ctx.state !== "running" || timer.current !== null) return;
      playBar();
      timer.current = window.setInterval(playBar, 2400);
    }).catch(() => {});
  };

  useEffect(() => {
    start();
    const resumeOnGesture = () => start();
    window.addEventListener("pointerdown", resumeOnGesture);
    window.addEventListener("keydown", resumeOnGesture);
    return () => {
      window.removeEventListener("pointerdown", resumeOnGesture);
      window.removeEventListener("keydown", resumeOnGesture);
      stop();
    };
  }, []);

  return (
    <button
      onClick={() => {
        if (on) stop();
        else start();
        setOn(!on);
      }}
      aria-label={on ? "Turn music off" : "Turn music on"}
      className="pop fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-secondary px-4 py-3 font-sans text-sm font-bold"
    >
      <span className="flex h-5 items-end gap-[3px]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[3px] rounded-full bg-foreground ${on ? "eq-bar" : ""}`}
            style={{ height: on ? "100%" : "30%", animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
      {on ? "Vibing" : "Play music"}
    </button>
  );
}
