$(document).ready(function(){
    $("#moreInfo").click(function(){
        $("#panel").slideToggle("slow");
    });

    $("#calculate").click(function(){
        $("#calculate").toggleClass("false");

        //If button hass class "false" continue
        if($("#calculate").hasClass("false")){
            var name1 = $("#person1").val(); //Getting the value of input1
            var name2 = $("#person2").val(); //Getting the value of input2

            //Settings for calling the API we are using
            const settings = {
                "url": "https://love-calculator.p.rapidapi.com/getPercentage?sname="+name1+"&fname="+name2,
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Key": "5784b570e7msh46bcabeb3618464p179590jsn272f2a0f6e83",
                    "X-RapidAPI-Host": "love-calculator.p.rapidapi.com"
                }
            };

            changeClasses("col-sm-3","col-sm-12","20%");

            for(let i = 0; i <= 4; i++){
                $("#battery").fadeToggle();
            }

            $("#battery").fadeIn(function(){
                changeClasses("col-sm-12","col-sm-3", "80%");
                apiRequest(settings);
            });

            //Emptying textareas
            $("#person1").val("");
            $("#person2").val("");
        }
        changeBack();
    });
    
    function changeClasses(class1, class2, battery){
        $("#photo").removeClass(class1);
        $("#photo").addClass(class2);
        $("#battery").css("width", battery);
    }

    function apiRequest(settings){
        $.ajax(settings).done(function (response) {
            $("#calculate").text("AGAIN");
            var compatible = response.percentage; //Returns percentage of the names
            var person1 = response.sname; //Returns first name
            var person2 = response.fname; //Returns second name
            var resultPhrase = response.result; //Returns a phrase based on names' compatibility

            //Displaying the information
            getPicture(compatible);
            percentage = $("#percentage").text(compatible + "%");
            $("#names").html("<b>"+person1+" + "+person2+"</b>");
            $("#results").text('"'+resultPhrase+'"');
        });
    }

    function getPicture(compatible){
        //Changes the picture accordingin to compatibility
        if(compatible == 0){
            $("#battery").attr("src", "images/empty-battery.png");
            return;
        }

        if(compatible > 0 && compatible < 34){
            $("#battery").attr("src", "images/low-battery.png");
            return;
        }

        if(compatible > 33 && compatible < 67){
            $("#battery").attr("src", "images/medium-battery.png");
            return;
        }
    
        if(compatible > 66 && compatible <= 100){
            $("#battery").attr("src", "images/full-battery.png");
            return;
        }
    }

    function changeBack(){
        //Changes site to it's original look
        $("#atStart, #afterCalculation").toggle();

        $("#calculate").text("CALCULATE");

        $("#battery").attr("src", "images/empty-battery.png");
        $("#percentage").html("<b>...%</b>");

        $("#names").text("");
        $("#results").text("");
    }
});