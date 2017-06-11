//============================================================================
// Name        : app.js
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
    var animal;

    searchItem = searchItem.toLowerCase();//convert to lower case
    for (i = 0; i < animalsArr.length; i++)
    {
        animal = animalsArr[i].toLowerCase(); //convert to lower case
        if (animal >= searchItem)
        {
            found = true;
            break;
        }
    }
    if (found)
    {
        if (animal === searchItem)
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
    var imgOriginalStill;
    var imgOriginal;
    var rated;
    var animal = $(this).attr("data-name");
    var api_key = "dc6zaTOxFJmzC";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
        animal + "&api_key=" + api_key;
    console.log(queryURL);

    // Creates AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var len = response["data"].length;
        //var len = 2;
        for (var i = 0; i < len; i++)
        {
            // Creates an element to hold the rating
            rated = response["data"][i].rating;
            console.log("Rating: " + rated);
            // Creates an element to hold the image
            imgOriginalStill = response["data"][i]["images"]["original_still"]["url"];
            imgOriginal = response["data"][i]["images"]["original"]["url"];
            console.log("Original Still Image: " + imgOriginalStill);
            console.log("Original Image: " + imgOriginal);
            //The below logic is to display 4 images per row. Each image is displayed in its
            //separate column.
            if (i === 0)
            {
                animalStr = "<div class='row'>";
                animalStr += "<div class='col-xs-3 col-sm-3'>Rating: " + rated +
                    "<img class='img-responsive thumbnail gif' src='" + imgOriginalStill + "' data-still='" + imgOriginalStill + 
                    "' data-animate='" + imgOriginal + "' data-state='still' /></div>";
                if (i === len-1)
                {
                    animalStr += "</div>";
                }
                console.log("In if (i === 0): " + animalStr);
            }
            else if (i % 4 !== 0)
            {
                animalStr += "<div class='col-xs-3 col-sm-3'>Rating: " + rated +
                    "<img class='img-responsive thumbnail gif' src='" + imgOriginalStill + "' data-still='" + imgOriginalStill + 
                    "' data-animate='" + imgOriginal + "' data-state='still' /></div>";
                if (i === len-1)
                {
                    animalStr += "</div>";
                }
                console.log("In else if (i % 4 !== 0): " + animalStr);
            }
            else if (i % 4 === 0) //display up to 4 images per row
            {
                animalStr += "</div>";
                animalStr += "<div class='row'>";
                animalStr += "<div class='col-xs-3 col-sm-3'>Rating: " + rated +
                    "<img class='img-responsive thumbnail gif' src='" + imgOriginalStill + "' data-still='" + imgOriginalStill + 
                    "' data-animate='" + imgOriginal + "' data-state='still' /></div>";
                if (i === len-1)
                {          
                    animalStr += "</div>";
                }
                console.log("In else if (i % 4 === 0): " + animalStr);
            }
        }
        //var myJSON = JSON.stringify(response["data"]);
        //$("#animals-view").html(myJSON);
        $("#animals-view").html(animalStr);
    });
}

//============================================================================
// Name        : playGif
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This function unpauses and pauses a gif (image) when the user
//               clicks on it.
//============================================================================
function playGif()
{
    //Check if the variable state is equal to 'still',
    //then update the src attribute of this image to its data-animate value,
    //and update the data-state attribute to 'animate'.
    //If state does not equal 'still', then update the src attribute of this
    //image to its data-still value and update the data-state attribute to 
    //'still'
    var dataState = $(this).attr("data-state");
    if (dataState === "still")
    {
        var animatedSrc = $(this).attr("data-animate");
        $(this).attr("src", animatedSrc);
        $(this).attr("data-state", "animate");
    }
    else
    {
        var stillSrc = $(this).attr("data-still");
        $(this).attr("src", stillSrc);
        $(this).attr("data-state", "still");
    }
}

function addAnimal()
{
    event.preventDefault();

    // This line of code will grab the input from the textbox
    var animal = $("#animal-input").val().trim();

    // The animal from the textbox is then added to our array
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

    //reset the animal text input field to empty string
    reset();

    //calling renderButtons which handles the processing of our animals array
    renderButtons();
}

$(document).ready(function()
{
    //This function handles events where the add animal button is clicked
    //The reason this form works because the button with the #add-animal id
    //was already loaded by the index.html.
    $("#add-animal").on("click", addAnimal);

    //Adding click event listeners to all elements with a class of "animal"
    //Need to use this form of click event listeners because the animal buttons
    //are loaded dynamically.
    $(document).on("click", ".animal", displayAnimalInfo);

    //adding click event listeners to all elements with a class of "gif"
    //$(".gif").on("click", playGif); //this form will not work because gif images
                                      //are loaded dynamically. Thus, we need the
                                      //click event listeners form below. 
    $(document).on("click", ".gif", playGif);

    //reset the animal text input field to empty string
    reset();

    // Calling renderButtons which handles the processing of our animals array
    renderButtons();
});
