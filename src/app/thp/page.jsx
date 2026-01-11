import ReservationThankYou from "../../components/reservation-confirmation"
import { getSettingByKey } from "../api/settings"

// ✅ SEO metadata (thank you pages should usually be noindex)
export const metadata = {
  title: "Reservation confirmed | Parking App Zagreb",
  description: "Your parking reservation has been successfully confirmed.",
  robots: {
    index: false,
    follow: false,
  },
}

// ✅ Server-side fetch
async function getParkingLocationName() {
  try {
    return await getSettingByKey("PARKING_LOCATION")
  } catch (e) {
    console.error("Failed to load PARKING_LOCATION", e)
    return null
  }
}

// ✅ Server Component (route entry)
export default async function ThankYouPage() {
  console.log("🔥 THANK YOU PAGE SSR")

  const setting = await getParkingLocationName()

  return (
    <ReservationThankYou
      parkingLocationName={setting?.value ?? ""}
    />
  )
}
