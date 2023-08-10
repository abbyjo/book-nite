// GLOBAL VARIABLES
// Drink Image
var drinkImageEl = document.getElementById(`drinkImage`)
// Drink Name
var drinkName = document.getElementById(`drinkName`)
// Drink Recipe
var drinkRecipeEl = document.getElementById(`drinkRecipe`)

var apiCocktailURL = `https://www.thecocktaildb.com/api/json/v1/1/random.php`

// DRINK SECTION
// API Call for a random cocktail
// www.thecocktaildb.com/api/json/v1/1/random.php
// API Call for filter by non Alcoholic Drink
// www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic

// Need to toggle alcoholic vs non alcoholic drinks
// use if else statement
// if drink has the value of `Alcoholic`use the aloholic drink function
// then return the result
// else use the filter by  nonalcoholic and use math random
// then return the result
// 
getDrink();

function getDrink() {
    // Gets random drink via TheCocktailDB API
    // Create if else statement based on user toggle input

    // Calls Alcoholic Drink Function
    // getRandomAlcoholicDrink();
    // Calls NonAlcoholic Drink Function
    getRandomNonAlcoholicDrink();

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
   
    function getRandomNonAlcoholicDrink () {
        fetch(apiCocktailURL)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        var mixedDrinkInfo = data.drinks[0]
                        var alcoholicOrNah = data.drinks[0].strAlcoholic
                        console.log(data)

                        if (alcoholicOrNah === `Alcoholic`) {
                            getRandomNonAlcoholicDrink ();
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