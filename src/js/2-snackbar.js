
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener("submit", onSubmit);


function onSubmit(evt) {
    evt.preventDefault();
    const { delay, state } = evt.currentTarget.elements;
    console.log(delay.value);
    console.log(state.value)

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state.value === "fulfilled") { resolve(state.value) }
            else if (state.value === "rejected") { reject(state.value) };
        }, delay.value)
    });

    promise.then(() => {
        (iziToast.success({
            title: '✅',
            message: `Fulfilled promise in ${delay.value}ms`,
        }))
    }).catch(() => {
        (iziToast.warning({
            title: '❌',
            message: ` Rejected promise in ${delay.value}ms`,
        }))
    });
}