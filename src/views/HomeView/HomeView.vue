<script setup lang="ts">
import { ROUTES } from '@/constants'
</script>

<template>
  <div class="home-view flex flex-col gap-4 px-4" data-testid="home-view">
    <OrganismGetCurrentWeather />
    <Card>
      <CardHeader>
        <CardTitle> Sample Project </CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="outline" as-child>
          <RouterLink :to="ROUTES.OPTIMIZED_DATA_LIST_VIEW.path"> Optimized List </RouterLink>
        </Button>
      </CardContent>
    </Card>
    <span class="sr-only">home-view</span>
  </div>
</template>
