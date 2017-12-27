$(document).ready(function() {
	$('#searchUser').on('keyup', function(e) {
		let username = e.target.value;

		// Make request to github
		$.ajax({
			url: 'https://api.github.com/users/' + username,
			data: {
				client_id: '43909c455076ae5639f3',
				client_secret: 'e6bc80bc9327222d20233e47168160b1d754c509'
			}
		}).done(function(user) {
			$.ajax({
				url: 'https://api.github.com/users/' + username + '/repos',
				data: {
					client_id: '43909c455076ae5639f3',
					client_secret: 'e6bc80bc9327222d20233e47168160b1d754c509',
					sort: 'created: asc',
					per_page: 5
				}
			}).done(function(repos) {
				$.each(repos, function(index, repo) {
					$('#repos').append(`
						<div class="well">
							<div class="row">
								<div class="col-md-7">
									<strong>${repo.name}</strong>: ${repo.discription}
								</div>
								<div class="col-md-3">
									<span class="label label-info">Forks: ${repo.forks_count}</span>
									<span class="label label-info">Watchers: ${repo.watchers_count}</span>
									<span class="label label-info">Stars: ${repo.stargazers_count}</span>
								</div>
								<div class="col-md-2">
									<a href="${repo.html_url}" class="btn btn-default" target="_blank">Repo Page</a>
								</div>
							</div>
						</div>
					`);
				});
			});
			
			$('#profile').html(`
				<div class="card">
				  <div class="card-header"
					<h3 class="card-title">${user.name}</h3>
				  </div>
				  <div class="card-body">
				    <div class="row">
						<div class="col-md-3">
							<img class="img-thumbnail avatar" src="${user.avatar_url}" />
							<a href="${user.html_url}" class="btn btn-primary btn-block" target="_blank">View Profile</a>
						</div>
						<div class="col-md-9">
							<span class="label label-info">Public Repos: ${user.public_repos}</span>
							<span class="label label-info">Public Gists: ${user.public_gists}</span>
							<span class="label label-info">Followers: ${user.followers}</span>
							<span class="label label-info">Following: ${user.following}</span>
							<br /><br />
							<ul class="list-group">
								<li class="list-group-item">Company: ${user.company}</li>
								<li class="list-group-item">Website/Blog: ${user.blog}</li>
								<li class="list-group-item">Location: ${user.location}</li>
								<li class="list-group-item">Member Since: ${user.created_at}</li>
							</ul>
						</div>
				    </div>
				  </div>
				</div>
				<h3 class="page-header">Latest repos</h3>
				<div id="repos"></div>
			`);
		})
	});
});
