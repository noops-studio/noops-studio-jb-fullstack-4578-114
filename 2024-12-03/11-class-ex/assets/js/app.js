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


const getFactorGrade = (grade) => {
if (!grade) throw new Error('must specify a number')
if (grade < 0) throw new Error(`grade must be more then 0`)
if (grade >= 100){ throw new Error(`grade must be less then 100`)} else {return 10*Math.sqrt(grade)}

}

const evil = (event) => {
    event.preventDefault();
    const data = getFormData(event.srcElement.id)
    grade = +data.grade
    console.log(typeof grade)
// if (typeof price !== 'number') throw new Error('price must be a number')

    console.log(`the  the factor of grade for ${grade} is ${getFactorGrade(grade)}`)
}