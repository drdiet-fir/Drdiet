const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..', 'public')
const MAX_WIDTH = 1600
const MIN_SIZE_TO_PROCESS = 150 * 1024 // skip anything already under 150KB

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (/\.(png|jpe?g)$/i.test(entry.name)) out.push(full)
  }
  return out
}

async function run() {
  const files = walk(ROOT)
  let totalBefore = 0
  let totalAfter = 0
  const results = []

  for (const file of files) {
    const before = fs.statSync(file).size
    if (before < MIN_SIZE_TO_PROCESS) continue

    const img = sharp(file)
    const meta = await img.metadata()
    const needsResize = meta.width > MAX_WIDTH

    let pipeline = sharp(file, { failOn: 'none' })
    if (needsResize) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })
    }

    const ext = path.extname(file).toLowerCase()
    const tmp = file + '.tmp'

    if (ext === '.png') {
      await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true, palette: true }).toFile(tmp)
    } else {
      await pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(tmp)
    }

    const after = fs.statSync(tmp).size
    if (after < before) {
      fs.renameSync(tmp, file)
      totalBefore += before
      totalAfter += after
      results.push({ file: path.relative(ROOT, file), before, after, resized: needsResize, dims: `${meta.width}x${meta.height}` })
    } else {
      fs.unlinkSync(tmp)
      results.push({ file: path.relative(ROOT, file), before, after: before, skipped: true })
    }
  }

  results.sort((a, b) => (b.before - b.after) - (a.before - a.after))
  for (const r of results) {
    if (r.skipped) {
      console.log(`SKIP  ${r.file} (already optimal)`)
    } else {
      const pct = (100 * (1 - r.after / r.before)).toFixed(0)
      console.log(`${r.resized ? 'RESIZE' : 'COMPRESS'}  ${r.file}  ${(r.before/1024/1024).toFixed(2)}MB -> ${(r.after/1024/1024).toFixed(2)}MB  (-${pct}%)  [${r.dims}]`)
    }
  }
  console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB -> ${(totalAfter/1024/1024).toFixed(1)}MB (saved ${((totalBefore-totalAfter)/1024/1024).toFixed(1)}MB)`)
}

run().catch((e) => { console.error(e); process.exit(1) })
