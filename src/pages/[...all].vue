<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div>
    Not Found
  </div>

  <button
    m-3 mt-8 text-sm btn @click="router.push({
      name: 'welcome',
    })"
  >
    Go to homepage
  </button>
</template>
