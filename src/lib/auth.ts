import { SignJWT, jwtVerify } from "jose";
import { hash, compare } from "bcryptjs";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "siapesq-secret-key-dev-2024"
);

export async function hashPassword(password: string) {
  return hash(password, 12);
}

export async function verifyPassword(password: string, hashed: string) {
  return compare(password, hashed);
}

export async function createToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, SECRET);
  return payload;
}

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

const users: StoredUser[] = [];

export function getUsers() {
  return users;
}

export function findUser(email: string) {
  return users.find((u) => u.email === email);
}

export function addUser(user: StoredUser) {
  users.push(user);
}
