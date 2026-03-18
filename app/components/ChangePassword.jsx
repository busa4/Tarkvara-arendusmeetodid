"use client";
import { useState } from "react";

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ oldPass, newPass });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-2xl font-semibold">Muuda parooli</h2>
      <input
        type="password"
        placeholder="Vana parool"
        value={oldPass}
        onChange={(e) => setOldPass(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Uus parool"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Salvesta
      </button>
    </form>
  );
}