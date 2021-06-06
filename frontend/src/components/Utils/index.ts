export const NumberFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatPrice = (amount: number) => {
  return NumberFormat.format(amount / 100);
};
