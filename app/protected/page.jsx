import { cookies } from "next/headers";
import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDB() {
  return open({
    filename: path.join(process.cwd(), "autoosad.db"),
    driver: sqlite3.Database,
  });
}

export default async function ProtectedPage() {
  // ✅ ВАЖНО: await
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return <h1>Not auth! Go to login</h1>;
  }

  const db = await openDB();

  const user = await db.get(
    "SELECT id, name, email FROM users WHERE id = ?",
    [session.value]
  );

  await db.close();

  if (!user) {
    return <h1>User not found</h1>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl mb-4">Добро пожаловать</h1>
      <p>Имя: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}