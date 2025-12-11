<template>
  <Teleport v-if="errorsStore.hasErrors" to="body">
    <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded absolute right-10 bottom-10 min-w-50 w-fit">
      <p v-for="(error, i) in errorsStore.errors" :key="`${i}-${error}`" class="text-xs text-red-700">{{ error }}</p>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useErrorsStore } from '~/stores';

const errorsStore = useErrorsStore();
</script>
