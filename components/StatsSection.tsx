'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'

interface StatItemProps {
  from: number;
  to: number;
  label: string;
  delay: number;
}

const StatItem = ({ from, to, label, delay }: StatItemProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(from)
  const [displayValue, setDisplayValue] = useState(from)

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration: 2,
        delay,
        ease: "easeOut"
      })
      return controls.stop
    }
  }, [isInView, count, to, delay])

  useEffect(() => {
    return count.on("change", latest => {
      setDisplayValue(Math.floor(latest))
    })
  }, [count])

  return (
    <div ref={ref} className="text-center">
      <h3 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none">
        {displayValue}{label === 'Satisfaction Rating' ? '%' : '+'}
      </h3>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mt-3 font-light">
        {label}
      </p>
    </div>
  )
}

const StatsSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0])

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative min-h-screen w-full bg-[url('/showroom01.jpg')] bg-cover bg-center flex flex-col items-center justify-center text-white py-16 sm:py-20 overflow-hidden"
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-85 z-0" />

      {/* Stats */}
      <motion.div
        style={{ opacity, y }}
        className="flex flex-col sm:flex-row justify-around items-center w-full max-w-7xl px-4 sm:px-8 gap-10 sm:gap-14 z-10"
      >
        <StatItem from={0} to={8000} label="Happy Clients" delay={0} />
        <StatItem from={0} to={15} label="Years Experience" delay={0.5} />
        <StatItem from={0} to={99} label="Satisfaction Rating" delay={1} />
      </motion.div>

      {/* Description & Button */}
      <motion.div style={{ opacity, y }} className="mt-12 text-center max-w-3xl z-10 px-4">
        <p className="text-base sm:text-lg md:text-xl mb-4">
          Explore Our Meticulously Curated Inventory of Prestigious Preowned Vehicles.
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-6">
          Schedule a Consultation or Visit Our Showroom Today.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black font-semibold px-6 py-3 rounded-full text-sm sm:text-base"
        >
          CONTACT US TODAY →
        </motion.button>
      </motion.div>
    </section>
  )
}

export default StatsSection
