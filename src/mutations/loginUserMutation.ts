import { useMutation } from '@tanstack/vue-query'
import type { User } from '~/composables'
import { correctMockPassword } from '~/utils/constants'
import { delayAsyncFunction } from '~/utils/delayAsyncFunction'

export interface LoginUserMutationParameters {
  email: string
  password: string
}

async function loginUserApi({ email, password }: LoginUserMutationParameters): Promise<User> {
  await delayAsyncFunction(2000)

  if (password !== correctMockPassword)
    throw new Error('Incorrect password!')

  return {
    firstName: 'Soeren',
    lastName: 'Martius',
    email,
  }
}

export function useLoginUserMutation() {
  return useMutation(
    { mutationFn: loginUserApi },
  )
}
