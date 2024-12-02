<script setup>
import { DocumentArrowDownIcon } from '@heroicons/vue/20/solid'

const { message } = defineProps({
  message: {
    type: Object,
    default: () => {},
  },
})

const fileName = message.message.multimedia.file.split('/').pop()

function downloadFile() {
  const fileUrl = message.message.multimedia.file // Replace with your file URL

  // Create a temporary anchor element
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = fileName // Set the file name
  link.target = '_blank' // Open in a new tab (optional)
  document.body.appendChild(link) // Append to the DOM
  link.click() // Trigger the download
  document.body.removeChild(link) // Clean up the DOM
}
</script>

<template>
  <div
    class="flex justify-start items-center gap-4 p-4 rounded-2xl border bg-gray-100 dark:bg-slate-700 dark:border-slate-700"
  >
    <p>{{ fileName }}</p>
    <button
      class="rounded-full py-3 px-5 border border-gray-200 bg-white dark:bg-slate-500 dark:border-slate-300 flex gap-2 justify-start items-center"
      @click="downloadFile"
    >
      <DocumentArrowDownIcon class="-mr-1 ml-1.5 size-5 text" aria-hidden="true" />
      Download
    </button>
  </div>
</template>
