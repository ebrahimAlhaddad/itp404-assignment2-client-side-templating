
const subredditTemplate = Handlebars.compile( document.getElementById('subreddit-template').innerHTML );

Handlebars.registerHelper('number-format',function(number){
	return number.toLocaleString();
});

$('#search_form').on('submit', function(){

	$('#results').empty();
	$('#spinner').css('display','block');
	let endpoint = 'https://www.reddit.com/r/' + $('input').val() + '.json';

	let promise = $.ajax({
		type:'GET',
		url:endpoint
	});

	promise.then(function(response){
		console.log(response);
		let response_array = response.data.children

		let sanitizedHtml = subredditTemplate({
			subreddits:response_array
		});

		$('#results').html(sanitizedHtml);
		$('#spinner').css('display','none');
	});

	return false;
});