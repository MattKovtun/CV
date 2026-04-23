(function () {
  const body = document.body;
  const buttons = document.querySelectorAll('[data-mode]');

  function apply(mode) {
    body.classList.remove('mode-short', 'mode-long');
    body.classList.add('mode-' + mode);
    buttons.forEach(b => {
      b.classList.toggle('active', b.dataset.mode === mode);
      b.setAttribute('aria-selected', b.dataset.mode === mode ? 'true' : 'false');
    });
    try { localStorage.setItem('cv-mode', mode); } catch (e) {}
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => apply(btn.dataset.mode));
  });

  try {
    const saved = localStorage.getItem('cv-mode');
    if (saved === 'short' || saved === 'long') apply(saved);
  } catch (e) {}

  window.switchMode = apply;

})();
