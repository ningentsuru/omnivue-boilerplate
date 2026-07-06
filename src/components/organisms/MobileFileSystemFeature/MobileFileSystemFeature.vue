<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNativeFeatures } from '@/composables/useNativeFeatures'

const {
  saveFilePrivate,
  deleteFileByName,
  shareFileFromPrivate,
  getSavedFiles,
  readFileContent,
  getFileDate,
} = useNativeFeatures()

const fileName = ref('')
const content = ref('')
const fileStatus = ref('')
const savedFiles = ref<{ name: string; content: string; date: string }[]>([])

const loadFilesTable = async () => {
  const files = await getSavedFiles()
  const fileList: { name: string; content: string; date: string }[] = []

  for (const file of files) {
    if (file.name.endsWith('.txt')) {
      const content = await readFileContent(file.name)

      const date = await getFileDate(file.name)

      fileList.push({
        name: file.name,
        content: typeof content === 'string' ? content : 'Binary content',
        date,
      })
    }
  }
  savedFiles.value = fileList.sort((a, b) => b.date.localeCompare(a.date))
}

const handleSaveFile = async () => {
  fileStatus.value = '💾 Saving privately...'
  const safeFileName = fileName.value.endsWith('.txt') ? fileName.value : `${fileName.value}.txt`
  const uri = await saveFilePrivate(safeFileName, content.value)

  if (uri) {
    fileStatus.value = '✅ Saved privately. Opening share menu...'
    fileName.value = ''
    content.value = ''
    await loadFilesTable()
  } else {
    fileStatus.value = '❌ Failed to save privately.'
  }
}

const handleDeleteFile = async (fileName: string) => {
  if (!confirm(`Are you sure you want to delete ${fileName}?`)) return

  const success = await deleteFileByName(fileName)
  if (success) {
    fileStatus.value = `🗑️ Deleted ${fileName}`
    await loadFilesTable()
  } else {
    fileStatus.value = `❌ Failed to delete ${fileName}`
  }
}

const handleShareFile = async (fileName: string) => {
  const success = await shareFileFromPrivate(fileName)
  if (success) {
    fileStatus.value = `✅ Shared ${fileName}`
  } else {
    fileStatus.value = `❌ Failed to share ${fileName}`
  }
}

onMounted(async () => {
  await loadFilesTable()
})
</script>

<template>
  <div class="mobile-file-system-feature">
    <form class="flex flex-col gap-4" @submit.prevent="handleSaveFile">
      <div class="flex flex-col space-y-1.5">
        <Label for="file-name">File name:</Label>
        <Input id="file-name" v-model="fileName" placeholder="Enter your file name" required />
      </div>
      <div class="flex flex-col space-y-1.5">
        <Label for="content">Contents:</Label>
        <Textarea
          id="content"
          v-model="content"
          placeholder="Type anything here and generate it later."
          required
        />
      </div>
      <Button type="submit" class="rounded bg-purple-500 p-2 text-white"> 💾 Save </Button>
    </form>
    <p class="text-sm text-gray-600">{{ fileStatus }}</p>

    <div class="mt-6">
      <h2 class="mb-2 text-xl font-semibold">📂 Saved Notes (Private)</h2>
      <div class="overflow-x-auto">
        <Table class="min-w-full rounded border border-gray-300 text-nowrap">
          <TableHeader>
            <TableRow>
              <TableHead class="border-b px-4 py-2 text-left">File Name</TableHead>
              <TableHead class="border-b px-4 py-2 text-left">Saved At</TableHead>
              <TableHead class="border-b px-4 py-2 text-left">Content Preview</TableHead>
              <TableHead class="border-b px-4 py-2 text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="savedFiles.length === 0">
              <TableCell colspan="3" class="px-4 py-4 text-center text-gray-500">
                No files saved yet.
              </TableCell>
            </TableRow>
            <TableRow v-for="file in savedFiles" :key="file.name">
              <TableCell class="border-b px-4 py-2 font-mono text-sm">{{ file.name }}</TableCell>
              <TableCell class="border-b px-4 py-2 text-sm">
                {{ file.date }}
              </TableCell>
              <TableCell class="max-w-xs truncate border-b px-4 py-2 text-sm">
                {{ file.content }}
              </TableCell>
              <TableCell class="flex gap-2 border-b px-4 py-2 text-center">
                <Button
                  @click="handleShareFile(file.name)"
                  class="rounded bg-indigo-500 px-3 py-1 text-xs text-white hover:bg-indigo-600"
                >
                  📤 Share
                </Button>
                <Button
                  @click="handleDeleteFile(file.name)"
                  class="rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                >
                  🗑️ Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>

    <span class="sr-only">mobile-file-system-feature</span>
  </div>
</template>
