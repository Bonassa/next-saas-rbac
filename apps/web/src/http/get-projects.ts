import { api } from './api-client'

interface GetProjectsResponse {
  projects: Array<{
    description: string
    slug: string
    id: string
    name: string
    avatarUrl: string | null
    organizationId: string
    ownerId: string
    createdAt: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
    }
  }>
}

export async function getProjects(
  orgSlug: string,
): Promise<GetProjectsResponse> {
  const result = await api
    .get(`organization/${orgSlug}/projects`)
    .json<GetProjectsResponse>()

  return result
}
