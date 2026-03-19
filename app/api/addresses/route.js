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
    const addresses = await db.all("SELECT * FROM addresses WHERE user_id = ?", [1]);
    return new Response(JSON.stringify(addresses), { status: 200 });
  } finally {
    await db.close();
  }
}

export async function POST(request) {
  const data = await request.json();
  const db = await openDB();
  try {
    const result = await db.run(
      `INSERT INTO addresses (user_id, city, zip, district, street, house, apartment)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [1, data.city, data.zip, data.district, data.street, data.house, data.apartment]
    );

    const addr = await db.get("SELECT * FROM addresses WHERE id = ?", [result.lastID]);
    return new Response(JSON.stringify(addr), { status: 200 });
  } finally {
    await db.close();
  }
}

export async function PATCH(request) {
  const data = await request.json();
  const db = await openDB();
  try {
    await db.run(
      `UPDATE addresses SET city=?, zip=?, district=?, street=?, house=?, apartment=?
       WHERE id=?`,
      [data.city, data.zip, data.district, data.street, data.house, data.apartment, data.id]
    );
    const updated = await db.get("SELECT * FROM addresses WHERE id = ?", [data.id]);
    return new Response(JSON.stringify(updated), { status: 200 });
  } finally {
    await db.close();
  }
}

export async function DELETE(request) {
  const { id } = await request.json();
  const db = await openDB();
  try {
    await db.run("DELETE FROM addresses WHERE id = ?", [id]);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } finally {
    await db.close();
  }
}