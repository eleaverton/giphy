var feelings = ["happy", "sad", "scared", "excited"];
var urlstring;

function renderButtons(){
	$("#buttons-appear-here").empty();
	for (var i=0;i<feelings.length; i++){
		var a = $("<button>");
		a.addClass("btn btn-primary feeling");
		a.attr("type","button")
		a.attr("data-emotion", feelings[i]);
		a.text(feelings[i]);
		console.log(a);
		$("#buttons-appear-here").append(a);
	}
}

function showGifs(){
	$("#gifs-appear-here").empty();
	$(this).addClass("active");
	console.log($(this).attr("class"));
	var clickFeeling = $(this).attr("data-emotion");
	console.log(clickFeeling);
	var giflimit = "10";
 	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        clickFeeling + "&api_key=dc6zaTOxFJmzC&limit="+giflimit;

    $.ajax({
    	url:queryURL,
    	method:"GET"
    }).done(function(response){
    	console.log(response);
    	var results = response.data;
    	for (var i = 0; i < results.length; i++) {
			var emotionDiv = $("<div class='emotionsDiv'>");
            var p = $("<p>");
	        p.text("Rating: "+results[i].rating);
	        var emotionImage = $("<img>");
	        urlstring = (results[i].images.fixed_height.url).toString();
	        console.log(urlstring);
	        stillurl = urlstring.replace('200','200_s');
	        console.log(stillurl)
	        emotionImage.attr("src",stillurl);
	        emotionImage.attr("data-state","still");
	        emotionImage.addClass("gif");
	        emotionDiv.append(p);
	        emotionDiv.append(emotionImage);
	        $("#gifs-appear-here").prepend(emotionDiv);
	    }
	});

};

function animateGif(){
	console.log("click works");
	var state = $(this).attr("data-state");
	if (state === "still"){
        stillurl = $(this).attr("src");
		animateurl = stillurl.replace('200_s','200');
		$(this).attr("src",animateurl);
        $(this).attr("data-state","animate");
      }
    else {
        animateurl = $(this).attr("src");
        stillurl = animateurl.replace('200','200_s');
        $(this).attr("src",stillurl);
        $(this).attr("data-state","still");
      }
};

$("#find-emotion").on("click", function(event) {
	event.preventDefault();
 	var newFeeling = $("#emotion-input").val().trim();
 	feelings.push(newFeeling);
 	console.log(feelings);
 	renderButtons();
});

$(document).on("click", ".feeling", showGifs);

$(document).on("click", ".gif", animateGif);

renderButtons();





