let st: ReturnType<typeof setTimeout> | NodeJS.Timeout | null = null;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const removeError = (callback: Function, delay: number = 7000) => {
  if (st) clearTimeout(st as ReturnType<typeof setTimeout>);

  st = setTimeout(() => {
    callback();
    clearTimeout(st as ReturnType<typeof setTimeout>);
  }, delay);
};
