import ReservationThankYou from "../../components/reservation-confirmation"
import { getSettingByKey } from "../api/settings"
import {getReservationById} from "../api/reservation"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Reservation confirmed | Parking App Zagreb",
  description: "Your parking reservation has been successfully confirmed.",
  robots: {
    index: false,
    follow: false,
  },
}

async function getParkingLocationName() {
  try {
    return await getSettingByKey("PARKING_LOCATION")
  } catch (e) {
    console.error("Failed to load PARKING_LOCATION", e)
    return null
  }
}

async function getReservation(id) {

  try {
    return await getReservationById(id)
  } catch (e) {
    console.error("Failed to load Reservation", e)
    return null
  }
}

function parseReservationCode(code) {
  return Number(code);
}

export default async function ThankYouPage({ searchParams }) {
  console.log("🔥 THANK YOU PAGE SSR");

  const setting = await getParkingLocationName();

  const params = await searchParams;

  const rid = params.rid;

  if (!rid) {
    redirect("/") // protect direct access
  }

  const reservation = await getReservation(parseReservationCode(rid));
  return (
    <ReservationThankYou
      parkingLocationName={setting?.value ?? ""}
      reservationId={rid}
      reservation={reservation}
    />
  )
}
