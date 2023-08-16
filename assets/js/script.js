// GLOBAL VARIABLES
var drinkImageEl = document.getElementById(`drinkImage`)
var drinkName = document.getElementById(`drinkName`)
var drinkRecipeEl = document.getElementById(`drinkRecipe`)
var apiCocktailURL = `https://www.thecocktaildb.com/api/json/v1/1/random.php`
var submitButton = document.getElementById(`submitButton`)
var drinkRefreshBtn = document.getElementById(`drink-refresh`)
var bookRefreshBtn = document.getElementById(`book-refresh`)
var musicRefreshBtn = document.getElementById(`music-refresh`)

// DRINK SECTION ---------------------------------------->

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

// MUSIC SECTION ---------------------------------------->
var music = [
 
     '<iframe width="560" height="315" src="https://www.youtube.com/embed/NPyiLkNf_0c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
     '<iframe width="560" height="315" src="https://www.youtube.com/embed/gGOpElxqlQw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
     '<iframe width="560" height="315" src="https://www.youtube.com/embed/o26qoCYLdS8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
     '<iframe width="560" height="315" src="https://www.youtube.com/embed/3VNm3rGXPXs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
     '<iframe width="560" height="315" src="https://www.youtube.com/embed/htnobkrtDoo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
]

function getMusic() {
    var y=Math.floor(Math.random() * 5)
    document.getElementById("music").innerHTML= music[y]
    }

//Runs functions
getBooks();
getDrink();    
getMusic();

//REFRESH BUTTON FEATURE
drinkRefreshBtn.addEventListener(`click`, function () {
    getDrink();
})

bookRefreshBtn.addEventListener(`click`, function () {
    getBooks();
})

musicRefreshBtn.addEventListener(`click` , function() {
    getMusic();
})
