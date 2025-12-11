<template>
  <div>{{ formattedContent }}</div>
</template>

<script setup lang="ts">
import { usePriceCalculator } from '~/composable';

const { form, vatAmount, totalAmount } = usePriceCalculator();

console.log(form.value);

const formattedContent = computed(
  () =>
    `Cena produktu ${form.value.name}, wynosi: ${totalAmount.value.toFixed(2)} zł brutto, kwota podatku to ${vatAmount.value.toFixed(2)} zł.`
);
</script>
