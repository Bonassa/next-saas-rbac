import { env } from '@bonassa/env'
import { getCookie } from 'cookies-next'
import type { CookiesFn } from 'cookies-next/lib/types'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const isExecutingOnServer = typeof window === 'undefined'
        let cookieStore: CookiesFn | undefined

        if (isExecutingOnServer) {
          const { cookies: serverCookies } = await import('next/headers')
          cookieStore = serverCookies
        }

        const token = getCookie('token', { cookies: cookieStore })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
