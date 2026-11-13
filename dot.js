const dot = document.querySelector('.dot');
const root = document.documentElement;

function toggleTheme() {
  const isLight = root.classList.toggle('light');
  try {
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  } catch (e) {}
}

dot.addEventListener('click', () => {
  if (!document.startViewTransition ||
      matchMedia('(prefers-reduced-motion: reduce)').matches) {
    toggleTheme();
    return;
  }

  const r = dot.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  root.style.setProperty('--reveal-x', x + 'px');
  root.style.setProperty('--reveal-y', y + 'px');
  root.style.setProperty('--reveal-r', radius + 'px');

  document.startViewTransition(toggleTheme);
});