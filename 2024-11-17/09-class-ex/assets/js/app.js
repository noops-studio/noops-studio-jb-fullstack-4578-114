let saveFormData = () => {
  const form = document.getElementById('formEx');

  if (!form) {
    console.error('Form not found');
    return;
  }

  const formData = new FormData(form);

  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }  

  console.log(data);
  localStorage.setItem('name', data['name']);
  localStorage.setItem('color', data['color']);
}

let changeP = () => {
  const paragraph = document.getElementById('paragraph');
  const color = localStorage.getItem('color');
  const name = localStorage.getItem('name');

  if (!paragraph) {
    console.error('Paragraph not found');
    return;
  }

  paragraph.innerHTML = `Hello ${name}`;
  paragraph.style.backgroundColor = color;
  paragraph.style.color = color === '#000000' ? 'white' : 'black';
}

