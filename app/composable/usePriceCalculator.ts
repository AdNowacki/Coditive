import { ref, computed } from 'vue';
import type { TPriceCalculatorFormModel } from '~/types';

const form = ref<TPriceCalculatorFormModel>({
  name: '',
  net: '',
  currency: 'PLN',
  vat: '23',
});

export const usePriceCalculator = () => {
  const vatAmount = computed(() => +form.value.net * (+form.value.vat / 100));
  const totalAmount = computed(() => +form.value.net + vatAmount.value);

  return { form, vatAmount, totalAmount };
};
