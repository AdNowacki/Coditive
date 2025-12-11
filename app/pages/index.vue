<template>
  <div>
    <PriceCalculatorForm class="my-8" />
    <AppError />
  </div>
</template>

<script setup lang="ts">
import PriceCalculatorForm from '~/components/forms/PriceCalculatorForm.vue';
import AppError from '~/components/common/AppError.vue';
</script>
