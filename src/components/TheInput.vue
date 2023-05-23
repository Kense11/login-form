<script setup lang="ts">
import { useField } from 'vee-validate'

export interface Props {
  name: string
  label: string
  placeholder: string
  type?: 'text' | 'password' | 'email'
  autocomplete?: 'true' | 'false'
}

const { name, label, placeholder, type = 'text', autocomplete = 'false' } = defineProps<Props>()

const { errorMessage, value } = useField(name)
</script>

<template>
  <label :for="name">{{ label }}</label>

  <input
    v-model="value"
    :type="type"
    :name="name"
    :autocomplete="autocomplete"
    :placeholder="placeholder"
    p="x-4 y-2"
    w="250px"
    text="center"
    bg="transparent"
    border="~ rounded gray-200 dark:gray-700"
    outline="none active:none"
  >

  <span>{{ errorMessage }}</span>
</template>
