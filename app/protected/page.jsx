import { cookies } from "next/headers";
import Link from "next/link";
import sqlite3 from "better-sqlite3";
import path from "path";
import UserSearch from "../components/UserSearch";


export default async function ProtectedPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session || session.value !== "abc123") {
    return (
      <div>
        <p>Not auth!</p>
        <Link href="/login">Go to login</Link>
      </div>
    );
  }

  let users = [];
  let dbError = null;

  try {
    const dbPath = path.resolve(process.cwd(), "autoosad.db");

    const db = new sqlite3(dbPath);

    users = db.prepare("SELECT * FROM users").all();

    db.close();
  } catch (error) {
    dbError = error.message;
  }

  return (
    <div>
      <h1>Secret page 🔒</h1>

      {dbError && (
        <p style={{ color: "red" }}>
          Viga andmebaasiga: {dbError}
        </p>
      )}

      <h2>Kasutajate nimekiri:</h2>

      {users.length > 0 ? (
        <UserSearch users={users} />
      ) : (
        <p>Kasutajaid ei leitud (või tabel on tühi).</p>
      )}

      <br />

      <form action="/api/logout" method="POST">
        <button type="submit">Log out</button>
      </form>
    </div>
  );
}