"use client";
import { useState } from "react";

export default function AddressManager() {
  const [addresses, setAddresses] = useState([
    { city: "Tallinn", zip: "10115", district: "Kesklinn", street: "Narva mnt", house: "25", apartment: "12" },
    { city: "Tallinn", zip: "10245", district: "Mustamäe", street: "Tartu mnt", house: "10", apartment: "" }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
  };

  const addAddress = () => {
    setAddresses([...addresses, { city:"", zip:"", district:"", street:"", house:"", apartment:"" }]);
  };

  const deleteAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
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
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition mt-2"
            onClick={() => deleteAddress(index)}
          >
            Kustuta aadress
          </button>
        </div>
      ))}

      <button
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        onClick={addAddress}
      >
        Lisa uus aadress
      </button>
    </div>
  );
}