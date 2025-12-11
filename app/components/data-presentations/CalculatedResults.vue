<template>
  <div>{{ formattedContent }}</div>
</template>

<script setup lang="ts">
import { usePrices } from '~/composable';

const { formModel, vatAmount, totalAmount } = usePrices();

const formattedContent = computed(
  () =>
    `Cena produktu ${formModel.value.name}, wynosi: ${totalAmount.value.toFixed(2)} zł brutto, kwota podatku to ${vatAmount.value.toFixed(2)} zł.`
);
</script>
