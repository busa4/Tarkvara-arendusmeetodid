import sqlite3 from "sqlite3";
import { open } from "sqlite";
export const runtime = "nodejs";

async function openDB() {
  return open({
    filename: "./autoosad.db",
    driver: sqlite3.Database,
  });
}

export async function POST(req) {
  const db = await openDB();

  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Заполни все поля" }), { status: 400 });
    }

    // проверка на существующего пользователя
    const existing = await db.get("SELECT * FROM users WHERE email = ?", [email]);

    if (existing) {
      return new Response(JSON.stringify({ error: "Email уже используется" }), { status: 400 });
    }

    await db.run(
      `INSERT INTO users (name, email, phone, password, role, created_at)
       VALUES (?, ?, ?, ?, 'customer', datetime('now'))`,
      [name, email, phone, password]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Ошибка сервера" }), { status: 500 });
  } finally {
    await db.close();
  }
}