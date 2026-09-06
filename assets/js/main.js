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

document.querySelectorAll('[data-slider]').forEach((slider) => {
  const slides = [...slider.querySelectorAll('.slides img')];
  const dots = slider.querySelector('.slide-dots');
  let current = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `slide-dot${index === 0 ? ' active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `View image ${index + 1}`);
    dot.addEventListener('click', () => showSlide(index));
    dots.appendChild(dot);
  });

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === current));
    dots.querySelectorAll('.slide-dot').forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === current));
  };

  slider.querySelector('.slide-prev').addEventListener('click', () => showSlide(current - 1));
  slider.querySelector('.slide-next').addEventListener('click', () => showSlide(current + 1));

  let autoAdvance = setInterval(() => showSlide(current + 1), 4000);
  const pauseAutoAdvance = () => clearInterval(autoAdvance);
  const resumeAutoAdvance = () => {
    clearInterval(autoAdvance);
    autoAdvance = setInterval(() => showSlide(current + 1), 4000);
  };
  slider.addEventListener('mouseenter', pauseAutoAdvance);
  slider.addEventListener('mouseleave', resumeAutoAdvance);
  slider.addEventListener('focusin', pauseAutoAdvance);
  slider.addEventListener('focusout', resumeAutoAdvance);
});