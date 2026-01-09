// src/app/lib/serverSettings.js

export async function getSettingByKeyServer(key) {
  const res = await fetch(
    `http://localhost:9090/api/setting/PARKING_LOCATION`,
    {
      cache: 'no-store', // or: next: { revalidate: 60 }
    }
  )

  if (!res.ok) {
    console.error('Failed to fetch setting:', key)
    return null
  }

  return res.json()
}
