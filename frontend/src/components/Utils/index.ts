export const NumberFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatPrice = (amount?: number) => {
  if (!amount) {
    return 0;
  }

  return NumberFormat.format(amount / 100);
};
