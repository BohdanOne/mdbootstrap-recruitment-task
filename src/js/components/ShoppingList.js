import BaseComponent from './BaseComponent';
import ListInCategory from './ListInCategory';
import categories from '../state/categories';

export default class ShoppingList extends BaseComponent {
  constructor(templateId, parentId) {
    super(templateId, parentId);
    this.listContainer = this.element.querySelector('#listContainer');
    this.init();
  }

  init() {
    this.populateList();
  }

  populateList() {
    this.listContainer.innerHTML = '';
    categories.forEach(
      (category) =>
        new ListInCategory('listInCategory', this.listContainer.id, `listOf${category}`, category)
    );
  }
}
