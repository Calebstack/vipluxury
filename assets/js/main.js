const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const services = document.querySelectorAll('.service');
services.forEach((service) => {
  service.addEventListener('mouseenter', () => {
    services.forEach((item) => item.classList.remove('active'));
    service.classList.add('active');
  });
});

const enquiryForm = document.querySelector('#enquiry-form');
const formStatus = document.querySelector('.form-status');

enquiryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(enquiryForm);
  const subject = encodeURIComponent(`VIP enquiry from ${formData.get('name')}`);
  const body = encodeURIComponent(`Name: ${formData.get('name')}\nPhone: ${formData.get('phone')}\nEmail: ${formData.get('email')}\n\n${formData.get('message') || 'I would like to discuss a service.'}`);
  window.location.href = `mailto:vippatra@gmail.com?subject=${subject}&body=${body}`;
  formStatus.textContent = 'Opening your email app...';
});