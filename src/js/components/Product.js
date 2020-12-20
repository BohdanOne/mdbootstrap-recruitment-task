import BaseComponent from './BaseComponent';
import state from '../state';

export default class Product extends BaseComponent {
  constructor(templateId, parentId, newElementId, product) {
    super(templateId, parentId, newElementId);
    this.product = product;
    this.nameSpan = this.element.querySelector('#productName');
    this.qtySpan = this.element.querySelector('#qty');
    this.unitSpan = this.element.querySelector('#unit');
    this.editBtn = this.element.querySelector('#editBtn');
    this.removeBtn = this.element.querySelector('#removeBtn');
    this.decreaseBtn = this.element.querySelector('#decreaseQty');
    this.increaseBtn = this.element.querySelector('#increaseQty');
    this.editNameInput = this.element.querySelector('input');
    this.editName = this.editName.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.decreaseQty = this.decreaseQty.bind(this);
    this.increaseQty = this.increaseQty.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.init();
  }

  init() {
    this.populateListItem();
    // this.element.addEventListener('dragend', () => console.log('drop'));
    this.element.addEventListener('dragstart', this.handleDrag);
    this.editBtn.addEventListener('click', this.editName, { once: true });
    this.removeBtn.addEventListener('click', this.removeProduct);
    this.decreaseBtn.addEventListener('click', this.decreaseQty);
    this.increaseBtn.addEventListener('click', this.increaseQty);
  }

  populateListItem() {
    this.nameSpan.innerText = this.product.name;
    this.qtySpan.innerText = this.product.quantity.toFixed(1);
    this.unitSpan.innerText = this.product.unit;
  }

  editName() {
    const save = () => {
      state.products.updateItem(this.product, 'name', input.value);
    };
    const input = document.createElement('input');
    input.placeholder = this.product.name;
    input.addEventListener('change', save);
    this.element.replaceChild(input, this.nameSpan);
    this.editBtn.innerText = 'save';
    this.editBtn.addEventListener('click', save);
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

  handleDrag(event) {
    event.dataTransfer.setData('text/plain', JSON.stringify(this.product));
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
  }
}
