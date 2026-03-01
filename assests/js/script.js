(function () { //важно!! Чтобы не могли обратиться
    `use strict`
    let currentSort = "alphabet";

    fetch('https://api.jsonsilo.com/public/5c002cb3-8a58-43be-9c97-e1922f452414')
        .then(response => response.json())
        .then(data => {
            renderCatalog(data);
            applyCurrentSort();
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

                const savedRating = localStorage.getItem(item.name);
                if (savedRating) {
                    item.rating = parseInt(savedRating);
                }

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

                const nameVariant = document.createElement('p');
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
                ratingDiv.dataset.rating = item.rating || 0;
                ratingDiv.innerHTML = renderStars(item.rating || 0);

                ratingDiv.addEventListener('click', (e) => {
                    if (e.target.classList.contains('star')) {

                        const value = parseInt(e.target.dataset.value);

                        item.rating = value;
                        ratingDiv.dataset.rating = value;
                        localStorage.setItem(item.name, value);

                        ratingDiv.innerHTML = renderStars(value);

                        applyCurrentSort();
                    }
                });
                cardText.appendChild(ratingDiv);

                card.appendChild(picture);
                card.appendChild(cardText);
                container.appendChild(card);
            });
            section.appendChild(container);
            catalog.appendChild(section);
            checkId();

        })
        data.forEach(category => {
            const section = document.getElementById(category.id);
            sortSection(section, currentSort);
        });
    }

    function checkId(){
        setTimeout(()=>{
            if(window.location.hash){
                const id = window.location.hash.substring(1);
                const element = document.getElementById(id);
                if(element){
                element.scrollIntoView({behavior: 'smooth'});
                }console.log('Элемент не найден:', id);
            }
        },300);
    }

    function sortSection(section, type){
        const container = section.querySelector('.container__card');
        const cards = Array.from(container.querySelectorAll('.card'));

        cards.sort((a,b)=>{
            if(type === "alphabet") {
                const name1 = a.querySelector('.Card_text p').textContent.toLowerCase();
                const name2 = b.querySelector('.Card_text p').textContent.toLowerCase();
                return name1.localeCompare(name2);
            }
            if(type === "rating"){
                const rating1 = parseInt(a.querySelector('.rating').dataset.rating) || 0;
                const rating2 = parseInt(b.querySelector('.rating').dataset.rating) || 0;

                if(rating2 !== rating1) return rating2 - rating1;

                const name1 = a.querySelector('.Card_text p').textContent.toLowerCase();
                const name2 = b.querySelector('.Card_text p').textContent.toLowerCase();
                return name1.localeCompare(name2);
            }
        })
        cards.forEach(card => container.appendChild(card));
    }

    function applyCurrentSort() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => sortSection(section, currentSort));
    }

    window.addEventListener('DOMContentLoaded', () => {
        const sortSelect = document.getElementById("sortSelect");
        if (sortSelect) {
            sortSelect.addEventListener("change", function () {
                currentSort = this.value;
                applyCurrentSort();
            });
        }
    });

    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');


        loader.addEventListener('transitionend', () => {
            loader.remove();
        });
    });
})();