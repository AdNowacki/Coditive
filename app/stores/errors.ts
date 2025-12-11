import { defineStore } from 'pinia';

export const useErrorsStore = defineStore('errors', {
  state: () => ({
    errors: [] as string[],
  }),
  getters: {
    hasErrors(state): boolean {
      return state.errors.length > 0;
    },
  },
  actions: {
    add(message: string) {
      this.errors.push(message);
    },
    // @TODO implement remove by message
    // remove(index: number) {
    //   this.errors.splice(index, 1);
    // },
    clear() {
      this.errors = [];
    },
  },
});
