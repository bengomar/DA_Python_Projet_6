fetch("http://localhost:8000/api/v1/titles/?sort_by=-votes,-imdb_score")
.then((response) => {
    return response.json();
})
.then((data) => {
    let best_film = data.results[0];
    let image = document.getElementById("bestFilm_image");
    let title = document.getElementById("bestFilm_title");
    let modalImage = document.getElementById("modalImage");
    let modalTitle = document.getElementById("modalTitle");
    let modalGenres = document.getElementById("modalGenres");
    let modalYear = document.getElementById("modalYear");


    console.log(best_film);

    image.style.backgroundImage = `url('${best_film.image_url}')`;
    title.innerText = best_film.title;
    modalImage.style.backgroundImage = `url('${best_film.image_url}')`;
    modalTitle.innerText = "Titre: " + best_film.title;
    modalGenres.innerText = "Genres: " + best_film.genres[0];
    modalYear.innerText = "Année: " + best_film.year;
/*

*/

    return fetch(`http://localhost:8000/api/v1/titles/${best_film.id}`);
})
.then((response) => {
    return response.json();
})
.then((filmInfo) => {
    console.log(filmInfo);

    let description = document.getElementById("bestFilm_resume");
    let modalRated = document.getElementById("modalRated");
    let modalImdb_score = document.getElementById("modalImdb_score");
    let modalRelease = document.getElementById("modalRelease");
    let modalActors = document.getElementById("modalActors");
    let modalDuration = document.getElementById("modalDuration");
    let modalCountries = document.getElementById("modalCountries");
    let modalWorldwide_gross_income = document.getElementById("modalWorldwide_gross_income");
    let modalResume = document.getElementById("modalResume");

    description.innerText = filmInfo.description
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
let url_page1 = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes&page_size=7"
fetch(url_page1)
.then((response) => {
    return response.json();
})
.then((data) => {
    let movies = data;
    let best_rank = document.getElementById("rank");

    console.log(movies);

    movies.results.forEach(function(movie){
        const movie_div = document.createElement("div");
        movie_div.style.backgroundImage = `url('${movie.image_url}')`;
        movie_div.onclick = function(){modal.style.display = "block"};
        best_rank.appendChild(movie_div);

    })
})


// requete des films genre Animation les mieux notés
fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes&genre=Animation&page_size=7")
.then((response) => {
    return response.json();
})
.then((data) => {
    let movies = data;
    let best_anime_rank = document.getElementById("anime_rank");

    console.log(movies);

    movies.results.forEach(function(movie){
        const movie_div = document.createElement("div");
        movie_div.style.backgroundImage = `url('${movie.image_url}')`;
        movie_div.onclick = function(){modal.style.display = "block"};
        best_anime_rank.appendChild(movie_div);
    })
})

// requete des films genre Romance les mieux notés
fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes&genre=Romance&page_size=7")
.then((response) => {
    return response.json();
})
.then((data) => {
    let movies = data;
    let best_drama_rank = document.getElementById("drama_rank");

    console.log(movies);

    movies.results.forEach(function(movie){
        const movie_div = document.createElement("div");
        movie_div.style.backgroundImage = `url('${movie.image_url}')`;
        movie_div.onclick = function(){modal.style.display = "block"};
        best_drama_rank.appendChild(movie_div);
    })
})

// requete des films de science fictions les mieux notés
fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes&genre=Biography&page_size=7")
.then((response) => {
    return response.json();
})
.then((data) => {
    let movies = data;
    let best_fiction_rank = document.getElementById("fiction_rank");

    console.log(movies);

    movies.results.forEach(function(movie){
        const movie_div = document.createElement("div");

        movie_div.style.backgroundImage = `url('${movie.image_url}')`;
        movie_div.onclick = function(){modal.style.display = "block"};
        best_fiction_rank.appendChild(movie_div);
    })
})

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function onClickSpan(){
    console.log("Hello !!!")
    modal.style.display = "";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}