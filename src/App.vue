<script setup>
import { onMounted, provide, ref } from 'vue'
import { getClients } from './composables/fetch'

const clients = ref([])

provide('clients', clients)

onMounted(async () => {
  try {
    clients.value = await getClients(
      'https://sellia-files.s3.us-east-2.amazonaws.com/challenge/clients.json',
    )
  } catch (error) {
    console.error('Error fetching clients:', error)
  }
})
</script>

<template>
  <RouterView />
</template>
