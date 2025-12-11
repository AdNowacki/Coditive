<template>
  <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded">
    <p class="text-sm text-red-700"></p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  window.addEventListener('error', (event) => {
    console.error('Global error captured:', event.message);
  });
});
</script>
