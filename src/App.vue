<script setup>
import { onMounted, provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getClients } from './composables/fetch'

const clients = ref([])
const router = useRouter()

provide('clients', clients)

onMounted(async () => {
  try {
    clients.value = await getClients(
      'https://sellia-files.s3.us-east-2.amazonaws.com/challenge/clients.json',
    )
  } catch (error) {
    console.error('Error fetching clients:', error)
  }

  if (clients.value) {
    router.push(`/chats/${clients.value[0]._id}`)
  }
})
</script>

<template>
  <RouterView />
</template>
