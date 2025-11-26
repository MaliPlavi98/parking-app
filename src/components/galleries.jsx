'use client'

import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { Container } from './container'
import { Heading, Subheading } from './text'

const images = [
  {
    img: '/testimonials/image1.jpg',
  },
  {
    img: '/testimonials/image1.jpg',
  },
  {
    img: '/testimonials/image1.jpg',
  },
  {
    img: '/testimonials/image1.jpg',
  },
  {
    img: '/testimonials/image1.jpg',
  },
  {
    img: '/testimonials/image2.jpg',
  },
  {
    img: '/testimonials/image3.jpg',
  },
  {
    img: '/testimonials/image4.jpg',
  },
]

function GalleryItem({ img, children, bounds, scrollX, ...props }) {
  let ref = useRef(null)

  let computeOpacity = useCallback(() => {
    let element = ref.current
    if (!element || bounds.width === 0) return 1

    let rect = element.getBoundingClientRect()

    if (rect.left < bounds.left) {
      let diff = bounds.left - rect.left
      let percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
    } else if (rect.right > bounds.right) {
      let diff = rect.right - bounds.right
      let percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
    } else {
      return 1
    }
  }, [ref, bounds.width, bounds.left, bounds.right])

  let opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  })

  useLayoutEffect(() => {
    opacity.set(computeOpacity())
  }, [computeOpacity, opacity])

  useMotionValueEvent(scrollX, 'change', () => {
    opacity.set(computeOpacity())
  })

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      {...props}
      className="relative flex aspect-9/16 w-72 shrink-0 snap-start scroll-ml-(--scroll-padding) flex-col justify-end overflow-hidden rounded-3xl sm:aspect-3/4 sm:w-96"
    >
      <img
        alt=""
        src={img}
        className="absolute inset-x-0 top-0 aspect-square w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-linear-to-t from-black from-[calc(7/16*100%)] ring-1 ring-gray-950/10 ring-inset sm:from-25%"
      />
    </motion.div>
  )
}

export function Gallery() {
  let scrollRef = useRef(null)
  let { scrollX } = useScroll({ container: scrollRef })
  let [setReferenceWindowRef, bounds] = useMeasure()
  let [activeIndex, setActiveIndex] = useState(0)

  let [dialogOpen, setDialogOpen] = useState(false)
  let [selectedImg, setSelectedImg] = useState(null)

  useMotionValueEvent(scrollX, 'change', (x) => {
    setActiveIndex(Math.floor(x / scrollRef.current.children[0].clientWidth))
  })

  function scrollTo(index) {
    let gap = 32
    let width = scrollRef.current.children[0].offsetWidth
    scrollRef.current.scrollTo({ left: (width + gap) * index })
  }

  return (
    <div className="overflow-hidden">
      <Container>
        <div ref={setReferenceWindowRef}>
          <Subheading>Gallery </Subheading>
          <Heading as="h3" className="mt-2">
            Galerija
          </Heading>
        </div>
      </Container>
      <div
        ref={scrollRef}
        className={clsx([
          'mt-16 flex gap-8 px-(--scroll-padding)',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth',
          '[--scroll-padding:max(--spacing(6),calc((100vw-(var(--container-2xl)))/2))] lg:[--scroll-padding:max(--spacing(8),calc((100vw-(var(--container-7xl)))/2))]',
        ])}
      >
        {images.map(({ img }, imageIndex) => (
          <GalleryItem
            key={imageIndex}
            img={img}
            bounds={bounds}
            scrollX={scrollX}
            onClick={() => {
              scrollTo(imageIndex)
              setTimeout(() => {
                setSelectedImg(img)
                setDialogOpen(true)
              }, 300)
            }}
          />
        ))}

        <Headless.Dialog open={dialogOpen} onClose={setDialogOpen} className="relative z-50">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

          {/* Centered panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Headless.Dialog.Panel className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full">
              {/* Close button in top-right */}
              <button
                onClick={() => setDialogOpen(false)}
                className="font-bold absolute top-4 right-4 rounded-full bg-gray-800/80 p-2 text-white hover:bg-gray-900 focus:outline-none"
              >
                ✕
              </button>

              {selectedImg && (
                <img src={selectedImg} alt="" className="w-full h-auto rounded-xl" />
              )}
            </Headless.Dialog.Panel>
          </div>
        </Headless.Dialog>
        <div className="w-2xl shrink-0 sm:w-216" />
      </div>
      <Container className="mt-16">
        <div className="flex justify-center">
          <div className="hidden sm:flex sm:gap-2">
            {images.map(({ name }, imageIndex) => (
              <Headless.Button
                key={imageIndex}
                onClick={() => scrollTo(imageIndex)}
                data-active={activeIndex === imageIndex ? true : undefined}
                aria-label={`Scroll to testimonial from ${name}`}
                className={clsx(
                  'size-2.5 rounded-full border border-transparent bg-gray-300 transition',
                  'data-active:bg-gray-400 data-hover:bg-gray-400',
                  'forced-colors:data-active:bg-[Highlight] forced-colors:data-focus:outline-offset-4',
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
