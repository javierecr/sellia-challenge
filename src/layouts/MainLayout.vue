<script setup>
import { useToggle } from '@vueuse/core'
import { inject, provide, ref } from 'vue'

const selectedClient = ref(null)
const showChats = ref(false)
const toggleChats = useToggle(showChats)

provide('selectedClient', selectedClient)
provide('showChats', showChats)

const clients = inject('clients')
</script>

<template>
  <div
    class="md:max-w-screen-2xl w-full md:mx-auto bg-white dark:bg-slate-800 grid min-h-0 md:rounded-lg md:border border-gray-200 dark:border-slate-500 overflow-hidden"
  >
    <AppHeader @toggle-chats="toggleChats()" :showChats="showChats" />
    <main
      class="grid border-t border-gray-200 dark:border-slate-500 min-h-0 main-container"
      :class="{ showChats }"
    >
      <ConversationsMenu
        :clients="clients"
        :selectedClientId="selectedClient?._id"
        class="chats-list overflow-hidden"
        :class="{ show: showChats }"
        @select-client="toggleChats()"
      />
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.main-container {
  grid-template-columns: minmax(0, 300px) 1fr;
}

@media (max-width: 639px) {
  .chats-list:not(.show) {
    display: none;
  }
  .main-container:not(.show-chats) {
    grid-template-columns: 1fr;
  }
}
</style>
