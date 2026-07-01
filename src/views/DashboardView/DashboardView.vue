<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
const { count, max, min } = storeToRefs(store)
const { setMaxCount, setMinCount, increment, decrement, reset } = store

const clampValue = (event: Event) => {
  const target = event.target as HTMLInputElement | null

  if (!target) {
    return
  }

  const value = Number(target.value)

  if (Number.isNaN(value)) {
    count.value = 0
    return
  }

  count.value = Math.min(max.value, Math.max(min.value, value))
}

onMounted(() => {
  setMaxCount(Number.MAX_SAFE_INTEGER)
  setMinCount(-Number.MAX_SAFE_INTEGER)
})
</script>

<template>
  <div class="dashboard-view flex flex-col justify-center gap-4">
    <Card>
      <CardHeader>Track your counting {{ Number.MAX_SAFE_INTEGER }}</CardHeader>
      <CardContent>
        <p>
          Count:
          <Input
            v-model.number="count"
            class="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            type="number"
            @input="clampValue"
          />
        </p>
      </CardContent>
      <CardFooter class="flex gap-2">
        <Button @click="increment">Increse 1 count</Button>
        <Button @click="decrement">Decrese 1 count</Button>
        <Button @click="reset">Reset</Button>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader>Abacus Count Display</CardHeader>
      <CardContent>
        <AbacusSoroban :count="Number(count)" />
      </CardContent>
    </Card>
    <span class="sr-only">dashboard-view</span>
  </div>
</template>
