
const getFormData = (formId) => {
    const form = document.getElementById(`${formId}`); // Corrected string interpolation
    if (!form) {
        throw new Error(`Form with id "${formId}" not found.`);
    }
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    return formObject;
};
const clearForm = (formId) => {
    const form = document.getElementById(`${formId}`);
    if (!form) {
        throw new Error(`Form with id "${formId}" not found.`);
    }
    form.reset()
}
let code = null
const evil = (event) => {
const formData = getFormData('codeForm')
    event.preventDefault();
    console.log(formData)
    code = formData.code
try {
    eval(`${code}`)

} catch (e) {
    console.log(e)
}

}

