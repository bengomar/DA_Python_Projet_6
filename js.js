const site = "http://localhost:8000/api/v1/titles/"; //URL de l'API
let imdb_score = site+"?sort_by=-votes,-imdb_score&page_size=7"; //Les 7 meilleurs films
let urlGenre = site+"?sort_by=-votes,-imdb_score&page_size=7&genre="; // Les 7 meilleurs films par genre

// fonction permettant la récupération de données depuis l'API.
// La fonction accepte un paramètre, une url.
function fetchingApiViaUrl(url) {
    return fetch(url)
    .then((response) => {
        return response.json()
    })
}

// fonction permettant le déplacement des images des carrousels.
// Cela à l'aide des 2 flèches aux extrémités de chaque carrousels.
function slideArrowsFunction(genre, left_arrow, right_arrow) {

// flèche de gauche
    for (var i = 0; i < left_arrow.length; i++) {
        let arrow_prev = left_arrow[i]
        arrow_prev.addEventListener("click", () => {
              genre.scrollBy(-180, 0);
        })
    }
// flèche de droite
    for (var i = 0; i < right_arrow.length; i++) {
        let arrow_next = right_arrow[i]
        arrow_next.addEventListener("click", () => {
            genre.scrollBy(+180, 0);
        })
    }
    genre.scrollLeft = 0
}

// fonction permettant l'affichage des détails d'un film dans la modal.
function ModalMovieInformations(movie_id) {
   url = site+movie_id
   //console.log(url);
   fetchingApiViaUrl(url).then(data => {
        //console.log(data);
        let modalImage = document.getElementById("modalImage");
        let modalTitle = document.getElementById("modalTitle");
        let modalGenres = document.getElementById("modalGenres");
        let modalYear = document.getElementById("modalYear");
        let modalRated = document.getElementById("modalRated");
        let modalImdb_score = document.getElementById("modalImdb_score");
        let modalRelease = document.getElementById("modalRelease");
        let modalActors = document.getElementById("modalActors");
        let modalDuration = document.getElementById("modalDuration");
        let modalCountries = document.getElementById("modalCountries");
        let modalWorldwide_gross_income = document.getElementById("modalWorldwide_gross_income");
        let modalResume = document.getElementById("modalResume");

        modal.style.display = "block";
        modalImage.style.backgroundImage = `url('${data.image_url}')`;
        modalTitle.innerText = data.title;
        modalGenres.innerText = data.genres[0];
        modalYear.innerText = data.year;
        modalRated.innerText = data.rated;
        modalImdb_score.innerText = data.imdb_score;
        modalRelease.innerText = data.directors;
        modalActors.innerText = data.actors;
        modalDuration.innerText = data.duration + " min.";
        modalCountries.innerText = data.countries;
        modalWorldwide_gross_income.innerText = data.worldwide_gross_income;
        modalResume.innerText = data.long_description;
   });
}

// Get the modal
let modal = document.getElementById("myModal");
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// Film le mieux noté
// Affichage des détails du film dans la modal
fetchingApiViaUrl(imdb_score).then(data => {
    let best_film = data.results[0];
    let best_image = document.getElementById("bestFilm_image");
    let best_title = document.getElementById("bestFilm_title");

    best_image.style.backgroundImage = `url('${best_film.image_url}')`;
    best_title.innerText = best_film.title;
    url_film_id = site+best_film.id;

    let myBtn = document.getElementById("myBtn");
    myBtn.onclick = function(){
        //console.log(best_film);
        ModalMovieInformations(best_film.id);
    }

    return fetchingApiViaUrl(url_film_id);
}).then((filmInfo) => {

    let best_description = document.getElementById("bestFilm_resume");
    best_description.innerText = filmInfo.description;
})

////////////////
// Carrousels //
////////////////

// fonction permettant la création d'un carrousel
function GetMovieInformations(movies, best_movie) {
    movies.results.forEach(function(movie){
        const movie_div = document.createElement("div");
        movie_div.classList.add("movie-cover");
        movie_div.style.backgroundImage = `url('${movie.image_url}')`;
        movie_div.onclick = function(){
            ModalMovieInformations(movie.id);
        }
        best_movie.appendChild(movie_div);
    })
}

// the best films imdb ranking
fetchingApiViaUrl(imdb_score).then((data) => {
    let best_movies_rank = document.getElementById("rank");
    GetMovieInformations(data, best_movies_rank);
    // Gestion des flèches de défilements du carrousel
    let left_arrow = document.getElementsByClassName("rank-arrow-left");
    let right_arrow = document.getElementsByClassName("rank-arrow-right");
    slideArrowsFunction(best_movies_rank, left_arrow, right_arrow);
});

// requete des films genre Animation les mieux notés
fetchingApiViaUrl(urlGenre+'Animation').then((data) => {
    let best_anime_rank = document.getElementById("anime_rank");
    GetMovieInformations(data, best_anime_rank);
    // Gestion des flèches de défilements du carrousel
    let left_arrow = document.getElementsByClassName("anime-arrow-left");
    let right_arrow = document.getElementsByClassName("anime-arrow-right");
    slideArrowsFunction(best_anime_rank, left_arrow, right_arrow);
});

// requete des films genre Romance les mieux notés
fetchingApiViaUrl(urlGenre+'Romance').then((data) => {
    let best_romance_rank = document.getElementById("romance_rank");
    GetMovieInformations(data, best_romance_rank);
    // Gestion des flèches de défilements du carrousel
    let left_arrow = document.getElementsByClassName("romance-arrow-left");
    let right_arrow = document.getElementsByClassName("romance-arrow-right");
    slideArrowsFunction(best_romance_rank, left_arrow, right_arrow);
});

// requete des films biographie les mieux notés
fetchingApiViaUrl(urlGenre+'Biography').then((data) => {
    let best_bio_rank = document.getElementById("bio_rank");
    GetMovieInformations(data, best_bio_rank);
    // Gestion des flèches de défilements du carrousel
    let left_arrow = document.getElementsByClassName("bio-arrow-left");
    let right_arrow = document.getElementsByClassName("bio-arrow-right");
    slideArrowsFunction(best_bio_rank, left_arrow, right_arrow);
});


