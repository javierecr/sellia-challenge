<script setup>
defineProps({
  client: {
    type: Object,
    default: () => null,
  },
  mediaCount: {
    type: Number,
    default: () => 0,
  },
})
</script>
<template>
  <div class="border-l border-gray-200 dark:border-slate-500 text-center p-6 relative">
    <h1 class="text-2xl">{{ client?.name }}</h1>
    <p class="opacity-50">
      <small>{{ client?._id }}</small>
    </p>
    <div class="p-6">Multimedia: {{ mediaCount }}</div>
  </div>
</template>
