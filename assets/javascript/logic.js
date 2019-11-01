// var searchTag = prompt("entery item: ");
var appID = "5e176d12";
var appKey = "f76c23b37cb54db25ea370bc5b7a461f";





function populateDropDown(objFood){

    //clear existing drop-down items 
    $(".dropdown-menu").empty()

    //for each item returned in ajax call
    for (var i = 1; i < objFood.hits.length; i++){
        
        //create anchor tag and apply applicable attributes
        var newAnchor = $("<a>")
        newAnchor.addClass("dropdown-item")
        newAnchor.text(objFood.hits[i].fields.item_name)

        //append newly created anchor tag to dropdown menu
        $(".dropdown-menu").append(newAnchor)
    }
}



$("#submit").on("click",function(){

    //initialize variables
    //foodSearch = the food string the user desires to search
    var foodSearch = $("#search").val()
    //numOfResults = the number of items the user would like returned
    var numOfResults = $("#numOfResults").val()
    
    $.ajax({
        url: "https://api.nutritionix.com/v1_1/search/" + foodSearch + "?results=0%3A" + numOfResults + "&cal_min=0&cal_max=50000&fields=item_name%2Cnf_calories%2Cnf_total_fat%2Cnf_total_carbohydrate%2Cnf_protein%2Cnf_ingredient_statement&appId=5e176d12&appKey=f76c23b37cb54db25ea370bc5b7a461f",
        method: "GET"
    }).then(function(response){
        populateDropDown(response)
    });
})