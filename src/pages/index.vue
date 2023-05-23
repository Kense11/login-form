<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { useLoginUserMutation } from '~/mutations/loginUserMutation'
import type { Props as TheInputProps } from '~/components/TheInput.vue'

const staticInputsData: Array<TheInputProps> = [
  { name: 'email', type: 'email', label: 'Email', placeholder: 'Your email address', autocomplete: 'email', successMessage: 'Got it, we won\'t spam you!' },
  { name: 'password', type: 'password', label: 'Password', placeholder: 'Your password', autocomplete: 'off', successMessage: 'Nice and secure!' },
  { name: 'confirmPassword', type: 'password', label: 'Confirm password', placeholder: 'Type it again', autocomplete: 'off', successMessage: 'Glad you remembered it!' },
]

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().nonempty('Email is required').email({ message: 'Must be a valid email' }),
    password: zod.string().nonempty('Password is required').min(32, { message: 'Password is too short' }),
    confirmPassword: zod.string().nonempty('Password confirmation is required'),
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords don\'t match',
    path: ['confirmPassword'],
  }),
)

const { handleSubmit, isSubmitting, setFieldError } = useForm({
  validationSchema,
})

const router = useRouter()

const loginUserMutation = useLoginUserMutation()

const { user } = useUser()

const onSubmit = handleSubmit(async ({ email, password }) => {
  try {
    user.value = await loginUserMutation.mutateAsync({ email, password })

    router.push({
      name: 'welcome',
    })
  }
  catch (error) {
    setFieldError('password', error as string)
  }
})
</script>

<template>
  <div>
    <div flex="~ 1 col" justify-center p="x-6 y-12 lg:x-8">
      <div sm="mx-auto max-w-sm w-full">
        <div i-carbon-campsite inline-block text-4xl />

        <h2 mt-10 text="cetner 2xl" font-bold leading-9 tracking-tight>
          Sign in to your account
        </h2>

        <form mt-10 text-start space-y-6 @submit="onSubmit">
          <TheInput v-for="item in staticInputsData" :key="item.name" v-bind="item" />

          <button :disabled="isSubmitting" w-full text-lg btn>
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<route>
  {
    name: "login",
  }
</route>
