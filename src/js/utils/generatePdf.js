import { jsPDF as JSPDF } from 'jspdf';
import state from '../state';
import { categoryNotEmpty, filterProductsByCategory } from '../state/utils';

export default function generatePdf() {
  const pdf = new JSPDF();
  const textContent = generateTextContent();
  pdf.text(textContent, 20, 20);
  pdf.save('shopping-list.pdf');
}

function generateTextContent() {
  const categories = state.categories.items();
  let textContent = 'SHOPPING LIST \n\n';
  categories
    .filter((category) => categoryNotEmpty(category))
    .forEach((category) => {
      textContent += `* ${category.toUpperCase()}\n`;
      const products = filterProductsByCategory(category);
      products.forEach((product) => {
        textContent += `  ${product.name} - ${product.quantity.toFixed(1)}${product.unit}\n`;
      });
      textContent += '\n';
    });
  return textContent;
}
