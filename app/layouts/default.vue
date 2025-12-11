<template>
  <div>
    <slot></slot>
    <AppError />
  </div>
</template>
<script setup lang="ts">
import AppError from '~/components/common/AppError.vue';
</script>
