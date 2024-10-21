import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { signInWithGithub } from '@/http/sign-in-with-github'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth code not found.' },
      { status: 400 },
    )
  }

  try {
    const { token } = await signInWithGithub({ code })

    cookies().set('token', token, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/'
    redirectUrl.search = ''

    return NextResponse.redirect(redirectUrl)
  } catch {
    return NextResponse.json(
      { message: 'Github OAuth error.' },
      { status: 400 },
    )
  }
}