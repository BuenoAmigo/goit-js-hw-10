import iziToast from "izitoast";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

let timer = null;

startBtn.addEventListener('click', onStart);
startBtn.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            iziToast.warning({
                title: 'Warning',
                message: 'Please choose a date in the future',
            });
            return
        }
        startBtn.disabled = false;
    },
};

function onStart() {
    startBtn.disabled = true;

    timer = setInterval(() => {
        const currentDate = new Date(inputDate.value);
        const remainder = currentDate - Date.now();
        const { days, hours, minutes, seconds } = convertMs(remainder);
        day.textContent = addLeadingZero(days);
        hour.textContent = addLeadingZero(hours);
        minute.textContent = addLeadingZero(minutes);
        second.textContent = addLeadingZero(seconds);
        if (remainder < 1000) {
            iziToast.success({
                title: 'OK',
                message: 'Time is over!',
            });
            clearInterval(timer)

        }

    }, 1000);


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
};

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}

flatpickr("#datetime-picker", options);