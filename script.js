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
    fetch('http://localhost:8000/api/v1/titles/?genre=horror&sort_by=-imdb_score&page_size=6')
        .then(response => response.json())
        .then(dataFilmsHorror =>{
            dataFilmsHorror.results.forEach((film, index) => {
                const url_horror_film = film.url;

            fetch(url_horror_film)
                .then(response => response.json())
                .then(dataFilmHorror => {
                    document.querySelector(`.categorie_film_2 .film_${index} img`).src = dataFilmHorror.image_url
                    document.querySelector(`.categorie_film_2 .film_${index} .info_film h2`).textContent = dataFilmHorror.title
                })
            })
        })
    fetch('http://localhost:8000/api/v1/titles/?genre=Comedy&sort_by=-imdb_score&page_size=6')
    .then(response => response.json())
    .then(dataFilmsHorror =>{
        dataFilmsHorror.results.forEach((film, index) => {
            const url_horror_film = film.url;

        fetch(url_horror_film)
            .then(response => response.json())
            .then(dataFilmHorror => {
                document.querySelector(`.categorie_film_3 .film_${index} img`).src = dataFilmHorror.image_url
                document.querySelector(`.categorie_film_3 .film_${index} .info_film h2`).textContent = dataFilmHorror.title
            })
        })
    })

})



