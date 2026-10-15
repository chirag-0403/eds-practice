function getCellText(cell) {
    return cell?.textContent.trim() || '';
}

export default function decorate(block) {
    const rows = [...block.children].map((row) => [...row.children]);
    const firstRow = rows[0] || [];
    const headers = firstRow.map((cell) => getCellText(cell).toLowerCase());
    const hasHeaders = headers.includes('image') && headers.includes('title');
    const slidesData = hasHeaders ? rows.slice(1) : rows;

    const carousel = document.createElement('div');
    carousel.className = 'carousel-container';

    const slides = document.createElement('div');
    slides.className = 'carousel-slides';

    slidesData.forEach((cells, index) => {
        if (cells.length < 3) return;

        const slide = document.createElement('article');
        slide.className = 'carousel-slide';
        slide.hidden = index !== 0;

        const imageCell = cells[0];
        const titleCell = cells[1];
        const descriptionCell = cells[2];
        const ctaCell = cells[3];

        const image = imageCell.querySelector('picture, img');
        if (image) {
            const media = document.createElement('div');
            media.className = 'carousel-media';
            media.append(image.cloneNode(true));
            slide.append(media);
        }

        const content = document.createElement('div');
        content.className = 'carousel-content';

        const title = document.createElement('h2');
        title.className = 'carousel-title';
        title.textContent = getCellText(titleCell);
        content.append(title);

        const description = document.createElement('p');
        description.className = 'carousel-description';
        description.textContent = getCellText(descriptionCell);
        content.append(description);

        const originalLink = ctaCell?.querySelector('a');
        if (originalLink) {
            const link = document.createElement('a');
            link.className = 'carousel-cta';
            link.href = originalLink.href;
            link.textContent = getCellText(originalLink) || 'Explore more';
            content.append(link);
        }

        slide.append(content);
        slides.append(slide);
    });

    const slideItems = [...slides.children];
    if (!slideItems.length) return;

    const controls = document.createElement('div');
    controls.className = 'carousel-controls';

    const previous = document.createElement('button');
    previous.className = 'carousel-prev';
    previous.type = 'button';
    previous.setAttribute('aria-label', 'Previous slide');
    previous.textContent = '‹';

    const next = document.createElement('button');
    next.className = 'carousel-next';
    next.type = 'button';
    next.setAttribute('aria-label', 'Next slide');
    next.textContent = '›';

    const dots = document.createElement('div');
    dots.className = 'carousel-dots';

    let currentIndex = 0;
    const dotButtons = slideItems.map((slide, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', `Show slide ${index + 1}`);
        dot.addEventListener('click', () => showSlide(index));
        dots.append(dot);
        return dot;
    });

    function showSlide(index) {
        currentIndex = (index + slideItems.length) % slideItems.length;

        slideItems.forEach((slide, slideIndex) => {
            slide.hidden = slideIndex !== currentIndex;
        });

        dotButtons.forEach((dot, dotIndex) => {
            const active = dotIndex === currentIndex;
            dot.classList.toggle('active', active);
            dot.setAttribute('aria-current', active ? 'true' : 'false');
        });
    }

    previous.addEventListener('click', () => showSlide(currentIndex - 1));
    next.addEventListener('click', () => showSlide(currentIndex + 1));

    controls.append(previous, dots, next);
    carousel.append(slides, controls);
    block.replaceChildren(carousel);
    showSlide(0);
}
