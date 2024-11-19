const getFormData = () => {
    const form = document.getElementById('myNumberForm');
    const formData = new FormData(form); 
    const formObject = Object.fromEntries(formData.entries());

}
