import BaseComponent from './BaseComponent';
import Product from './Product';
import products from '../state/products';

export default class ListInCategory extends BaseComponent {
  constructor(templateId, parentId, newElementId, category) {
    super(templateId, parentId, newElementId);
    this.category = category;
    this.heading = this.element.querySelector('#categoryName');
    this.productsList = this.element.querySelector('#products');
    this.init();
  }

  init() {
    this.populateHeading();
    this.populateList();
  }

  populateHeading() {
    this.heading.innerText = this.category;
  }

  populateList() {
    this.productsList.innerHTML = '';
    products
      .filter((product) => product.category === this.category)
      .forEach(
        (product) => new Product('product', this.element.id, `product${product.id}`, product)
      );
  }
}
