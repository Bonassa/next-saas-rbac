import type { Role } from '@bonassa/auth'

import { api } from './api-client'

interface GetInvitesResponse {
  invites: Array<{
    id: string
    role: Role
    email: string
    createdAt: string
    author: {
      id: string
      name: string | null
    } | null
  }>
}

export async function getInvites(orgSlug: string): Promise<GetInvitesResponse> {
  const result = await api
    .get(`organization/${orgSlug}/invites`, {
      next: {
        tags: [`${orgSlug}/invites`],
      },
    })
    .json<GetInvitesResponse>()

  return result
}
