$(document).ready(function () {

    $("#donut_single").toggleClass("rotate-in-center");

    $("#card").flip({
        trigger: 'manual'
    });

    $("#card2").flip({
        trigger: 'manual'
    });

    $("#card3").flip({
        trigger: 'manual'
    });

    $("#welcome-card").flip({
        trigger: 'manual'
    });


    $("#new-acct").click(function () {
        $("#welcome-card").flip(true);
    });

    $("#search").click(function () {
        $("#card").flip(true);
    });

    $("#close").click(function () {
        $("#card").flip(false);
    });

    $("#entries1").click(function () {
        $("#card2").flip(true);
    });

    $("#close2").click(function () {
        $("#card2").flip(false);
    });

    $("#entries2").click(function () {
        $("#card3").flip(true);
    });

    $("#close3").click(function () {
        $("#card3").flip(false);
    });

    $("#wel-close").click(function () {
        $("#welcome-card").flip(false);
    });


    //////funtion for creating carousel //////////////////////////////


    flag = 1;
    $("#nex").click(function () {
        if (flag == 0) {
            $("#side1").css("z-index", "999");
            $("#side2").css("z-index", "9");
            $("#side3").css("z-index", "9");
            $("#side1").css("transform", "translateX(0px) scale(1.25");
            $("#side2").css("transform", "translateX(-40px) scale(1.0)");
            $("#side3").css("transform", "translateX(40px) scale(1.0)");
            flag = 1;
        }
        else if (flag == 1) {
            $("#side3").css("z-index", "999");
            $("#side2").css("z-index", "9");
            $("#side1").css("z-index", "9");
            $("#side3").css("transform", "translateX(0px) scale(1.25)");
            $("#side1").css("transform", "translateX(-40px) scale(1.0)");
            $("#side2").css("transform", "translateX(40px) scale(1.0)");
            flag = 2;
        }
        else if (flag == 2) {
            $("#side2").css("z-index", "999");
            $("#side3").css("z-index", "9");
            $("#side1").css("z-index", "9");
            $("#side2").css("transform", "translateX(0px) scale(1.25)");
            $("#side3").css("transform", "translateX(-40px) scale(1.0");
            $("#side1").css("transform", "translateX(40px) scale(1.0)");
            flag = 0;
        }
    });

    $("#pre").click(function () {
        if (flag == 0) {
            $("#side3").css("z-index", "999");
            $("#side2").css("z-index", "9");
            $("#side1").css("z-index", "9");
            $("#side3").css("transform", "translateX(0px) scale(1.25)");
            $("#side1").css("transform", "translateX(-40px) scale(1.0)");
            $("#side2").css("transform", "translateX(40px) scale(1.0)");
            flag = 2;
        }
        else if (flag == 1) {
            $("#side2").css("z-index", "999");
            $("#side3").css("z-index", "9");
            $("#side1").css("z-index", "9");
            $("#side2").css("transform", "translateX(0px) scale(1.25)");
            $("#side3").css("transform", "translateX(-40px) scale(1.0)");
            $("#side1").css("transform", "translateX(40px) scale(1.0");
            flag = 0;
        }

        else if (flag == 2) {
            $("#side1").css("z-index", "999");
            $("#side2").css("z-index", "9");
            $("#side3").css("z-index", "9");
            $("#side1").css("transform", "translateX(0px) scale(1.25)");
            $("#side2").css("transform", "translateX(-40px) scale(1.0)");
            $("#side3").css("transform", "translateX(40px) scale(1.0)");
            flag = 1;
        }
    });


    //////code for creating donut pie chart///////////////////////////////

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = google.visualization.arrayToDataTable([
            ['Food', 'Total per Day'],
            ['Water', 11],
            ['Carbs', 2],
            ['Fats', 2],
            ['Fiber', 2],
            ['Proteins', 7]
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

});
