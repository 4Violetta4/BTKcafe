(function () { //важно!! Чтобы не могли обратиться
    `use strict`
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderCatalog(data);
        })
        .catch(error => console.error('Ошибка:', error));


    function renderCatalog(data) {
        const catalog = document.getElementById('catalog');
        catalog.classList.add('container');

        data.forEach(category => {
            const section = document.createElement('section');

            const container = document.createElement('div');
            container.classList.add('container__card');

            const title = document.createElement('h2');
            title.textContent = category.name;

            section.appendChild(title);

            category.list.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card');

                const imgCard = document.createElement('img');
                imgCard.classList.add('imgCard');
                imgCard.src = item.image;

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