import type { Role } from '@bonassa/auth'

import { api } from './api-client'

interface UpdateMemberRequest {
  org: string
  memberId: string
  role: Role
}

export async function updateMember({
  org,
  memberId,
  role,
}: UpdateMemberRequest) {
  await api.put(`organization/${org}/members/${memberId}`, {
    json: { role },
  })
}
