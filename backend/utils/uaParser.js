export function parseUA(uaString = "") {
  // Very small UA parser fallback — for production use a library like ua-parser-js
  const ua = uaString.toLowerCase();
  const browser = ua.includes("chrome")
    ? "Chrome"
    : ua.includes("firefox")
      ? "Firefox"
      : ua.includes("safari")
        ? "Safari"
        : "Unknown";
  const os = ua.includes("windows")
    ? "Windows"
    : ua.includes("mac os")
      ? "macOS"
      : ua.includes("android")
        ? "Android"
        : ua.includes("iphone")
          ? "iOS"
          : "Unknown";
  const device =
    ua.includes("mobile") || ua.includes("iphone") || ua.includes("android")
      ? "Mobile"
      : "Desktop";
  return { browser, os, device };
}
