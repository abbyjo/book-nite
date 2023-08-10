// GLOBAL VARIABLES
// Drink Image
var drinkImageEl = document.getElementById(`drinkImage`)
// Drink Recipe
var drinkRecipeEl = document.getElementById(`drinkRecipe`)

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
    getRandomAlcoholicDrink();

    function getRandomAlcoholicDrink() {
        var apiCocktailURL = `https://www.thecocktaildb.com/api/json/v1/1/random.php`
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
        }

    }

    //function getRandomNonAlcoholicDrink () {

    //    }
   
    // End of Drink Function Wrap
}