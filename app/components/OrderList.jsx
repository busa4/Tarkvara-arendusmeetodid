export default function OrderList({ orders }) {
  if (!orders || orders.length === 0) return <p>Tellimusi pole</p>;

  return (
    <div className="space-y-2">
      {orders.map((order) => {
        const items = JSON.parse(order.items || "[]");
        return (
          <div key={order.id} className="p-2 border rounded space-y-1">
            <div className="font-medium">Tellimus #{order.id}</div>
            {items.length === 0 ? (
              <p>Tellimusel tooteid pole</p>
            ) : (
              items.map((i, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>Kogus: {i.quantity}</span>
                </div>
              ))
            )}
            <div className="font-semibold mt-1">Kokku: ${order.total_price}</div>
          </div>
        );
      })}
    </div>
  );
}