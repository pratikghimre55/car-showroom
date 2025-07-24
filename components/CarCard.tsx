'use client'

import { motion } from 'framer-motion'

interface CarCardProps {
  name: string
  image: string
  price: string
}


const CarCard = ({ name, image, price }: CarCardProps) => (
  <motion.div 
    className="bg-gray-900 p-4 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
  >
    <img src={image} alt={name} className="w-full h-48 object-cover rounded" />
    <h2 className="mt-2 text-xl font-semibold">{name}</h2>
    <p className="text-accent">{price}</p>
  </motion.div>
)

export default CarCard
