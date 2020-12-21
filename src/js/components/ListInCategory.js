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
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.init();
  }

  init() {
    this.populateHeading();
    this.populateList();
    this.setupDragListeners();
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

  setupDragListeners() {
    this.element.addEventListener('dragover', this.handleDragOver);
    this.element.addEventListener('dragleave', this.handleDragLeave);
    this.element.addEventListener('drop', this.handleDrop);
  }

  handleDragOver(event) {
    this.element.classList.add('dropzone');
    event.preventDefault();
  }

  handleDragLeave() {
    this.element.classList.remove('dropzone');
  }

  handleDrop(event) {
    const product = event.dataTransfer.getData('text/plain');
    state.products.updateItem(JSON.parse(product), 'category', this.category);
  }
}
