// app/api/meetings/route.js
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { getGoogleCalendarEvents } from '../../../lib/googleCalendar'
import { supabase } from '../../../lib/db'

export async function GET(req) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    // Fetch Google Calendar events
    const googleEvents = await getGoogleCalendarEvents(session.accessToken)

    // Fetch meetings from Supabase
    const { data: supabaseMeetings, error } = await supabase
      .from('meetings')
      .select('*')
      .eq('user_id', session.user.id)

    if (error) throw error

    // Combine and sort all meetings
    const allMeetings = [...googleEvents, ...supabaseMeetings].sort(
      (a, b) => new Date(a.start.dateTime || a.date_time) - new Date(b.start.dateTime || b.date_time)
    )

    return new Response(JSON.stringify(allMeetings), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}