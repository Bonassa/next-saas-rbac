import { z } from 'zod'

import { organizationSchema } from './models/organization'
import { projectSchema } from './models/project'

export const projectSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Project'), projectSchema]),
])

export const userSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.literal('User'),
])

export const organizationSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('transfer_ownership'),
  ]),
  z.union([z.literal('Organization'), organizationSchema]),
])

export const inviteSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('delete'),
  ]),
  z.literal('Invite'),
])

export const billingSubject = z.tuple([
  z.union([z.literal('manage'), z.literal('get'), z.literal('export')]),
  z.literal('Billing'),
])

export const defaultSubject = z.tuple([z.literal('manage'), z.literal('all')])

export type ProjectSubject = z.infer<typeof projectSubject>
export type UserSubject = z.infer<typeof userSubject>
export type OrganizationSubject = z.infer<typeof organizationSubject>
export type InviteSubject = z.infer<typeof inviteSubject>
export type BillingSubject = z.infer<typeof billingSubject>
export type DefaultSubject = z.infer<typeof defaultSubject>
