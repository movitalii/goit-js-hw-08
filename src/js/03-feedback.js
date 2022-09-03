import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
}

const STORAGE_KEY = "feedback-form-state";

const formData = {};

refs.form.addEventListener("submit", onFormSubmit);
refs.form.addEventListener("input", throttle(onFormInput, 500));

function onFormInput(event) {
    formData[event.target.name] = event.target.value;

    const message = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, message)
}

fillForm();
 
function onFormSubmit(event) {
    event.preventDefault();

    const messageJson = localStorage.getItem(STORAGE_KEY);
    const savedMassage = JSON.parse(messageJson);

    if (savedMassage) {
        console.log(savedMassage);
    }    

    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);    
}

function fillForm() {
    const messageJson = localStorage.getItem(STORAGE_KEY);

    const savedMassage = JSON.parse(messageJson);

    if (savedMassage) {
        refs.form.message.value = savedMassage.message;
        refs.form.email.value = savedMassage.email;
    }
}








