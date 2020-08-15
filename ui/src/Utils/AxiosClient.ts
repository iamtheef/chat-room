import axios from "axios";

let baseUrl = `http://localhost:4000`;

if (process.env.NODE_ENV === "production") {
  baseUrl = process.env.baseURL!;
}

export const client = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});
