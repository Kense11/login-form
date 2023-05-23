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

    <p>
      Hi, {{ fullName }}! Welcome to the app!
    </p>

    <button
      m-3 mt-8 text-sm btn @click="logout"
    >
      Sign out
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
