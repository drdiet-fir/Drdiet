/* One-off: resize + lossy-palette re-encode the PNGs the site actually loads,
   in place (same filenames, alpha preserved). Reversible via git. */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const ROOT = 'public/brand_assets'

// folder/file -> max dimension (longest edge). Only shrinks, never enlarges.
const targets = [
  { dir: 'cities', max: 760 },
  { dir: 'meals-section', max: 820 },
  { dir: 'why-section', max: 820 },
  { dir: 'about', max: 1000 },
  { glob: /^hero\/sticker-\d+\.png$/i, max: 700 },
  { file: 'Hero Section Subscription.png', max: 1440 },
]

function rel(p) { return path.relative(ROOT, p).replace(/\\/g, '/') }

function collect() {
  const out = []
  const walk = (d) => {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f)
      const s = fs.statSync(p)
      if (s.isDirectory()) walk(p)
      else if (/\.png$/i.test(f)) out.push(p)
    }
  }
  walk(ROOT)
  return out
}

function maxFor(relPath) {
  for (const t of targets) {
    if (t.file && relPath === t.file) return t.max
    if (t.dir && relPath.startsWith(t.dir + '/')) return t.max
    if (t.glob && t.glob.test(relPath)) return t.max
  }
  return null
}

;(async () => {
  const files = collect()
  let before = 0, after = 0, count = 0
  for (const p of files) {
    const r = rel(p)
    const max = maxFor(r)
    if (max == null) continue
    const origSize = fs.statSync(p).size
    const buf = await sharp(p)
      .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
      .png({ quality: 80, effort: 9, compressionLevel: 9, palette: true })
      .toBuffer()
    if (buf.length < origSize) {
      fs.writeFileSync(p, buf)
      before += origSize
      after += buf.length
      count++
      console.log(`${(origSize / 1024).toFixed(0).padStart(6)}KB -> ${(buf.length / 1024).toFixed(0).padStart(6)}KB  ${r}`)
    }
  }
  console.log(`\n${count} files: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB  (saved ${((1 - after / before) * 100).toFixed(0)}%)`)
})()
