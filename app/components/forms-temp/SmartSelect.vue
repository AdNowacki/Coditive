<template>
  <div>
    <label class="block text-sm font-medium mb-1" :for="id">{{ props.label }}</label>
    <select
      :id="id"
      v-model="model"
      :disabled="props.disabled"
      class="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
      :class="{ 'bg-gray-200 text-gray-400': props.disabled }"
    >
      <option v-for="option in props.options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { TOptions } from '~/types';

const model = defineModel<string>({ default: '' });

type Props = {
  id?: string;
  label?: string;
  disabled?: boolean;
  options?: TOptions<string>[];
  errors?: string[];
};

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  label: '',
  placeholder: '',
  options: () => [],
  errors: () => [],
});
</script>
