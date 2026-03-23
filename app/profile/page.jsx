"use client";
import { useState, useEffect } from "react";
import ProfileInfo from "../components/ProfileInfo";
import EditProfileForm from "../components/EditProfileForm";
import AddressManager from "../components/AddressManager";
import ChangePassword from "../components/ChangePassword";
import OrderList from "../components/OrderList";

export default function ProfilePage() {
  const [view, setView] = useState("info");
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then(res => {
        if (!res.ok) throw new Error("Palun logige sisse");
        return res.json();
      })
      .then(data => {
        setUser(data.user);
        setOrders(data.orders || []);
      })
      .catch(() => {
        setUser(null);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const btnClass = "px-4 py-2 rounded ";

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Palun logige sisse.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profiil</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button className={btnClass} onClick={() => setView("info")}>Teave</button>
        <button className={btnClass} onClick={() => setView("edit")}>Muuda profiili</button>
        <button className={btnClass} onClick={() => setView("address")}>Aadressid</button>
        <button className={btnClass} onClick={() => setView("password")}>Parool</button>
      </div>

      <div className="p-4 bg-gray-50 rounded  mb-6">
        {view === "info" && (
          <>
            <ProfileInfo user={user} />

            <div className="mt-6 p-4 bg-white border rounded ">
              <h2 className="text-2xl font-semibold mb-2">
                {showAllOrders ? "Kõik tellimused" : "Viimased tellimused"}
              </h2>

              <OrderList orders={showAllOrders ? orders : orders.slice(-2)} />

              <button
                className="mt-3 px-4 py-2   rounded "
                onClick={() => setShowAllOrders(!showAllOrders)}
              >
                {showAllOrders ? "Peida" : "Vaata kõiki tellimusi"}
              </button>
            </div>
          </>
        )}

        {view === "edit" && <EditProfileForm user={user} setUser={setUser} />}
        {view === "address" && <AddressManager />}
        {view === "password" && <ChangePassword />}
      </div>
    </div>
  );
}