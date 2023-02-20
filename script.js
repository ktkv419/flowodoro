/*
##################
##   TODO LIST  ##
##################
1. Add notification support for telegram bot
2. Remove event listener on interactive button doesnt work 
*/
'use strict';

const telegramAPI = '5918394500:AAGUUYbN9UjjJtd9AAYR-xEIS1q6qEM6ZbE';

const body = document.querySelector('body');

const labelWorkType = document.querySelector('label.work-type-label'); // Label under timer during work and break sessions

const btnStart = document.querySelector('.btn--start'); // Button that appears on starter screen
const btnStartStop = document.querySelector('.btn--stop'); // Button that appears during work/break session
const btnMinChangeContainer = document.querySelector('.controls');
const btnOption = document.querySelector('.btn--options');
const btnLightModeSwitch = document.querySelector('.btn--light-dark-mode');

const containerInterface = document.querySelector('.interface');
const containerStarter = document.querySelector('.layout__starter');
const containerTimer = document.querySelector('.layout__timer');
const containerOptions = document.querySelector('.layout__options');

const timerShell = document.querySelector('.timer--shell');
const minMinWorkTimer = document.querySelector('#min-work-time');
const minSecWorkTimer = document.querySelector('#sec-work-time');
const minTimer = document.querySelector('#time-min');
const secTimer = document.querySelector('#time-sec');

const inputBrakeCoef = document.querySelector('#breakCoef');
const inputBreakCoefEx = document.querySelector('.break-coef-example');
const inputBeforeBigBreak = document.querySelector('#beforeBigBreak');

const audioDefault = new Audio('./media/modeChangeDefault.wav');
const audioBigBreak = new Audio('./media/modeChangeDefault.wav');

const cbTG = document.querySelector('#enableTGBot');
const inputTGApi = document.querySelector('#tgBotAPI');

class Session {
  start = Date.now();
  end;
  duration;
  id = String(Date.now()).split(-10);
  constructor() {}

  setEnd(endTime) {
    if (!this.end) {
      // console.log(this);
      this.end = endTime;
      this.duration = this.end - this.start;
    }
  }
}

class WorkSession extends Session {
  type = 'work';
}

class BreakSession extends Session {
  type = 'break';
}

class App {
  #timeElapsed; // Time that is left on timer
  #minWork; // Time to postpone break session during work session
  #timeRemaining; // Timer that displayed on stop button
  #btnStartStopHovered = false; // Needed to turn off functionality, so there would be no checks to show time or not after minimum work time elapsed and button renders useless
  #sessions = []; // Session storage array (clears during new session)
  #tgBot = false;
  #timeout;
  #timer;

  // Defaults
  #smallBreakCoef = 0.3;
  #bigBreakCoef = 0.8;
  #beforeBigBreak = 3;

  constructor() {
    this.#init();
    // Functionality
    btnStart.addEventListener('click', this.#showTimer.bind(this));
    btnMinChangeContainer.addEventListener(
      'click',
      this.#changeMinTimer.bind(this)
    );
    btnOption.addEventListener('click', this.#openOptions.bind(this), {
      once: true,
    });
    btnLightModeSwitch.addEventListener('click', this.#changeMode);
    cbTG.addEventListener('change', this.#TGBotInterface);

    inputBrakeCoef.addEventListener(
      'input',
      this.#updateBreakExample.bind(this)
    );

    minMinWorkTimer.value = '20';
    minSecWorkTimer.value = '00';
  }

  #init() {
    inputBrakeCoef.value = this.#smallBreakCoef;
    inputBeforeBigBreak.value = this.#beforeBigBreak;
    this.#updateBreakExample.call(this);
  }

  #updateBreakExample() {
    const breakTime = 40 * inputBrakeCoef.value;
    inputBreakCoefEx.textContent = `40 minutes work = ${breakTime} minutes break`;
  }

  // Start timer with given values
  #showTimer(e) {
    e.preventDefault();

