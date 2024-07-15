const form = document.querySelector('#searchForm');
const imageContainer = document.querySelector('.image-container');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } };
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    clearImages();
    makeImages(res.data);
    form.elements.query.value = '';
});

const clearImages = () => {
    const images = document.querySelectorAll('.image-container img');
    images.forEach(img => img.remove());
};

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const card = document.createElement('div');
            card.classList.add('image-card');

            const cardInner = document.createElement('div');
            cardInner.classList.add('image-card-inner');

            const cardFront = document.createElement('div');
            cardFront.classList.add('image-card-front');
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            cardFront.appendChild(img);

            const cardBack = document.createElement('div');
            cardBack.classList.add('image-card-back');
            const title = document.createElement('h2');
            title.innerText = result.show.name;
            cardBack.appendChild(title);
            const summary = document.createElement('p');
            summary.innerHTML = result.show.summary ? result.show.summary : 'No summary available.';
            cardBack.appendChild(summary);

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);

            imageContainer.appendChild(card);
        }
    }
};
