'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, easeOut, easeInOut } from 'framer-motion' // Removed unused easeIn
import { FiSearch, FiMenu } from 'react-icons/fi'
import ScrollDownIcon from './ScrollDownIcon'
import FloatingMenu from './FloatingMenu'

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0) // Scroll progress from 0 to 1
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Ensure smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth'

    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const maxScroll = windowHeight * 2 // Total scroll distance (2x viewport height)

      // Calculate progress (0 to 1) over the scrollable area
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  // Define animation stages
  const isInitialStage = scrollProgress < 0.3
  const isTextStage = scrollProgress >= 0.3 && scrollProgress < 0.7
  const isNextStage = scrollProgress >= 0.7

  // Dynamic animation values
  const videoScale = isNextStage ? 0.85 : 1
  const videoOpacity = isNextStage ? 0.2 : 1
  const videoY = isNextStage ? '-15%' : 0
  const overlayOpacity = isNextStage ? 0.15 : 1
  const textOpacity = isTextStage ? 1 : isNextStage ? 0 : 0
  const textY = isTextStage ? 0 : isNextStage ? '-15%' : '10%' // Sync with video Y

  // Animation variants
  const logoVariants = {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut } },
  }
  const searchVariants = {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut, delay: 0.2 } },
  }
  const menuVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut, delay: 0.4 } },
  }

  return (
    <div className="relative min-h-[200vh] w-full snap-y snap-mandatory">
      <section className="relative h-screen w-full overflow-hidden sticky top-0 snap-start">
        {/* Video Background */}
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/BMW_M5.mp4"
          animate={{
            scale: videoScale,
            opacity: videoOpacity,
            y: videoY,
          }}
          transition={{ duration: 1.2, ease: easeInOut }}
        />

        {/* Black Overlay */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-black/40 z-0 pointer-events-none"
          animate={{ opacity: overlayOpacity }}
          transition={{ duration: 1.2, ease: easeInOut }}
        />

        {/* Top Bar */}
        <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 md:px-12 py-3 sm:py-4 z-20">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate={isInitialStage ? "animate" : "initial"}
            className="text-white font-bold text-xl sm:text-2xl md:text-4xl tracking-wide select-none"
          >
            CAR BUZZ
          </motion.div>

          {/* Search Bar */}
          <AnimatePresence>
            {isInitialStage && (
              <motion.div
                variants={searchVariants}
                initial="initial"
                animate="animate"
                exit="initial"
                className="flex justify-center items-center"
                style={{ zIndex: 21 }}
              >
                <div className="flex items-center border-2 border-white/80 px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-white/10 backdrop-blur-md w-40 sm:w-64 md:w-96">
                  <FiSearch className="text-white text-lg sm:text-xl mr-2 sm:mr-3" />
                  <input
                    type="text"
                    placeholder="Search your dream car..."
                    className="bg-transparent text-white placeholder-white/70 outline-none w-full text-xs sm:text-sm md:text-base"
                    aria-label="Search your dream car"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Menu Icon */}
          <motion.button
            variants={menuVariants}
            initial="initial"
            animate={isInitialStage ? "animate" : "initial"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl sm:text-3xl hover:text-white/80 transition-colors z-30 focus:outline-none"
            aria-label="Open menu"
            type="button"
          >
            <FiMenu />
          </motion.button>
        </header>

        {/* Scroll Down Icon - Positioned absolutely within section */}
        <AnimatePresence>
          {isInitialStage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                ease: easeInOut,
                repeat: Infinity,
                repeatType: 'mirror',
              }}
              className="absolute left-1/2 bottom-4 sm:bottom-8 -translate-x-1/2 z-20"
            >
              <ScrollDownIcon />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transition Text */}
        <AnimatePresence>
          {(isTextStage || isNextStage) && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 pointer-events-none"
              initial={{ opacity: 0, y: '10%' }}
              animate={{ opacity: textOpacity, y: textY }}
              exit={{ opacity: 0, y: '-15%' }}
              transition={{ duration: 1.2, ease: easeInOut }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-widest drop-shadow-lg">
                LUXURY
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-light tracking-wider mt-4 sm:mt-6 drop-shadow">
                REDEFINED
              </h2>
              <p className="text-gray-300 mt-4 sm:mt-6 text-center max-w-xs sm:max-w-2xl md:max-w-4xl text-sm sm:text-lg md:text-2xl leading-relaxed">
                Experience unparalleled performance, sophistication, and innovation with the BMW M5 – where luxury meets precision.
              </p>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Floating Menu */}
        <FloatingMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </section>
    </div>
  )
}

export default HeroSection