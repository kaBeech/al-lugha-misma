import { User } from "../types.ts";

const users = new Map<string, User>();

users.set("1", {
  id: "1",
  username: "Ishmael-",
});

users.set("2", {
  id: "2",
  username: "Isaac",
});

export default users;
