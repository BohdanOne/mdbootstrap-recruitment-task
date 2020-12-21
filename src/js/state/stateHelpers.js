import state from '.';

export const productsInCategory = (category) => {
  return state.products.items().filter((product) => product.category === category);
};

export const categoryNotEmpty = (category) => productsInCategory(category).length >= 1;

export const totalAmount = (unit) => {
  return state.products
    .items()
    .filter((product) => product.unit === unit)
    .map((product) => product.quantity)
    .reduce((a, b) => a + b, 0);
};
