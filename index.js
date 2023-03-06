let moviesListArr = []
let movieListHtml
let searchText 
let i = 0;
let watchlistArr = []

// EVENT LISTENER TO SEARCH BTN

document.getElementById("search-btn").addEventListener('click', function() {   
    searchText = document.getElementById("search-input").value 
    fetchMoviesList(searchText)
})

document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        event.preventDefault()
        document.getElementById("search-btn").click()
    }
})

// FETCH MOVIES LIST  
function fetchMoviesList(searchText) {
    document.getElementById("search-input").value = ""
    fetch(`https://www.omdbapi.com/?apikey=278029f2&s=${searchText}`)
        .then((response) => response.json())
        .then((data) => { 
            if (data.Response === "False") {
                    document.getElementById("movie-list").innerHTML = `
                        <div class="empty-list">
                        <p2>Unable to find what you’re looking for. Please try another search.</p2>
                        </div>
                    `
            } else {
                secondFetchMoviesList(data.Search)
            }        
        })
}

// FETCH MOVIES OBJECTS WITH MOVIES IDS ARRAY
function secondFetchMoviesList(data) {
    document.getElementById("movie-list").innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        fetch(`https://www.omdbapi.com/?apikey=278029f2&i=${data[i].imdbID}`)
        .then((response) => response.json())
        .then((data) => renderMovies(data))
    }
}

// RENDER MOVIES 
function renderMovies(data){
        if (!data) {
            document.getElementById("movie-list").innerHTML = `
                <div class="empty-list">
                    <p2>Unable to find what you’re looking for. Please try another search.</p2>
                </div>
             `
        } else {
            document.getElementById("movie-list").innerHTML += `
            <li class="movie">
                <div>
                    <img class="movie-pic" src="${data.Poster}">
                </div>
                <div class="movie-info">
                        <div class="movie-name-rating">
                            <h3>${data.Title}</h3>
                            <i class="fa-solid fa-star"></i>
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="movie-meta-data">
                                    <h4>${data.Runtime}</h4>
                                    <h4>${data.Genre}</h4>
                                    <button class="add-to-watchlist-btn" id="${data.imdbID}"> 
                                            <i class="fa-solid fa-circle-plus black"></i> Watchlist
                                    </button>
                        </div>
                        <div>
                            <p>${data.Plot}</p>
                        </div>
                </div>
            </li>
            `
        }
}

// ADD TO WATCHLIST 

document.getElementById("movie-list").addEventListener('click', (e) => addToWatchlist(e))
        
function addToWatchlist(e) {
    if (e.target.id) {
        watchlistArr.push(e.target.id)
        localStorage.setItem('watchlist', JSON.stringify(watchlistArr));
        document.getElementById(e.target.id).disabled = true
    } 
}
