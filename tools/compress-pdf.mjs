/* Compress an image-heavy PDF (e.g. the menu) by rasterizing each page to a
 * JPEG and reassembling. Self-contained — no Ghostscript needed.
 *
 * One-time: npm i -g mupdf pdf-lib   (or install locally and run from there)
 * Usage:    node tools/compress-pdf.mjs <input.pdf> <output.pdf> [maxWidthPx=1400] [jpegQuality=72]
 *
 * Example (what produced the 33MB -> ~3MB menu):
 *   node tools/compress-pdf.mjs "brand_assets/DR DIET MENU.pdf" "public/brand_assets/DR DIET MENU.pdf" 1400 72
 */
import * as mupdf from 'mupdf'
import { PDFDocument } from 'pdf-lib'
import fs from 'fs'

const INPUT = process.argv[2]
const OUTPUT = process.argv[3]
const TARGET_W = Number(process.argv[4] || 1400)
const QUALITY = Number(process.argv[5] || 72)

if (!INPUT || !OUTPUT) {
  console.error('Usage: node tools/compress-pdf.mjs <input.pdf> <output.pdf> [maxWidthPx] [jpegQuality]')
  process.exit(1)
}

const doc = mupdf.Document.openDocument(new Uint8Array(fs.readFileSync(INPUT)), 'application/pdf')
const n = doc.countPages()
console.log('pages:', n)

const out = await PDFDocument.create()
for (let i = 0; i < n; i++) {
  const page = doc.loadPage(i)
  const [x0, , x1] = page.getBounds()
  const zoom = Math.min(TARGET_W / (x1 - x0), 3)
  const pix = page.toPixmap(mupdf.Matrix.scale(zoom, zoom), mupdf.ColorSpace.DeviceRGB, false)
  const jpg = pix.asJPEG(QUALITY)
  const img = await out.embedJpg(jpg)
  out.addPage([img.width, img.height]).drawImage(img, { x: 0, y: 0, width: img.width, height: img.height })
}
const bytes = await out.save()
fs.writeFileSync(OUTPUT, bytes)
console.log('written:', (bytes.length / 1048576).toFixed(2) + 'MB')
