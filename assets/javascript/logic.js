// var searchTag = prompt("entery item: ");
var appID = "5e176d12";
var appKey = "f76c23b37cb54db25ea370bc5b7a461f";







$("#submit").on("click",function(){
    var foodSearch = $("#search").val()
    console.log(foodSearch) 
    $.ajax({
        url: "https://api.nutritionix.com/v1_1/search/" + foodSearch + "?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cnf_calories%2Cnf_total_fat%2Cnf_total_carbohydrate%2Cnf_protein%2Cnf_ingredient_statement&appId=5e176d12&appKey=f76c23b37cb54db25ea370bc5b7a461f",
        method: "GET"
    }).then(function(response){
        // console.log(response.hits[0]);
        console.log("Item Name: " + response.hits[0].fields.item_name)
        console.log("Calories: " + response.hits[0].fields.nf_calories)
    });
})