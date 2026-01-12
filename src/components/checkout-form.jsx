'use client'

import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { createReservation as createReservationApi } from '../app/api/reservation'

export default function Checkout() {
  const [data, setData] = useState(null)
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [registration, setRegistration] = useState('')
  const [passengers, setPassengers] = useState('')
  const [flightNumber, setflightNumber] = useState('')
  const [details, setDetails] = useState('')

  useEffect(() => {
    const stored = sessionStorage.getItem('checkoutData')

    if (!stored) {
      // direct access protection
      window.location.href = '/'
      return
    }

    setData(JSON.parse(stored))
  }, [])

  if (!data) return null

  const { availability, startTime, endTime } = data
  const { available, totalPrice, totalDays } = availability

  function handleCreateReservation(e) {
    e.preventDefault();

    const payload = {
      name,
      email,
      phone,
      carPlate: registration || null,
      returnFlightNumber: flightNumber || null,
      passengers: passengers ? Number(passengers) : null,
      details: details || null,
      startTime,
      endTime,
      totalPrice,
    }

    try {
      createReservationApi(payload)

      // 🔐 mark checkout as completed
      sessionStorage.setItem('orderCompleted', 'true')

      // 👉 redirect to THP
      window.location.href = '/thp'
    } catch (err) {
      console.error(err)
      alert('Failed to create reservation. Please try again.')
    }
  }

  return (
    <main className="bg-white px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mb-8 -ml-2 inline-flex items-center gap-2 rounded-md border border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </button>
        {/* HEADER */}
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-indigo-600">
            Parking reservation
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            Complete your reservation 🚗
          </p>
          <p className="mt-2 text-base text-gray-500">
            Enter your details and confirm your parking spot.
          </p>
        </div>

        <form
          className="mt-12 border-t border-gray-200"
          onSubmit={handleCreateReservation}
        >
          {/* RESERVATION FORM */}
          <section className="py-10">
            <h2 className="text-lg font-semibold text-gray-900">
              Reservation details
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                label="Ime i prezime"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                label="E-mail"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Telefon"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Input
                label="Registracija vozila"
                placeholder="ZG-1234-AA"
                className="uppercase"
                value={registration}
                onChange={(e) => setRegistration(e.target.value.toUpperCase())}
              />

              <Input
                label="Broj putnika"
                type="number"
                min="1"
                max="10"
                required
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
              />

              <Input
                label="Broj povratnog leta"
                value={flightNumber}
                onChange={(e) => setflightNumber(e.target.value)}
              />

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Napomena
                </label>
                <textarea
                  rows={3}
                  maxLength={1024}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-600 focus:ring-indigo-600"
                />
              </div>
            </div>
          </section>

          {/* PARKING SUMMARY */}
          <section className="border-t border-gray-200 py-10">
            <h2 className="text-lg font-semibold text-gray-900">
              Parking summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div
                className={`flex items-center ${
                  available ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <CheckCircleIcon className="mr-1 h-5 w-5" />
                {available
                  ? 'Parking is available'
                  : 'Parking is NOT available'}
              </div>
              <SummaryRow label="Arrival" value={formatDate(startTime)} />

              <SummaryRow label="Departure" value={formatDate(endTime)} />

              <SummaryRow label="Total days" value={`${totalDays} days`} />

              <SummaryRow
                label="Price per day"
                value={`€${(totalPrice / totalDays).toFixed(2)}`}
              />

              <div className="flex justify-between border-t border-gray-200 pt-6 text-base font-semibold">
                <span>Total price</span>
                <span className="text-indigo-600">
                  €{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-12 flex gap-4">
            <button
              type="submit"
              disabled={!available}
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow disabled:opacity-50"
            >
              Confirm reservation
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = '/')}
              className="rounded-md bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

/* ---------- helpers ---------- */

function Input({ label, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        required={required}
        className={`mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-600 focus:ring-indigo-600 ${
          props.className || ''
        }`}
      />
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  )
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleString('hr-HR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}
