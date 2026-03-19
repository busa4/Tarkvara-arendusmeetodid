import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDB() {
  return open({
    filename: "./autoosad.db",
    driver: sqlite3.Database
  });
}

export async function GET(req) {
  const db = await openDB();
  try {
    const userId = req.cookies.get("session")?.value; // читаем ID из cookie
    if (!userId) return new Response(JSON.stringify({ error: "Не авторизован" }), { status: 401 });

    const addresses = await db.all("SELECT * FROM addresses WHERE user_id = ?", [parseInt(userId)]);
    return new Response(JSON.stringify(addresses), { status: 200 });
  } finally {
    await db.close();
  }
}

export async function POST(req) {
  const data = await req.json();
  const db = await openDB();
  try {
    const userId = req.cookies.get("session")?.value;
    if (!userId) return new Response(JSON.stringify({ error: "Не авторизован" }), { status: 401 });

    const result = await db.run(
      `INSERT INTO addresses (user_id, city, zip, district, street, house, apartment)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [parseInt(userId), data.city, data.zip, data.district, data.street, data.house, data.apartment]
    );

    const addr = await db.get("SELECT * FROM addresses WHERE id = ?", [result.lastID]);
    return new Response(JSON.stringify(addr), { status: 200 });
  } finally {
    await db.close();
  }
}

export async function PATCH(req) {
  const data = await req.json();
  const db = await openDB();
  try {
    const userId = req.cookies.get("session")?.value;
    if (!userId) return new Response(JSON.stringify({ error: "Не авторизован" }), { status: 401 });

    await db.run(
      `UPDATE addresses SET city=?, zip=?, district=?, street=?, house=?, apartment=?
       WHERE id=? AND user_id=?`,
      [data.city, data.zip, data.district, data.street, data.house, data.apartment, data.id, parseInt(userId)]
    );

    const updated = await db.get("SELECT * FROM addresses WHERE id = ?", [data.id]);
    return new Response(JSON.stringify(updated), { status: 200 });
  } finally {
    await db.close();
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  const db = await openDB();
  try {
    const userId = req.cookies.get("session")?.value;
    if (!userId) return new Response(JSON.stringify({ error: "Не авторизован" }), { status: 401 });

    await db.run("DELETE FROM addresses WHERE id = ? AND user_id = ?", [id, parseInt(userId)]);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } finally {
    await db.close();
  }
}