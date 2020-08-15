import axios from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_baseURL,
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});
