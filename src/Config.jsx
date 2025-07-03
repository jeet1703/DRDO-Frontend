// src/config.js
// src/config.js

const isLocal = false; // ⬅️ Change this to false to use Railway

export const BASE_URL = isLocal
  ? "http://localhost:5000" // your local Flask server
  : "https://drdo-backend-djgh.onrender.com";

export default BASE_URL;
