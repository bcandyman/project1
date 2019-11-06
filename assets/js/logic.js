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

var calories = 0
var carbohydrates = 0
var protein = 0
var fat = 0

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
$("#todayDate").text(getDate(0, "MM") + " | " + getDate(0,"DD"));
$("#todayWeekdayName").text(getDate(0, "ddd").toUpperCase());

$("#yesterdayDate").text(getDate(-1, "MM") + " | " + getDate(-1,"DD"));
$("#yesterdayWeekdayName").text(getDate(-1, "ddd").toUpperCase());

$("#tomorrowDate").text(getDate(1, "MM") + " | " + getDate(1,"DD"));
$("#tomorrowWeekdayName").text(getDate(1, "ddd").toUpperCase());


//create user database or set reference if is a returning user
// database.ref().once("value", function(snapshot){
//     console.log(snapshot.val())
//     if(userName in snapshot.val()){
//         console.log("Yes")
//         userDatabase = database.ref(userName)
//     }
//     else{
//         console.log("No")
//         userDatabase = database.ref(userName).set({
//             joinDate: getDate(0,"YYYYMMDD")
//         })
//     }
// })


// database.ref(userName).set("Date")

// var newArr=[] //= ["dayOne", "dayTwo"]
// var newObj  = {carb:1, fat:2}
// var newObj2 = {carb:3,fat:4}
// newObj = NewObject[Key:"value"]
// newArr["dayOne"]=newObj
// newArr["dayTwo"]=newObj2
// console.log(newArr.dayOne.carb)
// database.ref(userName).set(newArr)


//----- Calulating Macros ------//

var userWeight = 150 // User's weight in lbs

//  The factor to calculate reccomended intakes are pre-set but may be changed by the user if desired.

var dailyRecProIntake = (userWeight * .7) // Needs to be 70% of user weight in grams
var dailyRecFatIntake = (userWeight * .25) // Needs to be 25% of user weight in grams
var dailyRecCarbIntake  = (userWeight - dailyRecProIntake - dailyRecFatIntake); // Remainder intake from the other two macros
var dailyRecCalIntake = 2000 // This is also pre-set but may be adjusted by the user.

//  Needs to take one day's worth of food intake from Firebase (within 20191106/Foods) and calculates 
//  the number of calories, protiens, fat, and carbs eaten that day.
//  To Do:
//  item1Pro + item2Pro + item3Pro = todaysProIntake
//  item1Fat + item2Fat + item3Fat = todaysFatIntake
//  item1Carb + item2Carb + item3Carb = todaysCarbIntake
//  item1Cal + item2Cal + item3Cal = todaysCalIntake

var item1Pro
var item1Fat
var item1Carb
var item1Cal 

//  Needs to take the daily calories
var todaysProIntake = 23 // Needs to be updated with Firebase snapshot values
var todaysFatIntake = 15 //
var todaysCarbIntake = 20
var todaysCalIntake = 1500

//  Push all these variables into an array with the date to store into analytics for future use.

//  Needs to show how far along a user is in their daily goal.

var todaysProGoal = todaysProIntake / dailyRecProIntake
var todaysFatGoal = todaysFatIntake / dailyRecFatIntake 
// var todaysCarbGoal = todaysCarbIntake / dailyRecCarbIntake // Carb goals are hard to match within the graph.
// Maybe use a remainder function so the 
var todaysCalGoal = todaysCalIntake / dailyRecCalIntake

//  Average cal, carb, fat, pro intake over X days. Take the data within a range of dates (20191102 through 20191106)
//  and compare it against today's intake.

console.log(todaysProGoal)
console.log(todaysFatGoal)
console.log(todaysCalGoal)

