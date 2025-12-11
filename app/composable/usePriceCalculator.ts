import { ref, computed } from 'vue';
import type { TPriceCalculatorFormModel, TInputError } from '~/types';
import { ENDPOINTS } from '~/constants';
import { useErrorsStore } from '~/stores/errors';

const form = ref<TPriceCalculatorFormModel>({
  name: '',
  net: '',
  currency: 'PLN',
  vat: '23',
});

export const usePriceCalculator = () => {
  const vatAmount = computed(() => +form.value.net * (+form.value.vat / 100));
  const totalAmount = computed(() => +form.value.net + vatAmount.value);

  const inputErrors = ref<TInputError>({});
  const process = ref<boolean>(false);
  const calculated = ref<boolean>(false);

  const errorsStore = useErrorsStore();

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

      const { error } = await useFetch(URL, {
        method: METHOD as 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 100923',
        },
        body: {
          ...form.value,
          vatAmount: vatAmount.value,
          totalAmount: totalAmount.value,
        },
      });

      if (error.value) {
        errorsStore.add('Wystąpił problem z zapisaniem Twoich danych do bazy.');
        throw new Error('Wystąpił problem z zapisaniem Twoich danych do bazy.');
      }

      // jeśli brak błędu, oznacz jako policzone
      calculated.value = true;
    } catch (err) {
      console.log(err);
    } finally {
      process.value = false;
    }
  };

  return { form, vatAmount, totalAmount, inputErrors, process, calculated, isValid, submitHandler };
};
