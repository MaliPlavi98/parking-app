import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Gallery } from '@/components/galleries'
import { Heading, Subheading } from '@/components/text'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import ContactForm from './../components/contact-form'
import GoogleMaps from './../components/googleMaps'
import ContactQR from './../components/qrCode'

export const metadata = {
  description:
    'Radiant helps you sell more by revealing sensitive information about your customers.',
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
              className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-hover:bg-fuchsia-950/30"
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
        <ContactForm width={1216} height={768} src="/screenshots/app.png" />
      </Container>
    </div>
  )
}

function DarkBentoSection() {
  return (
    <div className="mt-2 bg-gray-900 py-32">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-16 md:flex-row">
        <Container className="flex-1" mxAuto={false}>
          <Subheading dark>Outreach</Subheading>
          <Heading as="h3" dark className="mt-2 max-w-3xl">
            Google Maps
          </Heading>
          <div className="mt-10">
            <GoogleMaps />
          </div>
        </Container>

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
            <ContactQR/>
          </div> 
        </Container>
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
          <Gallery />{' '}
        </div>
        <DarkBentoSection />
      </main>
      <Footer />
    </div>
  )
}
