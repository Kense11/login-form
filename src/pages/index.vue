<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { useLoginUserMutation } from '~/mutations/loginUserMutation'

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().nonempty('This is required').email({ message: 'Must be a valid email' }),
    password: zod.string().nonempty('This is required').min(5, { message: 'Too short' }),
    confirmPassword: zod.string().nonempty('This is required'),
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
    <div i-carbon-campsite inline-block text-4xl />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>

    <div py-4 />

    <form @submit="onSubmit">
      <TheInput name="email" type="email" label="E - mail" placeholder="Your email address" autocomplete="true" />

      <TheInput name="password" type="password" label="Password" placeholder="Your password" />

      <TheInput name="confirmPassword" type="password" label="Confirm password" placeholder="Type it again" />

      <button :disabled="isSubmitting" class="m-3 text-sm btn">
        Submit
      </button>
    </form>
  </div>
</template>

<route>
  {
    name: "login",
  }
</route>
