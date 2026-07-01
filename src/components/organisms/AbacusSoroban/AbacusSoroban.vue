<script setup lang="ts">
import { Cloudy, Mountain } from '@lucide/vue'

interface Props {
  count: number
}
const props = withDefaults(defineProps<Props>(), {
  count: 0,
})

interface RodState {
  heavenActive: boolean
  earthCount: number
}
const abacusLayout = computed<RodState[]>(() =>
  Array.from({ length: Math.abs(props.count).toString().length }, () => ({
    heavenActive: false,
    earthCount: 0,
  })),
)

const updateAbacus = (val: number) => {
  const absVal = Math.abs(val)
  const digits = absVal.toString().split('').map(Number)

  abacusLayout.value.forEach((rod) => {
    rod.heavenActive = false
    rod.earthCount = 0
  })

  digits.forEach((digit, indexFromLeft) => {
    if (indexFromLeft < abacusLayout.value.length) {
      abacusLayout.value[indexFromLeft] = {
        heavenActive: digit >= 5,
        earthCount: digit % 5,
      }
    }
  })
}

const getPlaceLabel = (power: number): string => {
  return `${props.count < 0 ? '-' : ''}10^${power}`
}

watch(
  () => props.count,
  (newVal) => updateAbacus(newVal),
  { immediate: true },
)
</script>

<template>
  <Table class="abacus-soroban">
    <TableHeader class="border-5 border-orange-900">
      <TableRow class="flex justify-center">
        <TableCell class="flex gap-5 text-xl">
          <Cloudy class="-scale-x-100" /> Heaven's Beads <Cloudy />
        </TableCell>
      </TableRow>
    </TableHeader>
    <TableBody class="border-5 border-orange-900">
      <!-- === HEAVEN SECTION === -->
      <TableRow
        v-for="row in [
          { key: 'h-rest', className: 'flex justify-evenly p-2', active: false },
          {
            key: 'h-act',
            className: 'flex justify-evenly border-b-5 border-b-yellow-500 p-2',
            active: true,
          },
        ]"
        :key="row.key"
        :class="row.className"
      >
        <TableCell
          v-for="(rod, idx) in abacusLayout"
          :key="`${row.key}-${idx}`"
          :class="[
            row.active
              ? rod.heavenActive
                ? 'bg-foreground'
                : 'bg-transparent'
              : !rod.heavenActive
                ? 'bg-foreground'
                : 'bg-transparent',
            'w-10 rounded-2xl',
          ]"
        />
      </TableRow>

      <!-- === EARTH SECTION === -->
      <TableRow v-for="row in 5" :key="`e-level-${row}`" class="flex justify-evenly p-2">
        <TableCell
          v-for="(rod, idx) in abacusLayout"
          :key="`${idx}-${row}`"
          :class="[
            rod.earthCount === row - 1 ? 'bg-transparent' : 'bg-foreground',
            'w-10 rounded-2xl',
          ]"
        />
      </TableRow>

      <TableRow class="flex justify-evenly">
        <TableCell
          v-for="(rod, index) in abacusLayout.slice().reverse()"
          :key="index"
          class="flex justify-center"
        >
          {{ getPlaceLabel(abacusLayout.length - 1 - index) }}
        </TableCell>
      </TableRow>
    </TableBody>

    <TableFooter class="border-x-5 border-b-5 border-orange-900">
      <TableRow class="flex justify-center">
        <TableCell class="flex gap-5 text-xl">
          <Mountain /> Earth's Beads <Mountain class="-scale-x-100" />
        </TableCell>
      </TableRow>
    </TableFooter>
    <span class="sr-only">abacus-soroban</span>
  </Table>
</template>
