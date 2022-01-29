// var myKey = `fa62b5264546453aa2e124620222901`;


// function to get the [ Day Name ] 
function getDayName(date = new Date(), locale = 'en-US') {
    return date.toLocaleDateString(locale, { weekday: 'long' });
}


$(document).ready(function() {
    // make and return data about  cairo and show it when load the page
    $.ajax({
        type: "GET",
        url: `http://api.weatherapi.com/v1/forecast.json?key=fa62b5264546453aa2e124620222901&q=cairo&days=3&aqi=no&alerts=no`,
        data: {
            format: "json"
        },
        success: function(data) {
            console.log(data);
            $(".location").text(`${data.location.name}`);
            $(".mintemp_c2").html(data.forecast.forecastday[1].day.mintemp_c + "<sup>o</sup>C");
            $(".mintemp_c3").html(data.forecast.forecastday[2].day.mintemp_c + "<sup>o</sup>C");
            $(".date").text(data.forecast.forecastday[0].date);

            for (let i = 0; i < 3; i++) {
                $(`.maxtemp_c${i+1}`).html(data.forecast.forecastday[i].day.maxtemp_c + `<sup>o</sup>C`);
                $(`.icon_weather${i+1}`).attr(`src`, `http:` + data.forecast.forecastday[i].day.condition.icon);
                $(`.day${i+1}`).text(getDayName(new Date(`${data.forecast.forecastday[i].date}`)))
                $(`.custom${i+1}`).text(data.forecast.forecastday[i].day.condition.text);
            }

        },
        error: function() {
            console.log("error cauched")
        }
    });


    // when search about any city
    $("#submit").click(function() {
        $.ajax({
            type: "GET",
            url: `http://api.weatherapi.com/v1/forecast.json?key=fa62b5264546453aa2e124620222901&q=${$("#search").val()}&days=3&aqi=no&alerts=no`,
            data: {
                format: "json"
            },
            success: function(data) {
                console.log(data);

                $(".location").text(`${data.location.name}`);
                $(".mintemp_c2").html(data.forecast.forecastday[1].day.mintemp_c + "<sup>o</sup>C");
                $(".mintemp_c3").html(data.forecast.forecastday[2].day.mintemp_c + "<sup>o</sup>C");
                $(".date").text(data.forecast.forecastday[0].date);

                for (let i = 0; i < 3; i++) {
                    $(`.maxtemp_c${i+1}`).html(data.forecast.forecastday[i].day.maxtemp_c + `<sup>o</sup>C`);
                    $(`.icon_weather${i+1}`).attr(`src`, `http:` + data.forecast.forecastday[i].day.condition.icon);
                    $(`.day${i+1}`).text(getDayName(new Date(`${data.forecast.forecastday[i].date}`)))
                    $(`.custom${i+1}`).text(data.forecast.forecastday[i].day.condition.text);
                }
            },
            error: function() {
                console.log("error cauched")
            }
        });

    });

});





//  // get the day and add in card 1
//           var allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//           var d = new Date(data.dt * 1000); // to get the DateTime. 
//           var dayName = allDays[d.getDay()]; // It will give day index, and based on index we can get day name from the array. 
//           $(".currentDay").text(dayName);


//           // add date in first card
//           today = dateFormat2(new Date());
//           $(".date").text(today);

// var icon_weather = 0;
// var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// ];

// function dateFormat2(d) {
//     var t = new Date(d);
//     return t.getDate() + ' ' + monthShortNames[t.getMonth()] + ', ' + t.getFullYear();
// }