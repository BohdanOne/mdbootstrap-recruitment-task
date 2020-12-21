export default function saveToStorage(storeName, state) {
  localStorage.setItem(storeName, JSON.stringify(state));
}
