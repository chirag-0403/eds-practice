export default function decorate(block) {
  block.classList.add('promo-banner');

  const heading = block.querySelector('h1, h2, h3');
  if (heading) {
    heading.classList.add('promo-heading');
  }

  const paragraph = block.querySelector('p');
  if (paragraph) {
    paragraph.classList.add('promo-description');
  }

  const link = block.querySelector('a');
  if (link) {
    link.classList.add('promo-button');
  }
}
