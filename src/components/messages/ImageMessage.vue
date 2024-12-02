<script setup>
const { message } = defineProps({
  message: {
    type: Object,
    default: () => {},
  },
})
</script>

<template>
  <img :src="message.message.multimedia.file" alt="" />
</template>
