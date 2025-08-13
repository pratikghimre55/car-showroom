import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

// Replace with your Excel sheet URL (e.g., Google Drive, Dropbox, Vercel Blob)
const EXCEL_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTC3QYuir-WvApB-RQ1UxQR4JM1edUDHClqntO1T9eYriBTSxLIGNqhqqKGfW-oso4AswdOQ2xyjJFQ/pub?output=csv'

export async function GET() {
  try {
    // Fetch Excel file
    const response = await fetch(EXCEL_URL, { cache: 'no-store' })
    if (!response.ok) {
      throw new Error('Failed to fetch Excel file')
    }
    const arrayBuffer = await response.arrayBuffer()

    // Parse Excel file
    const workbook = XLSX.read(arrayBuffer, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const cars = XLSX.utils.sheet_to_json(worksheet)

    // Format data to match CarList expectations
    const formattedCars = cars.map((car, index) => ({
      id: car.id || index + 1,
      image: car.imageUrl || 'https://your-cdn.com/cars/bmw-m5-default.jpg', // Map imageUrl to image
      brand: car.brand || 'BMW',
      model: car.model || 'Unknown Model',
      year: car.year || 2023,
      transmission: car.transmission || 'Automatic',
      kmDriven: `${car.km || 0} ${car.kmUnit || 'km'}`, // Combine km and kmUnit
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

export async function POST() {
  try {
    await import('next/cache').then(({ revalidatePath }) => revalidatePath('/api/cars'))
    return NextResponse.json({ message: 'Cache revalidated' })
  } catch (error) {
    console.error('Error revalidating cache:', error)
    return NextResponse.json({ error: 'Failed to revalidate cache' }, { status: 500 })
  }
}