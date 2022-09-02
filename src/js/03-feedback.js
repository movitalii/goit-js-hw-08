import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
}

const STORAGE_KEY = "feedback-form-state";

const formData = {};

refs.form.addEventListener("submit", onFormSubmit);
refs.textarea.addEventListener("input", throttle(onTextareaInput, 500));

refs.form.addEventListener("input", event => {
    formData[event.target.name] = event.target.value;
    console.log(formData);
})

fillTextarea();
 
function onFormSubmit(event) {
    event.preventDefault();

    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(event) {
    const message = event.target.value;
    
    localStorage.setItem(STORAGE_KEY, message)
}

function fillTextarea() {
    const savedMassage = localStorage.getItem(STORAGE_KEY);

    if (savedMassage) {
        refs.textarea.value = savedMassage;
    }
}











