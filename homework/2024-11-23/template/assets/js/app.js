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
    <tr>
    <td style="background-color: ${data.carColor} ;">${data.carName}</td>
    <td style="background-color: ${data.carColor} ;">${data.engineVolume}</td>
    <td style="background-color: ${data.carColor} ;"><img src="${data.imageUrl}" ></td>
    </tr>
    `
    return newHtml
}

const renderHtml = (data) => {

    const car = document.getElementById('carsContainer')
    car.innerHTML += data
}

const addCarToTable = (formId) => {
    // event.preventDefault();


    const data = getFormData(formId);
    console.log(data);
    console.log(data.carName);
    saveCarToLocalStorage(data)

    let htmlRaw = ''
    htmlRaw += generateHtml(data)
    console.log(htmlRaw)
    renderHtml(htmlRaw)
    clearForm(formId)
};

const saveCarToLocalStorage = (data) => {
    let cars = JSON.parse(localStorage.getItem('cars')) || [];
    cars.push(data);
    localStorage.setItem('cars', JSON.stringify(cars));
}

const init = () => {
    let cars = JSON.parse(localStorage.getItem('cars')) || [];
    let htmlRaw = '';
    for (let i = 0; i < cars.length; i++) {
        htmlRaw += generateHtml(cars[i]);
    }
    renderHtml(htmlRaw);
};
init();


// const init = () => {
//     let cars = JSON.parse(localStorage.getItem('cars')) || [];
//     let htmlRaw = '';
//     cars.forEach(car => {
//         htmlRaw += generateHtml(car)
//     });
//     renderHtml(htmlRaw)
// }
// init()