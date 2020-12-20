import state from '.';

export const filterProductsByCategory = (category) => {
  return state.products.items().filter((product) => product.category === category);
};

export const categoryNotEmpty = (category) => filterProductsByCategory(category).length >= 1;
