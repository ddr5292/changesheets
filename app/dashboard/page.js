// app/dashboard/page.js
import '../../styles/globals.css'  // Update the import path
import ClientAuthWrapper from '../../components/ClientAuthWrapper'

export default function DashboardPage() {
  return (
    <ClientAuthWrapper>
      {/* Your dashboard content */}
    </ClientAuthWrapper>
  )
}
