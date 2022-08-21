import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  static: true,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] >= Date.now()) {
      refs.startBtn.removeAttribute('disabled');
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.setAttribute('disabled', '');
    }
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor(onTick) {
    this.intervalId = null;
    this.onTick = onTick;
  }

  start() {
    const targetDate = new Date(refs.input.value);
    refs.startBtn.setAttribute('disabled', '');
    refs.input.setAttribute('disabled', '');

    this.intervalId = setInterval(() => {
      const currentDate = Date.now();
      const difference = targetDate - currentDate;
      const time = this.convertMs(difference);

      if (difference <= 1000) {
        clearInterval(this.intervalId);
      }
      this.onTick(time);
    }, 1000);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}

const addLeadingZero = value => String(value).padStart(2, '0');

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}

const timer = new Timer(updateClockface);

refs.startBtn.addEventListener('click', timer.start.bind(timer));
