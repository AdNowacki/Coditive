<template>
  <thead class="bg-gray-200">
    <tr class="text-center">
      <th
        v-for="header in props.headers"
        :key="header"
        class="px-4 py-3 text-center text-sm font-semibold text-gray-700"
      >
        {{ header }}
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
type Props = {
  headers?: string[];
};

const props = withDefaults(defineProps<Props>(), {
  headers: () => [],
});
</script>
