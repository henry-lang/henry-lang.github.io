var city;
var weather;

function onSubmit() {
    $("#conditions").text("")
    if($("#citybox").val() != "") {
        city = $("#citybox").val();
    	$.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&APPID=e2b9189e58c2aa8236c99e1b8e20d95f", function(data){
       	var conditions = ""
        for(var i = 0; i < data.weather.length; i++) {
        	conditions = conditions + data.weather[i].main;
            if(i != data.weather.length - 1) {
            	conditions = conditions + ", ";
            }
        }
        $("#conditions").text(conditions)
        $("#temp").text(Math.round(data.main.temp).toString() + " F");
        	console.log(data);
    	})
    	$(".title").hide(1000);
       	$("#error").text("");
        if($("#temp").val() != "Invalid City Name.") {
        	$("#name").text("Weather In " + city);	    
        }
        $("#title").text("WeatherApp - " + city);
    	showWeather();
    }
    
}

function showWeather() {
	$("#weather").css("display", "block").hide().show(1000);
}

function hideWeather() {
    $("#weather").hide(1000);
    $(".title").show(1000);
    $("#title").text("WeatherApp - Home");
}

function reloadWeather() {
	city = $("#citybox").val();
    $.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&APPID=e2b9189e58c2aa8236c99e1b8e20d95f", function(data){
    var conditions = ""
    for(var i = 0; i < data.weather.length; i++) {
      	conditions = conditions + data.weather[i].main;
        if(i != data.weather.length - 1) {
        	conditions = conditions + ", ";
        }
    }
    $("#conditions").text(conditions)
    $("#temp").text(Math.round(data.main.temp).toString() + " F");
        console.log(data);
    })  
}