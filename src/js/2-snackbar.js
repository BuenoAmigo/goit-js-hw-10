import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);


function onSubmit(evt) {
    evt.preventDefault();
    const { delay, state } = evt.currentTarget.elements;
    let currentDelay = delay.value;
    let currentState = state.value;
    // console.log(delay.value);
    // console.log(state.value);

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (currentState === 'fulfilled') { resolve(currentDelay) }
            else if (currentState === 'rejected') { reject(currentDelay) };
        }, currentDelay)
    });

    promise.then((delay) => {
        (iziToast.success({
            title: '✅',
            message: `Fulfilled promise in ${delay}ms`,
        }))
    }).catch((delay) => {
        (iziToast.error({
            title: '❌',
            message: ` Rejected promise in ${delay}ms`,
        }))
    });
    evt.currentTarget.reset();
}





// console.log(delay.value);
// console.log(state.value)

// createPromise(state, delay)
//     .then(({ state, delay }) => {
//         (iziToast.success({
//             title: '✅',
//             message: `Fulfilled promise in ${delay.value}ms`,
//         }))
//     }).catch(({ state, delay }) => {
//         (iziToast.warning({
//             title: '❌',
//             message: ` Rejected promise in ${delay}ms`,
//         }))
//     });
// evt.currentTarget.reset();

// function createPromise(state, delay) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (state) { resolve({ state, delay }) }
//             else { reject({ state, delay }) };
//         }, delay)
//     });
// }

// function createPromise(state, delay) {
//     console.log(state, delay)
// }