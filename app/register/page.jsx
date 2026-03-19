"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) setError(data.error);
    else router.push("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-blue-900">
      <form className="bg-black/70 p-8 rounded-2xl w-[350px]" onSubmit={handleSubmit}>
        <h2 className="text-white text-2xl mb-6 text-center">Регистрация</h2>

        <input name="name" placeholder="Имя Фамилия"
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-900 border border-blue-500 text-white"
        />

        <input name="email" placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-900 border border-blue-500 text-white"
        />

        <input name="phone" placeholder="Телефон"
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-900 border border-blue-500 text-white"
        />

        <input type="password" name="password" placeholder="Пароль"
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-900 border border-blue-500 text-white"
        />

        <button className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700">
          Зарегистрироваться
        </button>

        {error && <p className="text-red-400 mt-3">{error}</p>}
      </form>
    </div>
  );
}