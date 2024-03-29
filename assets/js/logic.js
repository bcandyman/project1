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
var userName = "Lakshdeep2"
var foodItemIndex = 0

// initialize firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var userDatabase 
var userData={}
var todaysDate = getDate(0,"YYYYMMDD")

var dailyProteins
var dailyRecProteins
var dailyRemProteins
function subtractProPerc() {
    dailyRemProteins = (dailyRecProteins - dailyProteins)
}
var dailyProteinsPercent
var dailyProteinsPercentLeft
function calcProPercents() {
    dailyProteinsPercent = (dailyProteins / dailyRecProteins) * 100
    dailyProteinsPercentLeft = 100 - dailyProteinsPercent
}

var dailyFats
var dailyRecFats
var dailyRemFats
function subtractFatPerc() {
    dailyRemFats = (dailyRecFats - dailyFats)
}
var dailyFatsPercent
var dailyFatsPercentLeft
function calcFatPercents() {
    dailyFatsPercent = (dailyFats / dailyRecFats) * 100
    dailyFatsPercentLeft = 100 - dailyFatsPercent
}

var dailyCarbs
var dailyRecCarbs
var dailyRemCarbs
function subtractCarbsPerc() {
    dailyRemCarbs = (dailyRecCarbs - dailyCarbs)
}
var dailyCarbsPercent
var dailyCarbsPercentLeft
function calcCarbsPercents() {
    dailyCarbsPercent = (dailyCarbs / dailyRecCarbs) * 100
    dailyCarbsPercentLeft = 100 - dailyCarbsPercent
}

var dailyCals
var dailyRecCals
var dailyRemCals
function subtractCalPerc() {
    dailyRemCals = (dailyRecCals - dailyCals)
    console.log("Your daily reccomended calorie intake is: " + dailyRecCals + " calories.")
       
}
var dailyCalsPercent
var dailyCalsPercentLeft
function calcPercents() {
    dailyCalsPercent = (dailyCals / dailyRecCals) * 100
    dailyCalsPercentLeft = 100 - dailyCalsPercent
}

