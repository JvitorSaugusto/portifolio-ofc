document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const menuToggle = document.querySelector('#menu-toggle');
  const mainNav = document.querySelector('#main-nav');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeColorMeta = document.querySelector('#theme-color-meta');
  const backToTop = document.querySelector('#back-to-top');
  const currentYear = document.querySelector('#current-year');
  const navLinks = [...document.querySelectorAll('.site-nav .nav-link, .site-nav .nav-contact')];
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const projectCards = [...document.querySelectorAll('[data-project-categories]')];

  const setMenuState = (isOpen) => {
    if (!menuToggle || !mainNav) return;
    mainNav.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) setMenuState(false);
  });

  const applyTheme = (theme, persist = true) => {
    const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = normalizedTheme;
    const isDark = normalizedTheme === 'dark';
    themeToggle?.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
    themeToggle?.setAttribute('title', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
    themeColorMeta?.setAttribute('content', isDark ? '#101915' : '#f8faf9');

    if (persist) {
      try {
        localStorage.setItem('portfolio-theme', normalizedTheme);
      } catch (_) {
        // O tema continua funcionando mesmo se o navegador bloquear o armazenamento.
      }
    }
  };

  // Sincroniza estado inicial sem sobrescrever o localStorage
  applyTheme(root.dataset.theme || 'light', false);

  themeToggle?.addEventListener('click', () => {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
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

  // Filtro local dos projetos, sem dependências externas.
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });

      projectCards.forEach((card) => {
        const categories = (card.dataset.projectCategories || '').split(/\s+/).filter(Boolean);
        const shouldShow = filter === 'all' || categories.includes(filter);
        card.hidden = !shouldShow;
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

  // Destaca no menu a seção que está na área principal da tela.
  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const currentHash = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === currentHash);
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }
});