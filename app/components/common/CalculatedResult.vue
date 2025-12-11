<template>
  <div>{{ formattedContent }}</div>
</template>

<script setup lang="ts">
import type { TPriceCalculatorFormModel } from '~/types';
const props = defineProps<{
  data: TPriceCalculatorFormModel;
}>();

const vatAmount = computed(() => +props.data.net * (+props.data.vat / 100));
const totalAmount = computed(() => +props.data.net + vatAmount.value);

const formattedContent = computed(
  () =>
    `Cena produktu ${props.data.name}, wynosi: ${totalAmount.value.toFixed(2)} zł brutto, kwota podatku to ${vatAmount.value.toFixed(2)} zł.`
);
</script>
