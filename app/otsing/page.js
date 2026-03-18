"use client";
import { useState, useEffect } from "react";

export default function AutoosadPage() {
  const [search, setSearch] = useState("");
  const [parts, setParts] = useState([]);

  // 🔥 имитация загрузки с сервера
  useEffect(() => {
    const fakeData = [
      { id: 1, name: "Piduriklotsid", category: "Pidurid", price: 50 },
      { id: 2, name: "Õlifilter", category: "Filter", price: 15 },
      { id: 3, name: "Mootoriõli", category: "Õlid", price: 30 },
      { id: 4, name: "Aku", category: "Elektrisüsteem", price: 120 },
    ];
    setParts(fakeData);
  }, []);

  const filteredParts = parts.filter(part =>
    part.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Autoosad</h1>

      {/* 🔍 Поиск */}
      <input
        type="text"
        placeholder="Otsi autoosi..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={inputStyle}
      />

      {/* 📊 Таблица */}
      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={thStyle}>Nimi</th>
            <th style={thStyle}>Kategooria</th>
            <th style={thStyle}>Hind (€)</th>
          </tr>
        </thead>
        <tbody>
          {filteredParts.map(part => (
            <tr key={part.id}>
              <td style={tdStyle}>{part.name}</td>
              <td style={tdStyle}>{part.category}</td>
              <td style={tdStyle}>{part.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 🎨 стили
const inputStyle = {
  padding: "10px",
  width: "300px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #ddd"
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
  textAlign: "center"
};