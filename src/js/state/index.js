import Store from './Store';

const state = {
  categories: new Store('categories'),
  products: new Store('products'),
};

export default state;
