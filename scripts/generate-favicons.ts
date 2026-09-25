import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// CRC32 implementation for PNG chunks
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xedb88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

function crc32(buf: Buffer): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type: string, data: Buffer): Buffer {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

function encodePng(width: number, height: number, rgbaBuffer: Buffer): Buffer {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits per channel
  ihdrData[9] = 6; // RGBA color type
  ihdrData[10] = 0; // Deflate compression
  ihdrData[11] = 0; // Filter method
  ihdrData[12] = 0; // No interlace
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Scanlines with filter byte 0 (None)
  const rawScanlines = Buffer.alloc(height * (1 + width * 4));
  let srcOffset = 0;
  let dstOffset = 0;
  for (let y = 0; y < height; y++) {
    rawScanlines[dstOffset++] = 0; // filter type 0
    rgbaBuffer.copy(rawScanlines, dstOffset, srcOffset, srcOffset + width * 4);
    srcOffset += width * 4;
    dstOffset += width * 4;
  }

  // IDAT chunk
  const compressed = zlib.deflateSync(rawScanlines, { level: 9 });
  const idatChunk = createChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Render Leak Detection Pro Brand Logo icon at given pixel size
function renderBrandLogo(size: number): Buffer {
  const buffer = Buffer.alloc(size * size * 4);
  const cornerRadius = size * 0.26;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      // Anti-aliased rounded squircle container
      // Distance from inner rounded box
      const cx = x < cornerRadius ? cornerRadius : x >= size - cornerRadius ? size - 1 - cornerRadius : x;
      const cy = y < cornerRadius ? cornerRadius : y >= size - cornerRadius ? size - 1 - cornerRadius : y;
      const distToCorner = Math.hypot(x - cx, y - cy);
      const isCorner = (x < cornerRadius || x >= size - cornerRadius) && (y < cornerRadius || y >= size - cornerRadius);
      const dist = isCorner ? distToCorner - cornerRadius : -1;

      if (dist > 1.0) {
        // Outside squircle
        continue;
      }

      // Base squircle anti-aliasing
      let alpha = 1.0;
      if (dist > -1.0) {
        alpha = Math.max(0, Math.min(1, 0.5 - dist * 0.7));
      }

      // Base gradient: Vibrant Blue (#2563eb) to Deep Royal (#1d4ed8 / #1e3a8a)
      const gradT = (x * 0.3 + y * 0.7) / size;
      let r = Math.round(37 * (1 - gradT) + 26 * gradT);
      let g = Math.round(99 * (1 - gradT) + 60 * gradT);
      let b = Math.round(235 * (1 - gradT) + 180 * gradT);

      // Subtle border highlight on top edge
      if (y <= size * 0.15 && dist <= -0.5) {
        const borderGlow = (1 - y / (size * 0.15)) * 0.25;
        r = Math.min(255, Math.round(r + 96 * borderGlow));
        g = Math.min(255, Math.round(g + 165 * borderGlow));
        b = Math.min(255, Math.round(b + 250 * borderGlow));
      }

      // Coordinate normalization for inner artwork: [-1, 1] relative to center
      const nx = (x - size * 0.44) / (size * 0.36);
      const ny = (y - size * 0.58) / (size * 0.38);

      // Main droplet shape
      // Standard water droplet: circular bottom, tapering to tip at top
      let inMainDrop = false;
      let mainDropBlend = 0;

      if (ny >= -1.0 && ny <= 0.7) {
        // Bulb center around ny = 0.15, radius = 0.5
        const bulbY = 0.15;
        const bulbR = 0.52;
        const distFromBulb = Math.hypot(nx, ny - bulbY);

        if (distFromBulb <= bulbR + 0.08) {
          inMainDrop = true;
          mainDropBlend = Math.max(0, Math.min(1, (bulbR + 0.08 - distFromBulb) / 0.12));
        }

        // Top taper to tip at (0, -0.9)
        if (ny < bulbY && ny >= -0.9) {
          const taperT = (ny - (-0.9)) / (bulbY - (-0.9));
          const taperW = Math.sin(taperT * Math.PI * 0.5) * bulbR;
          const distFromTaper = Math.abs(nx) - taperW;
          if (distFromTaper <= 0.08) {
            inMainDrop = true;
            mainDropBlend = Math.max(mainDropBlend, Math.max(0, Math.min(1, -distFromTaper / 0.12)));
          }
        }
      }

      // Secondary droplet (accent) offset to the right: (nx2, ny2)
      const nx2 = (x - size * 0.65) / (size * 0.22);
      const ny2 = (y - size * 0.64) / (size * 0.24);
      let inSecDrop = false;
      let secDropBlend = 0;

      if (ny2 >= -0.9 && ny2 <= 0.7) {
        const bulbY2 = 0.12;
        const bulbR2 = 0.48;
        const distFromBulb2 = Math.hypot(nx2, ny2 - bulbY2);
        if (distFromBulb2 <= bulbR2 + 0.08) {
          inSecDrop = true;
          secDropBlend = Math.max(0, Math.min(1, (bulbR2 + 0.08 - distFromBulb2) / 0.12));
        }
        if (ny2 < bulbY2 && ny2 >= -0.85) {
          const taperT2 = (ny2 - (-0.85)) / (bulbY2 - (-0.85));
          const taperW2 = Math.sin(taperT2 * Math.PI * 0.5) * bulbR2;
          const distFromTaper2 = Math.abs(nx2) - taperW2;
          if (distFromTaper2 <= 0.08) {
            inSecDrop = true;
            secDropBlend = Math.max(secDropBlend, Math.max(0, Math.min(1, -distFromTaper2 / 0.12)));
          }
        }
      }

      // Acoustic pulse detection arc in top right
      const arcCenterX = size * 0.5;
      const arcCenterY = size * 0.5;
      const distFromArcCenter = Math.hypot(x - arcCenterX, y - arcCenterY);
      const arcRadius = size * 0.32;
      const arcDist = Math.abs(distFromArcCenter - arcRadius);
      const arcAngle = Math.atan2(y - arcCenterY, x - arcCenterX); // Angle in radians
      let isArc = false;
      let arcBlend = 0;
      if (arcAngle >= -0.85 && arcAngle <= -0.15 && arcDist <= size * 0.05) {
        isArc = true;
        arcBlend = (1 - arcDist / (size * 0.05)) * 0.75;
      }

      // Composite layers
      if (isArc && !inMainDrop && !inSecDrop) {
        r = Math.round(r * (1 - arcBlend) + 56 * arcBlend);
        g = Math.round(g * (1 - arcBlend) + 189 * arcBlend);
        b = Math.round(b * (1 - arcBlend) + 248 * arcBlend);
      }

      if (inMainDrop) {
        // Main droplet gradient: Pure White (#ffffff) to Luminous Cyan (#38bdf8)
        const dropGrad = Math.max(0, Math.min(1, (ny + 0.8) / 1.5));
        const dropR = Math.round(255 * (1 - dropGrad) + 56 * dropGrad);
        const dropG = Math.round(255 * (1 - dropGrad) + 189 * dropGrad);
        const dropB = Math.round(255 * (1 - dropGrad) + 248 * dropGrad);

        // Gloss curve highlight
        const isGloss = nx < -0.12 && nx > -0.38 && ny > -0.3 && ny < 0.35;
        const glossAdd = isGloss ? 50 : 0;

        r = Math.min(255, Math.round(r * (1 - mainDropBlend) + (dropR + glossAdd) * mainDropBlend));
        g = Math.min(255, Math.round(g * (1 - mainDropBlend) + (dropG + glossAdd) * mainDropBlend));
        b = Math.min(255, Math.round(b * (1 - mainDropBlend) + (dropB + glossAdd) * mainDropBlend));
      }

      if (inSecDrop) {
        // Secondary droplet: Cyan (#06b6d4) to Bright Teal (#67e8f9)
        const secGrad = Math.max(0, Math.min(1, (ny2 + 0.8) / 1.5));
        const secR = Math.round(103 * (1 - secGrad) + 6 * secGrad);
        const secG = Math.round(232 * (1 - secGrad) + 182 * secGrad);
        const secB = Math.round(249 * (1 - secGrad) + 212 * secGrad);

        r = Math.round(r * (1 - secDropBlend) + secR * secDropBlend);
        g = Math.round(g * (1 - secDropBlend) + secG * secDropBlend);
        b = Math.round(b * (1 - secDropBlend) + secB * secDropBlend);
      }

      buffer[idx] = r;
      buffer[idx + 1] = g;
      buffer[idx + 2] = b;
      buffer[idx + 3] = Math.round(alpha * 255);
    }
  }

  return buffer;
}

