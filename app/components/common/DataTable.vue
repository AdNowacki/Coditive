<template>
  <div>
    <div v-if="props.data.tbody.length" class="overflow-x-auto rounded-lg border border-gray-200 shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-200">
          <tr class="text-center">
            <th
              v-for="header in props.data.thead"
              :key="header"
              class="px-4 py-3 text-center text-sm font-semibold text-gray-700"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="body in props.data.tbody"
            :key="body.id"
            class="hover:bg-gray-50 text-center text-sm text-gray-800"
          >
            <td class="px-4 py-3">{{ body.name }}</td>
            <td class="px-4 py-3">{{ body.net.toFixed(2) }}</td>
            <td class="px-4 py-3">{{ body.currency }}</td>
            <td class="px-4 py-3">{{ body.vat }}%</td>
            <td class="px-4 py-3">{{ body.totalAmount.toFixed(2) }}</td>
            <td class="px-4 py-3">{{ body.vatAmount.toFixed(2) }}</td>
            <td class="px-4 py-3">{{ body.ip }}</td>
            <td class="px-4 py-3">{{ isoToYMD(body.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Brak danych do wyświetlenia</div>
  </div>
</template>

<script setup lang="ts">
import type { TPriceDataTable } from '~/types';
import { isoToYMD } from '~/utils';

type Props = {
  data?: TPriceDataTable;
};

const props = withDefaults(defineProps<Props>(), {
  data: () => ({ thead: [], tbody: [] }) as TPriceDataTable,
});
</script>
