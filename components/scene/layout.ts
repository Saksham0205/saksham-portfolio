import * as THREE from "three";
import { easeInOutCubic } from "@/lib/math";
import type { ProjectId } from "@/data/projects";

type V3 = [number, number, number];

/** Where each room's installation sits in world space, in room order (see data/rooms.ts). */
export const ORIGINS = {
  entrance: [0, 0, 0],
  signal: [0, 0, -34],
  omnidimension: [6, 0, -74],
  spyne: [-6, 0, -114],
  ajnabee: [5, 0, -154],
  lab: [0, 0, -194],
  loop: [-3, 0, -234],
} satisfies Record<string, V3>;

export const PALETTE = {
  void: "#0A0D12",
  bone: "#E8E4DA",
  signal: "#FFB547",
  slate: "#8A919C",
  graphite: "#1A1F27",
  coral: "#E0795C",
};

export interface Shot {
  pos: V3;
  target: V3;
  /** Added to pos and target, scaled by the room's hold progress (0..1). */
  drift?: V3;
}

const at = (o: V3, d: V3): V3 => [o[0] + d[0], o[1] + d[1], o[2] + d[2]];

/**
 * Desktop shots keep installations right of centre so text can sit on the
 * left. Mobile shots keep them in the upper half, above the text sheet, and
 * pan across wide installations instead of pulling back.
 */
const O = ORIGINS;
export const SHOTS: { desktop: Shot; mobile: Shot }[] = [
  // 0 entrance
  {
    desktop: { pos: [0, 2.4, 14], target: [0, 3.4, 0], drift: [0, 0, -2] },
    mobile: { pos: [0, 2.2, 17], target: [0, 4.6, 0] },
  },
  // 1 signal
  {
    desktop: { pos: at(O.signal, [-1.5, 3.2, 10]), target: at(O.signal, [-2.8, 2.6, -4]), drift: [0, 0, -1.5] },
    mobile: { pos: at(O.signal, [-4, 2.6, 7]), target: at(O.signal, [-4, 1.6, -4]), drift: [8, 0, 0] },
  },
  // 2 omnidimension
  {
    desktop: { pos: at(O.omnidimension, [-3.8, 7, 18.5]), target: at(O.omnidimension, [-3.4, 1.9, 0]), drift: [0.6, -0.5, -1.2] },
    mobile: { pos: at(O.omnidimension, [-4.8, 3.4, 8]), target: at(O.omnidimension, [-4.8, 1.4, 0]), drift: [10, 0, 0] },
  },
  // 3 spyne
  {
    desktop: { pos: at(O.spyne, [-10.2, 4.6, 12.5]), target: at(O.spyne, [-9.7, 2.2, 0]), drift: [11, 0, 0] },
    mobile: { pos: at(O.spyne, [-7.4, 3.6, 9]), target: at(O.spyne, [-7.4, 1.2, 0]), drift: [13, 0, 0] },
  },
  // 4 ajnabee
  {
    desktop: { pos: at(O.ajnabee, [-4.4, 3.4, 11]), target: at(O.ajnabee, [-3.7, 2.6, 0]), drift: [2.6, 0, -0.6] },
    mobile: { pos: at(O.ajnabee, [-1, 2.8, 7.5]), target: at(O.ajnabee, [-1, 1.6, 0]), drift: [4.8, 0, -0.6] },
  },
  // 5 lab
  {
    desktop: { pos: at(O.lab, [0, 4.2, 12.5]), target: at(O.lab, [0, 1.7, 0]) },
    mobile: { pos: at(O.lab, [-4.6, 3.2, 7.5]), target: at(O.lab, [-4.6, 0.9, 0]), drift: [9.2, 0, 0] },
  },
  // 6 about — the build/ship/learn/iterate loop
  {
    desktop: { pos: at(O.loop, [-4, 3.6, 10.5]), target: at(O.loop, [-3.4, 3.3, 0]), drift: [0, 0, -0.8] },
    mobile: { pos: at(O.loop, [0, 2.8, 11]), target: at(O.loop, [0, 1.6, 0]) },
  },
  // 7 capabilities — orbit to the side of the loop
  {
    desktop: { pos: at(O.loop, [8, 4.8, 7]), target: at(O.loop, [-1.4, 3, 0]), drift: [-1, 0, 0] },
    mobile: { pos: at(O.loop, [7, 3.2, 9]), target: at(O.loop, [0, 1.4, 0]) },
  },
  // 8 record — timeline posts in front of the loop
  {
    desktop: { pos: at(O.loop, [-0.6, 2.6, 16]), target: at(O.loop, [-1.4, 1.9, 3]), drift: [0.8, 0.3, 0] },
    mobile: { pos: at(O.loop, [-0.5, 2, 9]), target: at(O.loop, [-0.5, 0.6, 3]), drift: [5.2, 0, 0] },
  },
  // 9 contact — pull out above the whole lab
  {
    desktop: { pos: [34, 62, -70], target: [0, 0, -128], drift: [6, 26, 18] },
    mobile: { pos: [24, 92, -58], target: [0, 0, -120], drift: [4, 30, 18] },
  },
];

