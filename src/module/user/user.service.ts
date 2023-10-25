import { db } from "../../utils/dbConnectino";
import { CreateUserInput } from "./user.schema";

export function createUser(input: CreateUserInput) {
  try {
    const user = db.user.create({
      data: input,
    });
  } catch (e: any) {
    throw new Error(e);
  } finally {
    db.$disconnect();
  }
}
