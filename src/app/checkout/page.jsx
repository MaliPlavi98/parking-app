import { CheckCircleIcon } from '@heroicons/react/20/solid'

export default function Checkout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <form className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {/* LEFT – Reservation form */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Podaci za rezervaciju
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ime i prezime <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-indigo-600 focus:ring-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-indigo-600 focus:ring-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Telefon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-indigo-600 focus:ring-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Registracija vozila <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="ZG-1234-AA"
                  className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 uppercase focus:border-indigo-600 focus:ring-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Broj putnika <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-indigo-600 focus:ring-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Broj povratnog leta <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-indigo-600 focus:ring-indigo-600"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Napomena
                </label>
                <textarea
                  rows={3}
                  className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-indigo-600 focus:ring-indigo-600"
                />
              </div>
            </div>
          </div>

          {/* RIGHT – Parking calculation */}
          <div className="mt-10 self-start lg:sticky lg:top-6 lg:mt-0">
            <h2 className="text-lg font-semibold text-gray-900">
              Parking kalkulacija
            </h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="space-y-4 px-6 py-5">
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircleIcon className="mr-1 h-5 w-5" />
                  Parking je dostupan
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Dolazak</span>
                  <span className="font-medium text-gray-900">
                    16.12.2025 u 04:15
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Odlazak</span>
                  <span className="font-medium text-gray-900">
                    18.12.2025 u 01:15
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Ukupno dana</span>
                  <span className="font-semibold text-gray-900">2 dana</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Cijena po danu</span>
                  <span className="font-medium text-gray-900">9,50 €</span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <span className="text-base font-medium text-gray-900">
                    Ukupna cijena
                  </span>
                  <span className="text-xl font-bold text-indigo-600">
                    19,00 €
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4">
                <button
                  type="submit"
                  className="w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  Rezerviraj parking
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
