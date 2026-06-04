import Cookies from "js-cookie";

const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";

export const cookie = {
  setToken(name: string, value: string, days: number) {
    Cookies.set(name, value, {
      expires: days,
      sameSite: "lax",
      secure: isSecure,
    });
  },

  getToken(name: string): string | undefined {
    return Cookies.get(name);
  },

  removeToken(name: string) {
    Cookies.remove(name);
  },
};
