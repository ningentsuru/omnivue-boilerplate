<script setup lang="ts">
import { ref, triggerRef } from 'vue'
import { useVirtualList } from '@vueuse/core'

const allItems = Array.from({ length: 1000000 }, (_, i) => ({
  id: i + 1,
  label: `Item ${i + 1}`,
  note: '',
}))

const selectedId = ref<number | null>(null)
const searchInput = ref<string>('')
const addNote = ref<string[]>([''])

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(allItems, {
  itemHeight: 50,
  overscan: 5,
})

function handleSearch() {
  const id = parseInt(searchInput.value, 10)
  if (!isNaN(id) && id > 0 && id <= allItems.length) {
    selectedId.value = id
    scrollTo(id - 1)
  }
}

function handleUpdateNote(id: number) {
  const item = list.value.find((it) => it && it.data && it.data.id === id)
  if (item) {
    item.data.note = addNote.value[id]?.trim() ?? ''
    triggerRef(list)
  }
}

function clearSelection() {
  selectedId.value = null
  searchInput.value = ''
}
</script>

<template>
  <div
    class="optimized-data-list-view flex flex-col gap-4 px-4"
    data-testid="optimized-data-list-view"
  >
    <Card>
      <CardContent>
        <form class="bg-background border-foreground" @submit.prevent="handleSearch">
          <Input
            v-model="searchInput"
            type="number"
            placeholder="Enter ID to jump..."
            class="mb-2 w-full rounded border p-2 [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div class="flex justify-between gap-2 sm:justify-end">
            <Button type="submit" variant="outline" class="cursor-pointer rounded px-4 py-2">
              Search / Focus
            </Button>
            <Button
              type="button"
              variant="destructive"
              @click="clearSelection"
              class="cursor-pointer rounded px-4 py-2"
            >
              Remove Selection
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <div
          v-bind="containerProps"
          class="scrollbar-width-none h-[calc(54vh-var(--mobile-safe-area-inset-top))] overflow-y-auto [&::-webkit-scrollbar]:hidden"
        >
          <div v-bind="wrapperProps">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Label</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for="item in list"
                  :key="item.data.id"
                  :class="{ 'bg-muted/50': item.data.id === selectedId }"
                  style="height: 50px"
                >
                  <TableCell>{{ item.data.id }}</TableCell>
                  <TableCell>{{ item.data.label }}</TableCell>
                  <TableCell>
                    <div v-if="item.data.note" class="item-center flex gap-4">
                      <Input v-model="item.data.note" class="pointer-events-none" readonly />
                      <Button
                        variant="outline"
                        class="cursor-pointer"
                        @click.prevent="item.data.note = ''"
                      >
                        Edit notes
                      </Button>
                    </div>
                    <form
                      v-else
                      class="flex items-center gap-4"
                      @submit.prevent="handleUpdateNote(item.data.id)"
                    >
                      <Input v-model="addNote[item.data.id]" />
                      <Button
                        type="submit"
                        variant="outline"
                        class="cursor-pointer"
                        :disabled="!addNote[item.data.id]"
                      >
                        Add notes
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        Virtual scrolling renders only the visible items on your screen instead of all 1,000,000
        nodes. It creates the illusion of a full list by maintaining the correct scrollbar height,
        while keeping the actual DOM lightweight (e.g., ~50 items) to ensure smooth performance and
        prevent browser crashes.
      </CardContent>
    </Card>
    <span class="sr-only">optimized-data-list-view</span>
  </div>
</template>
