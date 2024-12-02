<script setup>
import { PaperAirplaneIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
const emit = defineEmits(['send-message'])

// Reactive ref for messages

// Reactive ref for the form input
const newMessage = ref('')

const addMessage = () => {
  if (newMessage.value.trim() === '') return // Avoid adding empty messages

  emit('send-message', newMessage.value)
  newMessage.value = ''
}
</script>

<template>
  <form
    @submit.prevent="addMessage"
    class="grid grid-cols-1-auto gap-3 items-center bg-white dark:bg-slate-700 p-4"
  >
    <input
      type="text"
      v-model="newMessage"
      placeholder="Type your message..."
      class="border rounded-full bg-white dark:bg-slate-500 dark:border-slate-500 dark:text-white outline-slate-500 outline-0 focus:outline-1 p-3 w-full placeholder:text-slate-800 dark:placeholder:text-white placeholder:opacity-80"
    />
    <button
      type="submit"
      class="bg-emerald-400 text-white px-6 py-3 rounded-full leading-4 disabled:opacity-50"
      :disabled="!newMessage || newMessage.trim() === ''"
    >
      <PaperAirplaneIcon class="size-5 text" aria-hidden="true" />
    </button>
  </form>
</template>
