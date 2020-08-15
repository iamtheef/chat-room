import axios from "axios";

export const client = axios.create({
  baseURL: `http://localhost:${process.env.PORT || 4000}`,
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});
