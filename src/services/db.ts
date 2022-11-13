// https://dexie.org/docs/API-Reference

import Dexie, { Table } from "dexie";

export interface UserType {
  id?: number;
  email: string;
  password: string;
  access_token: string;
  phone: string;
  firstname: string;
  lastname: string;
  address: string;
  postcode: string;
}

export class UserDB extends Dexie {
  users!: Table<UserType>;

  constructor() {
    super("twenty-scoop-test-db");
    this.version(1).stores({
      users: "++id, &email, password, access_token, phone", // Primary key and indexed props
    });
  }
}

export const db = new UserDB();
