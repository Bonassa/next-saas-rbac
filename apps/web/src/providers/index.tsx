'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { queryClient } from '@/lib/react-query'

type ProvidersType = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersType) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
