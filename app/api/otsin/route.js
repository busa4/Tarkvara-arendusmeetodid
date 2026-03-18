import sqlite3 from "sqlite3";
import { open } from "sqlite";

// функция подключения к базе SQLite
async function openDB() {
  return open({
    filename: "./autoparts.db", // путь к файлу базы
    driver: sqlite3.Database
  });
}

export async function GET(request) {
  const db = await openDB();

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  let rows;

  try {
    if (q) {
      // поиск по названию, без учета регистра
      rows = await db.all(
        "SELECT * FROM parts WHERE name LIKE ? COLLATE NOCASE",
        [`%${q}%`]
      );
    } else {
      // получить все
      rows = await db.all("SELECT * FROM parts");
    }

    return Response.json(rows);

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Ошибка при запросе к базе" }),
      { status: 500 }
    );
  } finally {
    await db.close(); // закрываем соединение
  }
}