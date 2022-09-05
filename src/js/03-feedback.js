
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const STORAGE_KEY = "feedback-form-state";

let formData = {};

fillForm();

form.addEventListener("submit", onFormSubmit);
form.addEventListener("input", throttle(onFormInput, 500));

function onFormInput(event) {
    formData[event.target.name] = event.target.value;

    const message = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, message)
}
 
function onFormSubmit(event) {
    event.preventDefault();

    const messageJson = localStorage.getItem(STORAGE_KEY);
    const savedMassage = JSON.parse(messageJson);

    if (form.email.value === '' || form.message.value === '') {
        alert('All inputs muct be filled');
    } else if (savedMassage) {
        console.log(savedMassage); 
        event.currentTarget.reset();
        localStorage.removeItem(STORAGE_KEY); 
        formData = {};
    }   
}

function fillForm() {
  const savedMassage = localStorage.getItem(STORAGE_KEY);
  if (savedMassage) {
    formData = JSON.parse(savedMassage);
    form.email.value = formData.email || '';
    form.message.value = formData.message || '';
  }
}