import { cookies } from "next/headers";
import Link from "next/link";

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

  return (
    <div>
      <h1>Secret page 🔒</h1>
      <form action="/api/logout" method="POST">
        <button type="submit">Olete siseloginud, siin on protected andmed</button>
        <button type="submit">Log out</button>
      </form>
    </div>
  );
}
