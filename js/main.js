document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('#menu-toggle');
  const mainNav = document.querySelector('#main-nav');
  const menuOpenIcon = document.querySelector('#menu-open-icon');
  const menuCloseIcon = document.querySelector('#menu-close-icon');
  const backToTop = document.querySelector('#back-to-top');
  const currentYear = document.querySelector('#current-year');
  const navLinks = [...document.querySelectorAll('.nav-link, .nav-contact')];
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const projectCards = [...document.querySelectorAll('[data-project-categories]')];

  const setMenuState = (isOpen) => {
    if (!menuToggle || !mainNav) return;

    mainNav.classList.toggle('hidden', !isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    menuOpenIcon?.classList.toggle('hidden', isOpen);
    menuCloseIcon?.classList.toggle('hidden', !isOpen);
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) setMenuState(false);
  });

  // Animações de entrada acionadas apenas quando os elementos entram na viewport.
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Filtro simples dos projetos sem dependências externas.
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';

      filterButtons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');

      projectCards.forEach((card) => {
        const categories = (card.dataset.projectCategories || '').split(' ');
        const shouldShow = filter === 'all' || categories.includes(filter);
        card.classList.toggle('is-hidden', !shouldShow);
      });
    });
  });

  const updateBackToTop = () => {
    backToTop?.classList.toggle('is-visible', window.scrollY > 550);
  };

  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  // Mantém o link da seção atual destacado durante a navegação.
  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const currentId = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));
  }
});
