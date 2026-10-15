export default function decorate(block) {
  const rows = [...block.children];

  const heading = document.createElement('h2');
  heading.className = 'promo-heading';
  heading.textContent = rows[1]?.textContent.trim() || 'Welcome to Our Website';

  const description = document.createElement('p');
  description.className = 'promo-description';
  description.textContent = rows[2]?.textContent.trim()
    || 'Discover our latest products and services.';

  const button = document.createElement('a');
  button.className = 'promo-button';
  button.textContent = rows[3]?.textContent.trim() || 'Explore Now';
  button.href = '/products';

  block.replaceChildren(heading, description, button);
  block.classList.add('promo-banner');
}