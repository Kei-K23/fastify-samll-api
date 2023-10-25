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

export async function findUserByIDAndEmail(id: number, email: string) {
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
