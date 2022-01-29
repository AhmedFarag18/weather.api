$(document).ready(function() {
    // header example
    $("header li a").on("click", function() {

        $(this).addClass("active").parent().siblings().find("a").removeClass("active");
    });


    // window example
    var homeOffset = $(".home").offset().top;
    $(window).scroll(function() {

        var windowScroll = $(this).scrollTop();
        if (windowScroll >= 200) {
            $("header").addClass("changeHeader");
        } else {
            $("header").removeClass("changeHeader");
        }
    });


    //========= denamic Tabs=============
    $("header a").click(function() {
        var myId = $(this).attr("id");

        $("body section").hide();
        $('.' + myId).fadeIn();
    });

    //================= filter Images =============

    $(".tabs button").click(function() {
        var classEle = $(this).attr("class");

        if (classEle == "all") {
            $(".images img").fadeIn();
        } else {
            $(".images img").hide();
            $(".images ." + classEle).fadeIn();
        }
    });


    // Smoth scroll
    var headerHieght = $("header").height();
    $("header a").click(function() {
        var id = $(this).attr("id");
        $("body,html").animate({
            scrollTop: $("." + id).offset().top - headerHieght
        })
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $(".scrollToTop").fadeIn(500);
        } else {
            $(".scrollToTop").fadeOut(500);
        }
    });


    $(".scrollToTop").click(function() {
        $("body,html").animate({
            scrollTop: 0
        }, 600)
    })


    $("textarea").keyup(function(e) {
        if (e.target.value.length >= 30) {
            e.target.value = e.target.value.substr(0, 30)
        }
    });



    //================= get data from API ===================


    $(".button").click(function() {

        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${$(".inputValue").val()}&units=metric&appid=0695bfa79d04b5ce119316b91c6734e7`,
            data: {
                format: "json"
            },
            success: function(data) {
                console.log(data)
                $(".city").text(`Weather in ${data.name}`);
                $(".temp").html(data.main.temp + "<sup>o</sup>C");
                $(".desc").text(data.weather[0].description);

                var allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var d = new Date(data.dt * 1000); // to get the DateTime. 
                var dayName = allDays[d.getDay()]; // It will give day index, and based on index we can get day name from the array. 
                $(".day").text(dayName);

                $(".display").css("display", "flex");
                $(".wrong").css("display", "none");
            },
            error: function() {
                $(".wrong").text("Wrong city Name").css("display", "block");
                $(".display").css("display", "none");

            }
        });

    });

});