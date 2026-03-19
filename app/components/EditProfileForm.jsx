"use client";
import { useState } from "react";

export default function EditProfileForm({ user, setUser }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("/api/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone })
  });

  const data = await res.json();
  console.log(data.user); 
  setUser(data.user);     
};

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-2xl font-semibold">Muuda profiili</h2>

      <input
        className="w-full p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nimi"
      />
      <input
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="w-full p-2 border rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telefon"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Salvesta
      </button>
    </form>
  );
}