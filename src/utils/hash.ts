import crypto from "crypto";

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash_password = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return { salt, hash_password };
}

export function verifyPassword(
  candidatePassword: string,
  salt: string,
  hash: string
) {
  const candidatePassword_hash = crypto
    .pbkdf2Sync(candidatePassword, salt, 1000, 64, "sha512")
    .toString("hex");

  return candidatePassword === hash;
}
