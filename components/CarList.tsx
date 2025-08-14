'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Image from "next/image"

interface Car {
  id: number
  image: string
  brand: string
  model: string
  year: number
  transmission: string
  kmDriven: string
}

const CarList = () => {
  const [cars, setCars] = useState<Car[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars', {
          next: { revalidate: 3600 },
        })
        if (!response.ok) throw new Error('Failed to fetch cars')

        const data: Car[] = await response.json()
        setCars(data)
        setLoading(false)
      } catch {
        setError('Failed to load cars')
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % cars.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length)
  }

  const visibleCars = () => {
    if (cars.length === 0) return []
    const indices = [
      (currentIndex - 1 + cars.length) % cars.length,
      currentIndex,
      (currentIndex + 1) % cars.length,
    ]
    return indices.map((index) => cars[index])
  }

  // Variants with correct typing
  const cardVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: ({ index }: { index: number }) => ({
      x: 0,
      opacity: index === 1 ? 1 : 0.6,
      scale: index === 1 ? 1 : 0.92,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    }),
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  }

  if (loading || error) {
    return (
      <section className="relative min-h-screen w-full bg-black py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-8 md:mb-12">
          FEATURED CARS
        </h2>
        <div className="text-center text-white">
          {loading ? 'Loading...' : <span className="text-red-500">{error}</span>}
        </div>
      </section>
    )
  }

  return (
    <section id="cars" className="relative min-h-screen w-full bg-black py-12 sm:py-16">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-8 md:mb-12">
        FEATURED CARS
      </h2>

      <div className="relative max-w-[90%] sm:max-w-6xl mx-auto px-4">
        {/* Fade overlays */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="absolute -left-12 text-white text-3xl p-3 hover:bg-white/10 rounded-full z-20"
        >
          <FiArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute -right-12 text-white text-3xl p-3 hover:bg-white/10 rounded-full z-20"
        >
          <FiArrowRight />
        </button>

        {/* Carousel */}
        <div className="flex items-center justify-center">
          <div className="flex justify-center gap-4 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              {visibleCars().map((car, index) => (
                <motion.div
                  key={car.id}
                  custom={index === 1 ? { index: 1 } : { index }}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className={`relative rounded-lg overflow-hidden ${
                    index === 1
                      ? 'w-104 sm:w-120 md:w-136 h-120 sm:h-136 md:h-156 shadow-lg'
                      : 'hidden sm:flex w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-96'
                  }`}
                >
                  <Image src={car.image} alt={car.model} className="w-full h-full object-cover" />
                  {index !== 1 && (
                    <div
                      className={`absolute inset-0 ${
                        index === 0
                          ? 'bg-gradient-to-l from-black/60 to-transparent'
                          : 'bg-gradient-to-r from-black/60 to-transparent'
                      }`}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Car details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cars[currentIndex].id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white mt-8"
          >
            <h3 className="text-2xl font-bold">
              {cars[currentIndex].brand} {cars[currentIndex].model}
            </h3>
            <p className="text-gray-300">Year: {cars[currentIndex].year}</p>
            <p className="text-gray-300">Transmission: {cars[currentIndex].transmission}</p>
            <p className="text-gray-300">KM Driven: {cars[currentIndex].kmDriven}</p>
          </motion.div>
        </AnimatePresence>

        {/* Button */}
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
