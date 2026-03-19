export const runtime = "nodejs";

import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";

async function openDB() {
  const dbPath = path.join(process.cwd(), "autoosad.db");

  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

export async function POST(req) {
  const db = await openDB();

  try {
    const { email, password } = await req.json();

    const user = await db.get(
      "SELECT * FROM users WHERE email = ?",
      [email.trim()]
    );

    if (!user) {
      return new Response(JSON.stringify({ error: "Пользователь не найден" }), { status: 401 });
    }

    if (user.password.trim() !== password.trim()) {
      return new Response(JSON.stringify({ error: "Неверный пароль" }), { status: 401 });
    }

    const res = NextResponse.json({ success: true });

    res.cookies.set("session", user.id, {
      httpOnly: true,
      path: "/",
    });

    return res;

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Ошибка сервера" }), { status: 500 });
  } finally {
    await db.close();
  }
}