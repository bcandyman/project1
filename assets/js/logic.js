// declare variables
var firebaseConfig = {
    apiKey: "AIzaSyADKbhE6aoHk09vkJuHxIZ1ntqD0ND4lLA",
    authDomain: "waye-t.firebaseapp.com",
    databaseURL: "https://waye-t.firebaseio.com",
    projectId: "waye-t",
    storageBucket: "waye-t.appspot.com",
    messagingSenderId: "346428803689",
    appId: "1:346428803689:web:bd8036633443512c56f0f8",
    measurementId: "G-KLHSX37FDS"
  };
var appID = "5e176d12";
var appKey = "f76c23b37cb54db25ea370bc5b7a461f";
var nutritionCallResults = {}
var itemsToDatabase
var userName = "candben"

// initialize firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var userDatabase 

function getDate(dayOffset, format){
        return moment().add(dayOffset,"day").format(format)
}

function populateFoodItems(objFood){
    //clear items returned by search
    $(".returnedFoodItems").find("*").not(".selected-item").empty()

    //for each item returned in ajax call
    for (var i = 0; i < objFood.hits.length; i++){
    
        //create div and apply applicable attributes
        var newDiv = $("<div>")
        newDiv.addClass("searched-item")
        newDiv.attr("data-searchedFoodItem", i)
        newDiv.append($("<p>").html("Item: " + objFood.hits[i].fields.item_name))
        newDiv.append($("<p>").html("Brand: " + objFood.hits[i].fields.brand_name))
        newDiv.append($("<p>").html("Serving size/qty: " + objFood.hits[i].fields.nf_serving_size_qty))
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
    //clear search input text
    $("#foodSearch").val("")
    //numOfResults = the number of items the user would like returned
    var numOfResults = 5
    
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
    $(".selectedFoodItems").empty()
    $(".returnedFoodItems").empty()
})


$("#close").on("click",function(){
    console.log("I did it!")
})


//print dates on cards
$("#todayDate").text(getDate(0, "MM") + " | " + getDate(0,"DD"))
$("#todayWeekdayName").text(getDate(0, "ddd").toUpperCase())

$("#yesterdayDate").text(getDate(-1, "MM") + " | " + getDate(-1,"DD"))
$("#yesterdayWeekdayName").text(getDate(-1, "ddd").toUpperCase())

$("#tomorrowDate").text(getDate(1, "MM") + " | " + getDate(1,"DD"))
$("#tomorrowWeekdayName").text(getDate(1, "ddd").toUpperCase())


//create user database or set reference if is a returning user
database.ref().once("value", function(snapshot){
    if(userName in snapshot.val()){
        userDatabase = database.ref(userName)
    }
    else{
        userDatabase = database.ref(userName).set({
            joinDate: getDate(0,"YYYYMMDD")
        })
    }
})