<script setup>
defineProps({
  clients: {
    type: Array,
    default: () => [],
  },
  selectedClientId: {
    type: String,
    default: () => null,
  },
})
</script>

<template>
  <aside v-if="clients.length" class="border-r border-b border-gray-200 dark:border-slate-500">
    <ul
      class="divide-y divide-gray-200 dark:divide-slate-500 border-b border-gray-200 dark:border-slate-500"
    >
      <RouterLink
        v-for="client in clients"
        :key="client._id"
        :to="`/chats/${client._id}`"
        :active-class="'bg-gray-100 dark:bg-slate-500 font-bold'"
        :active="selectedClientId === client._id"
        :class="[
          'px-4 py-8 flex text-large text-slate-800 dark:text-white  hover:bg-gray-100 hover:text-slate-800 transition-none cursor-pointer',
        ]"
      >
        <li @click="$emit('select-client')">
          <p>{{ client.name }}</p>
        </li>
      </RouterLink>
    </ul>
  </aside>
</template>
