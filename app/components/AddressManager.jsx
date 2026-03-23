"use client";
import { useState, useEffect  } from "react";

export default function AddressManager() {
 const [addresses, setAddresses] = useState([]);

    useEffect(() => {
      fetch("/api/addresses")
        .then(res => res.json())
        .then(data => setAddresses(data));
    }, []);
 const handleChange = async (index, field, value) => {
  const updated = [...addresses];
  updated[index][field] = value;
  setAddresses(updated);

  await fetch("/api/addresses", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated[index])
  });
};

  const addAddress = async () => {
  const newAddr = { city:"", zip:"", district:"", street:"", house:"", apartment:"" };

  const res = await fetch("/api/addresses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAddr)
  });
  const savedAddr = await res.json();


  setAddresses([...addresses, savedAddr]);
};

 const deleteAddress = async (id) => {
  await fetch("/api/addresses", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });

  setAddresses(addresses.filter(a => a.id !== id));
};

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Aadressid</h2>

      {addresses.map((addr, index) => (
        <div key={index} className="p-3 border rounded space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              type="text"
              value={addr.city}
              onChange={(e) => handleChange(index, "city", e.target.value)}
              placeholder="Linn"
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              value={addr.zip}
              onChange={(e) => handleChange(index, "zip", e.target.value)}
              placeholder="Postiindeks"
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              value={addr.district}
              onChange={(e) => handleChange(index, "district", e.target.value)}
              placeholder="Piirkond"
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              value={addr.street}
              onChange={(e) => handleChange(index, "street", e.target.value)}
              placeholder="Tänav"
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              value={addr.house}
              onChange={(e) => handleChange(index, "house", e.target.value)}
              placeholder="Maja"
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              value={addr.apartment}
              onChange={(e) => handleChange(index, "apartment", e.target.value)}
              placeholder="Korter"
              className="p-2 border rounded w-full"
            />
          </div>
          <button
            className="px-3 py-1 "
            onClick={() => deleteAddress(addr.id)}
          >
            Kustuta aadress
          </button>
        </div>
      ))}

      <button
        className="px-4 py-2 "
        onClick={addAddress}
      >
        Lisa uus aadress
      </button>
    </div>
  );
}