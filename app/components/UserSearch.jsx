"use client";

import { useState } from "react";

export default function UserSearch({ users }) {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.role.toLowerCase().includes(value)
    );
  });

  return (
    <div>
      {/* 🔎 поиск */}
      <div className="user-search">
        <input
          type="text"
          placeholder="Otsi kasutajat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 📋 таблица */}
      {filteredUsers.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nimi</th>
              <th>Email</th>
              <th>Roll</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Midagi ei leitud...</p>
      )}
    </div>
  );
}