function drawChart() {
    subtractCalPerc()
    calcPercents()
    subtractCarbsPerc()
    calcCarbsPercents()
    subtractFatPerc()
    calcFatPercents()
    subtractProPerc()
    calcProPercents()
    var calData = new google.visualization.DataTable();
    calData.addColumn('string', 'Calories Eaten Today');
    calData.addColumn('number', 'Calories Left for Today');
    calData.addRows([
        ['calories', dailyCalsPercent],
        ['calories left', dailyCalsPercentLeft]
    ]);
    var fatData = new google.visualization.DataTable();
    fatData.addColumn('string', 'Fat Eaten Today');
    fatData.addColumn('number', 'Fat Left for Today');
    fatData.addRows([
        ['Fat Intake', dailyFatsPercent],
        ['Fat Intake left', dailyFatsPercentLeft]
    ]);
    var proData = new google.visualization.DataTable();
    proData.addColumn('string', 'Protein Eaten Today');
    proData.addColumn('number', 'Protein Left for Today');
    proData.addRows([
        ['Protein Intake', dailyProteinsPercent],
        ['Protein Intake Left', dailyProteinsPercentLeft]
    ]);
    var carbData = new google.visualization.DataTable();
    carbData.addColumn('string', 'Carbs Eaten Today');
    carbData.addColumn('number', 'Carbs Left for Today');
    carbData.addRows([
        ['Carbohydrate Intake', dailyCarbsPercent],
        ['Carbohydrate Intake Left', dailyCarbsPercentLeft]
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

    var chart = new google.visualization.PieChart(document.getElementById('donut_single'));
    // var fatChart = new google.visualization.PieChart(document.getElementById('donut-fat'));
    // var proChart = new google.visualization.PieChart(document.getElementById('donut-pro'));
    // var carbChart = new google.visualization.PieChart(document.getElementById('donut-carbs'));
    
    chart.draw(calData, options);
    // fatChart.draw(fatData, options);
    // proChart.draw(proData, options);
    // carbChart.draw(carbData, options);


    $("#donut_single").toggleClass("rotate-in-center");
    $("#donut-fat").toggleClass("rotate-in-center");
    $("#donut-pro").toggleClass("rotate-in-center");
    $("#donut-carbs").toggleClass("rotate-in-center");


}

//This function returns date values or days from the given properties
function getDate(dayOffset, format) {
    return moment().add(dayOffset, "day").format(format)
}

function populateFoodItems(objFood) {
    //clear items returned by search
    $(".returnedFoodItems").find("*").not(".selected-item").empty()

    //for each item returned in ajax call
    for (var i = 0; i < objFood.hits.length; i++) {

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

function getDataAttr(attr, date) {
    var int = 0
    var foodObj = userData[date]["Foods"]

    for (key in foodObj) {
        if (!isNaN(foodObj[key][attr])) {
            int += foodObj[key][attr]
        }
    }

    return int

}

function getAnalyticsDataAttr(attr) {
    var int = 0
    var AnalObj = userData["analytics"][attr]
    return AnalObj

}

function populateSelectedItemsDiv(foodObj) {
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
$("#submit").on("click", function () {

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
    }).then(function (response) {
        nutritionCallResults = response
        populateFoodItems(nutritionCallResults)
    });
})

$(document).on("click", ".searched-item", function () {

    //retrieve data-searchedfooditem value and set to the item user has clicked in the drop down
    var itemClicked = $(this).attr("data-searchedfooditem")
    var myFoodItem = nutritionCallResults.hits[itemClicked]

    populateSelectedItemsDiv(myFoodItem.fields)
})

$("#search").on("click", function () {
    $(".selectedFoodItems").empty()
    $(".returnedFoodItems").empty()

    if (todaysDate in userData) {
        var userFoodData = userData[todaysDate]["Foods"]
        var foodItemCount = Object.keys(userFoodData).length
        for (var i = 0; i < foodItemCount; i++) {
            var foodItem = Object.keys(userFoodData)[i];
            populateSelectedItemsDiv(userFoodData[foodItem])
        }
    }
})

$("#close").on("click", function () {

    database.ref(userName).off()
    database.ref(userName + "/" + todaysDate + "/Foods/").remove()
    attachUserEventListener()

    var i = 0
    itemsToDatabase.forEach(function () {
        var objValue = itemsToDatabase[i]
        database.ref(userName + "/" + todaysDate + "/Foods/" + "item-" + (i + 1)).set(objValue)


        i++
    })
    itemsToDatabase = []
})

$("#foodSearch").on("keypress", function (event) {
    if (event.keyCode === 13) {
        $("#submit").click()
    }
})

//print dates on cards
$("#todayDate").text(getDate(0, "MM") + " | " + getDate(0,"DD"));
$("#todayWeekdayName").text(getDate(0, "ddd").toUpperCase());

$("#yesterdayDate").text(getDate(-1, "MM") + " | " + getDate(-1,"DD"));
$("#yesterdayWeekdayName").text(getDate(-1, "ddd").toUpperCase());

$("#tomorrowDate").text(getDate(1, "MM") + " | " + getDate(1,"DD"));
$("#tomorrowWeekdayName").text(getDate(1, "ddd").toUpperCase());

//create user database or set reference if is a returning user
database.ref().once("value", function (snapshot) {

    //if user existing in database
    if (userName in snapshot.val()) {
        for (key in snapshot.child(userName).val()) {
            if (key.indexOf("test") !== -1) {
                console.log("Not found")
            }
            else {
                console.log("Welcome back, " + userName)
            }
        }

        userDatabase = database.ref(userName)

    }
    else {
        userDatabase = database.ref(userName).set({
            joinDate: todaysDate,
            analytics: "",
        })
    }
})

setTimeout(() => {
    attachUserEventListener()
}, 2000);

function attachUserEventListener(){
    database.ref(userName).on("value", function(snapshot){
        userData=snapshot.val()
        console.log(userData)
        dailyCarbs = getDataAttr("nf_total_carbohydrate",todaysDate)
        dailyRecCarbs = getDataAttr("dailyRecCarbs",todaysDate)
        dailyFats = getDataAttr("nf_total_fat",todaysDate)
        dailyRecFats = getDataAttr("dailyRecFats",todaysDate)
        dailyProteins = getDataAttr("nf_protein",todaysDate)
        dailyRecProteins = getDataAttr("dailyRecProteins",todaysDate)
        dailyCals = getDataAttr("nf_calories",todaysDate)
        dailyRecCals = getAnalyticsDataAttr("dailyRecCals")
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
        function roundNumber() {
            dailyCals = Math.floor(dailyCals);
            dailyCalsPercent = Math.floor(dailyCalsPercent);
        }
        roundNumber()
        console.log("Rounded Result: " + dailyCals)
        $("#percentage-to-goal").text(dailyCalsPercent);
        $("#calories-eaten").text(dailyCals);
    })
}

$("#submit2").on("click", function(){
    userWeight = $("#user-weight-input").val(); // User's weight in lbs    
    database.ref(userName).update({userWeight: userWeight})
    dailyRecProteins = (userWeight * .7)   // Needs to be 70% of user weight in grams
    dailyRecFats = (userWeight * .25)  // Needs to be 25% of user weight in grams
    dailyRecCarbs  = (userWeight - dailyRecProteins - dailyRecFats); // Remainder intake from the other two macros
    dailyRecCals = 2000    // This is also pre-set but may be adjusted by the user.
    console.log("THIS FUCNTION IS GETTING CALLED")
    database.ref(userName + "/analytics").update(
        {dailyRecCals: dailyRecCals,
        dailyRecCarbs: dailyRecCarbs,
        dailyRecFats: dailyRecFats,
        dailyRecProteins: dailyRecProteins
        })
});
