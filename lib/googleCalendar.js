// lib/googleCalendar.js
import { google } from 'googleapis'

export async function getGoogleCalendarEvents(accessToken) {
  if (!accessToken) {
    console.error('No access token provided to getGoogleCalendarEvents');
    throw new Error('Access token is required');
  }

  try {
    const auth = new google.auth.OAuth2()
    auth.setCredentials({ access_token: accessToken })

    const calendar = google.calendar({ version: 'v3', auth })

    console.log('Attempting to fetch Google Calendar events...');
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    })

    console.log(`Successfully fetched ${response.data.items.length} events`);
    return response.data.items
  } catch (error) {
    console.error('Error in getGoogleCalendarEvents:', error);
    throw error;
  }
}
