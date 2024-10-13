// app/layout.js
import '../styles/globals.css'
import { AuthWrapper } from '../components/AuthWrapper'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  )
}