const getFormData = (formId) => {
    const form = document.getElementById(`${formId}`);
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


const generateHtml = (data) => {
    const newHtml = `

    <ol style="display: inline; margin-left: -30px;">Ingredient: ${data.Ingredient}</ol>
    <span>|</span>
    <ol style="display: inline; margin-left: -30px;">Amount: ${data.Amount}</ol>
    <br>
    `
    return newHtml
}

const renderHtml = (data) => {

    const recipe = document.getElementById('recipeContainer')
    recipe.innerHTML += data
}

const addRecipe = (formId) => {
    // event.preventDefault();
    const data = getFormData(formId);

    if (data.Amount == null || data.Ingredient == null|| data.Amount == '' || data.Ingredient == '') {
        return alert(`please fill the form correcly`)
    }
    console.log(data);
    // console.log(data.carName);
    // saveCarToLocalStorage(data)

    let htmlRaw = ''
    htmlRaw += generateHtml(data)
    console.log(htmlRaw)
    renderHtml(htmlRaw)
    clearForm(formId)
};

// const saveCarToLocalStorage = (data) => {
//     let cars = JSON.parse(localStorage.getItem('cars')) || [];
//     cars.push(data);
//     localStorage.setItem('cars', JSON.stringify(cars));
// }

// const init = () => {
//     let cars = JSON.parse(localStorage.getItem('cars')) || [];
//     let htmlRaw = '';
//     for (let i = 0; i < cars.length; i++) {
//         htmlRaw += generateHtml(cars[i]);
//     }
//     renderHtml(htmlRaw);
// };
// init();


// const init = () => {
//     let cars = JSON.parse(localStorage.getItem('cars')) || [];
//     let htmlRaw = '';
//     cars.forEach(car => {
//         htmlRaw += generateHtml(car)
//     });
//     renderHtml(htmlRaw)
// }
// init()