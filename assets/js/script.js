// GLOBAL VARIABLES
// Drink Image
var drinkImageEl = document.getElementById(`drinkImage`)
// Drink Name
var drinkName = document.getElementById(`drinkName`)
// Drink Recipe
var drinkRecipeEl = document.getElementById(`drinkRecipe`)

var apiCocktailURL = `https://www.thecocktaildb.com/api/json/v1/1/random.php`
// Submit Button
var submitButton = document.getElementById(`submitButton`)

// DRINK SECTION

// API Call for a random cocktail
// www.thecocktaildb.com/api/json/v1/1/random.php
// API Call for filter by non Alcoholic Drink
// www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic

// HELP- how do I make this apply only to the results html page
//window.onload() = getDrink();

var toggleSwitch = localStorage.getItem('toggleSwitch')

function getDrink() {
    // Gets random drink via TheCocktailDB API

    // getRandomAlcoholicDrink();
    // getRandomNonAlcoholicDrink();

    if (toggleSwitch === true) {
        // Calls Alcoholic Drink Function
        getRandomAlcoholicDrink();
    } else {
        // Calls NonAlcoholic Drink Function
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
                        console.log(data)

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

    // End of Drink Function Wrap
}


// BOOK SECTION ---------------------------------------->
var bookTab = $('#book-tab')
//Function to get books based on user input
function getBooks(){
    
    var apiBookUrl = `https://openlibrary.org/search.json?sort=random&language=eng&limit=20&q=subject:thriller`
    fetch(apiBookUrl)
        .then(function (response){
            return response.json();
        })
        //prints data to book tab
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
getDrink();
getBooks();