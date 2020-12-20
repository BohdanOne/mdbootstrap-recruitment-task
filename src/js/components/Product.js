import BaseComponent from './BaseComponent';
import state from '../state';

export default class Product extends BaseComponent {
  constructor(templateId, parentId, newElementId, product) {
    super(templateId, parentId, newElementId);
    this.product = product;
    this.nameSpan = this.element.querySelector('#productName');
    this.qtySpan = this.element.querySelector('#qty');
    this.unitSpan = this.element.querySelector('#unit');
    this.removeBtn = this.element.querySelector('#removeBtn');
    this.decreaseBtn = this.element.querySelector('#decreaseQty');
    this.increaseBtn = this.element.querySelector('#increaseQty');
    this.populateListItem = this.populateListItem.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.decreaseQty = this.decreaseQty.bind(this);
    this.increaseQty = this.increaseQty.bind(this);
    this.init();
  }

  init() {
    this.populateListItem();
    this.removeBtn.addEventListener('click', this.removeProduct);
    this.decreaseBtn.addEventListener('click', this.decreaseQty);
    this.increaseBtn.addEventListener('click', this.increaseQty);
  }

  populateListItem() {
    this.nameSpan.innerText = this.product.name;
    this.qtySpan.innerText = this.product.quantity.toFixed(1);
    this.unitSpan.innerText = this.product.unit;
  }

  removeProduct() {
    state.products.removeItem(this.product);
  }

  decreaseQty() {
    const newQty = this.product.quantity - this.getStep();
    state.products.updateItem(this.product, 'quantity', newQty);
  }

  increaseQty() {
    const newQty = this.product.quantity + this.getStep();
    state.products.updateItem(this.product, 'quantity', newQty);
  }

  getStep() {
    return this.product.unit === 'pcs' ? 1 : 0.1;
  }
}
