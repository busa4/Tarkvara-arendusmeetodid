export default function ProfileInfo({ user }) {
  if (!user) return null;
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold mb-2">Teave</h2>
      <p><span className="font-medium">Nimi:</span> {user.name}</p>
      <p><span className="font-medium">Email:</span> {user.email}</p>
      <p><span className="font-medium">Telefon:</span> {user.phone}</p>
    </div>
  );
}