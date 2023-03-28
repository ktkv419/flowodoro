///////////////////////////////////// THROW AWAY CODE
const btnMode = document.querySelectorAll('.user-nav__icon-box');
btnMode.forEach((el) => el.addEventListener('click', changeScreen));

const screenMode = [...document.querySelectorAll('.mode')];
function changeScreen(e) {
  screenMode.forEach((el) => el.classList.remove('active'));
  const mode = e.target.closest('.user-nav__icon-box');

  const modeIcon = mode.querySelectorAll('.user-nav__icon')[0];
  // modeIcon.classList.add('change');
  // setTimeout(() => modeIcon.classList.remove('change'), 500);
  screenMode.forEach((el) => el.classList.add('hidden'));
  const screen = screenMode.find((el) => el.id == `${mode.id}-screen`);
  screen.classList.add('active');
  screen.classList.remove('hidden');
}
//////////////////////////////////////////////////////

class App {
  changeTimerBtns = document.querySelector('.timer-screen__buttons');
  changeModeBtns = document.querySelector('.user-nav');
  constructor() {
    this.#init();
  }

  #init() {
    this.changeTimerBtns.addEventListener('click', this.changeTimePresets);
    this.changeModeBtns.addEventListener('click', this.changeMode.bind(this));
  }

  changeTimePresets(e) {
    if (!e.target.classList.contains('btn')) return;
    console.log(+e.target.dataset.value);
  }

  changeMode(e) {
    const modeEl = e.target.closest('.user-nav__icon-box');
    const iconEl = modeEl.children[0];

    iconEl.classList.add('change');
    setTimeout(() => iconEl.classList.remove('change'), 500);

    // [...this.changeModeBtns.children].filter((el) => el.id != modeEl.id).forEach(el => {
    //   el.classList.remove
    // })
  }
}

const app = new App();
