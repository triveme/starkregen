import { client } from "../clients/client";

export function signin(data) {
  return client.post("/auth/signin", data);
}
