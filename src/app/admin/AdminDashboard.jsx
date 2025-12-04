"use client";

export default function AdminDashboard() {
  const cards = [
    { title: "Reservations", color: "text-blue-600" },
    { title: "Messages", color: "text-green-600" },
    { title: "Settings", color: "text-purple-600" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {cards.map((c) => (
          <div
            key={c.title}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-medium">{c.title}</h2>
            <p className={`text-3xl font-bold mt-2 ${c.color}`}>--</p>
            <p className="text-sm text-gray-500 mt-1">
              Total {c.title.toLowerCase()}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}
