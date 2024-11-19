document.addEventListener('DOMContentLoaded', (event) => {
    const init = () => {
        let p = document.createElement('p')
        p.textContent = 'Hello'
        document.body.appendChild(p)
        let input = document.createElement('input')
        input.id = 'textinput'
        document.body.appendChild(input)
        let submit = document.createElement('button')
        submit.id = 'submit'
        submit.textContent = 'Submit'
        document.body.appendChild(submit)
        let add = document.createElement('button')
        add.id = 'add'
        add.textContent = 'Add'
        document.body.appendChild(add)
        add.addEventListener('click', function() {
            p.textContent = input.value
        })
    }

    init()
})