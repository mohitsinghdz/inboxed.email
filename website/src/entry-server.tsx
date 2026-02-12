import React from 'react'
import { renderToString } from 'react-dom/server'
// @ts-expect-error StaticRouter exists at runtime in react-router-dom v7 but types aren't exported from a /server subpath
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import App from './App.tsx'

export function render(url: string) {
    const helmetContext: { helmet?: HelmetServerState } = {}

    const html = renderToString(
        <React.StrictMode>
            <HelmetProvider context={helmetContext}>
                <StaticRouter location={url}>
                    <App />
                </StaticRouter>
            </HelmetProvider>
        </React.StrictMode>
    )

    const { helmet } = helmetContext

    return {
        html,
        head: helmet
            ? [
                  helmet.title.toString(),
                  helmet.meta.toString(),
                  helmet.link.toString(),
                  helmet.script.toString(),
              ].join('\n')
            : '',
    }
}
