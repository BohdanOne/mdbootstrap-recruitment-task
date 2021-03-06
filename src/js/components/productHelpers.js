// eslint-disable-next-line import/prefer-default-export
const saveButton = `
  <svg class="icon icon--small" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6875 3L16.375 3.28125L9.59375 10H5V26H21.8438C23.2539 26 24.4844 25.0039 24.7812 23.625L26.9375 13.625C27.332 11.7773 25.8867 10 24 10H18.25L18.4375 9.25C18.6406 9.09375 18.7695 9.02734 19.0625 8.625C19.5312 7.98438 20 6.99219 20 5.65625C20 4.23047 18.7109 3 17.0938 3H16.6875ZM17.4062 5.09375C17.8281 5.17578 18 5.34766 18 5.65625C18 6.55859 17.7266 7.11719 17.4688 7.46875C17.2109 7.82031 17.0312 7.90625 17.0312 7.90625L16.6875 8.09375L16.5625 8.5L15.9688 10.75L15.6562 12H24C24.6602 12 25.1055 12.5742 24.9688 13.2188L22.8438 23.2188C22.7422 23.6875 22.3203 24 21.8438 24H11V11.4062L17.4062 5.09375ZM7 12H9V24H7V12Z" />
  </svg>
  save
`;

export function insertInput(input, placeholder, parent, target, saveFn) {
  input.classList.add('product-form__input');
  input.value = placeholder;
  parent.replaceChild(input, target);
  input.addEventListener('change', saveFn);
}

export function changeButton(btn, saveFn) {
  btn.innerHTML = saveButton;
  btn.classList.add('product__btn--save');
  btn.addEventListener('click', saveFn);
}
