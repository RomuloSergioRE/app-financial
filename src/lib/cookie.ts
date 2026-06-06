import Cookies from "js-cookie";

export const cookie = {
  removeToken(name: string) {
    Cookies.remove(name);
  },
};
