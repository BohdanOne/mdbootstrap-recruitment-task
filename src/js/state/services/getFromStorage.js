export default function getFromStorage(storeName) {
  return JSON.parse(localStorage.getItem(storeName));
}
