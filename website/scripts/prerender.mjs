/**
 * Post-build prerendering script.
 *
 * 1. Vite builds the client bundle (dist/)
 * 2. Vite builds the SSR bundle (dist-ssr/)
 * 3. This script loads the SSR bundle and renders each route to static HTML
 * 4. The static HTML files replace the shell index.html for each route
 *
 * Routes are derived from the central data file (src/data/seo-pages.ts),
 * re-exported through entry-server.tsx into the SSR bundle.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const ssrDir = path.resolve(__dirname, '../dist-ssr')

async function prerender() {
    // Load the SSR bundle — includes render function and route helpers
    const { render, getAllRoutes } = await import(path.join(ssrDir, 'entry-server.js'))

    const routes = getAllRoutes()
    console.log(`  Prerendering ${routes.length} routes...\n`)

    // Read the template HTML (client build output)
    const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')

    for (const route of routes) {
        const { html: appHtml, head } = render(route)

        // Inject the rendered HTML into the template
        let finalHtml = template
            .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

        // Inject head tags before </head>
        if (head) {
            finalHtml = finalHtml.replace('</head>', `${head}\n</head>`)
        }

        // Determine the output file path
        const filePath = route === '/'
            ? path.join(distDir, 'index.html')
            : path.join(distDir, route.slice(1), 'index.html')

        // Ensure directory exists
        const dir = path.dirname(filePath)
        fs.mkdirSync(dir, { recursive: true })

        fs.writeFileSync(filePath, finalHtml)
        console.log(`  Prerendered: ${route} -> ${path.relative(distDir, filePath)}`)
    }

    // Clean up SSR build
    fs.rmSync(ssrDir, { recursive: true, force: true })
    console.log('\n  Cleaned up SSR build artifacts.')
}

prerender().catch((err) => {
    console.error('Prerender failed:', err)
    process.exit(1)
})
