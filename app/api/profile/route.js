import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDB() {
  return open({
    filename: "./autoosad.db",
    driver: sqlite3.Database
  });
}

export async function GET() {
  const db = await openDB();

  try {
    const user = await db.get("SELECT id, name, email, phone FROM users WHERE id = ?", [1]);

    const orders = await db.all(
      `SELECT o.id, o.total_price, o.status, o.created_at,
              json_group_array(
                json_object(
                  'part_id', oi.part_id,
                  'quantity', oi.quantity
                )
              ) AS items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.user_id = ?
       GROUP BY o.id
       ORDER BY o.id DESC`,
      [1]
    );

    return new Response(JSON.stringify({ user, orders }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Ошибка при запросе к базе" }), { status: 500 });
  } finally {
    await db.close();
  }
}