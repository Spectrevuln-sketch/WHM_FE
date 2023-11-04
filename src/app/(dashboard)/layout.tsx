import DashboardNavbar from '@/components/layout/dashboard/Navbar'
import theme from '@/styles/theme'
import { ThemeProvider } from '@mui/material'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard',
  description: '',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body
        className={inter.className}
        style={{
          margin: 0,
          padding: 0
        }}
        >
          <DashboardNavbar>
            {children}
          </DashboardNavbar>
        </body>
      </ThemeProvider>
    </html>
  )
}
