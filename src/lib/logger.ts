const isDev = typeof process !== "undefined" && process.env.NODE_ENV !== "production";

export const logger = {
  error(...args: unknown[]) {
    if (isDev) console.error(...args);
  },
  warn(...args: unknown[]) {
    if (isDev) console.warn(...args);
  },
  info(...args: unknown[]) {
    if (isDev) console.info(...args);
  },
};
