import sqlite3 from "sqlite3";

export async function GET(request) {
  const db = new sqlite3.Database("./autoosad.db");

  const { searchParams } = new URL(request.url);
  let q = (searchParams.get("q") || "").trim();

  return new Promise((resolve) => {
    let query = "SELECT * FROM parts";
    let params = [];

    if (q.length > 0) {
      // Подстрочный поиск для любых частей слова, регистр игнорируется
      query += " WHERE name LIKE ? COLLATE NOCASE";
      params.push(`%${q}%`);
    }

    db.all(query, params, (err, rows) => {
      if (err) {
        console.error("SQLite error:", err);
        resolve(
          new Response(JSON.stringify({ error: "Ошибка при запросе к базе" }), { status: 500 })
        );
      } else {
        resolve(new Response(JSON.stringify(rows), { status: 200 }));
      }
    });

    db.close();
  });
}