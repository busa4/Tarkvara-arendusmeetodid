import { NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import path from "path";

export async function POST(req) {
  try {
    const { login, password } = await req.json();

    const dbPath = path.resolve(process.cwd(), "autoosad.db");
    const db = new sqlite3(dbPath);

    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(login, password);

    if (user) {
      const res = NextResponse.json({ ok: true });

      res.cookies.set("session", "abc123", {
        maxAge: 60 * 60 * 24, 
        path: "/",
        httpOnly: true 
      });

      return res;
    } else {
      return NextResponse.json(
        { ok: false, error: "Vale e-mail või parool" }, 
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Database Login Error:", error);
    return NextResponse.json(
      { ok: false, error: "Andmebaasi viga" }, 
      { status: 500 }
    );
  }
}