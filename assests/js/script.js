fetch('data.json')
    .then(response => response.json())
    .then(data => {
        renderCatalog(data);
    })
    .catch(error => console.error('Ошибка:', error));


function renderCatalog(data){
    const catalog=document.getElementById('catalog');

    data.forEach(category => {
        const section = document.createElement('section');

        const container = document.createElement('div');
        container.classList.add('container');

        const title = document.createElement('h2');
        title.textContent = category.name;

        container.appendChild(title);

        category.list.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('category');

            const imgCategory = document.createElement('img');
            imgCategory.classList.add('imgCategory');
            imgCategory.src = item.image;

            const categoryText = document.createElement('div');
            categoryText.classList.add('category_text');

            const nameVariant = document.createElement('h3');
            nameVariant.textContent = item.name;
            categoryText.appendChild(nameVariant);

            if (item.variant) {

                item.variant.forEach(variant => {

                    const p = document.createElement('p');
                    p.textContent =
                        `${variant.size} ${variant.unit} — ${variant.price} ${variant.currency}`;

                    categoryText.appendChild(p); // ← ВАЖНО
                });

            } else if (item.size) {

                const p = document.createElement('p');
                p.textContent =
                    `${item.size} ${item.unit} — ${item.price} ${item.currency}`;

                categoryText.appendChild(p);

            } else {

                const p = document.createElement('p');
                p.textContent =
                    `${item.price} ${item.currency}`;

                categoryText.appendChild(p);
            }

            card.appendChild(imgCategory);
            card.appendChild(categoryText);

            container.appendChild(card);
        });
        section.appendChild(container);
        catalog.appendChild(section);

    })
}