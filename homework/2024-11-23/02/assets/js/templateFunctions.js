export const getFormData = (formId) => {
    const form = document.getElementById(`${formId}`); // Corrected string interpolation
    if (!form) {
        throw new Error(`Form with id "${formId}" not found.`);
    }
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    return formObject;
};
