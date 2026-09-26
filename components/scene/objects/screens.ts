// Illustrative app screens drawn with Canvas 2D. They sketch the shape of the
// Ajnabee flows — no real data, ratings or prices are shown.

import { PALETTE } from "../layout";

type Ctx = CanvasRenderingContext2D;

const UI = {
  bg: "#101419",
  card: "#1A2029",
  line: "#2A313C",
  text: PALETTE.bone,
  muted: "#7E8591",
  accent: PALETTE.signal,
};

let family = "sans-serif";
export const refreshScreenFont = () => {
  if (typeof document !== "undefined") family = getComputedStyle(document.body).fontFamily || family;
};

const font = (size: number, weight = 500) => `${weight} ${size}px ${family}`;

function box(ctx: Ctx, x: number, y: number, w: number, h: number, r: number, fill: string) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}

function bars(ctx: Ctx, x: number, y: number, widths: number[], color = UI.line, h = 14, gap = 12) {
  widths.forEach((w, i) => box(ctx, x, y + i * (h + gap), w, h, h / 2, color));
}

function check(ctx: Ctx, cx: number, cy: number, r: number) {
  ctx.strokeStyle = UI.accent;
  ctx.lineWidth = r * 0.12;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - r * 0.42, cy + r * 0.02);
  ctx.lineTo(cx - r * 0.1, cy + r * 0.34);
  ctx.lineTo(cx + r * 0.45, cy - r * 0.3);
  ctx.stroke();
}

/** Customer app. `step` indexes data/experience.ts → ajnabee.flow. */
export function drawCustomerScreen(ctx: Ctx, w: number, h: number, step: number, title: string, total = 6) {
  ctx.fillStyle = UI.bg;
  ctx.fillRect(0, 0, w, h);
  const pad = 40;

  ctx.fillStyle = UI.muted;
  ctx.font = font(22, 600);
  ctx.fillText("ajnabee", pad, 78);
  ctx.fillStyle = UI.text;
  ctx.font = font(46, 700);
  ctx.fillText(title, pad, 150);

  const y0 = 200;
  const cw = w - pad * 2;
  switch (step) {
    case 0: // discover
      box(ctx, pad, y0, cw, 64, 32, UI.card);
      bars(ctx, pad + 30, y0 + 25, [160], UI.line);
      for (let i = 0; i < 4; i++) {
        const y = y0 + 100 + i * 150;
        box(ctx, pad, y, cw, 128, 22, UI.card);
        box(ctx, pad + 18, y + 18, 92, 92, 16, i === 0 ? UI.accent : UI.line);
        bars(ctx, pad + 134, y + 30, [200, 130, 90]);
      }
      break;
    case 1: // salon
      box(ctx, pad, y0, cw, 280, 26, UI.card);
      box(ctx, pad, y0, cw, 280, 26, "rgba(255,181,71,0.12)");
      bars(ctx, pad, y0 + 310, [260, 170], UI.text, 18, 18);
      for (let i = 0; i < 5; i++) box(ctx, pad + i * 44, y0 + 390, 30, 30, 6, i < 4 ? UI.accent : UI.line);
      for (let i = 0; i < 3; i++) box(ctx, pad + i * 150, y0 + 460, 132, 56, 28, i === 1 ? UI.accent : UI.card);
      bars(ctx, pad, y0 + 560, [cw, cw - 60, cw - 120]);
      break;
    case 2: // service
      for (let i = 0; i < 5; i++) {
        const y = y0 + i * 118;
        const on = i === 1;
        box(ctx, pad, y, cw, 98, 20, on ? "rgba(255,181,71,0.14)" : UI.card);
        box(ctx, pad + 24, y + 33, 32, 32, 8, on ? UI.accent : UI.line);
        bars(ctx, pad + 84, y + 30, [220, 120]);
      }
      break;
    case 3: {
      // booking
      const cell = (cw - 6 * 12) / 7;
      for (let r = 0; r < 5; r++)
        for (let c = 0; c < 7; c++)
          box(ctx, pad + c * (cell + 12), y0 + r * (cell + 12), cell, cell, 12, r === 2 && c === 4 ? UI.accent : UI.card);
      const ty = y0 + 5 * (cell + 12) + 30;
      for (let i = 0; i < 6; i++)
        box(ctx, pad + (i % 3) * 152, ty + Math.floor(i / 3) * 76, 136, 58, 29, i === 4 ? UI.accent : UI.card);
      break;
    }
    case 4: // payment
      box(ctx, pad, y0, cw, 220, 24, UI.card);
      bars(ctx, pad + 30, y0 + 40, [180, 260, 140]);
      box(ctx, pad, y0 + 260, cw, 96, 48, UI.accent);
      ctx.fillStyle = UI.bg;
      ctx.font = font(34, 700);
      ctx.fillText("Pay with UPI", pad + 40, y0 + 322);
      bars(ctx, pad, y0 + 400, [cw - 80, cw - 160]);
      break;
    default: // partner handoff
      check(ctx, w / 2, y0 + 170, 110);
      bars(ctx, (w - 300) / 2, y0 + 340, [300, 220], UI.line, 18, 18);
      box(ctx, pad, y0 + 470, cw, 150, 24, UI.card);
      box(ctx, pad + 24, y0 + 500, 12, 90, 6, UI.accent);
      bars(ctx, pad + 60, y0 + 505, [240, 170, 110]);
  }

  // Progress dots
  const dotY = h - 70;
  for (let i = 0; i < total; i++) {
    box(ctx, w / 2 - total * 18 + i * 36, dotY, i === step ? 30 : 12, 12, 6, i === step ? UI.accent : UI.line);
  }
}

