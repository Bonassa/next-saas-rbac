import { type FormEvent, useState, useTransition } from 'react'

interface IFormData {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

interface IUseFormState {
  action: (data: FormData) => Promise<IFormData>
  onSuccess?: () => Promise<void> | void
  initialState?: IFormData
}

export function useFormState({
  action,
  onSuccess,
  initialState = {
    success: true,
    message: null,
    errors: null,
  },
}: IUseFormState) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(initialState)

  async function callAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const response = await action(data)

      if (response.success && onSuccess) {
        await onSuccess()
      }

      setFormState(response)
    })
  }

  return [formState, callAction, isPending] as const
}
