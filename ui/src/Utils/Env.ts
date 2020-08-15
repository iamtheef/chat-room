let baseUrl = `http://localhost:4000`;

if (process.env.NODE_ENV === "production") {
  baseUrl = process.env.baseURL!;
}

export default baseUrl;
