import AddProductForm from './components/AddProductForm';
import ShoppingList from './components/ShoppingList';
import state from './state';

function app() {
  const addProductForm = new AddProductForm('addProductForm', 'app');
  const shoppingList = new ShoppingList('shoppingList', 'app');
  state.categories.addListener(addProductForm.renderCategoriesList);
  state.products.addListener(shoppingList.populateList);
  state.products.addListener(shoppingList.populateTotals);
}

export default app;
