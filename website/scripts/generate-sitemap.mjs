/**
 * Generates public/sitemap.xml from the central data file.
 *
 * Must be run AFTER the SSR build step but BEFORE SSR cleanup.
 * Add to package.json build script between vite build --ssr and prerender.
 *
 * Usage: node scripts/generate-sitemap.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function generateSitemap() {
    const ssrPath = path.resolve(__dirname, '../dist-ssr/entry-server.js')

    if (!fs.existsSync(ssrPath)) {
        console.error('SSR build not found. Run "vite build --ssr" first.')
        process.exit(1)
    }

    const { getAllSitemapEntries } = await import(ssrPath)
    const entries = getAllSitemapEntries()

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
    .map(
        (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
  </url>`
    )
    .join('\n')}
</urlset>
`

    const outPath = path.resolve(__dirname, '../public/sitemap.xml')
    fs.writeFileSync(outPath, xml)
    console.log(`  Generated sitemap.xml with ${entries.length} URLs`)
}

generateSitemap().catch((err) => {
    console.error('Sitemap generation failed:', err)
    process.exit(1)
})
