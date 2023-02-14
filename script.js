/*
##################
##   TODO LIST  ##
##################
1. Add notification support for telegram bot
*/
'use strict';

const btnStart = document.querySelector('.btn--start');
const btnStop = document.querySelector('.btn--stop');
const btnMinContainer = document.querySelector('.controls');
const btnOption = document.querySelector('.btn--options');

const screenContainer = document.querySelector('.interface');
const starterScreen = document.querySelector('.layout__starter');
const timerScreen = document.querySelector('.layout__timer');
const optionScreen = document.querySelector('.layout__options');

const timerShell = document.querySelector('.timer--shell');
const minWorkTimer = document.querySelector('#min-work-time');
const secWorkTimer = document.querySelector('#sec-work-time');
const minTimer = document.querySelector('#time-min');
const secTimer = document.querySelector('#time-sec');

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
  #timeTillBreak;
  #sessions = [];
  #btnStopHovered = false;
  #timer;
  #breakCoef;
  constructor() {
    // Functionality
    btnStart.addEventListener('click', this.#startTimer.bind(this));
    btnMinContainer.addEventListener('click', this.#changeMinTimer.bind(this));
    btnOption.addEventListener('click', this.#openOptions.bind(this), {
      once: true,
    });
    btnStop.addEventListener('mouseover', (e) => {
      if (this.#timeTillBreak > 0) {
        btnStop.textContent = `${this.turnToClock(this.#timeTillBreak).min}:${
          this.turnToClock(this.#timeTillBreak).sec
        } is left`;
        this.#btnStopHovered = true;
      }
    });
    btnStop.addEventListener('mouseout', (e) => {
      btnStop.textContent = 'Stop';
      this.#btnStopHovered = false;
    });

    minWorkTimer.value = '20';
    secWorkTimer.value = '00';
    // Defaults
    // inputTime.value = 20;
  }

  // Start timer with given values
  #startTimer(e) {
    e.preventDefault();

    timerScreen.classList.remove('hidden');
    starterScreen.classList.add('hidden');

    // btnStop.classList.add('invisible');
    // setTimeout(
    //   () => btnStop.classList.remove('invisible'),
    //   this.#minWork * 1000
    // );

    this.#minWork = this.#turnToSeconds(minWorkTimer.value, secWorkTimer.value);
    this.#time = 0;

    // setTimeout(() => btnStop.classList.remove('invisible'), this.#minWork);

    this.#updateTimer(this.#time);
    this.#time++;
    this.#timeTillBreak = this.#minWork;

    this.#timer = setInterval(() => {
      this.#updateTimer(this.#time);
      this.#timeTillBreak = this.#minWork - this.#time;
      if (this.#btnStopHovered && this.#timeTillBreak > 0)
        btnStop.textContent = `${this.turnToClock(this.#timeTillBreak).min}:${
          this.turnToClock(this.#timeTillBreak).sec
        } is left`;
      else btnStop.textContent = 'Stop';
      this.#time++;
    }, 1000);

    btnStop.classList.add('btn--inactive');
    setTimeout(() => {
      btnStop.classList.remove('btn--inactive');
      btnStop.addEventListener('click', () => {
        clearTimeout(this.#timer);
      });
    }, this.#minWork * 1000);
  }

  #changeMinTimer(e) {
    if (!e.target.classList.contains('btn--change-time')) return;
    let min = Number(minWorkTimer.value) + Number(e.target.dataset.value);
    if (min < 0) min = 0;
    minWorkTimer.value =
      String(min).length < 2 ? String(min).padStart(2, 0) : min;
  }

  #turnToSeconds(min, sec) {
    // console.log(Number(min) * 60 + Number(sec));
    return Number(min) * 60 + Number(sec);
  }

  turnToClock(time) {
    time = Number(time);
    const min = Math.trunc(time / 60);
    const sec = time - min * 60;
    return {
      min: String(min).length < 2 ? String(min).padStart(2, 0) : min,
      sec: String(sec).length < 2 ? String(sec).padStart(2, 0) : sec,
    };
  }

  #updateTimer() {
    const calcTime = this.turnToClock(this.#time);
    console.log(minTimer.textContent);
    minTimer.value = calcTime.min;
    secTimer.value = calcTime.sec;
  }

  #openOptions() {
    let prevScreen;
    screenContainer.querySelectorAll('.layout').forEach((el) => {
      if (
        !el.classList.contains('hidden') &&
        !el.classList.contains('layout__options')
      )
        prevScreen = el;
      el.classList.add('hidden');
    });
    optionScreen.classList.remove('hidden');

    // console.log(prevScreen);
    btnOption.textContent = 'Back';
    btnOption.addEventListener(
      'click',
      this.#closeOptions.bind(this, prevScreen),
      {
        once: true,
      }
    );
  }

  #closeOptions(prevScreen, e) {
    optionScreen.classList.add('hidden');
    prevScreen.classList.remove('hidden');
    btnOption.textContent = 'Options';
    btnOption.addEventListener('click', this.#openOptions.bind(this), {
      once: true,
    });
  }
}

const app = new App();
