'use client'

import { useState } from 'react'
import { checkAvailability } from '../app/api/reservation' // adjust path


export default function ReservationForm() {

  const [startDate, setStartDate] = useState('')
  const [startHour, setStartHour] = useState('0')
  const [startMinute, setStartMinute] = useState('00')

  const [endDate, setEndDate] = useState('')
  const [endHour, setEndHour] = useState('0')
  const [endMinute, setEndMinute] = useState('00')

  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const requestBody = {
        startDate: `${startDate}T${startHour}:${startMinute}:00`,
        endDate: `${endDate}T${endHour}:${endMinute}:00`,
      }

      const response = await checkAvailability(requestBody, null)
      setResult(response)
    } catch (err) {
      console.error(err)
      setError("Greška pri provjeri dostupnosti.")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="relative isolate rounded-2xl border-[thin] border-gray-300 bg-white/60 dark:bg-gray-800/70">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h3 className="mt-2 mb-10 text-4xl font-medium tracking-tighter text-pretty text-gray-950 data-dark:text-white sm:text-6xl">
          Provjera cijene i dostupnosti
        </h3>

        {/* FORM CONTAINER */}
        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-gray-700 bg-gray-900/60 p-6 shadow-lg dark:bg-gray-800">
          {/* DATUM DOLASKA */}
          <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Datum dolaska
              </label>
              <input
                value={startDate || ""}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                className="block w-full rounded-md bg-white/90 px-3 py-2 text-gray-900  outline-gray-300 focus:outline-indigo-600 dark:bg-white/10 dark:text-white dark:outline-gray-700 dark:focus:outline-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Vrijeme dolaska
              </label>
              <select className="block w-full rounded-md bg-white/90 px-3 py-2 text-gray-900 outline-gray-300 focus:outline-indigo-600 dark:bg-white/10 dark:text-white dark:outline-gray-700 dark:focus:outline-indigo-500"
                value={startHour || ""} onChange={(e) => setStartHour(e.target.value)}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <option key={i} value={i}>
                    {i.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Minute
              </label>
              <select className="block w-full rounded-md bg-white/90 px-3 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 dark:bg-white/10 dark:text-white dark:outline-gray-700 dark:focus:outline-indigo-500"
              value={startMinute || ""} onChange={(e) => setStartMinute(e.target.value)}>
                {['00', '15', '30', '45'].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DATUM ODLASKA */}
          <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Datum odlaska
              </label>
              <input
                value={endDate || ""}
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                className="block w-full rounded-md bg-white/90 px-3 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 dark:bg-white/10 dark:text-white dark:outline-gray-700 dark:focus:outline-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Vrijeme odlaska
              </label>
              <select className="block w-full rounded-md bg-white/90 px-3 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 dark:bg-white/10 dark:text-white dark:outline-gray-700 dark:focus:outline-indigo-500"
              value={endHour || ""} onChange={(e) => setEndHour(e.target.value)}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <option key={i} value={i}>
                    {i.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Minute
              </label>
              <select className="block w-full rounded-md bg-white/90 px-3 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 dark:bg-white/10 dark:text-white dark:outline-gray-700 dark:focus:outline-indigo-500"
              value={endMinute || ""} onChange={(e) => setEndMinute(e.target.value)}>
                {['00', '15', '30', '45'].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-md bg-fuchsia-800 py-3 font-semibold tracking-wide text-white uppercase shadow hover:bg-fuchsia-500"
            >
              Provjerite cijenu i dostupnost
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
