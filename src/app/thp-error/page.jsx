'use client'

export default function ReservationError() {
  const error = {
    title: 'Reservation failed',
    message:
      'Unfortunately, we were unable to complete your parking reservation. Please try again or contact support if the problem persists.',
    code: 'ERR-RES-001',
  }

  return (
    <main className="bg-white px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        {/* HEADER */}
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-red-600">
            Something went wrong
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            {error.title} ❌
          </p>
          <p className="mt-2 text-base text-gray-500">
            {error.message}
          </p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">Error code</dt>
            <dd className="mt-2 text-red-600">{error.code}</dd>
          </dl>
        </div>

        {/* DETAILS */}
        <section className="mt-10 border-t border-gray-200">
          <div className="py-10 text-sm text-gray-700">
            <p>
              No reservation was created and no payment has been processed.
              You can safely try again.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 flex gap-4">
            <a
              href="/reservation"
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Try again
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
