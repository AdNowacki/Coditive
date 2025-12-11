import { ref, computed } from 'vue';
import { useErrorsStore } from '~/stores';
import { removeError } from '~/utils';
import type { TPriceCalculatorFormModel, TInputError, TPriceDataTable, TPrice, TOptions } from '~/types';
import { ENDPOINTS, VAT_OPTIONS } from '~/constants';

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

  const vatAmount = computed(() => {
    const vat = isTaxFree(formModel.value.vat) ? 0 : +formModel.value.vat;
    return +formModel.value.net * (vat / 100);
  });
  const totalAmount = computed(() => +formModel.value.net + vatAmount.value);
  const vatLabelResolver = computed(() => {
    return isTaxFree(formModel.value.vat)
      ? (VAT_OPTIONS.find((option: TOptions) => option.value === formModel.value.vat)?.label ?? '')
      : `${vatAmount.value.toFixed(2)} zł`;
  });

  const errorsStore = useErrorsStore();

  const isTaxFree = (vat: string) => ['oo', 'np', 'zw'].includes(vat);

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
    isTaxFree,
    vatLabelResolver,
    isValid,
    submitHandler,
    getPrices,
    addPrice,
  };
};
