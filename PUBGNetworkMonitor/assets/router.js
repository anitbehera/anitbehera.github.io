const basePath = '/PUBGNetworkMonitor';
const routes = {
  '/': `${basePath}/pages/investigate.html`,
  '/investigate': `${basePath}/pages/investigate.html`,
  '/contact': `${basePath}/pages/contact.html`
};

async function router() {
  const path = location.hash.slice(1) || '/';
  const htmlPath = routes[path] || `${basePath}/pages/404.html`;

  try {
    const res = await fetch(htmlPath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    document.getElementById('app').innerHTML = await res.text();
  } catch (err) {
    document.getElementById('app').innerHTML = '<h1>⚠️ Error loading page</h1>';
    console.error(err);
  }

  highlightActiveLink(path);

  // Smooth scroll inside #app only
  const app = document.getElementById('app');
  app.scrollTo({ top: 0, behavior: 'smooth' });
}

function highlightActiveLink(path) {
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${path}`);
  });
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
