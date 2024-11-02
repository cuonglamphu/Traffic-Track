import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Path to the visitor count file
const visitorPath = path.join(process.cwd(), 'visitors.json')

// Helper function to read/write visitor count
async function getVisitorCount() {
  try {
    const data = await fs.readFile(visitorPath, 'utf8')
    return JSON.parse(data).count
  } catch {
    // If file doesn't exist, create it with initial count of 0
    await fs.writeFile(visitorPath, JSON.stringify({ count: 0 }))
    return 0
  }
}

// GET endpoint to retrieve current count
export async function GET() {
  const count = await getVisitorCount()
  return NextResponse.json({ count })
}

// POST endpoint to increment count
export async function POST() {
  try {
    const currentCount = await getVisitorCount()
    const newCount = currentCount + 1
    await fs.writeFile(visitorPath, JSON.stringify({ count: newCount }))
    return NextResponse.json({ count: newCount })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update visitor count' },
      { status: 500 }
    )
  }
} 