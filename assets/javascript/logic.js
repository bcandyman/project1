// var searchTag = prompt("entery item: ");
var appID = "5e176d12";
var appKey = "f76c23b37cb54db25ea370bc5b7a461f";
var nutritionCallResults = {}





function populateDropDown(objFood){

    //clear existing drop-down items 
    $(".dropdown-menu").empty()

    //for each item returned in ajax call
    for (var i = 0; i < objFood.hits.length; i++){
        
        //create anchor tag and apply applicable attributes
        var newAnchor = $("<a>")
        newAnchor.addClass("dropdown-item")
        newAnchor.attr("data-dropdownitem", i)
        newAnchor.text(objFood.hits[i].fields.item_name)

        //append newly created anchor tag to dropdown menu
        $(".dropdown-menu").append(newAnchor)
    }
}



//This function will print a title and value to a target ID. 
//The title or attribute and value will be separated by a ": "
//Before printing, the value will be tested to ensure val contains information,
//      if no information is held in val, nothing will be printed.
function displayNutritionInformation(attr, val, targetID){

    //convert val to string to enable testing on string length
    var valString = val.toString().trim()

    //if val contains any information
    if (valString.length !== 0){
        //print to id
        $("#" + targetID).text(attr + ": " + val)
    }
}


//Runs when getInformation button is clicked
//Used when the user initiates a new food search
$("#getInformation").on("click",function(){

    //initialize variables
    //foodSearch = the food string the user desires to search
    var foodSearch = $("#search").val()
    //numOfResults = the number of items the user would like returned
    var numOfResults = $("#numOfResults").val()
    
    $.ajax({
        url: "https://api.nutritionix.com/v1_1/search/" + foodSearch + "?results=0%3A" + numOfResults + "&cal_min=0&cal_max=50000&fields=item_name%2Cnf_calories%2Cnf_total_fat%2Cnf_total_carbohydrate%2Cnf_protein%2Cnf_ingredient_statement&appId=5e176d12&appKey=f76c23b37cb54db25ea370bc5b7a461f",
        method: "GET"
    }).then(function(response){
        console.log(response)
        nutritionCallResults = response
        populateDropDown(nutritionCallResults)
    });
})


$(document).on("click", ".dropdown-item", function(){

    //retrieve data-dropdownitem value and set to the item user has clicked in the drop down
    var itemClicked = $(this).attr("data-dropdownitem")
    //Set the object item to objSelected
    var objSelected = nutritionCallResults.hits[itemClicked].fields
    // Set each variable to value of each attribute
    var calories = objSelected.nf_calories
    var fat = objSelected.nf_total_fat
    var carbs = objSelected.nf_total_carbohydrate
    var protein = objSelected.nf_protein
    var ingredients = objSelected

    //Pass information into fuction for printing on HTML
    displayNutritionInformation("Calories", calories, "calories")
    displayNutritionInformation("Fat", fat, "fat")
    displayNutritionInformation("Carbohydrates", carbs, "carbs")
    displayNutritionInformation("Protein", protein, "protein")
    // displayNutritionInformation("Ingredients", ingredients, "ingredients")
})