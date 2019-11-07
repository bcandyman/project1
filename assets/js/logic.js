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
var itemsToDatabase = []
var userName = "Lakshdeep"
var foodItemIndex = 0

// initialize firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var userDatabase 
var userData={}
var todaysDate = getDate(0,"YYYYMMDD")

var dailyWaters = 1
var dailyCarbs = 1
var dailyFats = 1
var dailyFibers = 1
var dailyProteins = 1


    // google.charts.load('current', { 'packages': ['corechart'] });
    // google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = google.visualization.arrayToDataTable([
            ['Food', 'Total per Day'],
            ['Water', dailyWaters],
            ['Carbs', dailyCarbs],
            ['Fats', dailyFats],
            ['Fiber', dailyFibers],
            ['Proteins', dailyProteins]
        ]);

        var options = {
            backgroundColor: 'transparent',
            pieHole: 0.92,
            colors: ['#2fc2df', '#DFA006', '#de1b85', '#6c1460', '#f9527a'],
            pieSliceBorderColor: "#5A5A5A",
            outlineColor: "0",
            pieSliceBorderColor: "transparent",

            pieSliceTextStyle: {
                color: 'none'
            },

            legend: 'none'
        };

        var chart = new google.visualization.PieChart(document.getElementById('donut_single', 'donut_single2', 'donut_single3'));
        chart.draw(data, options);
    }

    // var myDoughnutChart = new Chart(ctx, {
    //     type: 'doughnut',
    //     data: data,
    //     options: options
    // });




//This function returns date values or days from the given properties
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



function getDataAttr(attr){

    var int = 0
    var foodObj = userData[todaysDate]["Foods"]
    
    for (key in foodObj){
        if (!isNaN(foodObj[key][attr])){
            console.log(foodObj[key][attr])
            int += foodObj[key][attr]
        }
    }
    
    return int

}



function populateSelectedItemsDiv(foodObj){
    console.log(foodObj.item_name)
    var newDiv = $("<div>")
     newDiv.addClass("selected-item")
     newDiv.text(foodObj.item_name)
     newDiv.append($("<hr>"))

     //append newly created div to returnedFoodItems class
     $(".selectedFoodItems").prepend(newDiv)
     $(".returnedFoodItems").empty()


    itemsToDatabase.push(foodObj)
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
    var myFoodItem = nutritionCallResults.hits[itemClicked]

    populateSelectedItemsDiv(myFoodItem.fields)
})




$("#search").on("click",function(){
    $(".selectedFoodItems").empty()
    $(".returnedFoodItems").empty()

    if (todaysDate in userData){
        var userFoodData = userData[todaysDate]["Foods"]
        var foodItemCount = Object.keys(userFoodData).length 
        for ( var i = 0; i< foodItemCount; i++){
            var foodItem = Object.keys(userFoodData)[i];
            populateSelectedItemsDiv(userFoodData[foodItem])
        }
    }
})










$("#close").on("click",function(){

    database.ref(userName).off()
    database.ref(userName + "/" + todaysDate + "/Foods/").remove()
    attachUserEventListener()

    var i = 0
    itemsToDatabase.forEach(function(){
        var objValue = itemsToDatabase[i]
        database.ref(userName + "/" + todaysDate + "/Foods/" + "item-" + (i+1) ).set(objValue)


        i++
    })
    console.log("items to database: " + itemsToDatabase)
    itemsToDatabase=[]
})



$("#foodSearch").on("keypress", function(event){
    if (event.keyCode === 13){
        $("#submit").click()
    }
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

    //if user existing in database
    if(userName in snapshot.val()){
        for (key in snapshot.child(userName).val()){
            if (key.indexOf("test")!==-1){
                console.log("Not found")
            }
            else{
                console.log("Found")
            }
            }

        userDatabase = database.ref(userName)   

    }
    else{
        userDatabase = database.ref(userName).set({
            joinDate: todaysDate,
            analytics:"",
        })
    }
})




setTimeout(() => {
    attachUserEventListener()
}, 2000);


function attachUserEventListener(){
    database.ref(userName).on("value", function(snapshot){
        userData=snapshot.val()

        dailyWaters = getDataAttr("nf_water_grams")
        console.log("dailyWaters: " + dailyWaters)
        dailyCarbs = getDataAttr("nf_total_carbohydrate")
        console.log("dailyCarbs: " + dailyCarbs)
        dailyFats = getDataAttr("nf_total_fat")
        console.log("dailyFats: " + dailyFats)
        dailyFibers = getDataAttr("nf_dietary_fiber")
        console.log("dailyFibers: " + dailyFibers)
        dailyProteins = getDataAttr("nf_protein")
        console.log("dailyProteins: " + dailyProteins)

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        // console.log(getDataAttr("nf_sugars"))
    })
}


















// database.ref(userName).set("Date")

// var newArr=[] //= ["dayOne", "dayTwo"]
// var newObj  = {carb:1, fat:2}
// var newObj2 = {carb:3,fat:4}
// newObj = NewObject[Key:"value"]
// newArr["dayOne"]=newObj
// newArr["dayTwo"]=newObj2
// console.log(newArr.dayOne.carb)
// database.ref(userName).set(newArr)

// console.log("userDatabase")
// console.log(database.ref("candben/test").value())