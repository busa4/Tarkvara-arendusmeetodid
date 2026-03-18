export default function OrderList({ orders }) {
  if (!orders || orders.length === 0) return <p>Tellimusi pole</p>;

  return (
    <div className="space-y-2">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between items-center p-2 border rounded"
        >
          <span>{order.item}</span>
          <span className="font-medium">${order.price}</span>
        </div>
      ))}
    </div>
  );
}