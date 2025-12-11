<template>
  <div>
    <label v-if="label" :for="id" class="block text-xs font-medium mb-1">{{ props.label }}</label>
    <input
      :id="id"
      v-model="model"
      :placeholder="props.placeholder"
      :type="props.type"
      :disabled="props.disabled"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      class="w-full rounded-lg border border-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
      :class="{ 'bg-gray-200 text-gray-400': props.disabled }"
    />
    <p v-for="error in props.errors" :key="error" class="text-sm text-red-600 mt-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { INPUT_TYPES_ENUM } from '~/types';

const model = defineModel<string>({ default: '' });

type Props = {
  id?: string;
  type?: INPUT_TYPES_ENUM;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  errors?: string[];
};

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  type: INPUT_TYPES_ENUM.TEXT,
  label: '',
  placeholder: '',
  min: undefined,
  max: undefined,
  step: 0.01,
  errors: () => [],
});
</script>
