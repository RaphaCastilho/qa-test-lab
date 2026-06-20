document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || 'dashboard';
  const links = [
    { href: 'index.html', label: 'Dashboard', id: 'dashboard' },
    { href: 'scenarios.html', label: 'Scenarios', id: 'scenarios' },
    { href: 'history.html', label: 'History', id: 'history' },
    { href: 'endpoints.html', label: 'Endpoints', id: 'endpoints' },
    { href: 'test-cases.html', label: 'Test Cases', id: 'test-cases' },
    { href: 'bug-reports.html', label: 'Bug Reports', id: 'bug-reports' },
    { href: 'status-report.html', label: 'Status Report', id: 'status-report' },
    { href: 'projects.html', label: 'Projects', id: 'projects' },
    { href: 'tests.html', label: 'Test Guide', id: 'tests' },
  ];

  const navHtml = `
    <nav class="navbar">
      <div class="navbar-inner">
        <a href="index.html" class="navbar-brand">
          <span class="brand-dot"></span>
          <span>Playwright QA Lab</span>
        </a>
        <div class="navbar-links">
          ${links.map(l => `<a href="${l.href}" class="${l.id === page ? 'active' : ''}">${l.label}</a>`).join('')}
        </div>
      </div>
    </nav>`;

  document.getElementById('navbar').innerHTML = navHtml;
  document.getElementById('footer').innerHTML = `
    <footer class="footer">
      Playwright QA Lab &mdash; Playwright Automation Showcase &bull; ${new Date().getFullYear()}
    </footer>`;
});
