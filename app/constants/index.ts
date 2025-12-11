import type { TOptions } from '~/types';

export const ENDPOINTS = Object.freeze({
  GET_PRICES: {
    METHOD: 'get',
    URL: '/api/prices',
  },
  CREATE_PRICES: {
    METHOD: 'post',
    URL: '/api/prices',
  },
});

export const TAX_FREE_OPTION_VALUES = Object.freeze(['zw', 'np', 'oo']);

export const VAT_OPTIONS = Object.freeze([
  { value: '23', label: '23%' },
  { value: '22', label: '22%' },
  { value: '8', label: '8%' },
  { value: '7', label: '7%' },
  { value: '5', label: '5%' },
  { value: '3', label: '3%' },
  { value: '0', label: '0%' },
  { value: TAX_FREE_OPTION_VALUES[0], label: 'zwolnione z VAT' },
  { value: TAX_FREE_OPTION_VALUES[1], label: 'nie podlega VAT' },
  { value: TAX_FREE_OPTION_VALUES[2], label: 'odwrotne obciązenie' },
]) as TOptions[];
