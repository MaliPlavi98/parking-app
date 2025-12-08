'use client'

import { deleteContactMessage, getAllContactMessages } from '../../api/contact'
import { useEffect, useState } from 'react'

export default function MessagesPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const token = localStorage.getItem('token')
    const res = await getAllContactMessages(token)
    setData(res)
  }

  async function remove(id) {
    const token = localStorage.getItem('token')
    await deleteContactMessage(id, token)
    load()
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Contact Messages</h1>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full rounded-xl bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((msg) => (
              <tr key={msg.id} className="border-t">
                <td className="p-3">{msg.name}</td>
                <td className="p-3">{msg.email}</td>
                <td className="p-3">{msg.message}</td>
                <td className="p-3">
                  <button
                    onClick={() => remove(msg.id)}
                    className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
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
