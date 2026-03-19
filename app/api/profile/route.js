import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextRequest, NextResponse } from "next/server";

async function openDB() {
  const dbPath = path.join(process.cwd(), "autoosad.db");
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

export async function GET(req = NextRequest) {
  const db = await openDB();

  try {
    const session = req.cookies.get("session")?.value;
    if (!session) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const userId = parseInt(session, 10);

    const user = await db.get(
      "SELECT id, name, email, phone FROM users WHERE id = ?",
      [userId]
    );

    const orders = await db.all(
      `SELECT o.id, o.total_price, o.status, o.created_at,
              json_group_array(
                json_object(
                  'part_id', oi.part_id,
                  'name', p.name,
                  'price', p.price,
                  'quantity', oi.quantity
                )
              ) AS items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN parts p ON oi.part_id = p.id
       WHERE o.user_id = ?
       GROUP BY o.id
       ORDER BY o.id DESC`,
      [userId]
    );

    return NextResponse.json({ user, orders });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    await db.close();
  }
}

export async function PUT(req = NextRequest) {
  const db = await openDB();

  try {
    const data = await req.json();
    const session = req.cookies.get("session")?.value;
    if (!session) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

    const userId = parseInt(session, 10);

    await db.run(
      "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?",
      [data.name, data.email, data.phone, userId]
    );

    const user = await db.get(
      "SELECT id, name, email, phone FROM users WHERE id = ?",
      [userId]
    );

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    await db.close();
  }
}