/*
##################
##   TODO LIST  ##
##################
1. Add notification support for telegram bot
2. Remove event listener on interactive button doesnt work 
*/
'use strict';

const timerShell = document.querySelector('.timer-shell');

const minMinWork = document.querySelector('#min-work-time');
const minSecWork = document.querySelector('#sec-work-time');

const btnStartTimer = document.querySelector('.btn--start');

function limitInputField(input) {
  const { target } = input;

  const regex = new RegExp(/^[0-9]/g);

  if (!regex.test(target.value)) {
    // Doesn't work??? Returns empty string
    target.value = target.value.replace(regex, '');
  }

  if (target.value.length > 2) {
    target.value = target.value.slice(1);
    if (target.value[0] == '0') target.value = target.value.slice(1);
  }
}

// Helpers
const getLocal = (name) => JSON.parse(window.localStorage.getItem(name));

const setLocal = (name, data) =>
  window.localStorage.setItem(name, JSON.stringify(data));

class App {
  constructor() {
    this.#init();

    timerShell.addEventListener('input', limitInputField);

    btnStartTimer.addEventListener('click', () => {
      setLocal('minWork', { min: minMinWork.value, sec: minSecWork.value });
    });
  }

  #init() {
    if (!getLocal('minWork')) {
      setLocal('minWork', { min: 20, sec: 0 });
    }

    const { min: minWork, sec: secWork } = getLocal('minWork');

    minMinWork.value = minWork.padStart(2, 0);
    minSecWork.value = secWork.padStart(2, 0);
  }
}

const app = new App();

import 'core-js/stable';
import 'regenerator-runtime';
