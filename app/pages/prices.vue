<template>
  <div class="p-4 max-w-3/4 mx-auto">
    <div v-if="process" class="text-base py-6">Trwa pobieranie danych.</div>
    <DataTable :data="prices">
      <DataThead :headers="prices.thead" />
      <DataTbody :data="prices.tbody" />
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from '~/components/data-presentations/DataTable.vue';
import DataThead from '~/components/data-presentations/DataThead.vue';
import DataTbody from '~/components/data-presentations/DataTbody.vue';
import { usePrices } from '~/composable';

const { process, prices, getPrices } = usePrices();
(async () => {
  await getPrices();
})();
</script>
