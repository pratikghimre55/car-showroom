'use client'

import { motion } from 'framer-motion'

interface Props {
  open: boolean
  onClose: () => void
}

const FloatingMenu = ({ open, onClose }: Props) => {
  if (!open) return null

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 w-64 h-full bg-black/95 z-30 p-6 text-white flex flex-col gap-6"
    >
      <button onClick={onClose} className="text-right text-2xl hover:text-white/80 transition-colors">
        ×
      </button>
      <a href="#cars" className="text-lg hover:text-blue-400 transition-colors">Cars</a>
      <a href="#about" className="text-lg hover:text-blue-400 transition-colors">About</a>
      <a href="#contact" className="text-lg hover:text-blue-400 transition-colors">Contact</a>
    </motion.div>
  )
}

export default FloatingMenu