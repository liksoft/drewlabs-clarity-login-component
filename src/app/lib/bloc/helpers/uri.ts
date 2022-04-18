/**
 * Get the host part of a web url object
 * //@internal
 *
 * @param url
 */
export function getHost(url: string) {
  if (url) {
    const webURL = new URL(url);
    url = `${webURL.protocol}//${webURL.host}`;
    return `${`${url.endsWith("/") ? url.slice(0, -1) : url}`}`;
  }
  return url ?? "";
}

/**
 * Construct the enpoint url based on user provided host and path arguments
 *
 * @param host
 * @param path
 * @returns
 */
export function endpoint(host?: string, path?: string) {
  host = host ? getHost(host) : host;
  path = path ?? "/";
  return host ? `${host}/${path.startsWith("/") ? path.slice(1) : path}` : path;
}
