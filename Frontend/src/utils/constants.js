// export const BASE_URL=location.hostname==="localhost"?"http://localhost:3000":"/api";
export const BASE_URL=location.hostname==="localhost"?"http://localhost:3000":"process.env.REACT_APP_API_URL";

