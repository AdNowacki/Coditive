<template>
  <div>{{ formattedContent }}</div>
</template>

<script setup lang="ts">
import { usePrices } from '~/composable';

const { formModel, totalAmount, vatLabelResolver } = usePrices();

const formattedContent = computed(() => {
  return `Cena produktu ${formModel.value.name}, wynosi: ${totalAmount.value.toFixed(2)} zł brutto, kwota podatku to: ${vatLabelResolver.value}`;
});
</script>
