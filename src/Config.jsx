// src/config.js
// src/config.js

const isLocal = true; // ⬅️ Change this to false to use Railway

export const BASE_URL = isLocal
  ? "http://localhost:5000" // your local Flask server
  : "https://drdo-backend-production.up.railway.app";

export default BASE_URL;
