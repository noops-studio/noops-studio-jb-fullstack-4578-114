const populate = () => {

    const animals = ['dog', 'cat','fish']
    const container = document.getElementById('container')

    animals.forEach((animal) => {
        const li = document.createElement('li')
        li.innerHTML = animal
        container.appendChild(li)
    })
    

}