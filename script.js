// THROW AWAY CODE
const btnMode = document.querySelectorAll('.user-nav__icon-box');
btnMode.forEach((el) => el.addEventListener('click', changeScreen));

const screenMode = [...document.querySelectorAll('.mode')];
function changeScreen(e) {
  screenMode.forEach((el) => el.classList.add('hidden'));
  const mode = e.target.closest('.user-nav__icon-box').id;
  screenMode.find((el) => el.id == `${mode}-screen`).classList.remove('hidden');
}
