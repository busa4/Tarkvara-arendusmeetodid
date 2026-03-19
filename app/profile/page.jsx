"use client";
import { useState } from "react";

import ProfileInfo from "../components/ProfileInfo";
import EditProfileForm from "../components/EditProfileForm";
import AddressManager from "../components/AddressManager";
import ChangePassword from "../components/ChangePassword";
import OrderList from "../components/OrderList";

export default function ProfilePage() {
  const [view, setView] = useState("info");
  const [showAllOrders, setShowAllOrders] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setOrders(data.orders); 
      });
  }, []);

  const btnClass =
    "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition";

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profiil</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button className={btnClass} onClick={() => setView("info")}>
          Teave
        </button>
        <button className={btnClass} onClick={() => setView("edit")}>
          Muuda profiili
        </button>
        <button className={btnClass} onClick={() => setView("address")}>
          Aadressid
        </button>
        <button className={btnClass} onClick={() => setView("password")}>
          Parool
        </button>
      </div>

      <div className="p-4 bg-gray-50 rounded shadow mb-6">
        {view === "info" && (
          <>
            <ProfileInfo user={user} />

            <div className="mt-6 p-4 bg-white border rounded shadow">
              <h2 className="text-2xl font-semibold mb-2">
                {showAllOrders ? "Kõik tellimused" : "Viimased tellimused"}
              </h2>

              <OrderList orders={showAllOrders ? orders : orders.slice(-2)} />

              <button
                className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={() => setShowAllOrders(!showAllOrders)}
              >
                {showAllOrders ? "Peida" : "Vaata kõiki tellimusi"}
              </button>
            </div>
          </>
        )}

        {view === "edit" && <EditProfileForm user={user} />}
        {view === "address" && <AddressManager />}
        {view === "password" && <ChangePassword />}
      </div>
    </div>
  );
}