
'use client'

import { useEffect, useState } from 'react'
export default function ReservationThankYou({ parkingLocation }) {

  debugger;
  const reservation = {
    id: 'PARK-2025-00142',
    location: 'Zagreb Center Garage',
    arrival: '21 Dec 2025, 10:15',
    departure: '23 Dec 2025, 09:00',
    vehicle: 'BMW X1',
    price: '€24.00',
  }

useEffect(() => {
  if (sessionStorage.getItem('orderCompleted') !== 'true') {
    window.location.replace('/')
    return
  }

  sessionStorage.removeItem('orderCompleted')
  sessionStorage.removeItem('checkoutData')
}, [])


  function formatReservationCode(id) {
  return `RES-${String(id).padStart(8, '0')}`
}

  return (
    <main className="bg-white px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        {/* HEADER */}
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-indigo-600">
            Reservation confirmed
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            Your parking spot is secured 🚗
          </p>
          <p className="mt-2 text-base text-gray-500">
            You can safely park during the selected time period.
          </p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">Reservation ID</dt>
            <dd className="mt-2 text-indigo-600">{reservation.id}</dd>
          </dl>
        </div>

        {/* DETAILS */}
        <section className="mt-10 border-t border-gray-200">
          <dl className="grid grid-cols-1 gap-x-6 gap-y-10 py-10 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-gray-900">Parking location</dt>
              <dd className="mt-2 text-gray-700">
                {parkingLocation}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-gray-900">Vehicle</dt>
              <dd className="mt-2 text-gray-700">
                {reservation.vehicle}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-gray-900">Arrival</dt>
              <dd className="mt-2 text-gray-700">
                {reservation.arrival}
              </dd>
            </div>

            <div>
              <dt className="font-medium text-gray-900">Departure</dt>
              <dd className="mt-2 text-gray-700">
                {reservation.departure}
              </dd>
            </div>
          </dl>

          {/* SUMMARY */}
          <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
            <div className="flex justify-between">
              <dt className="font-medium text-gray-900">Total price</dt>
              <dd className="text-gray-900">{reservation.price}</dd>
            </div>
          </dl>

          {/* CTA */}
          <div className="mt-12 flex gap-4">
            <a
              href="/reservations"
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              View my reservations
            </a>

            <a
              href="/"
              className="rounded-md bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200"
            >
              Back to homepage
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
