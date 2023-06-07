const site = "http://localhost:8000/api/v1/titles/";
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

}

function modalMovieInformations(movie_id){
   url = site+movie_id
   console.log(url)
   fetchingApiViaUrl(url).then(data => {
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


        modalImage.style.backgroundImage = `url('${data.image_url}')`;
        modalTitle.innerText = "Titre: " + data.title;
        modalGenres.innerText = "Genre: " + data.genres[0];
        modalYear.innerText = "Année: " + data.year;
        modalRated.innerText = "Rated: " + data.rated;
        modalImdb_score.innerText = "Score Imdb: " + data.imdb_score;
        modalRelease.innerText = "Réalisateurs: " + data.directors;
        modalActors.innerText = "Acteurs: " + data.actors;
        modalDuration.innerText = "Durée: " + data.duration + " min.";
        modalCountries.innerText = "Pays: " + data.countries;
        modalWorldwide_gross_income.innerText = "Résultat au Box Office: " + data.worldwide_gross_income;
        modalResume.innerText = "Résumé: \n" + data.long_description;

        console.log(modalResume);

        modal.style.display = "block";
   });
}

let modal = document.getElementById("myModal");
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
let span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}


fetchingApiViaUrl(imdb_score).then(data => {
    let best_film = data.results[0];
    let best_image = document.getElementById("bestFilm_image");
    let best_title = document.getElementById("bestFilm_title");

    best_image.style.backgroundImage = `url('${best_film.image_url}')`;
    best_title.innerText = best_film.title;
    url_film_id = site+best_film.id;

    let myBtn = document.getElementById("myBtn");
    myBtn.onclick = function(){
        console.log(best_film);
        modalMovieInformations(best_film.id);
    }

    return fetchingApiViaUrl(url_film_id);
}).then((filmInfo) => {
    let best_description = document.getElementById("bestFilm_resume");
    best_description.innerText = filmInfo.description;
})


// the best films imdb ranking
fetchingApiViaUrl(imdb_score).then((data) => {

    let best_movies_rank = document.getElementById("rank");
    let left_arrow = document.getElementsByClassName("rank-arrow-left")
    let right_arrow = document.getElementsByClassName("rank-arrow-right");
    slideArrowsFunction(best_movies_rank, left_arrow, right_arrow);
    best_movies_rank.scrollLeft = 0

    let movies = data;
    let cpt = 1;

    movies.results.forEach(function(movie){
        const movie_div = document.createElement("div");
        movie_div.classList.add("movie-cover");
        movie_div_id = 'rank-img' + cpt;
        movie_div.setAttribute("id", movie_div_id);
        movie_div.style.backgroundImage = `url('${movie.image_url}')`;
        movie_div.onclick = function(){
            console.log(movie);
            modalMovieInformations(movie.id);
        }
        cpt++;
        best_movies_rank.appendChild(movie_div);
    })
});