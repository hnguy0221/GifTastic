//============================================================================
// Name        : game.js
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This file contains javascript and jquery code to implement  
//               Giphy API homework.
// Pseudocode  :
//============================================================================
var animalsArr = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", 
        "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehob",
        "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", 
        "teacup pig", "serval", "salamander", "frog"];

//============================================================================
// Name        : insertionSort
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This function sorts the animals array using insertion sort
//               algorithm.
//============================================================================
function insertionSort()
{
    var firstOutOfOrder;
    var location;
    var temp;

    for (firstOutOfOrder = 1; firstOutOfOrder < animalsArr.length; firstOutOfOrder++)
    {
        if (animalsArr[firstOutOfOrder] < animalsArr[firstOutOfOrder-1])
        {
            temp = animalsArr[firstOutOfOrder];
            location = firstOutOfOrder;
            do
            {
                animalsArr[location] = animalsArr[location-1];
                location--;
            }
            while ((location > 0) && (animalsArr[location-1] > temp));
            animalsArr[location] = temp;
        }
    }
}

//============================================================================
// Name        : seqOrderedSearch
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This function sequentially searches an item in the array. If
//               found, it returns the location of the array for that item.
//============================================================================
function seqOrderedSearch(searchItem)
{
    var i;
    var found = false;
    var location;

    for (i = 0; i < animalsArr.length; i++)
    {
        if (animalsArr[i] >= searchItem)
        {
            found = true;
            break;
        }
    }
    if (found)
    {
        if (animalsArr[i] === searchItem)
        {
            location = i;
        }
        else
        {
            location = -1;
        }
    }
    else
    {
        location = -1;
    }

    return location;
}

//============================================================================
// Name        : renderButtons
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This function displays the buttons for all the animals using
//               the animals array defined above.
//============================================================================
function renderButtons()
{
    var buttonsStr;

    insertionSort();

    buttonsStr = "";
    for (var i = 0; i < animalsArr.length; i++)
    {
        buttonsStr += "<button type='button' class='btn btn-default animal' " +
            "data-name='" + animalsArr[i] + "'>" + animalsArr[i] + "</button>";
    }
    $("#buttons-view").html(buttonsStr);
}

//============================================================================
// Name        : reset
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This function resets the animal input text field to empty 
//               string after adding an animal.
//============================================================================
function reset()
{
    $("#animal-input").val("");
}

//============================================================================
// Name        : displayAnimalInfo
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This function displays information about animal when the user
//               selects the animal button.
//============================================================================
function displayAnimalInfo()
{
    var animalStr;
    var img_still;
    var rated;
    var animal = $(this).attr("data-name");
    var api_key = "dc6zaTOxFJmzC";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
        animal + "&api_key=" + api_key;
    console.log(queryURL);

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var len = response["data"].length;
        //var len = 15;
        for (var i = 0; i < len; i++)
        {
            // Creates an element to hold the rating
            rated = response["data"][i].rating;
            console.log("Rating: " + rated);
            // Creates an element to hold the image
            img_still = response["data"][i]["images"]["original_still"]["url"];
            console.log("Image: " + img_still);
            //The below logic is to display 1 image per column up 3 images per row.
            if (i === 0)
            {
                animalStr = "<div class='row'>";
                animalStr += "<div col-xs-4 col-sm-4'>Rating: " + rated +
                    "<img class='img-responsive thumbnail' src='" + img_still + "' /></div>";
                if (i === len-1)
                {
                    animalStr += "</div>";
                }
                console.log("In if (i === 0): " + animalStr);
            }
            else if (i % 3 !== 0)
            {
                animalStr += "<div col-xs-4 col-sm-4'>Rating: " + rated +
                    "<img class='img-responsive thumbnail' src='" + img_still + "' /></div>";
                if (i === len-1)
                {
                    animalStr += "</div>";
                }
                console.log("In else if (i % 3 !== 0): " + animalStr);
            }
            else if (i % 3 === 0) //display up to 3 images per row
            {
                animalStr += "</div>";
                animalStr += "<div class='row'>";
                animalStr += "<div col-xs-4 col-sm-4'>Rating: " + rated +
                        "<img class='img-responsive thumbnail' src='" + img_still + "' /></div>";
                if (i === len-1)
                {          
                    animalStr += "</div>";
                }
                console.log("In else if (i % 3 === 0): " + animalStr);
            }
        }
        //var myJSON = JSON.stringify(response["data"]);
        //$("#animals-view").html(myJSON);
        $("#animals-view").html(animalStr);
    });
}

$(document).ready(function()
{
    // This function handles events where the add animal button is clicked
    $("#add-animal").on("click", function(event) 
    {
        event.preventDefault();

        // This line of code will grab the input from the textbox
        var animal = $("#animal-input").val().trim();

        // The movie from the textbox is then added to our array
        if (animal === "")
        {
            alert("Please enter an animal!");
        }
        else if (seqOrderedSearch(animal) != -1)
        {
            alert("Animal " + animal + " already exists! Please enter a different animal!");
        }
        else
        {
            animalsArr.push(animal);
        }

        //reset the movie text input field to empty string
        reset();

        // Calling renderButtons which handles the processing of our animals array
        renderButtons();
    });

    // Adding click event listeners to all elements with a class of "animal"
    $(document).on("click", ".animal", displayAnimalInfo);

    //reset the animal text input field to empty string
    reset();

    // Calling renderButtons which handles the processing of our animals array
    renderButtons();
});
