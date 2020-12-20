import BaseComponent from './BaseComponent';
import categories from '../state/categories';
import products from '../state/products';

export default class AddProductForm extends BaseComponent {
  constructor(templateId, parentId) {
    super(templateId, parentId);
    this.form = this.element.querySelector('form');
    this.categoriesList = this.element.querySelector('#categories');
    this.quantityInput = this.element.querySelector('#quantity');
    this.kgRadioInput = this.element.querySelector('#kg');
    this.pcsRadioInput = this.element.querySelector('#pcs');
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
    categories.forEach((category) => {
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
    const newProduct = {
      id: products.length + 1,
      name: this.form.name.value,
      unit: this.form.unit.value,
      quantity: this.form.quantity.value.toNumber(),
      category: this.form.category.value,
    };
    products.push(newProduct);
    this.addCategory(this.form.category.value);
    this.form.reset();
  }

  addCategory(category) {
    if (categories.indexOf(category) !== -1) {
      return;
    }
    categories.push(category);
  }
}
