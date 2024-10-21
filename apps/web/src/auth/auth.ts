import { defineAbilityFor } from '@bonassa/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'

export function isAuthenticated() {
  return Boolean(cookies().get('token')?.value)
}

export function getCurrentOrgSlug() {
  return cookies().get('org')?.value ?? null
}

export async function getCurrentUserMembership() {
  const orgSlug = getCurrentOrgSlug()

  if (!orgSlug) {
    return null
  }

  const { membership } = await getMembership({ organizationSlug: orgSlug })

  return membership
}

export async function ability() {
  const membership = await getCurrentUserMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
