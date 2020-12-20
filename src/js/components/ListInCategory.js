import BaseComponent from './BaseComponent';
import Product from './Product';
import state from '../state';

export default class ListInCategory extends BaseComponent {
  constructor(templateId, parentId, newElementId, category) {
    super(templateId, parentId, newElementId);
    this.category = category;
    this.heading = this.element.querySelector('#categoryName');
    this.productsList = this.element.querySelector('ul');
    this.productsList.id = `${category}Products`;
    this.populateList = this.populateList.bind(this);
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
    this.productsList.innerHTML = null;
    state.products
      .items()
      .filter((product) => product.category === this.category)
      .forEach(
        (product) => new Product('product', this.productsList.id, `product${product.id}`, product)
      );
  }
}
