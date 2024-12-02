<script setup>
import { getMessagesByClientId } from '@/composables/fetch'
import { useToggle } from '@vueuse/core'
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const clients = inject('clients')
const showChats = inject('showChats')

const selectedClient = ref(null)
const messages = ref([])
const showInfo = ref(false)
const conversation = ref(null)

const route = useRoute()

const toggleInfo = useToggle(showInfo)

onMounted(async () => {
  getMessages(route.params.id)
})

watch(
  () => route.params.id,
  (newId) => {
    getMessages(newId)
  },
)

async function getMessages(id) {
  showInfo.value = false

  try {
    const response = await getMessagesByClientId(id)
    messages.value = response
  } catch (error) {
    console.error('Error fetching messages:', error)
    messages.value = []
  }

  nextTick(() => {
    selectedClient.value = clients.value?.find((client) => client._id === id)
    scrollToBottom()
  })
}

const getMediaCount = computed(() => {
  return messages.value.filter((message) =>
    ['image', 'video', 'document'].includes(message.message.type),
  ).length
})

function addMessage(message) {
  messages.value.push({
    _id: crypto.randomUUID(),
    type: 'Message',
    client: selectedClient.value?.id,
    message: {
      _id: '629f7eb0a45b194cb551c58c',
      type: 'text',
      text: message,
      typeUser: 'UserSystem',
      user: '629e39e8b2d31319081e0650',
      errorCode: null,
      createdAt: new Date().toISOString(),
    },
    createdAt: new Date().toISOString(),
  })

  nextTick(() => {
    scrollToBottom()
  })
}

function scrollToBottom() {
  if (conversation.value) {
    conversation.value.scrollTop = conversation.value.scrollHeight
  }
}
</script>

<template>
  <Transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    enter-active-class="ease-out duration-300"
    leave-active-class="display-none"
  >
    <div
      v-if="messages.length"
      class="grid min-h-0"
      :class="{ 'hide-chat': showChats }"
      :style="{ gridTemplateColumns: showInfo ? '1fr minmax(0, 300px)' : '1fr' }"
    >
      <div
        class="grid grid-rows-auto-1-auto min-h-0 divide-y divide-gray-200 dark:divide-slate-500"
      >
        <ChatHeader @toggle-info="toggleInfo()" :selectedClient="selectedClient" />
        <div ref="conversation" class="p-4 h-full min-h-0 overflow-y-auto">
          <ul v-if="messages.length" class="flex flex-col gap-4 items-start">
            <MessageItem v-for="message in messages" :key="message._id" :message="message">
              <template #image v-if="message.message.type === 'image'">
                <ImageMessage :message="message" />
              </template>
              <template #video v-else-if="message.message.type === 'video'">
                <VideoMessage :message="message" />
              </template>
              <template #document v-else-if="message.message.type === 'document'">
                <DocumentMessage :message="message" />
              </template>
              <template #text v-else>
                <p>{{ message.message.text }}</p>
              </template>
            </MessageItem>
          </ul>
        </div>
        <SendMessage @send-message="addMessage" />
      </div>
      <ConversationInfo :client="selectedClient" :mediaCount="getMediaCount" v-if="showInfo" />
    </div>
  </Transition>
</template>

<style scoped>
@media (max-width: 639px) {
  .hide-chat {
    display: none;
  }
}
</style>
