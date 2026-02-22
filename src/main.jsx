import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import './i18n'
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.error("Missing VITE_CLERK_PUBLISHABLE_KEY — check your environment variables")
  createRoot(document.getElementById('root')).render(
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0A0A0F', color: 'white', fontFamily: 'system-ui', flexDirection: 'column', gap: '16px', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>⚠️ EchoBoard Configuration Error</h1>
      <p style={{ color: '#8888AA', maxWidth: '500px' }}>Missing <code style={{ background: '#1A1A24', padding: '2px 8px', borderRadius: '4px' }}>VITE_CLERK_PUBLISHABLE_KEY</code> environment variable.</p>
      <p style={{ color: '#8888AA', fontSize: '14px' }}>If you're deploying on Vercel, add it in Settings → Environment Variables and redeploy.</p>
    </div>
  )
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </StrictMode>,
  )
}