/** Partner app: bookings list + staff schedule. `highlight` lights a newly arrived booking. */
export function drawPartnerScreen(ctx: Ctx, w: number, h: number, highlight: number) {
  ctx.fillStyle = UI.bg;
  ctx.fillRect(0, 0, w, h);
  const pad = 36;
  ctx.fillStyle = UI.muted;
  ctx.font = font(22, 600);
  ctx.fillText("ajnabee partner", pad, 60);
  ctx.fillStyle = UI.text;
  ctx.font = font(36, 700);
  ctx.fillText("Today", pad, 112);

  // Bookings column
  for (let i = 0; i < 5; i++) {
    const y = 150 + i * 88;
    const isNew = i === 0 && highlight > 0;
    box(ctx, pad, y, 300, 72, 14, isNew ? `rgba(255,181,71,${0.12 + highlight * 0.2})` : UI.card);
    box(ctx, pad + 16, y + 16, 40, 40, 10, isNew ? UI.accent : UI.line);
    bars(ctx, pad + 72, y + 18, [150, 90], UI.line, 12, 12);
  }

  // Staff schedule grid
  const gx = pad + 340;
  const gw = w - gx - pad;
  const cols = 4;
  const rows = 6;
  const cwid = gw / cols;
  const rh = (h - 190) / rows;
  ctx.strokeStyle = UI.line;
  ctx.lineWidth = 2;
  for (let c = 0; c <= cols; c++) {
    ctx.beginPath();
    ctx.moveTo(gx + c * cwid, 150);
    ctx.lineTo(gx + c * cwid, 150 + rows * rh);
    ctx.stroke();
  }
  const blocks = [
    [0, 0, 2],
    [1, 1, 1],
    [2, 0, 1],
    [3, 2, 2],
    [0, 3, 2],
    [2, 3, 2],
  ];
  blocks.forEach(([c, r, span]) => box(ctx, gx + c * cwid + 8, 150 + r * rh + 6, cwid - 16, span * rh - 12, 12, UI.card));
  if (highlight > 0) {
    ctx.globalAlpha = highlight;
    box(ctx, gx + 1 * cwid + 8, 150 + 3 * rh + 6, cwid - 16, 2 * rh - 12, 12, UI.accent);
    ctx.globalAlpha = 1;
  }
}
