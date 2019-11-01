// var searchTag = prompt("entery item: ");
var appID = "5e176d12";
var appKey = "f76c23b37cb54db25ea370bc5b7a461f";
var queryURL = "https://api.nutritionix.com/v1_1/search/chips%20ahoy?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cnf_calories%2Cnf_total_fat%2Cnf_total_carbohydrate%2Cnf_protein%2Cnf_ingredient_statement&appId=5e176d12&appKey=f76c23b37cb54db25ea370bc5b7a461f";
// var queryURL= "https://api.nutritionix.com/v1_1/search/chicken&results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cnf_calories%2Cnf_total_fat%2Cnf_total_carbohydrate%2Cnf_protein%2Cnf_ingredient_statement&appId=5e176d12&appKey=f76c23b37cb54db25ea370bc5b7a461f";
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response.hits[0]);
});
