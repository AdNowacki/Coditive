<template>
  <div>
    <div v-if="props.data.tbody.length" class="overflow-x-auto rounded-lg border border-gray-200 shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <slot></slot>
      </table>
    </div>
    <div v-else>Brak danych do wyświetlenia</div>
  </div>
</template>

<script setup lang="ts">
import type { TPriceDataTable } from '~/types';

type Props = {
  data?: TPriceDataTable;
};

const props = withDefaults(defineProps<Props>(), {
  data: () => ({ thead: [], tbody: [] }) as TPriceDataTable,
});
</script>
