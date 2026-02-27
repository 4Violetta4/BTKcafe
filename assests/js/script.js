(function () { //важно!! Чтобы не могли обратиться
    `use strict`
    fetch('https://api.jsonsilo.com/public/5c002cb3-8a58-43be-9c97-e1922f452414')
        .then(response => response.json())
        .then(data => {
            renderCatalog(data);
        })
        .catch(error => console.error('Ошибка:', error));


    function renderCatalog(data) {
        const catalog = document.getElementById('catalog');
        catalog.classList.add('container');

        function renderStars(rating) {
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                const active = rating >= i ? 'active' : '';
                starsHTML += `<span class="star ${active}" data-value="${i}">★</span>`;
            }
            return starsHTML;
        }

        data.forEach(category => {
            // let section = '';
            // section += `<section>`;
            // section += `<div class="container__card">`;
            // section += `<h2>${category.name}</h2>`;

            const section = document.createElement('section');
            section.id = category.id;

            const container = document.createElement('div');
            container.classList.add('container__card');

            const title = document.createElement('h2');
            title.textContent = category.name;

            section.appendChild(title);

            category.list.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card');

                const picture = document.createElement('picture');

                const sourceWebp = document.createElement('source');
                sourceWebp.srcset = item.image.webp;
                sourceWebp.type = 'image/webp';

                const sourceJpg = document.createElement('source');
                sourceJpg.srcset = item.image.jpg;
                sourceJpg.type = 'image/jpeg';

                const imgCard = document.createElement('img');
                imgCard.classList.add('imgCard');
                imgCard.src = item.image.jpg;
                imgCard.alt = item.name;

                picture.appendChild(sourceWebp);
                picture.appendChild(sourceJpg);
                picture.appendChild(imgCard);

                const cardText = document.createElement('div');
                cardText.classList.add('Card_text');

                const nameVariant = document.createElement('h4');
                nameVariant.textContent = item.name;
                cardText.appendChild(nameVariant);

                if (item.variant) {

                    item.variant.forEach(variant => {

                        const p = document.createElement('p');
                        p.textContent =
                            `${variant.size} ${variant.unit} — ${variant.price} ${variant.currency}`;

                        cardText.appendChild(p);
                    });

                } else {

                    const p = document.createElement('p');
                    p.textContent =
                        `${item.price} ${item.currency}`;

                    cardText.appendChild(p);
                }

                const ratingDiv = document.createElement('div');
                ratingDiv.classList.add('rating');

                ratingDiv.innerHTML = renderStars(item.rating || 0);
                cardText.appendChild(ratingDiv);

                ratingDiv.addEventListener('click', (e) => {
                    if (e.target.classList.contains('star')) {
                        item.rating = parseInt(e.target.dataset.value);
                        ratingDiv.innerHTML = renderStars(item.rating);
                    }
                });

                card.appendChild(imgCard);
                card.appendChild(cardText);

                container.appendChild(card);
            });
            section.appendChild(container);
            catalog.appendChild(section);

        })
    }

    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');

        loader.addEventListener('transitionend', () => {
            loader.remove();
        });
    });
})();