

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

                const datadate = dataFilm.date_published.substring(0, 4)
                let listeGenre = dataFilm.genres
                const dataGenre = listeGenre.join(", ")
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-date-sortie-genre`).textContent = `${datadate} - ${dataGenre}`;

                const dataClassification = dataFilm.rated
                const dataDuree = dataFilm.duration
                let listePays = dataFilm.countries
                let dataPays;
                if (listePays.length > 1) {
                    dataPays = listePays.join(" / ")
                }
                else {
                    dataPays = listePays[0]
                }
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-classification-duree-pays`).textContent =`${dataClassification} - ${dataDuree} minutes (${dataPays})`;

                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-score`).textContent = `IMDB score: ${dataFilm.imdb_score}/10`;

                const recette = dataFilm.worldwide_gross_income
                let dataRecettes;
                if (recette !== null){
                    dataRecettes = `Recettes au box-office: $${recette}m`
                }
                else {
                    dataRecettes = 'Recettes au box-office: inconnu'
                }
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-recettes`).textContent = dataRecettes;

                let listeRealisateur = dataFilm.directors
                let dataRealisateurs;
                if (listeRealisateur.length > 1) {
                    dataRealisateurs = listeRealisateur.join(", ")
                }
                else {
                    dataRealisateurs = listeRealisateur
                }
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-realisateur`).textContent = dataRealisateurs;
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-description`).textContent = dataFilm.long_description;

                let listeActeurs = dataFilm.actors
                let dataActeurs;
                if (listeActeurs.length > 1) {
                    dataActeurs = listeActeurs.join(", ")
                }
                else {
                    dataActeurs = listeActeurs
                }
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale #modale-acteurs`).textContent = dataActeurs;
                document.querySelector(`${baliseCategorie} .film_${index} .info_film .modale-conteneur .modale img`).src = dataFilm.image_url;
            })
        })
    })
}


function choixCategorie(url){
    fetch(url)
    .then(response => response.json())
    .then(dataFilms =>{
        dataFilms.results.forEach((film) => {
            let contenuCategorie = film.name
            let nouvelElement = document.createElement("option")
            nouvelElement.textContent = contenuCategorie
            nouvelElement.value = contenuCategorie
            let balise = document.getElementById("choixCategorie")
            balise.appendChild(nouvelElement)
            })})
}


function afficherModale() {
    const boutonsOuverture = document.querySelectorAll('.bouton_1, #element4');
    const filmImages = document.querySelectorAll('[class^="film_"] img');
  
    function ouvrirModale(elementDeclencheur) {
      const modalConteneur = elementDeclencheur.parentElement.querySelector('.modale-conteneur');
      if (modalConteneur) {
        modalConteneur.classList.add('active');
        const fermerModale = modalConteneur.querySelector('.fermer-modale');
        fermerModale.addEventListener('click', () => {
          modalConteneur.classList.remove('active');
        });

        fermerModale.removeEventListener('click', fermerModale.clickFermer);
        fermerModale.clickFermer = () => {
          modalConteneur.classList.remove('active');
          fermerModale.removeEventListener('click', fermerModale.clickFermer);
        };
        fermerModale.addEventListener('click', fermerModale.clickFermer);
      }
    }
  
    boutonsOuverture.forEach(button => {
      button.addEventListener('click', () => {
        ouvrirModale(button);
      });
    });
  
    filmImages.forEach(image => {
      image.addEventListener('click', () => {
        ouvrirModale(image);
      });
    });
}


