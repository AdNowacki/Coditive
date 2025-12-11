<template>
  <div class="p-4 max-w-3/4 mx-auto">
    <div v-if="process" class="text-base py-6">Trwa pobieranie danych.</div>
    <DataTable :data="prices" />
  </div>
</template>

<script setup lang="ts">
import DataTable from '~/components/data-presentations/DataTable.vue';
import { usePrices } from '~/composable';

const { process, prices, getPrices } = usePrices();
(async () => {
  await getPrices();
})();
</script>
