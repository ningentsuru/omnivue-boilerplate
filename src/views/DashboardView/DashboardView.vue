<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia' // 1. Import helper

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

const store = useCounterStore()
const { count, doubleCount } = storeToRefs(store) // 2. Wrap state in refs
const { increment } = store // 3. Destructure actions directly
</script>

<template>
  <div class="dashboard-view flex flex-col justify-center">
    <Card>
      <CardHeader> Track your counting </CardHeader>
      <CardContent>
        <p>Count: {{ count }}</p>
        <p>DoubleCount: {{ doubleCount }}</p>
      </CardContent>
      <CardFooter>
        <Button id="increment" class="cursor-pointer" @click.prevent="increment">
          Single Count
        </Button>
      </CardFooter>
    </Card>
    <span class="sr-only">dashboard-view</span>
  </div>
</template>
