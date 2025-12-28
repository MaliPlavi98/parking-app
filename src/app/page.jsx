import { Container } from '../components/container'
import { Footer } from '../components/footer'
import { Gallery } from '../components/galleries'
import { Link } from '../components/link'
import { Navbar } from '../components/navbar'
import { Heading, Subheading } from '@/components/text'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import ContactForm from './../components/contact-form'
import GoogleMaps from './../components/googleMaps'
import ContactQR from './../components/qrCode'
import ReservationForm from './../components/reservation-form'

export const metadata = {
  title:
    'Parking App Zagreb | Real-time parking availability near Radnička 232',
  description:
    'Find parking spots in real time across Zagreb. Smart parking detection, location-based sectors, and instant updates near Radnička cesta 232.',
  keywords: [
    'parking',
    'Zagreb parking',
    'parking app',
    'smart parking',
    'Radnička cesta parking',
    'parking availability',
    'garage parking',
    'street parking Zagreb',
  ],

  openGraph: {
    title: 'Parking App Zagreb | Real-time Parking Availability',
    description:
      'Find free parking spots easily across Zagreb with smart live parking detection and navigation.',
    url: 'https://your-domain.com',
    siteName: 'Parking App Zagreb',
    images: [
      {
        url: '/og/landing.jpg', // Place this in public/og
        width: 1200,
        height: 630,
        alt: 'Parking App Zagreb preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Parking App Zagreb | Real-time Parking Availability',
    description:
      'Find real-time available parking spots in Zagreb near Radnička 232.',
    images: ['/og/landing.jpg'],
  },

  alternates: {
    canonical: 'https://your-domain.com',
  },
}

function Hero() {
  return (
    <div className="relative">
      <img
        src="/hero/Hero_banner.jpg"
        alt="App Screenshot"
        className="absolute inset-2 bottom-0 h-200 w-full object-cover ring-1 ring-black/5 ring-inset"
      />
      <div className="pointer-events-none absolute inset-2 bottom-0 h-200 w-full bg-white/70" />
      <Container className="relative">
        <Navbar
          banner={
            <Link
              href="/blog/radiant-raises-100m-series-a-from-tailwind-ventures"
              className="flex items-center gap-1 rounded-full bg-blue-950/60 px-3 py-0.5 text-sm/6 font-medium text-white data-hover:bg-blue-950/40"
            >
              Radiant raises $100M Series A from Tailwind Ventures
              <ChevronRightIcon className="size-4" />
            </Link>
          }
        />
      </Container>
    </div>
  )
}

function FeatureSection() {
  return (
    <div className="overflow-hidden">
      <Container className="lg:pb-24">
        <ReservationForm width={1216} height={768} src="" />
      </Container>
    </div>
  )
}

function DarkBentoSection() {
  return (
    <div className="mt-2 bg-gray-900 py-32">
      {/* Change to grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-2">
        {/* LEFT COLUMN */}
        <Container className="flex-1" mxAuto={false}>
          <Subheading dark>Outreach</Subheading>
          <Heading as="h3" dark className="mt-2 max-w-3xl">
            Google Maps
          </Heading>
          <div className="mt-10">
            <GoogleMaps />
          </div>
        </Container>

        {/* RIGHT COLUMN */}
        <Container className="flex-1" mxAuto={false}>
          <Subheading dark>Where to find us</Subheading>
          <Heading as="h3" dark className="mt-2 max-w-3xl">
            Contact
          </Heading>
          <div className="mt-10 space-y-4 text-gray-300">
            <p>
              <span className="font-semibold text-white">Email:</span>{' '}
              info@example.com
            </p>
            <p>
              <span className="font-semibold text-white">Phone:</span> +385 91
              123 4567
            </p>
            <p>
              <span className="font-semibold text-white">Address:</span>{' '}
              Radnička cesta 232, Zagreb, Croatia
            </p>
            <p>
              <span className="font-semibold text-white">Hours:</span> Mon–Fri,
              9:00 – 18:00
            </p>
          </div>
          <div className="mt-3">
            <ContactQR />
          </div>
        </Container>

        {/* FULL-WIDTH CONTACT FORM BELOW */}
        <div className="mt-6 px-4 sm:px-6 md:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <div className="mx-2 bg-linear-to-b from-white from-50% to-gray-100 py-32 sm:py-10">
          <FeatureSection />
          <div className="mt-8">
            <Gallery />
          </div>
        </div>
        <DarkBentoSection />
      </main>
      <Footer />
    </div>
  )
}
