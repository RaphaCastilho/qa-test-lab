document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || 'dashboard';
  const links = [
    { href: 'index.html', label: 'Dashboard', id: 'dashboard' },
    { href: 'scenarios.html', label: 'Scenarios', id: 'scenarios' },
    { href: 'history.html', label: 'History', id: 'history' },
    { href: 'endpoints.html', label: 'Endpoints', id: 'endpoints' },
    { href: 'tests.html', label: 'Test Guide', id: 'tests' },
  ];

  const navHtml = `
    <nav class="navbar">
      <div class="navbar-inner">
        <a href="index.html" class="navbar-brand">
          <span class="brand-dot"></span>
          <span>QA Test Lab</span>
        </a>
        <div class="navbar-links">
          ${links.map(l => `<a href="${l.href}" class="${l.id === page ? 'active' : ''}">${l.label}</a>`).join('')}
        </div>
      </div>
    </nav>`;

  document.getElementById('navbar').innerHTML = navHtml;
  document.getElementById('footer').innerHTML = `
    <footer class="footer">
      QA Test Lab &mdash; Playwright Automation Showcase &bull; ${new Date().getFullYear()}
    </footer>`;
});
