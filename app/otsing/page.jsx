"use client";
import { useState, useEffect } from "react";

export default function OtsinPage() {
  const [parts, setParts] = useState([]);
  const [query, setQuery] = useState("");


  useEffect(() => {
    fetchParts();
  }, []);

  async function fetchParts(search = "") {
    const res = await fetch(`/api/otsin?q=${search}`);
    const data = await res.json();
    setParts(data);
  }

  function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);
    fetchParts(value);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Auto Parts</h1>

      <input
        type="text"
        placeholder="Enter name..."
        value={query}
        onChange={handleSearch}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px"
        }}
      />

      <div>
        {parts.map((part) => (
          <div
            key={part._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <h3>{part.name}</h3>
            <p>Price: {part.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
