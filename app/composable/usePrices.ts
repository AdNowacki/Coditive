import { ref, computed } from 'vue';
import { useErrorsStore } from '~/stores';
import { removeError } from '~/utils';
import type { TPriceCalculatorFormModel, TInputError, TPriceDataTable, TPrice } from '~/types';
import { ENDPOINTS } from '~/constants';

const formModel = ref<TPriceCalculatorFormModel>({
  name: '',
  net: '',
  currency: 'PLN',
  vat: '23',
});

export const usePrices = () => {
  const inputErrors = ref<TInputError>({});
  const process = ref<boolean>(false);
  const calculated = ref<boolean>(false);
  const prices = ref<TPriceDataTable>({ headers: [], data: [] });

  const vatAmount = computed(() => +formModel.value.net * (+formModel.value.vat / 100));
  const totalAmount = computed(() => +formModel.value.net + vatAmount.value);

  const errorsStore = useErrorsStore();

  const isValid = () => {
    inputErrors.value = {};

    if (!formModel.value.name.trim()) inputErrors.value.name = 'Nazwa produktu jest wymagana.';
    if (!formModel.value.net) inputErrors.value.net = 'Kwota netto jest wymagana.';

    return Object.keys(inputErrors.value).length === 0;
  };

  const submitHandler = async () => {
    calculated.value = false;
    if (!isValid()) return;

    await addPrice();
  };

  const addPrice = async () => {
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
          ...formModel.value,
          vatAmount: vatAmount.value,
          totalAmount: totalAmount.value,
        },
      });

      if (error.value) {
        const message = 'Wystąpił problem z zapisaniem Twoich danych do bazy.';
        errorsStore.add(message);
        removeError(() => errorsStore.clear());
        throw new Error(message);
      }

      calculated.value = true;
    } catch (error) {
      console.error(error);
    } finally {
      process.value = false;
    }
  };

  const getPrices = async () => {
    try {
      process.value = true;
      const { METHOD, URL } = ENDPOINTS.GET_PRICES;

      const { data, error } = await useFetch(URL, {
        method: METHOD as 'get',
      });

      if (error.value) {
        const message = 'Wystąpił problem z pobraniem danych.';
        errorsStore.add(message);
        removeError(() => errorsStore.clear());
        throw new Error(message);
      }

      prices.value = {
        headers: ['Nazwa', 'Kwota netto', 'Waluta', 'Stawka VAT', 'Kwota brutto', 'Kwota podatku', 'IP', 'Data'],
        data: data.value as TPrice[],
      };
    } catch (error) {
      console.log(error);
    } finally {
      process.value = false;
    }
  };

  return {
    formModel,
    vatAmount,
    totalAmount,
    inputErrors,
    process,
    calculated,
    prices,
    isValid,
    submitHandler,
    getPrices,
    addPrice,
  };
};
