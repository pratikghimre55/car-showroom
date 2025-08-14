import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

const EXCEL_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTC3QYuir-WvApB-RQ1UxQR4JM1edUDHClqntO1T9eYriBTSxLIGNqhqqKGfW-oso4AswdOQ2xyjJFQ/pub?output=csv'

function getDirectDriveLink(url) {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`
  }
  return url
}

export async function GET() {
  try {
    const response = await fetch(EXCEL_URL, { cache: 'no-store' })
    if (!response.ok) {
      throw new Error('Failed to fetch Excel file')
    }
    const arrayBuffer = await response.arrayBuffer()

    const workbook = XLSX.read(arrayBuffer, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const cars = XLSX.utils.sheet_to_json(worksheet)

    const formattedCars = cars.map((car, index) => ({
      id: car.id || index + 1,
      image: car.imageUrl
        ? getDirectDriveLink(car.imageUrl)
        : 'https://your-cdn.com/cars/default.jpg',
      brand: car.brand || 'BMW',
      model: car.model || 'Unknown Model',
      year: car.year || 2023,
      transmission: car.transmission || 'Automatic',
      kmDriven: `${car.km || 0} ${car.kmUnit || 'km'}`,
    }))

    return NextResponse.json(formattedCars, {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('Error fetching or parsing Excel:', error)
    return NextResponse.json({ error: 'Failed to load cars' }, { status: 500 })
  }
}
