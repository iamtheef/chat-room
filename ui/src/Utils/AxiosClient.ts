import axios from "axios";
import { baseUrl } from "./Env";

export const client = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});
