import { db, UserType } from "./db";
import omit from "lodash/omit";
import pick from "lodash/pick";
import { randomString } from "../utils/random-string";

export async function register(
  userData: Pick<
    UserType,
    | "email"
    | "password"
    | "address"
    | "firstname"
    | "lastname"
    | "phone"
    | "postcode"
  >
) {
  const access_token = randomString();
  const data = { ...userData, access_token };
  return await db.users.add(data);
}

export async function login(credentials: Pick<UserType, "email" | "password">) {
  const response = await db.users
    .where({ email: credentials.email, password: credentials.password })
    .first();
  if (!response) {
    throw new Error("Invalid email or password");
  }
  return pick(response, ["access_token"]);
}

export async function getMyData(access_token: UserType["access_token"]) {
  const response = await db.users.where({ access_token }).first();
  if (!response) {
    throw new Error("Invalid access_token");
  }
  return omit(response, ["password", "access_token"]);
}
