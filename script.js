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

// Temporariamente, mantenha todos os blocos visíveis para facilitar a importação no Figma.
document.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));

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
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'O envio de mensagens está temporariamente desativado.';
    status.style.color = '#70757a';
  });
}


