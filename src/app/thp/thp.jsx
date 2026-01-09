import ReservationThankYouClient from './thp'
import { getSettingByKeyServer } from '../lib/serverSettings'

export const metadata = {
  title: 'Thank you page',
  description: 'Thank you page - success',
}

export default async function ThankYouPage() {

  debugger;

   console.log('🔥 SERVER COMPONENT RENDERED')
  const setting = await getSettingByKeyServer('PARKING_LOCATION')

  return (
    <ReservationThankYouClient
      parkingLocation={setting?.value || ''}
    />
  )
}
