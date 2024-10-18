// app/api/meetings/route.js
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
import { getGoogleCalendarEvents } from '@/lib/googleCalendar'

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Fetch Google Calendar events
    const googleEvents = await getGoogleCalendarEvents(session.accessToken)
    
    // Fetch meetings from Prisma
    const prismaMeetings = await prisma.meeting.findMany({
      where: {
        userId: session.user.id
      }
    })

    // Normalize the data structure
    const normalizedGoogleEvents = googleEvents.map(event => ({
      id: event.id,
      title: event.summary,
      dateTime: event.start.dateTime || event.start.date,
      source: 'google'
    }))

    const normalizedPrismaMeetings = prismaMeetings.map(meeting => ({
      id: meeting.id,
      title: meeting.title,
      dateTime: meeting.dateTime.toISOString(),
      source: 'prisma'
    }))

    // Combine and sort all meetings
    const allMeetings = [...normalizedGoogleEvents, ...normalizedPrismaMeetings].sort(
      (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
    )

    return new Response(JSON.stringify(allMeetings), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in /api/meetings:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
