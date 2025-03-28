

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
                
                document.querySelector(`${baliseCategorie} .film_${index} button`).dataset.titre = dataFilm.title;
                document.querySelector(`${baliseCategorie} .film_${index} button`).dataset.genre = dataFilm.genres;
                document.querySelector(`${baliseCategorie} .film_${index} button`).dataset.date_sortie = dataFilm.date_published;
                document.querySelector(`${baliseCategorie} .film_${index} button`).dataset.classification = dataFilm.rated;
                document.querySelector(`${baliseCategorie} .film_${index} button`).dataset.imdb = dataFilm.imdb_score;
                document.querySelector(`${baliseCategorie} .film_${index} button`).dataset.realisateur = dataFilm.directors;
                document.querySelector(`${baliseCategorie} .film_${index} button`).dataset.acteurs = dataFilm.actors;
                document.querySelector(`${baliseCategorie} .film_${index} button`).dataset.duree = dataFilm.duration;
                document.querySelector(`${baliseCategorie} .film_${index} button`).dataset.pays = dataFilm.countries;
                document.querySelector(`${baliseCategorie} .film_${index} button`).dataset.recettes = dataFilm.worldwide_gross_income;
                document.querySelector(`${baliseCategorie} .film_${index} button`).dataset.resume = dataFilm.long_description;
                document.querySelector(`${baliseCategorie} .film_${index} button`).dataset.image = dataFilm.image_url;
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



})

const modalConteneur = document.querySelector('.modale-conteneur');
const modaleTrigers = document.querySelectorAll('.modale-trygger');
modaleTrigers.forEach(trigger => trigger.addEventListener("click", toggleModale))

function toggleModale(){
    modalConteneur.classList.toggle("active")
}





"http://localhost:8000/api/v1/genres/?page_size=30"
