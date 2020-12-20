import BaseComponent from './BaseComponent';
import products from '../state/products';

export default class Product extends BaseComponent {
  constructor(templateId, parentId, newElementId, product) {
    super(templateId, parentId, newElementId);
    this.product = product;
    this.nameSpan = this.element.querySelector('#name');
    this.qtySpan = this.element.querySelector('#qty');
    this.unitSpan = this.element.querySelector('#unit');
    this.removeBtn = this.element.querySelector('#removeBtn');
    this.decreaseBtn = this.element.querySelector('#decreaseQty');
    this.increaseBtn = this.element.querySelector('#increaseQty');
    this.removeProduct = this.removeProduct.bind(this);
    this.decreaseQty = this.decreaseQty.bind(this);
    this.increaseQty = this.increaseQty.bind(this);
    this.init();
  }

  init() {
    this.nameSpan.innerText = this.product.name;
    this.qtySpan.innerText = this.product.quantity.toFixed(1);
    this.unitSpan.innerText = this.product.unit;
    this.removeBtn.addEventListener('click', this.removeProduct);
    this.decreaseBtn.addEventListener('click', this.decreaseQty);
    this.increaseBtn.addEventListener('click', this.increaseQty);
  }

  removeProduct() {
    const idx = products.indexOf(this.product);
    products.splice(idx, 1);
  }

  decreaseQty() {
    this.product.quantity -= this.getStep();
    console.log(this.product);
  }

  increaseQty() {
    this.product.quantity += this.getStep();
    console.log(this.product);
  }

  getStep() {
    return this.product.unit === 'pcs' ? 1 : 0.1;
  }
}
