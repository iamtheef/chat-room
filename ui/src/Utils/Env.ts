export const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.baseURL
    : "http://localhost:4000";
