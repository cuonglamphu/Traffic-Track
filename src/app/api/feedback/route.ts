import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { restaurantId, feedbackData } = body
    
    // Create feedback object with timestamp
    const feedback = {
      restaurantId,
      feedbackData,
      timestamp: new Date().toISOString()
    }
    
    // Read existing feedback
    const fs = require('fs')
    const path = require('path')
    const feedbackPath = path.join(process.cwd(), 'feedback.json')
    
    let feedbacks = []
    if (fs.existsSync(feedbackPath)) {
      const data = fs.readFileSync(feedbackPath, 'utf8')
      feedbacks = JSON.parse(data)
    }
    
    // Add new feedback and write back to file
    feedbacks.push(feedback)
    fs.writeFileSync(feedbackPath, JSON.stringify(feedbacks, null, 2))
    
    return NextResponse.json({ message: 'Feedback received' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 })
  }
}