function afficherCacherFilms(){
    const voirPlusButtons = document.querySelectorAll('[class^="voir-plus-"]');
    const voirMoinsButtons = document.querySelectorAll('[class^="voir-moins-"]');

    voirPlusButtons.forEach(button =>{
        button.addEventListener('click', function(){
            const categorieClass = this.className.replace('voir-plus-', 'categorie_film_');
            const categorie = document.querySelector('.' + categorieClass);
            const filmsToReveal = categorie.querySelectorAll('.film_4, .film_5');
            const voirMoinsButton = categorie.querySelector('.' + this.className.replace('plus', 'moins'));

            filmsToReveal.forEach(film => {
                film.style.display = 'block';
            });
            this.style.display = 'none';
            if (voirMoinsButton) {
                voirMoinsButton.style.display = 'block';
            }
        });
    });

    voirMoinsButtons.forEach(button => {
        button.addEventListener('click', function() {
          const categorieClass = this.className.replace('voir-moins-', 'categorie_film_');
          const categorie = document.querySelector('.' + categorieClass);
          const filmsToHide = categorie.querySelectorAll('.film_4, .film_5');
          const voirPlusButton = categorie.querySelector('.' + this.className.replace('moins', 'plus'));

          filmsToHide.forEach(film => {
            film.style.display = 'none';
          });
          this.style.display = 'none';
          if (voirPlusButton) {
            voirPlusButton.style.display = 'block';
          }
        });
      });
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

            document.querySelector('.meilleur_film .modale-conteneur .modale #modale-titre').textContent = dataFilm.title;

            const datadate = dataFilm.date_published.substring(0, 4)
            let listeGenre = dataFilm.genres
            const dataGenre = listeGenre.join(", ")
            document.querySelector('.meilleur_film .modale-conteneur .modale #modale-date-sortie-genre').textContent = `${datadate} - ${dataGenre}`;

            const dataClassification = dataFilm.rated
            const dataDuree = dataFilm.duration
            let listePays = dataFilm.countries
            let dataPays;
            if (listePays.length > 1) {
                dataPays = listePays.join(" / ")
            }
            else {
                dataPays = listePays[0]
            }
            document.querySelector('.meilleur_film .modale-conteneur .modale #modale-classification-duree-pays').textContent =`${dataClassification} - ${dataDuree} minutes (${dataPays})`;

            document.querySelector('.meilleur_film .modale-conteneur .modale #modale-score').textContent = `IMDB score: ${dataFilm.imdb_score}/10`;

            const recette = dataFilm.worldwide_gross_income
            let dataRecettes;
            if (recette !== null){
                dataRecettes = `Recettes au box-office: $${recette}m`
            }
            else {
                dataRecettes = 'Recettes au box-office: inconnu'
            }
            document.querySelector('.meilleur_film .modale-conteneur .modale #modale-recettes').textContent = dataRecettes;

            let listeRealisateur = dataFilm.directors
            let dataRealisateurs;
            if (listeRealisateur.length > 1) {
                dataRealisateurs = listeRealisateur.join(", ")
            }
            else {
                dataRealisateurs = listeRealisateur
            }
            document.querySelector('.meilleur_film .modale-conteneur .modale #modale-realisateur').textContent = dataRealisateurs;
            document.querySelector('.meilleur_film .modale-conteneur .modale #modale-description').textContent = dataFilm.long_description;

            let listeActeurs = dataFilm.actors
            let dataActeurs;
            if (listeActeurs.length > 1) {
                dataActeurs = listeActeurs.join(", ")
            }
            else {
                dataActeurs = listeActeurs
            }
            document.querySelector('.meilleur_film .modale-conteneur .modale #modale-acteurs').textContent = dataActeurs;
            document.querySelector('.meilleur_film .modale-conteneur .modale img').src = dataFilm.image_url;

        })
    
        fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7')
            .then(response => response.json())
            .then(dataFilms => {
                let compteur_film = 0;
                let index_balise =0;
                dataFilms.results.forEach((film) => {
                    const url_films = film.url;
                    if (url_films === url_meilleur_film){
                        // le film est identique au meilleur film, on ne fait rien
                    }
                    else{
                        fetch(url_films)
                            .then(response => response.json())
                            .then(dataMeilleursFilms => {
                        document.querySelector(`.categorie_film_1 .film_${index_balise} img`).src = dataMeilleursFilms.image_url
                        document.querySelector(`.categorie_film_1 .film_${index_balise} .info_film h2`).textContent = dataMeilleursFilms.title

                        document.querySelector(`.categorie_film_1 .film_${index_balise} .info_film .modale-conteneur .modale #modale-titre`).textContent = dataMeilleursFilms.title;

                        const datadate = dataMeilleursFilms.date_published.substring(0, 4)
                        let listeGenre = dataMeilleursFilms.genres
                        const dataGenre = listeGenre.join(", ")
                        document.querySelector(`.categorie_film_1 .film_${index_balise} .info_film .modale-conteneur .modale #modale-date-sortie-genre`).textContent = `${datadate} - ${dataGenre}`;
        
                        const dataClassification = dataMeilleursFilms.rated
                        const dataDuree = dataMeilleursFilms.duration
                        let listePays = dataMeilleursFilms.countries
                        let dataPays;
                        if (listePays.length > 1) {
                            dataPays = listePays.join(" / ")
                        }
                        else {
                            dataPays = listePays[0]
                        }
                        document.querySelector(`.categorie_film_1 .film_${index_balise} .info_film .modale-conteneur .modale #modale-classification-duree-pays`).textContent =`${dataClassification} - ${dataDuree} minutes (${dataPays})`;
        
                        document.querySelector(`.categorie_film_1 .film_${index_balise} .info_film .modale-conteneur .modale #modale-score`).textContent = `IMDB score: ${dataMeilleursFilms.imdb_score}/10`;
        
                        const recette = dataMeilleursFilms.worldwide_gross_income
                        let dataRecettes;
                        if (recette !== null){
                            dataRecettes = `Recettes au box-office: $${recette}m`
                        }
                        else {
                            dataRecettes = 'Recettes au box-office: inconnu'
                        }
                        document.querySelector(`.categorie_film_1 .film_${index_balise} .info_film .modale-conteneur .modale #modale-recettes`).textContent = dataRecettes;
        
                        let listeRealisateur = dataMeilleursFilms.directors
                        let dataRealisateurs;
                        if (listeRealisateur.length > 1) {
                            dataRealisateurs = listeRealisateur.join(", ")
                        }
                        else {
                            dataRealisateurs = listeRealisateur
                        }
                        document.querySelector(`.categorie_film_1 .film_${index_balise} .info_film .modale-conteneur .modale #modale-realisateur`).textContent = dataRealisateurs;
                        document.querySelector(`.categorie_film_1 .film_${index_balise} .info_film .modale-conteneur .modale #modale-description`).textContent = dataMeilleursFilms.long_description;
        
                        let listeActeurs = dataMeilleursFilms.actors
                        let dataActeurs;
                        if (listeActeurs.length > 1) {
                            dataActeurs = listeActeurs.join(", ")
                        }
                        else {
                            dataActeurs = listeActeurs
                        }
                        document.querySelector(`.categorie_film_1 .film_${index_balise} .info_film .modale-conteneur .modale #modale-acteurs`).textContent = dataActeurs;
                        document.querySelector(`.categorie_film_1 .film_${index_balise} .info_film .modale-conteneur .modale img`).src = dataMeilleursFilms.image_url;

                        index_balise++
                        })
                    }
                    compteur_film++
                    if (compteur_film >= 6) {
                        // nous avons les 6 films necessaire, nous arretons la boucle.
                        return;
                    }
            })
        })
    })
    affichageInfoFilms('http://localhost:8000/api/v1/titles/?genre=horror&sort_by=-imdb_score&page_size=6', '.categorie_film_2')
    affichageInfoFilms('http://localhost:8000/api/v1/titles/?genre=Comedy&sort_by=-imdb_score&page_size=6', '.categorie_film_3')
    choixCategorie('http://localhost:8000/api/v1/genres/?page_size=40')

    let baliseNom = document.getElementById('choixCategorie')
    baliseNom.selectedIndex = 0;
    const nomPremierElement = baliseNom.value
    affichageInfoFilms(`http://localhost:8000/api/v1/titles/?genre=${nomPremierElement}&sort_by=-imdb_score&page_size=6`, '.categorie_film_4')

    baliseNom.addEventListener('change', () =>{
        const nom = baliseNom.value
        affichageInfoFilms(`http://localhost:8000/api/v1/titles/?genre=${nom}&sort_by=-imdb_score&page_size=6`, '.categorie_film_4');
    })

    afficherModale()
    afficherCacherFilms()

});
















