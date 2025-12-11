<template>
  <tbody>
    <tr v-for="body in props.data" :key="body.id" class="hover:bg-gray-50 text-center text-sm text-gray-800">
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
</template>

<script setup lang="ts">
import { isoToYMD } from '~/utils';
import type { TPrice } from '~/types';

type Props = {
  data?: TPrice[];
};

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
});
</script>
