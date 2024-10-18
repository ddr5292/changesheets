// components/Sidebar.js
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { format, parseISO, isValid } from 'date-fns'

export default function Sidebar() {
  const [meetings, setMeetings] = useState([])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      fetchMeetings()
    }
  }, [session])

  const fetchMeetings = async () => {
    try {
      const response = await fetch('/api/meetings')
      const data = await response.json()
      setMeetings(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching meetings:', error)
      setMeetings([])
    }
  }

  const formatDate = (dateString) => {
    const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString)
    return isValid(date) ? format(date, 'MMM d, yyyy h:mm a') : 'Invalid Date'
  }

  return (
    <div className={`bg-gray-100 text-gray-800 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <button
        className="p-4 hover:bg-gray-200 w-full text-left"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? '>' : '<'}
      </button>
      <div className="overflow-y-auto h-full">
        {Array.isArray(meetings) && meetings.length > 0 ? (
          meetings.map((meeting) => (
            <div key={meeting.id} className="p-4 hover:bg-gray-200">
              {!isCollapsed && (
                <>
                  <div className="font-bold">{meeting.title}</div>
                  <div className="text-sm text-gray-600">{formatDate(meeting.dateTime)}</div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="p-4 text-gray-600">No meetings found</div>
        )}
      </div>
    </div>
  )
}
