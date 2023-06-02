const site = "http://localhost:8000/api/v1/titles/";
let imdb_score = site+"?sort_by=-votes,-imdb_score&page_size=7"; //Les 7 meilleurs films
let urlGenre = site+"?sort_by=-votes,-imdb_score&page_size=7&genre="; // Les 7 meilleurs films par genre

function fetchingApiViaUrl(url) {
    return fetch(url)
    .then((response) => {
        return response.json()
    })
}

function slideArrowsFunction(genre, left_arrow, right_arrow) {

    for (var i = 0; i < left_arrow.length; i++) {
        let arrow_prev = left_arrow[i]
        arrow_prev.addEventListener("click", () => {
              genre.scrollBy(-180, 0);
        })
    }
    for (var i = 0; i < right_arrow.length; i++) {
        let arrow_next = right_arrow[i]
        arrow_next.addEventListener("click", () => {
            genre.scrollBy(+180, 0);
        })
    }

}

fetchingApiViaUrl(imdb_score)
.then(data => {
    let best_film = data.results[0];
    let image = document.getElementById("bestFilm_image");
    let title = document.getElementById("bestFilm_title");


    //console.log(best_film);

    image.style.backgroundImage = `url('${best_film.image_url}')`;
    title.innerText = best_film.title;

    return fetch(`http://localhost:8000/api/v1/titles/${best_film.id}`);
})
.then((response) => {
    return response.json();
})
.then((filmInfo) => {
    //console.log(filmInfo);

    let description = document.getElementById("bestFilm_resume");

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

    description.innerText = filmInfo.description

    modalImage.style.backgroundImage = `url('${filmInfo.image_url}')`;
    modalTitle.innerText = "Titre: " + filmInfo.title;
    modalGenres.innerText = "Genre: " + filmInfo.genres[0];
    modalYear.innerText = "Année: " + filmInfo.year;
    modalRated.innerText = "Rated: " + filmInfo.rated;
    modalImdb_score.innerText = "Score Imdb: " + filmInfo.imdb_score;
    modalRelease.innerText = "Réalisateurs: " + filmInfo.directors;
    modalActors.innerText = "Acteurs: " + filmInfo.actors;
    modalDuration.innerText = "Durée: " + filmInfo.duration + " min.";
    modalCountries.innerText = "Pays: " + filmInfo.countries;
    modalWorldwide_gross_income.innerText = "Résultat au Box Office: " + filmInfo.worldwide_gross_income;
    modalResume.innerText = "Résumé: \n" + filmInfo.long_description;
})


// the best films imdb ranking

fetchingApiViaUrl(imdb_score)
.then((data) => {
    let movies = data;
    let best_movies_rank = document.getElementById("rank");
    let cpt = 1;

    movies.results.forEach(function(movie){
        const movie_div = document.createElement("div");
        movie_div.classList.add("movie-cover");
        movie_div.id = 'rank-img' + cpt;
        cpt++;
        movie_div.style.backgroundImage = `url('${movie.image_url}')`;
        movie_div.id.onclick = function(){modal.style.display = "block"};
        best_movies_rank.appendChild(movie_div);
        console.log(movie_div, movie_div.id)


    })

    let left_arrow = document.getElementsByClassName("rank-arrow-left")
    let right_arrow = document.getElementsByClassName("rank-arrow-right");

    slideArrowsFunction(best_movies_rank, left_arrow, right_arrow);

    best_movies_rank.scrollLeft = 0
})

// requete des films genre Animation les mieux notés

fetchingApiViaUrl(urlGenre+'Animation')
.then((data) => {
    let movies = data;
    let best_anime_rank = document.getElementById("anime_rank");
    let cpt = 1;

    movies.results.forEach(function(movie){
        const movie_div = document.createElement("div");
        movie_div.classList.add("movie-cover");
        movie_div.id = 'anime-img' + cpt;
        cpt++;
        movie_div.style.backgroundImage = `url('${movie.image_url}')`;
        //movie_div.onclick = function(){modal.style.display = "block"};
        best_anime_rank.appendChild(movie_div);
        console.log(movie_div, movie_div.id)
    })

    let left_arrow = document.getElementsByClassName("anime-arrow-left")
    let right_arrow = document.getElementsByClassName("anime-arrow-right");

    slideArrowsFunction(best_anime_rank, left_arrow, right_arrow);

    best_anime_rank.scrollLeft = 0
})

// requete des films genre Romance les mieux notés

fetchingApiViaUrl(urlGenre+'Romance')
.then((data) => {
    let movies = data;
    let best_drama_rank = document.getElementById("drama_rank");
    let cpt = 1;

    movies.results.forEach(function(movie){
        const movie_div = document.createElement("div");
        movie_div.classList.add("movie-cover");
        movie_div.id = 'drama-img' + cpt;
        cpt++;
        movie_div.style.backgroundImage = `url('${movie.image_url}')`;
        //movie_div.onclick = function(){modal.style.display = "block"};
        best_drama_rank.appendChild(movie_div);
        console.log(movie_div, movie_div.id)
    })

    let left_arrow = document.getElementsByClassName("drama-arrow-left")
    let right_arrow = document.getElementsByClassName("drama-arrow-right");

    slideArrowsFunction(best_drama_rank, left_arrow, right_arrow);

    best_drama_rank.scrollLeft = 0
})

//// requete des films de science fictions les mieux notés

fetchingApiViaUrl(urlGenre+'Biography')
.then((data) => {
    let movies = data;
    let best_bio_rank = document.getElementById("bio_rank");
    let cpt = 1;

    console.log(movies);

    movies.results.forEach(function(movie){
        const movie_div = document.createElement("div");
        movie_div.classList.add("movie-cover");
        movie_div.id = 'bio-img' + cpt;
        cpt++;
        movie_div.style.backgroundImage = `url('${movie.image_url}')`;
        movie_div.onclick = function(){modal.style.display = "block"};
        best_bio_rank.appendChild(movie_div);
        console.log(movie_div, movie_div.id)
    })

    let left_arrow = document.getElementsByClassName("bio-arrow-left")
    let right_arrow = document.getElementsByClassName("bio-arrow-right");

    slideArrowsFunction(best_bio_rank, left_arrow, right_arrow);

    best_bio_rank.scrollLeft = 0
})

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
//function onClickSpan(){
//    modal.style.display = "none";
//}
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}