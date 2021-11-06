import jwt_decode from "jwt-decode";

export const checkAuth = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && localStorage.getItem("id")) {
      const decoded = jwt_decode(token);
      const current_time = new Date().getTime() / 1000;
      if (current_time > decoded.exp) {
        return token;
      } else {
        logout();
      }
    } else {
      logout();
    }
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    return false;
  }
};
