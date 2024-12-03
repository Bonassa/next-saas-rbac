import { XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getCurrentOrgSlug } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { shutdownOrganization } from '@/http/shutdown-organization'

async function shutdownOrganizationAction() {
  'use server'

  const currentOrg = getCurrentOrgSlug()

  await shutdownOrganization({ org: currentOrg! })

  redirect('/')
}

export function ShutdownOrganizationButton() {
  return (
    <form action={shutdownOrganizationAction}>
      <Button type="submit" className="w-56" variant="destructive">
        <XCircle className="mr-2 size-4" />
        Shutdown organization
      </Button>
    </form>
  )
}
