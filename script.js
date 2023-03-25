// THROW AWAY CODE
const btnMode = document.querySelectorAll('.user-nav__icon-box');
btnMode.forEach((el) => el.addEventListener('click', changeScreen));

const screenMode = [...document.querySelectorAll('.mode')];
function changeScreen(e) {
  screenMode.forEach((el) => el.classList.remove('active'));
  const mode = e.target.closest('.user-nav__icon-box');

  const modeIcon = mode.querySelectorAll('.user-nav__icon')[0];
  modeIcon.classList.add('change');
  setTimeout(() => modeIcon.classList.remove('change'), 500);
  screenMode.forEach((el) => el.classList.add('hidden'));
  const screen = screenMode.find((el) => el.id == `${mode.id}-screen`);
  screen.classList.add('active');
  screen.classList.remove('hidden');
}
