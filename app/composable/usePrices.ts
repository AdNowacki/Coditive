import { ref, computed } from 'vue';
import { useErrorsStore } from '~/stores';
import { removeError } from '~/utils';
import type { TPriceCalculatorFormModel, TInputError, TPriceDataTable, TPrice, TOptions } from '~/types';
import { ENDPOINTS, VAT_OPTIONS, TAX_FREE_OPTION_VALUES } from '~/constants';

const formModel = ref<TPriceCalculatorFormModel>({
  name: '',
  net: '',
  currency: 'PLN',
  vat: '23',
});

export const usePrices = () => {
  // config
  const errorsStore = useErrorsStore();

  // refs
  const inputErrors = ref<TInputError>({});
  const process = ref<boolean>(false);
  const calculated = ref<boolean>(false);
  const prices = ref<TPriceDataTable>({ headers: [], data: [] });

  // computeds
  const vatAmount = computed<number>(() => {
    const vat = isTaxFree(formModel.value.vat) ? 0 : +formModel.value.vat;
    return +formModel.value.net * (vat / 100);
  });
  const totalAmount = computed<number>(() => +formModel.value.net + vatAmount.value);
  const vatLabelResolver = computed<string>(() => {
    return isTaxFree(formModel.value.vat)
      ? (VAT_OPTIONS.find((option: TOptions) => option.value === formModel.value.vat)?.label ?? '')
      : `${vatAmount.value.toFixed(2)} zł`;
  });

  // methods
  type TaxFreeValue = (typeof TAX_FREE_OPTION_VALUES)[number];
  const isTaxFree = (vat: string): boolean => Object.values(TAX_FREE_OPTION_VALUES).includes(vat as TaxFreeValue);

  const isFormValid = (): boolean => {
    inputErrors.value = {};

    if (!formModel.value.name.trim()) inputErrors.value.name = 'Nazwa produktu jest wymagana.';
    if (!formModel.value.net) inputErrors.value.net = 'Kwota netto jest wymagana.';

    return Object.keys(inputErrors.value).length === 0;
  };

  const submitHandler = async () => {
    calculated.value = false;
    if (!isFormValid()) return;

    await createPrice();
  };

  const createPrice = async () => {
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

      // @TODO mozna zoptymalizować, bo się dubluje
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

      // @TODO mozna zoptymalizować, bo się dubluje
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
    vatLabelResolver,
    isTaxFree,
    isFormValid,
    submitHandler,
    getPrices,
    createPrice,
  };
};
