import DashboardNavbar from '@/components/layout/dashboard/Navbar'

import theme from '@/styles/theme'
import { ThemeProvider } from '@mui/material'
import { Inter } from 'next/font/google'
import React, { Suspense } from 'react'
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
          padding: 0,
          // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1);'
        }}
        >
          <Suspense fallback={<p>...Loading</p>}>
          <DashboardNavbar>
            {children}
          </DashboardNavbar>
          </Suspense>
        </body>
      </ThemeProvider>
    </html>

  )
}
