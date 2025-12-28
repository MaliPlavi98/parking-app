'use client'

import { useEffect, useState } from 'react'
import {
  createSetting,
  deleteSetting,
  getSettings,
  updateSetting,
} from '../../api/settings'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function SettingsPage() {
  const [data, setData] = useState([])

  // NEW
  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')

  // EDIT
  const [editId, setEditId] = useState(null)
  const [editKey, setEditKey] = useState('')
  const [editValue, setEditValue] = useState('')

  // DELETE MODAL
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const res = await getSettings()
    setData(res)
  }

  async function create() {
    if (!newKey || !newValue) return

    await createSetting({ key: newKey, value: newValue })
    setNewKey('')
    setNewValue('')
    load()
  }

  async function update(id) {
    await updateSetting(id, { key: editKey, value: editValue })
    setEditId(null)
    load()
  }

  async function confirmDelete() {
    await deleteSetting(deleteId)
    setDeleteOpen(false)
    setDeleteId(null)
    load()
  }

  function startEdit(setting) {
    setEditId(setting.id)
    setEditKey(setting.keyName)
    setEditValue(setting.value)
  }

  function openDeleteModal(id) {
    setDeleteId(id)
    setDeleteOpen(true)
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>

      {/* CREATE */}
      <div className="mb-6 flex gap-3 rounded-xl bg-white p-4 shadow">
        <input
          placeholder="Key"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="w-1/3 rounded border px-3 py-2"
        />
        <input
          placeholder="Value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="w-1/3 rounded border px-3 py-2"
        />
        <button
          onClick={create}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          NEW
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full overflow-hidden rounded-xl bg-white shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Key</th>
            <th className="p-3 text-left">Value</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((setting) => (
            <tr key={setting.id} className="border-t">
              <td className="p-3">
                {editId === setting.id ? (
                  <input
                    value={editKey}
                    onChange={(e) => setEditKey(e.target.value)}
                    className="w-full rounded border px-2 py-1"
                  />
                ) : (
                  setting.keyName
                )}
              </td>

              <td className="p-3">
                {editId === setting.id ? (
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full rounded border px-2 py-1"
                  />
                ) : (
                  setting.value
                )}
              </td>

              <td className="flex gap-2 p-3">
                {editId === setting.id ? (
                  <>
                    <button
                      onClick={() => update(setting.id)}
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                      UPDATE
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="rounded bg-gray-400 px-3 py-1 text-white hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(setting)}
                      className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(setting.id)}
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-500">
                No settings found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* DELETE MODAL */}
      <Dialog
        open={deleteOpen}
        onClose={setDeleteOpen}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel className="relative w-full rounded-lg bg-white shadow-xl sm:max-w-lg dark:bg-gray-800">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-red-100">
                  <ExclamationTriangleIcon className="size-6 text-red-600" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    Delete setting
                  </DialogTitle>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this setting? This action
                    cannot be undone.
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
    </div>
  )
}
