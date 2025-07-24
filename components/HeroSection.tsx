'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiMenu } from 'react-icons/fi'
import ScrollDownIcon from './ScrollDownIcon'
import FloatingMenu from './FloatingMenu'

const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 100)
      setPastHero(scrollY > window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`fixed top-0 left-0 w-full h-full object-cover z-0 transition-all duration-700 ${pastHero ? 'relative' : ''}`}
          src="/BMW_M5.mp4"
        />
        {/* Black Overlay */}
        <div className={`fixed top-0 left-0 w-full h-full bg-black/100 z-0 pointer-events-none transition-all duration-700 ${pastHero ? 'relative' : ''}`} />

        {/* Top Bar */}
        <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-6 z-20">
          {/* Left: Logo/Text */}
          <div className="text-white font-bold text-2xl md:text-4xl tracking-wide select-none">
            BMW M5
          </div>

          {/* Center: Search Bar */}
          <AnimatePresence>
            {!scrolled && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center w-full pointer-events-none"
                style={{ zIndex: 21 }}
              >
                <div className="flex items-center border-2 border-white/80 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md w-64 md:w-96 pointer-events-auto">
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
          {!scrolled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'mirror' }}
              className="fixed left-1/2 bottom-20 top-100 -translate-x-1/2 z-20"
            >
              <ScrollDownIcon />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Transition Text */}
        <AnimatePresence>
          {scrolled && !pastHero && (
            <motion.div
              className="fixed inset-0 flex flex-col items-center justify-center text-white z-20 pointer-events-none"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
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

        {/* Spacer to Allow Scrolling */}
        <div className="relative h-[200vh]" />
      </section>

      {/* Placeholder Next Section */}
      <section id="cars" className="relative min-h-screen w-full bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold">Our Cars</h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Explore our exclusive collection of BMW M5 models, designed for performance and luxury.
          </p>
        </div>
      </section>
    </>
  )
}

export default HeroSection