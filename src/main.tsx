import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@/context/ThemeContext.tsx'
import { AuthProvider } from '@/context/AuthContext.tsx'
import { Toaster } from "@/components/ui/sonner"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <div className='w-full xs:w-4/5 xs:mx-auto'>
          <App />
          <Toaster position='top-center' />
        </div>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
