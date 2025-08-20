'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Image from 'next/image'

interface Car {
  id: number
  image: string
  brand: string
  model: string
  year: number
  transmission: string
  kmDriven: string
  owner: string
  location: string
  price: number
  featured: boolean
  // ✅ Added optional icon fields so no `any` is needed
  rupeeIcon?: string
  dateIcon?: string
  steeringIcon?: string
  speedometerIcon?: string
  locationIcon?: string
}

const CarList = () => {
  const [cars, setCars] = useState<Car[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('/api/cars', { next: { revalidate: 3600 } })
        if (!res.ok) throw new Error('Failed to fetch cars')
        const data: Car[] = await res.json()
        const featuredCars = data.filter(c => c.featured).map(car => ({
          ...car,
          rupeeIcon: '/rupee.png',
          dateIcon: '/date.png',
          steeringIcon: '/steering.png',
          speedometerIcon: '/speedometer.png',
          locationIcon: '/location.png',
        }))
        setCars(featuredCars)
      } catch {
        setError('Failed to load featured cars')
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % cars.length)
  }

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + cars.length) % cars.length)
  }

  if (loading || error) {
    return (
      <section className="relative min-h-screen w-full bg-black py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Featured Cars
        </h2>
        <div className="text-center text-white">
          {loading ? 'Loading…' : <span className="text-red-500">{error}</span>}
        </div>
      </section>
    )
  }

  // pick center card details
  const centerIndex = currentIndex % cars.length
  const centerCar = cars[centerIndex]

  return (
    <section id="cars" className="relative min-h-screen w-full bg-black py-16 overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-10">
        Featured Cars
      </h2>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: `calc(50% - ${(currentIndex + 0.5) * (100 / 3)}%)` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {[...cars, ...cars].map((car, i) => (
              <div
                key={`${car.id}-${i}`}
                className="relative w-[calc(100%/3)] h-80 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            ))}
          </motion.div>

          {/* Fading edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent" />
        </div>

        {/* Details under center card */}
        {cars.length > 0 && (
          <AnimatePresence>
            <motion.div
              key={centerCar.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center text-white mt-12"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={`/car-brands/${centerCar.brand.toLowerCase()}.png`}
                  alt={centerCar.brand}
                  width={70}
                  height={70}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-2xl font-semibold">
                {centerCar.brand} {centerCar.model}
              </h3>
              <p className="text-gray-300 mt-1">₹ {centerCar.price.toLocaleString()}</p>

              <hr className="my-4 border-gray-700 w-2/3 mx-auto" />

              <div className="grid grid-cols-4 gap-6 max-w-lg mx-auto">
                <div className="flex flex-col items-center">
                  <Image src={centerCar.dateIcon!} alt="Date" width={28} height={28} />
                  <p className="text-gray-300 mt-1">{centerCar.year}</p>
                </div>
                <div className="flex flex-col items-center">
                  <Image src={centerCar.steeringIcon!} alt="Owner" width={28} height={28} />
                  <p className="text-gray-300 mt-1">{centerCar.owner}</p>
                </div>
                <div className="flex flex-col items-center">
                  <Image src={centerCar.speedometerIcon!} alt="KM" width={28} height={28} />
                  <p className="text-gray-300 mt-1">{centerCar.kmDriven}</p>
                </div>
                <div className="flex flex-col items-center">
                  <Image src={centerCar.locationIcon!} alt="Location" width={28} height={28} />
                  <p className="text-gray-300 mt-1">{centerCar.location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Nav arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 translate-y-[60%] z-10 bg-white/10 p-3 rounded-full hover:bg-white/20 border border-white/30"
        >
          <FiArrowLeft className="text-white text-2xl" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 translate-y-[60%] z-10 bg-white/10 p-3 rounded-full hover:bg-white/20 border border-white/30"
        >
          <FiArrowRight className="text-white text-2xl" />
        </button>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="/cars"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors"
          >
            See More Cars
          </a>
        </div>
      </div>
    </section>
  )
}

export default CarList
