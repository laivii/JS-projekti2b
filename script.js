
$(document).ready(function(){
    $("#calculate").click(function(){
        $("#calculate").toggleClass("false");

        if($("#calculate").hasClass("false")){
            var name1 = $("#person1").val(); //Getting the value of input1
            var name2 = $("#person2").val(); //Getting the value of input2

            //Setting for calling the API we are using
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

                var compatible = response.percentage; //Tells the percentage of the two names in number
                percentage = $("#percentage").text(compatible + "%"); //Setting the mage percentage correctly

                //Assigning variables
                var person1 = response.sname;
                var person2 = response.fname;
                var resultPhrase = response.result;

                //Checking the percentage so we can pick the battery image accordingly
                if(compatible == 0){
                    $("#battery").attr("src", "images/empty-battery.png");
                }
    
                if(compatible > 0 && compatible < 34){
                    $("#battery").attr("src", "images/low-battery.png");
                }
    
                if(compatible > 33 && compatible < 67){
                    $("#battery").attr("src", "images/medium-battery.png");
                }
            
                if(compatible > 66 && compatible <= 100){
                    $("#battery").attr("src", "images/full-battery.png");
                }

                //Printing the results we get from the API
                $("#names").html("<b>"+person1+" + "+person2+"</b>");
                $("#results").text('"'+resultPhrase+'"');
            });

            $("#person1").val("");
            $("#person2").val("");
        }

        //Changing back to original look
        $("#atStart, #afterCalculation").toggleClass("hide");
        $("#calculate").text("CALCULATE");

        $("#battery").attr("src", "images/empty-battery.png");
        $("#percentage").html("<b>...%</b>");

        $("#names").text("");
        $("#results").text("");
    });

    $("#moreInfo").click(function(){
        $("#panel").slideToggle("slow");
    });
});