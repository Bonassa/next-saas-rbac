import { api } from './api-client'

interface UpdateOrganizationRequest {
  slug: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

type UpdateOrganizationResponse = void

export async function updateOrganization({
  slug,
  name,
  domain,
  shouldAttachUsersByDomain,
}: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse> {
  await api.put(`organization/${slug}`, {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  })
}
