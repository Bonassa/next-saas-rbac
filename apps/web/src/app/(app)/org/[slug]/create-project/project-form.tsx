'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/useFormState'
import { queryClient } from '@/lib/react-query'

import { createProjectAction } from './actions'

export function ProjectForm() {
  const { slug: orgSlug } = useParams<{ slug: string }>()

  const [formState, handleSignUp, isPending] = useFormState({
    action: createProjectAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [orgSlug, 'projects'],
      })
    },
  })

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      {formState.success === false && formState.message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save project failed!</AlertTitle>
          <AlertDescription>
            <p>{formState.message}</p>
          </AlertDescription>
        </Alert>
      )}

      {formState.success === true && formState.message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{formState.message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Project name</Label>
        <Input name="name" type="name" id="name" />

        {formState.errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {formState.errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" />

        {formState.errors?.description && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {formState.errors.description[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save project'
        )}
      </Button>
    </form>
  )
}
