import type { AstroIntegrationLogger } from 'astro';
export declare function findCommonAncestor(rootPath: string, entryPath: string): string;
export declare function copyDependenciesToFunction({ entry, outDir, includeFiles, excludeFiles, logger, root, }: {
    entry: URL;
    outDir: URL;
    includeFiles: URL[];
    excludeFiles: URL[];
    logger: AstroIntegrationLogger;
    root: URL;
}, cache: object): Promise<{
    handler: string;
}>;
