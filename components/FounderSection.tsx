'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const FounderSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Background fade in
  const bgOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])

  // Heading position: comes up, stays, then goes up
  const whoAreWeY = useTransform(scrollYProgress, [0.15, 0.4], [0, -100])

  // Heading opacity: stays fully visible until going up
  const whoAreWeOpacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0])

  // Founder content fade in
  const contentOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.45, 0.65], [100, 0])

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="relative min-h-[200vh] w-full"
    >
      {/* Sticky Background */}
      <div className="sticky top-0 h-screen w-full z-0">
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-[url('/showroom.jpeg')] bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </motion.div>

        {/* WHO ARE WE Heading */}
        <motion.div
          style={{ y: whoAreWeY, opacity: whoAreWeOpacity }}
          className="flex items-center justify-center h-full text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-wider font-['Helvetica_Neue',_Arial,_sans-serif]">
            WHO ARE WE?
          </h2>
        </motion.div>
      </div>

      {/* Founder Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative min-h-screen w-full bg-black z-20 flex items-center justify-center"
      >
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 py-24 sm:py-32 flex flex-col sm:flex-row items-center sm:items-start">
          {/* Image */}
          <div className="w-[332px] h-[523px] overflow-hidden flex-shrink-0 relative">
            <Image
              src="/shreyans.jpeg"
              alt="shreyans"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 332px"
              priority
            />
          </div>

          {/* Text */}
          <div className="sm:ml-12 mt-8 sm:mt-0 text-white sm:w-[55%]">
            <div className="mb-8">
              <h3 className="text-3xl sm:text-4xl md:text-5xl">
                <span className="font-bold">CARBUZZ</span>{' '}
                <span className="font-normal">FOUNDER</span>
              </h3>
            </div>
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Shreyans Daga
            </h4>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed">
              Cars and working with cars is my passion. With this showroom, I
              converted my passion into my business. With god&apos;s grace and
              customer&apos;s support, we have scaled new highs year on year.
              Transparency and Trust are the keywords for us. Grew up watching
              luxury cars, we always dreamt of owning one myself. Little did I
              know that our dream would take this shape. Now our only passion is
              to convert other&apos;s dreams of owning a premium car into
              reality.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default FounderSection
