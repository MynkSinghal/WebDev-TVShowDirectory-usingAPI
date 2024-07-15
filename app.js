const form = document.querySelector('#searchForm');
const imageContainer = document.querySelector('.image-container');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } };
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    clearImages();
    makeImages(res.data);
    form.elements.query.value = '';
});

const clearImages = () => {
    const images = document.querySelectorAll('.image-container .image-card');
    images.forEach(img => img.remove());
};

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;

            const imageCard = document.createElement('div');
            imageCard.classList.add('image-card');
            
            const imageCardInner = document.createElement('div');
            imageCardInner.classList.add('image-card-inner');
            
            const imageCardFront = document.createElement('div');
            imageCardFront.classList.add('image-card-front');
            imageCardFront.appendChild(img);

            const imageCardBack = document.createElement('div');
            imageCardBack.classList.add('image-card-back');
            const truncatedSummary = result.show.summary ? result.show.summary.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150) + '...' : 'No description available.';
            imageCardBack.innerHTML = `<h2>${result.show.name}</h2><p>${truncatedSummary}</p>`;

            imageCardInner.appendChild(imageCardFront);
            imageCardInner.appendChild(imageCardBack);
            imageCard.appendChild(imageCardInner);
            imageContainer.appendChild(imageCard);
        }
    }
};
