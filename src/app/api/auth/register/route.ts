import { NextResponse } from "next/server";
import { hashPassword, createToken, findUser, addUser } from "@/lib/auth";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Todos os campos são obrigatórios" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "A senha deve ter pelo menos 6 caracteres" },
      { status: 400 }
    );
  }

  if (findUser(email)) {
    return NextResponse.json(
      { error: "Este e-mail já está cadastrado" },
      { status: 409 }
    );
  }

  const hashed = await hashPassword(password);
  addUser({ name, email, password: hashed });

  const token = await createToken({ email, name });

  return NextResponse.json({ token, user: { name, email } }, { status: 201 });
}
