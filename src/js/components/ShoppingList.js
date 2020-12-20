import BaseComponent from './BaseComponent';
import ListInCategory from './ListInCategory';
import state from '../state';
import { categoryNotEmpty } from '../state/utils';

export default class ShoppingList extends BaseComponent {
  constructor(templateId, parentId) {
    super(templateId, parentId);
    this.listContainer = this.element.querySelector('#listContainer');
    this.populateList = this.populateList.bind(this);
    this.init();
  }

  init() {
    this.populateList();
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
}
