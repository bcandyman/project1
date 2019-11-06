var userWeight = 150

var dailyRecProIntake = (userWeight * .7) // Needs to be 70% of user weight in grams
var dailyRecFatIntake = (userWeight * .25) // Needs to be 25% of user weight in grams
var dailyRecCarbIntake  = (userWeight - dailyRecProIntake - dailyRecFatIntake);
var dailyRecCalIntake = 1600

var todaysProIntake = 23
var todaysFatIntake = 15
var todaysCarbIntake = 20
var todaysCalIntake = 1500

var todaysProGoal = todaysProIntake / dailyRecProIntake
var todaysFatGoal = todaysFatIntake / dailyRecFatIntake 
var todaysCarbGoal = todaysCarbIntake / dailyRecCarbIntake
var todaysCalGoal = todaysCalIntake / dailyRecCalIntake

console.log(todaysProGoal)
console.log(todaysFatGoal)
console.log(todaysCarbGoal)
console.log(todaysCalGoal)

