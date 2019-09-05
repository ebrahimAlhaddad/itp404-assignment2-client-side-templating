$('#search_form').on('submit', function(){

	$('#results').empty();
	$('#spinner').css('display','block');

	let endpoint = 'https://www.reddit.com/r/' + $('input').val() + '.json';
	let promise = $.ajax({
		type:'GET',
		url:endpoint
	});

	promise.then(function(response){


		let response_array = response.data.children
		let fragment = document.createDocumentFragment();

		response_array.forEach(function(member){

			let entry_div = document.createElement('div');
			let title = document.createElement('a');
			let score = document.createElement('h5');
			let author = document.createElement('h5');
			let seperator = document.createElement('hr');

			title.innerText = member.data.title;
			title.href = member.data.url;
			title.target = "_blank";
			score.innerText = `Score: ${member.data.score}`;
			author.innerText = `Author: ${member.data.author}`;

			entry_div.append(title);
			entry_div.append(score);
			entry_div.append(author);
			entry_div.append(seperator);
			fragment.append(entry_div);
			

		});

		$('#results').html(fragment);
		$('#spinner').css('display','none');


	});


	return false;
});