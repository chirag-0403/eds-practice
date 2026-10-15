
/* blocks/custom-hero/custom-hero.js */

function getRowContent(row) {
  const cells = [...row.children];

  if (cells.length < 2) {
    return null;
  }

  return {
    label: cells[0].textContent.trim().toLowerCase(),
    content: cells[1],
  };
}

export default function decorate(block) {
  const rows = [...block.children]
    .map(getRowContent)
    .filter(Boolean);

  const getContent = (label) =>
    rows.find((row) => row.label === label)?.content;

  const eyebrow = getContent('eyebrow')?.textContent.trim() || '';
  const heading = getContent('heading')?.textContent.trim() || '';
  const description =
    getContent('description')?.textContent.trim() || '';

  const ctaCell = getContent('cta');
  const imageCell = getContent('image');

  const originalLink = ctaCell?.querySelector('a');
  const originalPicture = imageCell?.querySelector('picture');
  const originalImage = imageCell?.querySelector('img');

  const hero = document.createElement('div');
  hero.className = 'custom-hero__inner';

  const content = document.createElement('div');
  content.className = 'custom-hero__content';

  if (eyebrow) {
    const eyebrowElement = document.createElement('p');
    eyebrowElement.className = 'custom-hero__eyebrow';
    eyebrowElement.textContent = eyebrow;
    content.append(eyebrowElement);
  }

  if (heading) {
    const headingElement = document.createElement('h1');
    headingElement.className = 'custom-hero__title';
    headingElement.textContent = heading;
    content.append(headingElement);
  }

  if (description) {
    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'custom-hero__description';
    descriptionElement.textContent = description;
    content.append(descriptionElement);
  }

  if (originalLink) {
    const link = document.createElement('a');
    link.className = 'custom-hero__cta';
    link.href = originalLink.href;
    link.textContent = originalLink.textContent.trim();
    content.append(link);
  }

  hero.append(content);

  if (originalPicture || originalImage) {
    const media = document.createElement('div');
    media.className = 'custom-hero__media';

    if (originalPicture) {
      media.append(originalPicture.cloneNode(true));
    } else {
      media.append(originalImage.cloneNode(true));
    }

    hero.append(media);
  }

  block.replaceChildren(hero);
}
