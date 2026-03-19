"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) setError(data.error);
    else router.push("/protected");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-blue-900">
      <form className="bg-black/70 p-8 rounded-2xl w-[350px]" onSubmit={handleSubmit}>
        <h2 className="text-white text-2xl mb-6 text-center">Вход</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-900 border border-blue-500 text-white"
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-900 border border-blue-500 text-white"
        />

        <button className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700 mb-3">
          Войти
        </button>

        <button
          type="button"
          onClick={() => router.push("/register")}
          className="w-full bg-gray-800 p-2 rounded hover:bg-gray-700 text-white"
        >
          Регистрация
        </button>

        {error && <p className="text-red-400 mt-3">{error}</p>}
      </form>
    </div>
  );
}