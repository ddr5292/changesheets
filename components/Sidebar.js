// components/Sidebar.js
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

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
    const response = await fetch('/api/meetings')
    const data = await response.json()
    setMeetings(data)
  }

  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <button
        className="p-4 hover:bg-gray-700 w-full text-left"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? '>' : '<'}
      </button>
      <div className="overflow-y-auto h-full">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="p-4 hover:bg-gray-700">
            {!isCollapsed && (
              <>
                <div className="font-bold">{meeting.title}</div>
                <div className="text-sm">{new Date(meeting.dateTime).toLocaleString()}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}