const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();

function shotPoint(shot: Shot, local: number, key: "pos" | "target", out: THREE.Vector3) {
  const p = shot[key];
  const d = shot.drift ?? [0, 0, 0];
  return out.set(p[0] + d[0] * local, p[1] + d[1] * local, p[2] + d[2] * local);
}

/**
 * Resolves camera position/target for a continuous room parameter. Transits
 * are eased and lifted into a gentle arc so the camera sweeps over
 * installations instead of clipping through them.
 */
export function sampleCamera(
  param: number,
  locals: ArrayLike<number>,
  mobile: boolean,
  outPos: THREE.Vector3,
  outTarget: THREE.Vector3,
) {
  const last = SHOTS.length - 1;
  const i = Math.min(Math.floor(param), last);
  const t = easeInOutCubic(Math.min(param - i, 1));
  const a = mobile ? SHOTS[i].mobile : SHOTS[i].desktop;

  shotPoint(a, locals[i] ?? 0, "pos", outPos);
  shotPoint(a, locals[i] ?? 0, "target", outTarget);
  if (i >= last || t === 0) return;

  const b = mobile ? SHOTS[i + 1].mobile : SHOTS[i + 1].desktop;
  shotPoint(b, 0, "pos", tmpA);
  shotPoint(b, 0, "target", tmpB);
  const dist = outPos.distanceTo(tmpA);
  outPos.lerp(tmpA, t);
  outTarget.lerp(tmpB, t);
  outPos.y += Math.sin(Math.PI * t) * Math.min(3, dist * 0.07);
}

/** Artifact positions in The Lab, and the close-up shot used when one is opened. */
export const LAB_ARTIFACTS: Record<ProjectId, V3> = {
  ajnabee: at(O.lab, [-4.6, 0, 0]),
  "ajnabee-partner": at(O.lab, [0, 0, -0.6]),
  reswipe: at(O.lab, [4.6, 0, 0]),
};

export function focusShot(id: ProjectId, mobile: boolean): Shot {
  const a = LAB_ARTIFACTS[id];
  // Desktop: artifact sits left of the case-study panel. Mobile: above the bottom sheet.
  return mobile
    ? { pos: at(a, [0, 3.2, 8.2]), target: at(a, [0, 1.1, 0]) }
    : { pos: at(a, [2.9, 3.3, 7.6]), target: at(a, [2.5, 2.5, 0]) };
}

/** Spine of the lab: the data bus connecting every room at floor level. */
export const SPINE_POINTS: V3[] = [
  [0, 0.02, 12],
  [0, 0.02, 0],
  at(O.signal, [0, 0.02, 0]),
  at(O.omnidimension, [0, 0.02, 3]),
  at(O.spyne, [0, 0.02, 3]),
  at(O.ajnabee, [0, 0.02, 3]),
  at(O.lab, [0, 0.02, 3]),
  at(O.loop, [0, 0.02, 3]),
  at(O.loop, [0, 0.02, -20]),
];
