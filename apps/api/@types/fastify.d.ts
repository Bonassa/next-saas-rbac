import 'fastify'

import type { Member, Organization } from '@prisma/client'

interface UserMembership {
  organization: Organization
  membership: Member
}

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
    getUserMembership(slug: string): Promise<UserMembership>
  }
}
