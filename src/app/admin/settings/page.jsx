"use client";

import { useEffect, useState } from "react";
import { getSettings, updateSetting, deleteSetting } from "@/app/api/settings";

export default function SettingsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const token = localStorage.getItem("token");
    const res = await getSettings(token);
    setData(res);
  }

  async function remove(id) {
    const token = localStorage.getItem("token");
    await deleteSetting(id, token);
    load();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <table className="w-full bg-white shadow rounded-xl overflow-hidden">
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
              <td className="p-3">{setting.key}</td>
              <td className="p-3">{setting.value}</td>
              <td className="p-3">
                <button
                  onClick={() => remove(setting.id)}
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
  );
}
