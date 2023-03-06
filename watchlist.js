let watchlistArr = JSON.parse(localStorage.getItem('watchlist'))
document.getElementById("movie-list").addEventListener('click', function (e) {
    if (e.target.id) {
        removeFromWatchlist(e)
    }
})


// FETCH MOVIES FROM WATCHLIST ARRAY
function fetchWatchmoviesList(data) {
    document.getElementById("movie-list").innerHTML = ""
    //CHECK IF WATHCLIST IS EMPTY 
    if (!data.length) {
        document.getElementById("movie-list").innerHTML = `
            <div class="empty-list">
                    <p2>Your watchlist is looking a little empty...</p2>
                    <div class="placeholder">
                        <i class="fa-solid fa-circle-plus black"></i>
                        <a href="index.html"><p3>Let's add some movies...<p3></a>
                    </div>
            </div>
        `
    } else { 
        for (let i = 0; i < data.length; i++) {
            fetch(`https://www.omdbapi.com/?apikey=278029f2&i=${data[i]}`)
            .then((response) => response.json())
            .then((data) => {
                renderMovies(data)
            })
        }
    }
}



// RENDER MOVIE OBJECT
function renderMovies(data){
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
                                <button class="remove-from-watchlist-btn" id="${data.imdbID}"> 
                                    <i class="fa-sharp fa-solid fa-circle-minus"></i> Remove </button>
                    </div>
                    <div>
                        <p>${data.Plot}</p>
                    </div>
            </div>
        </li>
        `

}

// FUNCTION TO REMOVE MOVIE FROM WATCHLIST     
function removeFromWatchlist(e) {
    if (watchlistArr.length >= 1) {
        let updatedWatchlistArr = watchlistArr.filter(function (id) {
            return id !== e.target.id   
        })  
        watchlistArr = updatedWatchlistArr
        localStorage.setItem('watchlist', JSON.stringify(watchlistArr))
        fetchWatchmoviesList(watchlistArr)

    } else {
        watchlistArr = []
        localStorage.setItem('watchlist', JSON.stringify(watchlistArr))
        fetchWatchmoviesList(watchlistArr)
    }
}

fetchWatchmoviesList(watchlistArr)