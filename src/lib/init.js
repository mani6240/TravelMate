// Global initializers for legacy DOM-based behaviors (menu, tabs, modals)
export function initTabs(root = document) {
  const tabButtons = root.querySelectorAll('.tab-btn');
  if (!tabButtons.length) return;
  tabButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      const parent = btn.closest('[data-tabs]') || document;
      const name = btn.dataset.tab;
      if (!name) return;
      const activeBtn = parent.querySelector('.tab-btn.active');
      if (activeBtn) activeBtn.classList.remove('active');
      btn.classList.add('active');
      const contents = parent.querySelectorAll('.tab-content');
      contents.forEach(c => c.classList.remove('active'));
      const target = parent.querySelector(`.tab-content[data-tab="${name}"]`);
      if (target) target.classList.add('active');
    });
  });
}

export function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  if (!toggle) return;
  const nav = document.querySelector('header nav');
  toggle.addEventListener('click', () => {
    if (!nav) return;
    nav.classList.toggle('open');
    toggle.classList.toggle('open');
  });
}

export function initNavActive() {
  const links = document.querySelectorAll('header nav a, .sidebar a');
  links.forEach(a => {
    try { a.classList.remove('active'); } catch(e){}
    const href = a.getAttribute('href') || '';
    if (href && (location.pathname === href || location.pathname.endsWith(href.replace('./','')))) {
      a.classList.add('active');
    }
  });
}

export function initModalCloseOnBackdrop() {
  document.addEventListener('click', e => {
    const modal = e.target.closest('.modal');
    if (!modal) return;
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });
}

export function initAll() {
  try { initMobileMenu(); } catch(e){}
  try { initTabs(); } catch(e){}
  try { initNavActive(); } catch(e){}
  try { initModalCloseOnBackdrop(); } catch(e){}
}

export default initAll;
