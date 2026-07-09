export const isDevEnv = import.meta.env.VITE_ENV === "development";

export const getWebClientPlatform = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  return /android|iphone|ipad|ipod|mobile|blackberry|windows phone/i.test(ua) ? "mobile-web" : "desktop-web";
};

export const getDeviceOperatingSystem = () => {
  const ua = window.navigator.userAgent.toLowerCase();

  if (ua.includes("windows nt")) return "Windows";
  if (ua.includes("mac os x")) return "macOS";
  if (ua.includes("android")) return "Android";
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) return "iOS";
  if (ua.includes("linux")) return "Linux";

  return "Unknown";
};

export const getReadableDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const getReadingTime = (content: string) => {
  const words = content.trim().split(/\s+/).length;
  const wordsPerMinute = 160;

  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} min read`;
};
