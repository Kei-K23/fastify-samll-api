import { db } from "../../utils/dbConnectino";
import { hashPassword } from "../../utils/hash";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
  try {
    const { email, name, password } = input;
    const { hash_password, salt } = hashPassword(password);
    const user = await db.user.create({
      data: {
        name,
        email,
        salt,
        password: hash_password,
      },
    });

    console.log(user);
    if (!user) throw new Error("could not create user");

    return user;
  } catch (e: any) {
    throw new Error(e);
  } finally {
    db.$disconnect();
  }
}

export async function findUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) throw new Error("user cannot find");
    return user;
  } catch (e: any) {
    throw new Error(e);
  } finally {
    db.$disconnect();
  }
}

export async function getAllUser() {
  try {
    const users = await db.user.findMany({
      select: {
        email: true,
        name: true,
        id: true,
      },
    });
    if (!users || users.length < 1) throw new Error("user cannot find");

    return users;
  } catch (e: any) {
    throw new Error(e);
  } finally {
    db.$disconnect();
  }
}
