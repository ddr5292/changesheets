// app/dashboard/page.js
import ClientAuthWrapper from '../../components/ClientAuthWrapper'

export default function DashboardPage() {
  return (
    <ClientAuthWrapper>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="mb-4">Here's an overview of your recent activity and upcoming meetings.</p>
        
        {/* Add more dashboard content here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
            {/* Add recent activity content */}
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Upcoming Meetings</h2>
            {/* Add upcoming meetings content */}
          </div>
        </div>
      </div>
    </ClientAuthWrapper>
  )
}
