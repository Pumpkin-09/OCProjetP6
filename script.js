

function affichageInfoFilms(urlCategorie,baliseCategorie){
    fetch(urlCategorie)
    .then(response => response.json())
    .then(dataFilms =>{
        dataFilms.results.forEach((film, index) => {
            const url_film = film.url;

        fetch(url_film)
            .then(response => response.json())
            .then(dataFilm => {
                document.querySelector(`${baliseCategorie} .film_${index} img`).src = dataFilm.image_url;
                document.querySelector(`${baliseCategorie} .film_${index} .info_film h2`).textContent = dataFilm.title;
                
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-titre`).textContent = dataFilm.title;
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-genre`).textContent = dataFilm.genres;
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-date-sortie`).textContent = dataFilm.date_published;
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-classification`).textContent = dataFilm.rated;
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-score`).textContent = dataFilm.imdb_score;
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-realisateur`).textContent = dataFilm.directors;
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-acteurs`).textContent = dataFilm.actors;
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-duree`).textContent = dataFilm.duration;
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-pays`).textContent = dataFilm.countries;
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-recettes`).textContent = dataFilm.worldwide_gross_income;
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-description`).textContent = dataFilm.long_description;
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale img`).src = dataFilm.image_url;
            })
        })
    })
}


document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes&page_size=1')
        .then(response => response.json())
        .then(data => {
            const url_meilleur_film = data.results[0].url;

        fetch(url_meilleur_film)
            .then(response => response.json())
            .then(dataFilm =>{
            document.querySelector('.meilleur_film .element1 h2').textContent = dataFilm.title;
            document.querySelector('.meilleur_film .element2 img').src = dataFilm.image_url;
            document.querySelector('.meilleur_film .element3 p').textContent = dataFilm.description;

        })
    
        fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7')
            .then(response => response.json())
            .then(dataFilms => {
                let compteur_film = 0;
                dataFilms.results.forEach((film, index) => {
                    const url_films = film.url;
                    if (url_films === url_meilleur_film){
                        // le film est identique au meilleur film, on ne fait rien
                    }
                    else{
                        fetch(url_films)
                            .then(response => response.json())
                            .then(dataMeilleursFilms => {
                        document.querySelector(`.categorie_film_1 .film_${index} img`).src = dataMeilleursFilms.image_url
                        document.querySelector(`.categorie_film_1 .film_${index} .info_film h2`).textContent = dataMeilleursFilms.title
                        })
                    }
                    compteur_film ++
                    if (compteur_film >= 6) {
                        // nous avons les 6 films necessaire, nous arretons la boucle.
                        return;
                    }
            })
        })
    })
    affichageInfoFilms('http://localhost:8000/api/v1/titles/?genre=horror&sort_by=-imdb_score&page_size=6', '.categorie_film_2')
    affichageInfoFilms('http://localhost:8000/api/v1/titles/?genre=Comedy&sort_by=-imdb_score&page_size=6', '.categorie_film_3')




document.querySelectorAll('.bouton_1').forEach(button => {
    button.addEventListener('click', () => {
        const modalConteneur = button.parentElement.querySelector('.modale-conteneur');
        modalConteneur.classList.add('active');
        const fermerModale = modalConteneur.querySelector('.fermer-modale');
        fermerModale.addEventListener('click', () => {
            modalConteneur.classList.remove('active');
        });
    });
});
});







"http://localhost:8000/api/v1/genres/?page_size=30"
