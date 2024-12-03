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


const getVat = (price) => price * 0.17

const evil = (event) => {
    event.preventDefault();
    const data = getFormData(event.srcElement.id)
    price = +data.price
    console.log(typeof price)
// if (typeof price !== 'number') throw new Error('price must be a number')
    if (price < 0) throw new Error('price shuld be more then 0')

    console.log(`the vat for ${price} is ${getVat(price)}`)
}