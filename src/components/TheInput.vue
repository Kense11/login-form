<script setup lang="ts">
import { useField } from 'vee-validate'

export interface Props {
  name: string
  label: string
  placeholder: string
  successMessage?: string
  type?: 'text' | 'password' | 'email'
  autocomplete?: string
}

const { name, label, placeholder, successMessage, type = 'text', autocomplete = 'false' } = defineProps<Props>()

const { value, errorMessage, meta, handleBlur } = useField(name)

const showErrorMessage = computed(() => meta.touched && errorMessage.value)
const showSuccessMessage = computed(() => meta.touched && meta.valid && successMessage)
</script>

<template>
  <div>
    <label :for="name" mb-1 block>{{ label }}</label>

    <input
      v-model="value"
      :type="type"
      :name="name"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      bg="transparent"
      border="2 rounded"
      outline="none active:none"
      w-full rounded transition-colors
      duration-700
      p="x-4 y-2"
      :class="{
        'border-gray-200 border-dark:gray-700 focus:border-teal-600 mb-5': !showErrorMessage && !showSuccessMessage,
        'border-red-500 text-red-500': showErrorMessage,
        'border-green-400 text-green-500': showSuccessMessage,
      }"
      @blur="handleBlur"
    >

    <p v-show="showErrorMessage" text="red-500 sm">
      {{ errorMessage }}
    </p>

    <p v-show="showSuccessMessage" text="green-500 sm">
      {{ successMessage }}
    </p>
  </div>
</template>
