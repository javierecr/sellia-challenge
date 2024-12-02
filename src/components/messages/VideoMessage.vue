<script setup>
const { message } = defineProps({
  message: {
    type: Object,
    default: () => {},
  },
})
</script>

<template>
  <video width="320" height="240" controls>
    <source :src="message.message.multimedia.file" :type="message.message.multimedia.mimetype" />
    Your browser does not support the video tag.
  </video>
</template>
