import saveToStorage from './services/saveToStorage';
import getFromStorage from './services/getFromStorage';

export default class Store {
  constructor(storeName) {
    this.storeName = storeName;
    this.store = [];
    this.listeners = [];
    this.items = this.items.bind(this);
    this.addItem = this.addItem.bind(this);
    this.getItem = this.getItem.bind(this);
    this.addListener = this.addListener.bind(this);
    this.updateListeners = this.updateListeners.bind(this);
    this.init();
  }

  init() {
    const inStorage = this.items();
    if (inStorage) {
      this.store = [...inStorage];
    }
    saveToStorage(this.storeName, this.store);
  }

  items() {
    return getFromStorage(this.storeName);
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  updateListeners() {
    this.listeners.forEach((listener) => {
      listener([...this.store]);
    });
  }

  getItem(id) {
    const itemIndex = this.items().findIndex((itemInStore) => itemInStore.id === Number(id));
    return this.items()[itemIndex];
  }

  addItem(item) {
    const items = this.items();
    items.push(item);
    saveToStorage(this.storeName, items);
    this.updateListeners();
  }

  removeItem(item) {
    const items = this.items();
    const filteredItems = items.filter((itemInStore) => itemInStore.id !== item.id);
    saveToStorage(this.storeName, filteredItems);
    this.updateListeners();
  }

  updateItem(item, field, newValue) {
    const items = this.items();
    const itemIndex = items.findIndex((itemInStore) => itemInStore.id === item.id);
    items[itemIndex][field] = newValue;
    saveToStorage(this.storeName, items);
    this.updateListeners();
  }
}
