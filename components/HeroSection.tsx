'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  // Define animation states based on scroll progress
  const isInitialStage = scrollProgress < 0.3
  const isTextStage = scrollProgress >= 0.3 && scrollProgress < 0.7
  const isNextStage = scrollProgress >= 0.7

  // Calculate dynamic animation values
  const videoScale = isNextStage ? 0.85 : 1
  const videoOpacity = isNextStage ? 0.2 : 1
  const videoY = isNextStage ? '-15%' : 0
  const overlayOpacity = isNextStage ? 0.15 : 1
  const textOpacity = isTextStage ? 1 : (isNextStage ? 0 : 0)
  const textY = isTextStage ? 0 : (isNextStage ? '-15%' : '10%') // Sync with video Y in next stage
  const nextSectionY = isNextStage ? 0 : '100%'

  return (
    <>
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
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          {/* Black Overlay */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black/40 z-0 pointer-events-none"
            animate={{ opacity: overlayOpacity }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          {/* Top Bar */}
          <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-6 z-20">
            {/* Left: Logo/Text */}
            <div className="text-white font-bold text-2xl md:text-4xl tracking-wide select-none">
              BMW M5
            </div>

            {/* Center: Search Bar */}
            <AnimatePresence>
              {isInitialStage && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="flex justify-center items-center"
                  style={{ zIndex: 21 }}
                >
                  <div className="flex items-center border-2 border-white/80 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md w-64 md:w-96">
                    <FiSearch className="text-white text-xl mr-3" />
                    <input
                      type="text"
                      placeholder="Search your dream car..."
                      className="bg-transparent text-white placeholder-white/70 outline-none w-full text-sm md:text-base"
                      aria-label="Search your dream car"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right: Menu Icon */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-3xl hover:text-white/80 transition-colors z-30 focus:outline-none"
              aria-label="Open menu"
              type="button"
            >
              <FiMenu />
            </button>
          </header>

          {/* Floating Scroll Down Icon */}
          <AnimatePresence>
            {isInitialStage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
                className="fixed left-1/2 bottom-20 -translate-x-1/2 z-20"
              >
                <ScrollDownIcon />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scroll Transition Text */}
          <AnimatePresence>
            {(isTextStage || isNextStage) && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 pointer-events-none"
                initial={{ opacity: 0, y: '10%' }}
                animate={{ 
                  opacity: textOpacity, 
                  y: textY // Sync with video's Y movement
                }}
                exit={{ opacity: 0, y: '-15%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              >
                <h1 className="text-5xl md:text-7xl font-bold tracking-widest drop-shadow-lg">LUXURY</h1>
                <h2 className="text-xl md:text-2xl font-light tracking-wider mt-4 drop-shadow">REDEFINED</h2>
                <p className="text-gray-300 mt-6 text-center max-w-md md:max-w-2xl text-sm md:text-base">
                  Experience unparalleled performance, sophistication, and innovation with the BMW M5 – where luxury meets precision.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Menu */}
          <FloatingMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </section>

      </div>
    </>
  )
}

export default HeroSection