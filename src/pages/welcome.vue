<script setup lang="ts">
const { fullName, user } = useUser()
const router = useRouter()

function logout() {
  user.value = null

  router.push({
    name: 'login',
  })
}
</script>

<template>
  <div>
    <div i-carbon-campsite inline-block text-4xl />

    <div py-4 />
    Hi, {{ fullName }}! Welcome to the app!
    <div />

    <button
      m-3 mt-8 text-sm btn @click="logout"
    >
      Log out
    </button>
  </div>
</template>

<route>
  {
    meta: {
      requiresAuth: true
    }
  }
</route>
