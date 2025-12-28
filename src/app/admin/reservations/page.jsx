'use client'

import { useEffect, useState } from 'react'
import { cancelReservation, getAllReservations, updateReservation } from '../../api/reservation'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function ReservationsPage() {
  const [data, setData] = useState([])

  // DELETE MODAL STATE
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({})

  const RESERVATION_STATUSES = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  ]

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const res = await getAllReservations()
    setData(res)
  }

  function openDelete(id) {
    setDeleteId(id)
    setDeleteOpen(true)
  }

  async function confirmDelete() {
    await cancelReservation(deleteId)
    setDeleteOpen(false)
    setDeleteId(null)
    load()
  }
  

  function formatDateTime(iso) {
    return new Date(iso).toLocaleString('hr-HR', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  }

  function openDetails(reservation) {
    setSelectedReservation(reservation)
    setForm({ ...reservation }) // clone
    setEditMode(false)
    setDetailsOpen(true)
  }

  function rowBgByStatus(status) {
  switch (status) {
    case 'CANCELLED':
      return 'bg-red-50'
    case 'COMPLETED':
      return 'bg-green-50'
    default:
      return 'bg-white'
  }
  }

  function StatusBadge({ status }) {
  const styles = {
    PENDING: 'bg-gray-200 text-gray-800',
    COMPLETED: 'bg-green-200 text-green-800',
    CANCELLED: 'bg-red-200 text-red-800',
  }

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  )
}

function formatReservationCode(id) {
  return `RES-${String(id).padStart(8, '0')}`
}


  async function handleUpdateReservation() {
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      carPlate: form.carPlate || null,
      returnFlightNumber: form.returnFlightNumber || null,
      passengers: form.passengers,
      details: form.details || null,
      reservationStatus: form.status
    }

    await updateReservation(form.id, payload)
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Reservations</h1>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full rounded-xl bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Reservation ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Start</th>
              <th className="p-3 text-left">End</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((res) => (
              <tr
                key={res.id}
                className={`border-t ${rowBgByStatus(res.status)}`}
              >
                <td className="p-3 font-mono text-sm text-gray-700">
                  {formatReservationCode(res.id)}
                </td>
                <td className="p-3">{res.name}</td>
                <td className="p-3">{res.email}</td>
                <td className="p-3">{res.phone}</td>
                <td className="p-3">{formatDateTime(res.startTime)}</td>
                <td className="p-3">{formatDateTime(res.endTime)}</td>
                <td className="p-3">
                  <StatusBadge status={res.status} />
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openDetails(res)}
                      className="rounded bg-indigo-500 px-3 py-1 text-white hover:bg-indigo-600"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => openDelete(res.id)}
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No reservations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      <Dialog
        open={deleteOpen}
        onClose={setDeleteOpen}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-lg rounded-lg bg-white shadow-xl dark:bg-gray-800">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-red-100">
                  <ExclamationTriangleIcon className="size-6 text-red-600" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    Delete reservation
                  </DialogTitle>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this reservation? This
                    action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row-reverse gap-3 bg-gray-50 px-6 py-3 dark:bg-gray-700/25">
              <button
                onClick={confirmDelete}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteOpen(false)}
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 dark:bg-white/10 dark:text-white"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      {/* DETAILS MODAL */}
      <Dialog
        open={detailsOpen}
        onClose={() => {
          setDetailsOpen(false)
          setEditMode(false)
        }}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-800">
            <div className="p-6">
              <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Reservation details
              </DialogTitle>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Name"
                  value={form.name || ''}
                  disabled={!editMode}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Input
                  label="Email"
                  value={form.email || ''}
                  disabled={!editMode}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Input
                  label="Phone"
                  value={form.phone || ''}
                  disabled={!editMode}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <Input
                  label="Car plate"
                  value={form.carPlate || ''}
                  disabled={!editMode}
                  onChange={(e) =>
                    setForm({ ...form, carPlate: e.target.value })
                  }
                />
                <Input
                  label="Passengers"
                  type="number"
                  value={form.passengers || ''}
                  disabled={!editMode}
                  onChange={(e) =>
                    setForm({ ...form, passengers: Number(e.target.value) })
                  }
                />
                <Input
                  label="Return flight"
                  value={form.returnFlightNumber || ''}
                  disabled={!editMode}
                  onChange={(e) =>
                    setForm({ ...form, returnFlightNumber: e.target.value })
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    disabled={!editMode}
                    value={form.status || 'PENDING'}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
                  >
                    {RESERVATION_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Details
                </label>
                <textarea
                  rows={3}
                  disabled={!editMode}
                  value={form.details || ''}
                  onChange={(e) =>
                    setForm({ ...form, details: e.target.value })
                  }
                  className="mt-2 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 bg-gray-50 px-6 py-4 dark:bg-gray-700/25">
              <button
                onClick={() => {
                  setDetailsOpen(false)
                  setEditMode(false)
                }}
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={() => setEditMode(true)}
                disabled={editMode}
                className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                disabled={!editMode}
                onClick={async () => {
                  await handleUpdateReservation()
                  setEditMode(false)
                  setDetailsOpen(false)
                  load()
                }}
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

function Input({ label, disabled, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        disabled={disabled}
        className="mt-1 w-full rounded-md border px-3 py-2 disabled:bg-gray-100"
      />
    </div>
  )
}
