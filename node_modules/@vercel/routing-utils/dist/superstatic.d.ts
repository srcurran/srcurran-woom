import { Route, Redirect, Rewrite, HasField, Header } from './types';
import { Key } from 'path-to-regexp';
export declare function pathToRegexp(callerId: string, path: string, keys?: Key[], options?: {
    strict: boolean;
    sensitive: boolean;
    delimiter: string;
}): RegExp;
export declare function getCleanUrls(filePaths: string[]): {
    html: string;
    clean: string;
}[];
export declare function convertCleanUrls(cleanUrls: boolean, trailingSlash?: boolean, status?: number): Route[];
export declare function convertRedirects(redirects: Redirect[], defaultStatus?: number): Route[];
export declare function convertRewrites(rewrites: Rewrite[], internalParamNames?: string[]): Route[];
export declare function convertHeaders(headers: Header[]): Route[];
export declare function convertTrailingSlash(enable: boolean, status?: number): Route[];
export declare function sourceToRegex(source: string): {
    src: string;
    segments: string[];
};
export declare function collectHasSegments(has?: HasField): string[];
/**
 * Compiles a high-level path-to-regexp template into the capture syntax used by
 * low-level routes. Source parameters become numbered captures (`:path*` ->
 * `$1`) while named `has` captures remain named (`:tenant` -> `$tenant`).
 * Existing `$N` and environment-variable references are preserved. An env
 * allowlist disambiguates a `$name` reference that collides with a route param.
 */
export declare function compilePathToRegexpTemplate(source: string, template: string, has?: HasField, env?: string[]): string;
