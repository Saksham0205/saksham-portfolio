const fs = require('fs');
const path = require('path');

const sampleRate = 44100;
const duration = 4;
const totalSamples = sampleRate * duration;
const buffer = Buffer.alloc(totalSamples * 2);

for (let i = 0; i < totalSamples; i++) {
  const t = i / sampleRate;
  let sample = 0;

  // Ring pattern: 0-0.4s ring, 0.4-0.6s silence, 0.6-1.0s ring, 1.0-2.0s silence, repeat
  const cycleT = t % 2.0;
  const isRinging = (cycleT >= 0 && cycleT < 0.4) || (cycleT >= 0.6 && cycleT < 1.0);

  if (isRinging) {
    const fadeIn = Math.min(1, (cycleT < 0.4 ? cycleT : cycleT - 0.6) * 25);
    const fadeOut = Math.min(1, (cycleT < 0.4 ? (0.4 - cycleT) : (1.0 - cycleT)) * 25);
    const env = Math.min(fadeIn, fadeOut);
    sample = (Math.sin(2 * Math.PI * 440 * t) + Math.sin(2 * Math.PI * 480 * t)) * 0.18 * env;
  }

  const val = Math.max(-1, Math.min(1, sample));
  buffer.writeInt16LE(Math.round(val * 32767), i * 2);
}

const header = Buffer.alloc(44);
header.write('RIFF', 0);
header.writeUInt32LE(36 + buffer.length, 4);
header.write('WAVE', 8);
header.write('fmt ', 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(1, 22);
header.writeUInt32LE(sampleRate, 24);
header.writeUInt32LE(sampleRate * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write('data', 36);
header.writeUInt32LE(buffer.length, 40);

const outPath = path.join(__dirname, '..', 'public', 'sounds', 'ringtone.wav');
fs.writeFileSync(outPath, Buffer.concat([header, buffer]));
console.log(`Written ringtone.wav (${Math.round((header.length + buffer.length) / 1024)}KB)`);
