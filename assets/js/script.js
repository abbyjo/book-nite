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

// STORE LOCAL FORM DATA SECTION
// Add an event listener for form submissions
// submitButton.addEventListener('click', function () {

//     // Need Help here
//     // Gets the value of the checked boxes
//     var checkedBoxes = document.querySelectorAll(`checkbox`)
//     console.log(checkedBoxes)

//     // Gets the value of the toggle switch
//     var toggleSwitch = document.getElementById(`flexSwitchCheckChecked`).checked
//     // Save the toggle switch value in localStorage.
//     localStorage.setItem('toggleSwitch', toggleSwitch);

//     // Retrieve the users name.
//     var toggleSwitch = localStorage.getItem('toggleSwitch');
//     console.log(toggleSwitch)
// });

// DRINK SECTION

// API Call for a random cocktail
// www.thecocktaildb.com/api/json/v1/1/random.php
// API Call for filter by non Alcoholic Drink
// www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic

// HELP- how do I make this apply only to the results html page
window.onload() = getDrink();

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