<template>
  <form
    class="max-w-md mx-auto p-6 rounded-xl shadow-md border border-gray-200 text-gray-800"
    @submit.prevent="submitHandler"
  >
    <h2 class="text-2xl font-semibold mb-4">Formularz: oblicz kwotę brutto</h2>

    <div class="mb-4">
      <SmartInput
        id="productName"
        v-model="form.name"
        :type="INPUT_TYPES_ENUM.TEXT"
        label="Nazwa produktu"
        placeholder="Wpisz nazwę"
        :errors="[inputErrors.name as string]"
      />
    </div>

    <div class="mb-4">
      <SmartInput
        id="netAmount"
        v-model="form.net"
        :type="INPUT_TYPES_ENUM.NUMBER"
        :min="0"
        label="Kwota netto"
        placeholder="0.00"
        :errors="[inputErrors.net as string]"
      />
    </div>

    <div class="mb-4">
      <SmartInput
        id="currency"
        v-model="form.currency"
        :type="INPUT_TYPES_ENUM.TEXT"
        label="Waluta"
        placeholder="Wybierz walutę"
        disabled
        :errors="[inputErrors.currency as string]"
      />
    </div>

    <div class="mb-4">
      <SmartSelect id="vatRate" v-model="form.vat" :options="vatOptions" label="Stawka VAT" />
      <p v-if="inputErrors.vat" class="text-sm text-red-600 mt-1">
        {{ inputErrors.vat }}
      </p>
    </div>

    <div class="mb-4">
      <button
        type="submit"
        class="px-4 py-2 rounded-lg bg-blue-600 transition-all duration-200 text-white font-medium hover:bg-blue-700 w-full disabled:opacity-50"
        :disabled="process"
      >
        Oblicz
      </button>
    </div>

    <CalculatedResult v-if="calculated" />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SmartInput from '~/components/Forms/SmartInput.vue';
import SmartSelect from '~/components/Forms/SmartSelect.vue';
import CalculatedResult from '~/components/common/CalculatedResult.vue';
import type { TInputError } from '~/types';
import { INPUT_TYPES_ENUM } from '~/types';
import { ENDPOINTS } from '~/constants';
import { useErrorsStore } from '~/stores/errors';
import { usePriceCalculator } from '~/composable';

const vatOptions = [
  { value: '23', label: '23%' },
  { value: '22', label: '22%' },
  { value: '8', label: '8%' },
  { value: '7', label: '7%' },
  { value: '5', label: '5%' },
  { value: '3', label: '3%' },
  { value: '0', label: '0%' },
];

const errorsStore = useErrorsStore();
const { form, vatAmount, totalAmount } = usePriceCalculator();
const inputErrors = ref<TInputError>({});
const process = ref<boolean>(false);
const calculated = ref<boolean>(false);

const isValid = () => {
  inputErrors.value = {};

  if (!form.value.name.trim()) inputErrors.value.name = 'Nazwa produktu jest wymagana.';
  if (!form.value.net) inputErrors.value.net = 'Kwota netto jest wymagana.';

  return Object.keys(inputErrors.value).length === 0;
};

const submitHandler = async () => {
  calculated.value = false;

  if (!isValid()) return;

  try {
    process.value = true;
    const { METHOD, URL } = ENDPOINTS.CREATE_PRICES;
    const response = await fetch(URL, {
      method: METHOD,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer your-token' },
      body: JSON.stringify({
        ...form.value,
        vatAmount: vatAmount.value,
        totalAmount: totalAmount.value,
      }),
    });

    if (!response.ok) {
      errorsStore.add('Wystąpił problem z zapisaniem Twoich danych do bazy.');
      throw new Error('Wystąpił problem z zapisaniem Twoich danych do bazy.');
    }

    calculated.value = true;
  } catch (error: unknown) {
    console.log(error);
  } finally {
    process.value = false;
  }
};
</script>