    containerTimer.classList.remove('hidden');
    containerStarter.classList.add('hidden');
    this.#startWork();
  }

  #showStarter() {
    console.log(this.#sessions);
    containerTimer.classList.add('hidden');
    containerStarter.classList.remove('hidden');
  }

  ///////////////////////// Interactive STOP button /////////////////////////

  // Update button interface
  #updateStopButton(time) {
    if (time > 0) {
      btnStartStop.textContent = `${this.turnToClock(time).min}:${
        this.turnToClock(time).sec
      } is left`;
      this.#btnStartStopHovered = true;
    }
  }

  // Pass time to the button changing function
  mouseover() {
    this.#updateStopButton.call(this, this.#timeRemaining);
  }

  // Return to previous state of button when cursor is out of the button
  mouseout() {
    btnStartStop.textContent = 'Stop';
    this.#btnStartStopHovered = false;
  }

  // Binding
  mouseoverBind = this.mouseover.bind(this);
  mouseoutBind = this.mouseout.bind(this);

  // Remove button changing event listener when time remaining before break is equal to 0
  #btnInteractive(state) {
    if (state) {
      btnStartStop.addEventListener('mouseover', this.mouseoverBind);
      btnStartStop.addEventListener('mouseout', this.mouseoutBind);
    } else {
      btnStartStop.removeEventListener('mouseover', this.mouseoverBind);
      btnStartStop.removeEventListener('mouseout', this.mouseoutBind);
    }
  }
  ///////////////////////////////////////////////////////////////////////////

  //////////////////////// INTERFACE STATE CHANGERS /////////////////////////

  #startWork() {
    this.#sessions.push(new WorkSession());

    this.#minWork = this.#turnToSeconds(
      minMinWorkTimer.value,
      minSecWorkTimer.value
    );
    this.#timeElapsed = 0;

    labelWorkType.textContent = 'Work time!';

    this.#updateTimer(this.#timeElapsed);
    this.#timeElapsed++;
    this.#timeRemaining = this.#minWork;

    this.#timer = setInterval(() => {
      this.#updateTimer(this.#timeElapsed);

      if (this.#btnStartStopHovered && this.#timeRemaining > 0) {
        this.#timeRemaining = this.#minWork - this.#timeElapsed;
        btnStartStop.textContent = `${
          this.turnToClock(this.#timeRemaining).min
        }:${this.turnToClock(this.#timeRemaining).sec} is left`;
      } else btnStartStop.textContent = 'Stop';

      this.#timeElapsed++;
    }, 1000);

    this.#btnInteractive(true);

    btnStartStop.classList.add('btn--inactive');
    this.#timeout = setTimeout(() => {
      btnStartStop.classList.remove('btn--inactive');
      this.#btnInteractive(false);
      audioDefault.play();
      btnStartStop.addEventListener(
        'click',
        () => {
          clearTimeout(this.#timer);

          this.#sessions.at(-1).setEnd(Date.now());

          this.#startBreak.call(this);
        },
        { once: true }
      );
    }, this.#minWork * 1000);

    if (cbTG.checked) {
      this.#registerTGBot();
    }
  }

  #startBreak(e) {
    this.#sessions.push(new BreakSession());

    // console.log(this.#sessions);
    let breakTime;
    if (this.#sessions.length == this.#beforeBigBreak * 2) {
      breakTime = Math.round(
        (this.#sessions
          .filter((el) => el.type == 'work')
          .reduce((a, b, _, arr) => a + b.duration / arr.length, 0) *
          this.#bigBreakCoef) /
          1000
      );
      btnStartStop.textContent = 'Menu';

      this.#sessions = [];
      labelWorkType.textContent = 'Big break time!';
      btnStartStop.addEventListener('click', this.#showStarter.bind(this), {
        once: true,
      });
    } else {
      breakTime = Math.round(
        (this.#sessions.at(-2).duration / 1000) * this.#smallBreakCoef
      );
      btnStartStop.textContent = 'Start';
      labelWorkType.textContent = 'Break time!';
      btnStartStop.addEventListener(
        'click',
        function () {
          clearInterval(this.#timer);
          this.#sessions.at(-2).setEnd(Date.now());
          // console.log(this.#sessions.at(-1));
          this.#startWork();
        }.bind(this),
        {
          once: true,
        }
      );
    }

    this.#timeElapsed = breakTime;
    this.#updateTimer(this.#timeElapsed);

    this.#timer = setInterval(() => {
      this.#timeElapsed--;
      this.#updateTimer(this.#timeElapsed);
      if (this.#timeElapsed <= 0) {
        clearInterval(this.#timer);

        audioDefault.play();
      }
    }, 1000);
  }

  ///////////////////////////////////////////////////////////////////////////

  #changeMinTimer(e) {
    if (!e.target.classList.contains('btn--change-time')) return;
    let min = Number(minMinWorkTimer.value) + Number(e.target.dataset.value);
    if (min < 0) min = 0;
    minMinWorkTimer.value =
      String(min).length < 2 ? String(min).padStart(2, 0) : min;
  }

  #turnToSeconds(min, sec) {
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
    const calcTime = this.turnToClock(this.#timeElapsed);
    minTimer.value = calcTime.min;
    secTimer.value = calcTime.sec;
  }

  #openOptions() {
    let prevScreen;
    containerInterface.querySelectorAll('.layout').forEach((el) => {
      if (
        !el.classList.contains('hidden') &&
        !el.classList.contains('layout__options')
      )
        prevScreen = el;
      el.classList.add('hidden');
    });
    containerOptions.classList.remove('hidden');

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
    containerOptions.classList.add('hidden');
    prevScreen.classList.remove('hidden');
    btnOption.textContent = 'Options';
    btnOption.addEventListener('click', this.#openOptions.bind(this), {
      once: true,
    });
  }

  #changeMode() {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode'))
      btnLightModeSwitch.textContent = 'Dark theme';
    else btnLightModeSwitch.textContent = 'Light theme';
  }

  #TGBotInterface() {
    if (!cbTG.checked) {
      inputTGApi.style.opacity = 0;
      return;
    }
    inputTGApi.value = telegramAPI;
    inputTGApi.style.opacity = 100;
  }

  #registerTGBot() {
    const TelegramBot = require('node-telegram-bot-api');
    const bot = new TelegramBot(telegramAPI, { polling: true });
  }
}

const app = new App();
