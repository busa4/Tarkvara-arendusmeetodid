import "./globals.css";
import Link from "next/link";
import { cookies } from "next/headers";

export const metadata = {
  title: "Auth",
  description: "Simple auth",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const isAuth = session?.value === "abc123";

  return (
    <html lang="ru">
      <body style={{ fontFamily: "sans-serif", padding: 20 }}>
        <nav
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            borderBottom: "1px solid #ddd",
            paddingBottom: "1rem",
          }}
        >
          <Link href="/">Home</Link>
          <Link href="/protected">Secret</Link>
          {!isAuth ? (
            <Link href="/login">Login</Link>
          ) : (
            <form
              action="/api/logout"
              method="POST"
              style={{ display: "inline" }}
            >
              <button
                type="submit"
                style={{
                  background: "none",
                  border: "none",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                Log out
              </button>
            </form>
          )}
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
