'use client'

import { cancelReservation, getAllReservations } from '@/app/api/reservation'
import { useEffect, useState } from 'react'

export default function ReservationsPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const token = localStorage.getItem('token')
    const res = await getAllReservations(token)
    setData(res)
  }

  async function remove(id) {
    const token = localStorage.getItem('token')
    await cancelReservation(id, token)
    load()
  }

  return (
<div>
  <h1 className="text-3xl font-bold mb-6">Reservations</h1>

  <div className="w-full overflow-x-auto">
    <table className="min-w-full bg-white shadow rounded-xl">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Email</th>
          <th className="p-3 text-left">Phone</th>
          <th className="p-3 text-left">Start</th>
          <th className="p-3 text-left">End</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((res) => (
          <tr key={res.id} className="border-t">
            <td className="p-3">{res.name}</td>
            <td className="p-3">{res.email}</td>
            <td className="p-3">{res.phone}</td>
            <td className="p-3">{res.startTime}</td>
            <td className="p-3">{res.endTime}</td>
            <td className="p-3">
              <button
                onClick={() => remove(res.id)}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  )
}
