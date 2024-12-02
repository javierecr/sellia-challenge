<script setup>
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
defineProps({
  selectedClient: {
    type: Object,
    default: () => null,
  },
})
</script>

<template>
  <div class="p-4 flex justify-between items-center">
    <div>
      <h1 class="font-bold">{{ selectedClient?.name || 'No client selected' }}</h1>
      <p class="opacity-50">
        <small>{{ selectedClient?._id }}</small>
      </p>
    </div>
    <button @click="$emit('toggle-info')">
      <InformationCircleIcon class="size-7" />
    </button>
  </div>
</template>