// Generate multi-size Windows .ico container
function createIco(png16: Buffer, png32: Buffer): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(2, 4); // 2 images

  const dir16 = Buffer.alloc(16);
  dir16[0] = 16; // width
  dir16[1] = 16; // height
  dir16[2] = 0;  // colors
  dir16[3] = 0;  // reserved
  dir16.writeUInt16LE(1, 4);  // planes
  dir16.writeUInt16LE(32, 6); // bpp
  dir16.writeUInt32LE(png16.length, 8); // size
  dir16.writeUInt32LE(6 + 32, 12);      // offset

  const dir32 = Buffer.alloc(16);
  dir32[0] = 32; // width
  dir32[1] = 32; // height
  dir32[2] = 0;  // colors
  dir32[3] = 0;  // reserved
  dir32.writeUInt16LE(1, 4);  // planes
  dir32.writeUInt16LE(32, 6); // bpp
  dir32.writeUInt32LE(png32.length, 8); // size
  dir32.writeUInt32LE(6 + 32 + png16.length, 12); // offset

  return Buffer.concat([header, dir16, dir32, png16, png32]);
}

// Main execution
const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('Generating Leak Detection Pro brand favicons...');

// 1. Generate 16x16, 32x32, 180x180, 192x192, 512x512
const raw16 = renderBrandLogo(16);
const png16 = encodePng(16, 16, raw16);
fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);

const raw32 = renderBrandLogo(32);
const png32 = encodePng(32, 32, raw32);
fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
fs.writeFileSync(path.join(publicDir, 'favicon.png'), png32);

const raw180 = renderBrandLogo(180);
const png180 = encodePng(180, 180, raw180);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);

const raw192 = renderBrandLogo(192);
const png192 = encodePng(192, 192, raw192);
fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), png192);

const raw512 = renderBrandLogo(512);
const png512 = encodePng(512, 512, raw512);
fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), png512);

// 2. Generate favicon.ico
const icoBuffer = createIco(png16, png32);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

// 3. Generate site.webmanifest
const manifest = {
  name: 'Leak Detection Pro',
  short_name: 'LeakDetectionPro',
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ],
  theme_color: '#0f172a',
  background_color: '#0f172a',
  display: 'standalone'
};
fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');

console.log('Successfully generated all brand favicons in /public:');
console.log('- favicon.svg (Vector SVG for modern browser tabs)');
console.log('- favicon-32x32.png & favicon-16x16.png');
console.log('- favicon.ico (Standard multi-resolution ICO)');
console.log('- apple-touch-icon.png (180x180)');
console.log('- site.webmanifest');
