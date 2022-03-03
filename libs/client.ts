import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "tenshin",
  apiKey: process.env.API_KEY,
});
