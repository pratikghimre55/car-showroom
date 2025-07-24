'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

const cars = [
  {
    id: 1,
    image: '/cars/bmw-m5-2023.jpg',
    brand: 'BMW',
    model: 'M5 Competition',
    year: 2023,
    transmission: 'Automatic',
    kmDriven: '12,000 km',
  },
  {
    id: 2,
    image: '/cars/bmw-m5-2022.jpg',
    brand: 'BMW',
    model: 'M5 CS',
    year: 2022,
    transmission: 'Automatic',
    kmDriven: '8,500 km',
  },
  {
    id: 3,
    image: '/cars/bmw-m5-2021.jpg',
    brand: 'BMW',
    model: 'M5',
    year: 2021,
    transmission: 'Automatic',
    kmDriven: '20,000 km',
  },
  {
    id: 4,
    image: '/cars/bmw-m5-2020.jpg',
    brand: 'BMW',
    model: 'M5 Competition',
    year: 2020,
    transmission: 'Automatic',
    kmDriven: '25,000 km',
  },
  {
    id: 5,
    image: '/cars/bmw-m5-2019.jpg',
    brand: 'BMW',
    model: 'M5',
    year: 2019,
    transmission: 'Automatic',
    kmDriven: '30,000 km',
  },
]

const CarList = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cars.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length)
  }

  const visibleCars = () => {
    const indices = [
      (currentIndex - 1 + cars.length) % cars.length,
      currentIndex,
      (currentIndex + 1) % cars.length,
    ]
    return indices.map((index) => cars[index])
  }

  return (
    <section id="cars" className="relative min-h-screen w-full bg-black py-16">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
        FEATURED CARS
      </h2>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Fade Effect Overlays */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Carousel */}
        <div className="flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-4 text-white text-3xl p-2 hover:bg-white/20 rounded-full transition-colors z-20"
          >
            <FiArrowLeft />
          </button>

          {/* Car Cards */}
          <div className="flex justify-center gap-4 overflow-hidden">
            {visibleCars().map((car, index) => (
              <motion.div
                key={car.id}
                className={`relative w-64 md:w-80 h-96 rounded-lg overflow-hidden ${
                  index !== 1 ? 'opacity-50 scale-90' : 'opacity-100 scale-100'
                }`}
                initial={{ opacity: 0, x: index === 0 ? -100 : 100 }}
                animate={{ opacity: index !== 1 ? 0.5 : 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={car.image}
                  alt={car.model}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-4 text-white text-3xl p-2 hover:bg-white/20 rounded-full transition-colors z-20"
          >
            <FiArrowRight />
          </button>
        </div>

        {/* Car Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cars[currentIndex].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white mt-8"
          >
            <h3 className="text-2xl font-bold">{cars[currentIndex].brand} {cars[currentIndex].model}</h3>
            <p className="text-gray-300 mt-2">Year: {cars[currentIndex].year}</p>
            <p className="text-gray-300">Transmission: {cars[currentIndex].transmission}</p>
            <p className="text-gray-300">KM Driven: {cars[currentIndex].kmDriven}</p>
          </motion.div>
        </AnimatePresence>

        {/* See More Cars Button */}
        <div className="text-center mt-12">
          <a
            href="/cars"
            className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-colors"
          >
            See More Cars
          </a>
        </div>
      </div>
    </section>
  )
}

export default CarList