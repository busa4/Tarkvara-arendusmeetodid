"use client";

import { useState, useEffect } from "react";

export default function OtsinPage() {
  const [parts, setParts] = useState([]);
  const [query, setQuery] = useState("");

  // загрузка всех запчастей при старте
  useEffect(() => {
    fetchParts();
  }, []);

  async function fetchParts(search = "") {
    try {
      const res = await fetch(`/api/otsin?q=${encodeURIComponent(search)}`);
      if (!res.ok) throw new Error("Ошибка сети");
      const data = await res.json();
      setParts(data);
    } catch (err) {
      console.error("Ошибка при загрузке:", err);
      setParts([]);
    }
  }

  function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);
    fetchParts(value);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Поиск автозапчастей</h1>

      <input
        type="text"
        placeholder="Введите название..."
        value={query}
        onChange={handleSearch}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc"
        }}
      />

      <div>
        {parts.length === 0 ? (
          <p>Ничего не найдено</p>
        ) : (
          parts.map((part) => (
            <div
              key={part.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                boxShadow: "1px 1px 5px rgba(0,0,0,0.1)"
              }}
            >
              <h3>{part.name}</h3>
              <p>Артикул: {part.part_number}</p>
              <p>Бренд: {part.brand}</p>
              <p>Цена: ${part.price}</p>
              <p>В наличии: {part.stock}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}