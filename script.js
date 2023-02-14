const startButton = document.querySelector('.btn--start');
const stopButton = document.querySelector('.btn--stop');
const minBtnContainer = document.querySelector('.controls');

const starterScreen = document.querySelector('.layout__starter');
const timerScreen = document.querySelector('.layout__timer');

const timerShell = document.querySelector('.timer--shell');
const minTimer = document.querySelector('.time[name="min"]');
const secTimer = document.querySelector('.time[name="sec"]');

class Session {
  #end;
  id = String(Date.now()).split(-10);
  constructor() {
    const start = Date.now();
  }
}

class WorkSession extends Session {
  type = 'work';
  constructor() {
    super();
  }
}

class SmallBreakSession extends Session {
  type = 'smallBreak';
  constructor() {
    super();
  }
}

class BigBreakSession extends Session {
  type = 'bigBreak';
  constructor() {
    super();
  }
}

class App {
  #time;
  #minWork;
  #sessions = [];
  constructor() {
    // Functionality
    startButton.addEventListener('click', this.#startTimer.bind(this));
    minBtnContainer.addEventListener('click', this.#changeMinTimer.bind(this));

    minTimer.value = '20';
    secTimer.value = '00';
    // Defaults
    // inputTime.value = 20;
  }

  // Start timer with given values
  #startTimer(e) {
    e.preventDefault();
    timerScreen.classList.remove('hidden');
    starterScreen.classList.add('hidden');

    stopButton.classList.add('invisible');
    this.#minWork = this.#turnToSeconds(minTimer.value, secTimer.value);
    setTimeout(
      () => stopButton.classList.remove('invisible'),
      this.#minWork * 1000
    );
    // setInterval(this.#updateTimer(this.#turnToSeconds))
  }

  #changeMinTimer(e) {
    if (!e.target.classList.contains('btn--change-time')) return;
    minTimer.value = Number(minTimer.value) + Number(e.target.dataset.value);
  }

  #turnToSeconds(min, sec) {
    // console.log(Number(min) * 60 + Number(sec));
    return Number(min) * 60 + Number(sec);
  }

  #updateTimer() {
    // minTimer.value =
  }
}

const app = new App();
