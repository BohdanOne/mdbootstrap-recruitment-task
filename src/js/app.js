import AddProductForm from './components/AddProductForm';
import ShoppingList from './components/ShoppingList';

function app() {
  return [new AddProductForm('addProductForm', 'app'), new ShoppingList('shoppingList', 'app')];
}

export default app;
