import BaseComponent from './BaseComponent';
import state from '../state';

export default class AddProductForm extends BaseComponent {
  constructor(templateId, parentId) {
    super(templateId, parentId);
    this.form = this.element.querySelector('form');
    this.categoriesList = this.element.querySelector('#categories');
    this.quantityInput = this.element.querySelector('#quantity');
    this.kgRadioInput = this.element.querySelector('#kg');
    this.pcsRadioInput = this.element.querySelector('#pcs');
    this.renderCategoriesList = this.renderCategoriesList.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.init();
  }

  init() {
    this.renderCategoriesList();
    this.selectQuantityUnit();
    this.element.addEventListener('submit', this.addProduct);
  }

  renderCategoriesList() {
    this.categoriesList.innerHTML = '';
    state.categories.items().forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      this.categoriesList.appendChild(option);
    });
  }

  selectQuantityUnit() {
    this.kgRadioInput.addEventListener('change', () => {
      return this.kgRadioInput.value.on ? this.setQuantityStep(false) : this.setQuantityStep(true);
    });
    this.pcsRadioInput.addEventListener('change', () => {
      return this.kgRadioInput.value.on ? this.setQuantityStep(true) : this.setQuantityStep(false);
    });
  }

  setQuantityStep(isFraction) {
    this.quantityInput.step = isFraction ? '.1' : '1';
  }

  addProduct(event) {
    event.preventDefault();
    this.addCategory(this.form.category.value);
    const products = state.products.items();
    const newProduct = {
      id: products.length + 1 + Date.now(),
      name: this.form.name.value,
      unit: this.form.unit.value,
      quantity: Number(this.form.quantity.value),
      category: this.form.category.value,
    };
    state.products.addItem(newProduct);
    this.form.reset();
  }

  addCategory(category) {
    const categories = state.categories.items();
    if (categories.indexOf(category) !== -1) {
      return;
    }
    state.categories.addItem(category);
  }
}
