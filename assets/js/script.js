// GLOBAL VARIABLES
// Drink Image
var drinkImageEl = document.getElementById(`drinkImage`)
// Drink Name
var drinkName = document.getElementById(`drinkName`)
// Drink Recipe
var drinkRecipeEl = document.getElementById(`drinkRecipe`)
// Cocktail API URL
var apiCocktailURL = `https://www.thecocktaildb.com/api/json/v1/1/random.php`
// Submit Button
var submitButton = document.getElementById(`submitButton`)
// Drink Refresh Button
var drinkRefreshBtn = document.getElementById(`drink-refresh`)
// Book Refresh Button
var bookRefreshBtn = document.getElementById(`book-refresh`)
// Music Refresh Button
var musicRefreshBtn = document.getElementById(`music-refresh`)

// DRINK SECTION

// API Call for a random cocktail
// www.thecocktaildb.com/api/json/v1/1/random.php
// API Call for filter by non Alcoholic Drink
// www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic

var toggleSwitch = localStorage.getItem('toggleSwitch')

function getDrink() {
    // Changes drink from alcoholic to non alcoholic based on user input
    if (toggleSwitch === "true") {
        getRandomAlcoholicDrink();
    } else {
        getRandomNonAlcoholicDrink();
    }

    function getRandomAlcoholicDrink() {
        fetch(apiCocktailURL)
            .then(function (response) {
                // stores response in JSON object
                response.json()
                    .then(function (data) {
                        // Created Variable to Store Data
                        var alcDrinkInfo = data.drinks[0]
                        printAlcoholicDrink(alcDrinkInfo)
                    })
            })

        // Create new function to print the results in HTML
        function printAlcoholicDrink(drinkInfo) {
            console.log(drinkInfo)
            drinkImageEl.src = drinkInfo.strDrinkThumb
            drinkName.textContent = drinkInfo.strDrink
            drinkRecipeEl.textContent = drinkInfo.strInstructions
        }

    }

    function getRandomNonAlcoholicDrink() {
        fetch(apiCocktailURL)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        var mixedDrinkInfo = data.drinks[0]
                        var alcoholicOrNah = data.drinks[0].strAlcoholic

                        // If drink is labeled as alcoholic, run the function until it comes back false
                        if (alcoholicOrNah === `Alcoholic`) {
                            getRandomNonAlcoholicDrink();
                        } else {
                            drinkImageEl.src = mixedDrinkInfo.strDrinkThumb
                            drinkName.textContent = mixedDrinkInfo.strDrink
                            drinkRecipeEl.textContent = mixedDrinkInfo.strInstructions
                        }
                    })
            })
    }
}


// BOOK SECTION ---------------------------------------->
var bookTab = $('#book-tab')
var bookSearch = localStorage.getItem('genres')
//Function to get books based on user input
function getBooks(){
    
    var apiBookUrl = `https://openlibrary.org/search.json?sort=random&language=eng&limit=20&q=${bookSearch}`
    fetch(apiBookUrl)
        .then(function (response){
            return response.json();
        })
        //Prints data to book tab
        .then (function (data){
        i = Math.floor(Math.random() * 20)
        if (data.docs[i].cover_i)
            {bookTab.children('img').attr('src', `https://covers.openlibrary.org/b/id/${data.docs[i].cover_i}-L.jpg`)}
        else {console.log ("No cover image available :-(")}
        bookTab.children('h3').text(data.docs[i].title)
        bookTab.children('h4').text(data.docs[i].author_name)
        bookTab.children('p').html(`Curious? <a href='https://openlibrary.org${data.docs[i].key}' target='_blank' rel='noopener noreferrer'>Click here</a> to visit Open Library's catalogue and learn more!`)
    })
}

getBooks();
getDrink();

// REFRESH FEATURE
drinkRefreshBtn.addEventListener(`click`, function () {
    getDrink();
})

bookRefreshBtn.addEventListener(`click`, function () {
    getBooks();
})

var music = {
    HTML 1, <iframe width="560" height="315" src="https://www.youtube.com/embed/VnWw3IIyRXc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
    HTML 2, <iframe width="560" height="315" src="https://www.youtube.com/embed/NKDI-60H-5s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    HTML 3, <iframe width="560" height="315" src="https://www.youtube.com/embed/MPkedkkbpLM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    HTML 4, <iframe width="560" height="315" src="https://www.youtube.com/embed/3VNm3rGXPXs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    HTML 5, <iframe width="560" height="315" src="https://www.youtube.com/embed/htnobkrtDoo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
}

function getMusic() {
    fetch(youtubeURL)
        .then(function (response) {
            // stores response in JSON object
            response.json()
                .then(function (data) {
                    // Created Variable to Store Data
                    var music = data.getMusic[0]
                    printMusicPlaylist(music)
                })
        })



}
