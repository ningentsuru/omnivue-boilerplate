import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref<number>(0)
  const max = ref<number>(0)
  const min = ref<number>(0)

  function setMaxCount(number: number) {
    max.value = number
  }

  function setMinCount(number: number) {
    min.value = number
  }

  function increment() {
    if (count.value >= max.value) return (count.value = max.value)
    count.value++
  }

  function decrement() {
    if (count.value <= min.value) return (count.value = min.value)
    count.value--
  }

  function reset() {
    count.value = 0
  }

  return { count, max, min, setMaxCount, setMinCount, increment, decrement, reset }
})
