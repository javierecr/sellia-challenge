<script setup>
import moment from 'moment'

defineProps({
  message: {
    type: Object,
    default: () => {},
  },
})
</script>

<template>
  <li
    :key="message._id"
    :class="['message-content', message.message.typeUser === 'UserSystem' && 'user-system']"
  >
    <slot name="text"> </slot>
    <slot name="image"> </slot>
    <slot name="video"> </slot>
    <slot name="document"> </slot>
    <p class="select-none text-sm opacity-50">
      <small>{{ moment(message.message.createdAt).format('MM/DD/YYYY HH:mm A') }}</small>
    </p>
  </li>
</template>
