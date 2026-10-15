export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];

    cells.forEach((cell) => {
      const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        heading.classList.add('promo-heading');
      }

      const paragraph = cell.querySelector('p');
      if (paragraph) {
        paragraph.classList.add('promo-description');
      }

      cell.querySelectorAll('a').forEach((link) => {
        link.classList.add('promo-button');
      });
    });
  });

  block.classList.add('promo-banner');
}
