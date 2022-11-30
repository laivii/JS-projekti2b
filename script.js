$(document).ready(function(){
    $("#calculate").click(function(){
        $("#calculate").toggleClass("false");

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

            //Emptying textareas
            $("#person1").val("");
            $("#person2").val("");
        }
        changeBack();
    });

    $("#moreInfo").click(function(){
        $("#panel").slideToggle("slow");
    });

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