import type { AstroIntegrationLogger } from 'astro';
export interface IsrForwarding {
    /** Route patterns backed by the ISR function. */
    isrRoutes: string[];
    /** Route patterns `isr.exclude` keeps out of the cache; checked first. */
    isrExcludedRoutes: string[];
}
/**
 * It generates the Vercel Edge Middleware file.
 *
 * It creates a temporary file, the edge middleware, with some dynamic info.
 *
 * Then this file gets bundled with esbuild. The bundle phase will inline the Astro middleware code.
 *
 * @param astroMiddlewareEntryPointPath
 * @param root
 * @param vercelEdgeMiddlewareHandlerPath
 * @param outPath
 * @param middlewareSecret
 * @param logger
 * @param isrForwarding Route patterns the generated `next()` forwards to `_isr`, if any
 * @returns {Promise<URL>} The path to the bundled file
 */
export declare function generateEdgeMiddleware(astroMiddlewareEntryPointPath: URL, root: URL, vercelEdgeMiddlewareHandlerPath: URL, outPath: URL, middlewareSecret: string, logger: AstroIntegrationLogger, isrForwarding?: IsrForwarding): Promise<URL>;
