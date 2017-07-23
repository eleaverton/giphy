var feelings = ["happy", "sad", "scared", "excited"];

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
	console.log($(this).attr("class"));
	var clickFeeling = $(this).attr("data-emotion");
	console.log(clickFeeling);
	var giflimit = "10";
 	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
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
	        emotionImage.attr("src",results[i].images.fixed_height.url);
	        emotionDiv.append(p);
	        emotionDiv.append(emotionImage);
	        $("#gifs-appear-here").last().after(emotionDiv);
	    }
	});

};

$("#find-emotion").on("click", function(event) {
	event.preventDefault();
 	var newFeeling = $("#emotion-input").val().trim();
 	feelings.push(newFeeling);
 	console.log(feelings);
 	renderButtons();
});

$(document).on("click", ".feeling", showGifs);

renderButtons();





