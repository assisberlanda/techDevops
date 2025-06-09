// utils/hashLocation.ts

export const hashLocation = () => window.location.hash.replace(/^#/, "") || "/";

export const navigate = (to: string) => {
  window.location.hash = to;
};

export const subscribe = (fn: () => void) => {
  window.addEventListener("hashchange", fn);
  return () => window.removeEventListener("hashchange", fn);
};

const hashHistory = {
  base: "",
  location: hashLocation,
  navigate,
  subscribe,
};

export default hashHistory;
