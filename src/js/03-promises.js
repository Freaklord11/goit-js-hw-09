import { Notify } from "notiflix/build/notiflix-notify-aio";

const refs= {
  form: document.querySelector('form.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

const {form,delay,step,amount} = refs;

form.addEventListener('submit', promiseGen);

function promiseGen(e){
  e.preventDefault();
  let delayVal = Number(delay.value);
  
  for (let positionVal = 1; positionVal <= amount.value; positionVal++){
    createPromise(positionVal,delayVal)
    .then(({position,delay}) =>{
      Notify.success(`Fulfilled Promise ${position} in ${delay}ms`);
    })
    .catch(({position,delay}) =>{
      Notify.failure(`Rejected Promise ${position} in ${delay}ms`);
    });
  delayVal += Number(step.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve,reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({position,delay});
      } else {
        // Reject
        reject({position,delay});
      }
    }, delay);
  });
}
