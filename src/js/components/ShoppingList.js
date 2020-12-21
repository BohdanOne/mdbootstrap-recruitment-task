import BaseComponent from './BaseComponent';
import ListInCategory from './ListInCategory';
import state from '../state';
import { categoryNotEmpty, totalAmount } from '../state/stateHelpers';
import generatePdf from '../utils/generatePdf';

export default class ShoppingList extends BaseComponent {
  constructor(templateId, parentId) {
    super(templateId, parentId);
    this.listContainer = this.element.querySelector('#listContainer');
    this.totalPcs = this.element.querySelector('#totalPcs');
    this.totalKgs = this.element.querySelector('#totalKgs');
    this.exportPdfBtn = this.element.querySelector('#exportPdfBtn');
    this.populateList = this.populateList.bind(this);
    this.populateTotals = this.populateTotals.bind(this);
    this.init();
  }

  init() {
    this.populateList();
    this.populateTotals();
    this.exportPdfBtn.addEventListener('click', generatePdf);
  }

  populateList() {
    this.listContainer.innerHTML = null;
    state.categories
      .items()
      .filter((category) => categoryNotEmpty(category))
      .forEach(
        (category) =>
          new ListInCategory('listInCategory', this.listContainer.id, `listOf${category}`, category)
      );
  }

  populateTotals() {
    this.totalPcs.innerText = totalAmount('pcs');
    this.totalKgs.innerText = totalAmount('kg').toFixed(1);
  }
}
