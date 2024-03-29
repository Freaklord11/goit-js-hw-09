import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from "notiflix/build/notiflix-notify-aio";

const refs ={
    dateTimeSelector: document.querySelector("input#datetime-picker"),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    mins: document.querySelector('[data-minutes]'),
    secs: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const startTime = Date.now();

      if (selectedDate < startTime){
        Notify.failure("Please choose a date in the future");
        refs.startBtn.disabled = true;
        return;
      }

      refs.startBtn.disabled = false;
      let intervalID = null;

      refs.startBtn.addEventListener('click', startCountDown);

      function startCountDown() {
        refs.startBtn.disabled = true;
        refs.dateTimeSelector.disabled =true;

        intervalID = setInterval(() => {
          const currentTime = Date.now();

          if (selectedDate < currentTime){
            clearInterval(intervalID);
            refs.dateTimeSelector.disabled = false;
            return;
          }

          const timeDiff = selectedDate - currentTime;
          const { days, hours, minutes, seconds } = convertMs(timeDiff);

          refs.days.textContent = addLeadingZero(days);
          refs.hours.textContent = addLeadingZero(hours);
          refs.mins.textContent = addLeadingZero(minutes);
          refs.secs.textContent = addLeadingZero(seconds);
        });
      }
    },
  };

  flatpickr(refs.dateTimeSelector, options);

  function addLeadingZero(value){
    return String(value).padStart(2,"0");
  }

  function convertMs(ms) {
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
  