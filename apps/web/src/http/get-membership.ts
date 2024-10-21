import type { Role } from '@bonassa/auth'

import { api } from './api-client'

interface GetMembershipRequest {
  organizationSlug: string
}

interface GetMembershipResponse {
  membership: {
    id: string
    organizationId: string
    userId: string
    role: Role
  }
}

export async function getMembership({
  organizationSlug,
}: GetMembershipRequest): Promise<GetMembershipResponse> {
  const result = await api
    .get(`organizations/${organizationSlug}/membership`)
    .json<GetMembershipResponse>()

  return result
}
