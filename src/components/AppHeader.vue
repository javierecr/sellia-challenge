<template>
  <div class="flex items-center justify-between p-6">
    <button @click="$emit('toggle-chats')" class="sm:hidden px-1 md:px-3 py-2">
      <XMarkIcon v-if="showChats" class="size-5 text" aria-hidden="true" />
      <ChatBubbleOvalLeftEllipsisIcon v-else class="size-5 text" aria-hidden="true" />
    </button>
    <div class="min-w-0">
      <RouterLink
        to="/"
        class="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight inline-block"
      >
        <h1>Logo!</h1>
      </RouterLink>
    </div>
    <Menu as="div" class="relative">
      <MenuButton
        class="inline-flex justify-center items-center md:rounded-md px-1 md:px-3 py-2 md:border border-gray-200 dark:border-slate-500"
      >
        <CogIcon class="size-5 text" aria-hidden="true" />
        <span class="ml-1 mr-4 hidden sm:inline-block"> Settings </span>
        <ChevronDownIcon class="size-5 text hidden sm:inline-block" aria-hidden="true" />
      </MenuButton>

      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute right-0 z-10 py-4 px-2 w-48 origin-top-right rounded-md p-2 shadow-lg focus:outline-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-slate-500"
        >
          <MenuItem as="div" @click="toggleMode" class="cursor-pointer">
            <p>
              Color scheme: <span class="font-bold">{{ mode === 'system' ? 'Auto' : mode }}</span>
            </p>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { ChatBubbleOvalLeftEllipsisIcon, CogIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useDark, usePreferredDark, useStorage } from '@vueuse/core'
import { watch } from 'vue'

defineProps({
  showChats: {
    type: Boolean,
    default: () => false,
  },
})

const preferredDark = usePreferredDark()
const isDark = useDark({
  storageKey: 'vueuse-color-scheme', // Key in localStorage
  valueDark: 'dark', // Class for dark mode
  valueLight: 'light', // Class for light mode
})
const mode = useStorage('color-scheme-mode', 'system')

watch(mode, (value) => {
  if (value === 'system') {
    isDark.value = preferredDark.value
  } else {
    isDark.value = value === 'dark'
  }
})

function toggleMode(event) {
  event.preventDefault()

  if (mode.value === 'light') {
    mode.value = 'dark'
  } else if (mode.value === 'dark') {
    mode.value = 'system'
  } else {
    mode.value = 'light'
  }
}
</script>
