function submitContactForm() {
  const form = document.getElementById('contactForm');

  const formData = new FormData(form);

  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  console.log(data);
}