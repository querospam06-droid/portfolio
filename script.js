const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  });
});

// Revela os blocos ao entrarem na área de leitura e esconde ao saírem dela.
const revealItems = [...document.querySelectorAll('.reveal')];
window.addEventListener('scroll', () => {
  revealItems.forEach((item) => {
    const bounds = item.getBoundingClientRect();
    const inReadingArea = bounds.top < window.innerHeight * 0.82 && bounds.bottom > window.innerHeight * 0.18;
    item.classList.toggle('is-visible', inReadingArea);
  });
}, { passive: true });

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Expande um projeto por vez e revela sua descrição logo abaixo da imagem.
document.querySelectorAll('.project-visual[aria-controls]').forEach((visual) => {
  visual.addEventListener('click', () => {
    const card = visual.closest('.project-card');
    const details = document.getElementById(visual.getAttribute('aria-controls'));
    const willExpand = visual.getAttribute('aria-expanded') !== 'true';

    document.querySelectorAll('.project-card.is-expanded').forEach((openCard) => {
      if (openCard === card) return;
      openCard.classList.remove('is-expanded');
      const openButton = openCard.querySelector('.project-visual[aria-controls]');
      const openDetails = document.getElementById(openButton.getAttribute('aria-controls'));
      openButton.setAttribute('aria-expanded', 'false');
      openDetails.hidden = true;
    });

    card.classList.toggle('is-expanded', willExpand);
    visual.setAttribute('aria-expanded', String(willExpand));
    details.hidden = !willExpand;
  });
});

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const status = document.querySelector('#contact-form-status');
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('[type="submit"]');
    submitButton.disabled = true;
    status.textContent = 'Enviando sua mensagem…';
    status.style.color = '#70757a';
    const fields = Object.fromEntries(new FormData(contactForm).entries());

    try {
      const response = await fetch('https://formsubmit.co/ajax/gabriel.fpagano@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields)
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        throw new Error('Não foi possível confirmar o envio.');
      }
      status.textContent = 'Mensagem enviada! Obrigado por entrar em contato.';
      status.style.color = '#39845a';
      contactForm.reset();
    } catch (error) {
      status.textContent = 'Não foi possível enviar. Confira se o site está publicado e se o e-mail já foi confirmado no FormSubmit.';
      status.style.color = '#b54747';
    } finally {
      submitButton.disabled = false;
    }
  });
}

