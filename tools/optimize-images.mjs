import sharp from 'sharp'
import { readdirSync, statSync, mkdirSync } from 'fs'
import { join, extname, basename } from 'path'

const INPUT_DIR  = './public/brand_assets'
const OUTPUT_DIR = './public/brand_assets'
const MAX_WIDTH  = 1200

const files = readdirSync(INPUT_DIR).filter(f =>
  ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase())
)

let totalBefore = 0
let totalAfter  = 0

for (const file of files) {
  const inputPath  = join(INPUT_DIR, file)
  const ext        = extname(file).toLowerCase()
  const nameNoExt  = basename(file, ext)
  const outputPath = join(OUTPUT_DIR, nameNoExt + '.webp')

  const before = statSync(inputPath).size
  totalBefore += before

  try {
    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outputPath)

    const after = statSync(outputPath).size
    totalAfter += after

    const saved = (((before - after) / before) * 100).toFixed(0)
    console.log(`✅ ${file} → ${nameNoExt}.webp  (${(before/1024/1024).toFixed(1)}MB → ${(after/1024).toFixed(0)}KB, -${saved}%)`)
  } catch (err) {
    console.error(`❌ ${file}: ${err.message}`)
  }
}

console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB saved ${(((totalBefore-totalAfter)/totalBefore)*100).toFixed(0)}%`)
