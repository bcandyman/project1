// var searchTag = prompt("entery item: ");
var appID = "5e176d12";
var appKey = "f76c23b37cb54db25ea370bc5b7a461f";
var nutritionCallResults = {}



function populateFoodItems(objFood){
    //clear items returned by search
    $(".returnedFoodItems").find("*").not(".selected-item").empty()

    //for each item returned in ajax call
    for (var i = 0; i < objFood.hits.length; i++){
    
        //create div and apply applicable attributes
        var newDiv = $("<div>")
        newDiv.addClass("searched-item")
        newDiv.attr("data-searchedFoodItem", i)
        newDiv.text(objFood.hits[i].fields.item_name)
        newDiv.append($("<hr>"))

        //append newly created anchor tag to dropdown menu
        $(".returnedFoodItems").append(newDiv)
    }
}


//Runs when getInformation button is clicked
//Used when the user initiates a new food search
$("#submit").on("click",function(){

    //initialize variables
    //foodSearch = the food string the user desires to search
    var foodSearch = $("#foodSearch").val()
    //numOfResults = the number of items the user would like returned
    var numOfResults = 5
    console.log("foodSearch: " + foodSearch)
    
    $.ajax({
        url: "https://api.nutritionix.com/v1_1/search/" + foodSearch + "?results=0%3A" + numOfResults + "&cal_min=0&cal_max=50000&fields=*&appId=5e176d12&appKey=f76c23b37cb54db25ea370bc5b7a461f",
        // url: "https://api.nutritionix.com/v1_1/search/" + foodSearch + "?results=0%3A" + numOfResults + "&cal_min=0&cal_max=50000&fields=item_name%2Cnf_calories%2Cnf_total_fat%2Cnf_total_carbohydrate%2Cnf_protein%2Cnf_ingredient_statement&appId=5e176d12&appKey=f76c23b37cb54db25ea370bc5b7a461f",
        method: "GET"
    }).then(function(response){
        console.log(response)
        nutritionCallResults = response
        populateFoodItems(nutritionCallResults)
    });
})


$(document).on("click", ".searched-item", function(){

    //retrieve data-searchedfooditem value and set to the item user has clicked in the drop down
    var itemClicked = $(this).attr("data-searchedfooditem")
    console.log(itemClicked)

     //Create div and apply applicable attributes
     var newDiv = $("<div>")
     newDiv.addClass("selected-item")
     newDiv.text(nutritionCallResults.hits[itemClicked].fields.item_name)
     newDiv.append($("<hr>"))

     //append newly created div to returnedFoodItems class
     $(".selectedFoodItems").prepend(newDiv)
     $(".returnedFoodItems").empty()

    //Set the object item to objSelected
    // var objSelected = nutritionCallResults.hits[itemClicked].fields
    // Set each variable to value of each attribute
    // var calories = objSelected.nf_calories
    // var fat = objSelected.nf_total_fat
    // var carbs = objSelected.nf_total_carbohydrate
    // var protein = objSelected.nf_protein
    // var ingredients = objSelected

    //Pass information into fuction for printing on HTML
    // displayNutritionInformation("Calories", calories, "calories")
    // displayNutritionInformation("Fat", fat, "fat")
    // displayNutritionInformation("Carbohydrates", carbs, "carbs")
    // displayNutritionInformation("Protein", protein, "protein")
    // displayNutritionInformation("Ingredients", ingredients, "ingredients")
})

$("#search").on("click",function(){
    console.log("Hi")
    $(".selectedFoodItems").empty()
    $(".returnedFoodItems").empty()
})