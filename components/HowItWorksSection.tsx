'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const HowItWorksSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Animation controls
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0])

  const steps = [
    {
      title: 'Browse From Our Collection',
      image: '/browse.jpg',
    },
    {
      title: 'Get To Know Your Ride',
      image: '/inspection.jpg',
    },
    {
      title: 'Pay & Book Online Or Visit Showroom',
      image: '/booking.jpg',
    },
    {
      title: 'Instant Payment & Transfer',
      image: '/deal.jpg',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative min-h-screen w-full bg-black text-white py-16 sm:py-20"
    >
      <motion.div
        style={{ opacity, y }}
        className="max-w-7xl mx-auto px-6 sm:px-12 text-center"
      >
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          HOW IT WORKS
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-12 sm:mb-16 leading-relaxed">
        Owning your dream luxury car is now just 4 steps away – Car Buzz makes buying used luxury cars in India effortless, trusted, and truly premium.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
              className="flex flex-col items-center text-center w-full max-w-[200px]"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mb-4 w-[250px] h-[160px] overflow-hidden"
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  width={250}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </motion.div>
              <h3 >
                {step.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default HowItWorksSection