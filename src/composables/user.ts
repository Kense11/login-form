export interface User {
  firstName: string
  lastName: string
  email: string
}

const user = ref<User | null>(null)

export function useUser() {
  const isLoggedIn = computed(() => !!user.value)

  const fullName = computed(() => `${user.value?.firstName} ${user.value?.lastName}`)

  return {
    isLoggedIn,
    user,
    fullName,
  }
}
