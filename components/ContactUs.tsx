'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

const ContactUs = () => {
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
      id="contact-us"
      className="relative min-h-screen w-full bg-black text-white py-12 px-6 sm:px-12"
    >
      <motion.div
        style={{ opacity, y }}
        className="max-w-7xl mx-auto"
      >
        {/* Logo and Tagline */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">ABZ</h1>
          <p className="text-sm sm:text-base">Elevating Pre-Owned Luxury Experiences Since 1990</p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {/* Brands */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">BRANDS</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>KIA</li>
              <li>ROLLS ROYCE</li>
              <li>MAHINDRA</li>
              <li>MG</li>
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">MENU</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>Stock Car</li>
              <li>EMI Calculator</li>
              <li>Custom Requirement</li>
              <li>Car Service</li>
            </ul>
          </div>

          {/* Sitemap */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">SITEMAP</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>Home</li>
              <li>About Us</li>
              <li>Showroom</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Blogs and Services */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">SITEMAP</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>Blogs</li>
              <li>Get a Loan</li>
              <li>Sell Cars</li>
              <li>Insurance</li>
            </ul>
          </div>
        </div>

        {/* Socials and Contact */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 border-t border-gray-700 pt-6">
          <div className="flex space-x-4">
            <span className="text-lg">SOCIALS</span>
            <div className="flex space-x-3">
              <span>😊</span>
              <span>👍</span>
              <span>🎥</span>
              <span>❌</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <span className="text-lg">CONTACT</span>
            <p className="text-sm sm:text-base">info@carbuzz.in</p>
          </div>
        </div>

        {/* Privacy Links */}
        <div className="mt-6 text-center sm:text-right text-sm sm:text-base">
          <a href="#" className="mr-4">Privacy</a>
          <a href="#" className="mr-4">Terms and Conditions</a>
          <a href="#">Cookie Policy</a>
        </div>
      </motion.div>
    </section>
  )
}

export default ContactUs