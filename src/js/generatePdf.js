import { jsPDF as JSPDF } from 'jspdf';
import state from './state';
import { categoryNotEmpty, filterProductsByCategory } from './state/utils';

export default () => {
  const pdf = new JSPDF();
  const categories = state.categories.items();
  let list = 'SHOPPING LIST \n\n';
  categories
    .filter((category) => categoryNotEmpty(category))
    .forEach((category) => {
      list += `* ${category.toUpperCase()}\n`;
      const productsInCategory = filterProductsByCategory(category);
      productsInCategory.forEach((product) => {
        list += `  ${product.name} - ${product.quantity.toFixed(1)}${product.unit}\n`;
      });
      list += '\n';
    });
  pdf.text(list, 20, 20);
  pdf.save('shopping-list.pdf');
};
