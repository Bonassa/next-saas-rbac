import { z } from 'zod'

export const rolesSchema = z.enum(['ADMIN', 'MEMBER', 'BILLING'])

export type Role = z.infer<typeof rolesSchema>
