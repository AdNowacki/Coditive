<template>
  <div>
    <div v-if="slots.default" class="overflow-x-auto rounded-lg border border-gray-200 shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <slot></slot>
      </table>
    </div>
    <div v-else>Brak danych do wyświetlenia</div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();
</script>
