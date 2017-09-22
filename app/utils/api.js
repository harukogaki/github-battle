var axios = require('axios');
// var id = "YOUR_CLIENT_ID";
// var secret = "YOUR_SECRET";
// var params = '?client_id=' + id + '&client_secret=' + secret + '&per_page=100';
var params = '?per_page=100'

function getProfile(username){
  return axios.get('http://api.github.com/users/' + username + params).then(function(user){
    return user.data;
  })
}

function getRepos(username){
  return axios.get('http://api.github.com/users/' + username + '/repos' + params )
}

function getStartCount(repos){
  return repos.data.reduce(function(count, repo){
    return count + repo.stargazers_count;
  },0)
}

function calculateScore(profile, repos){
  var followers = profile.followers;
  var totalStars = getStartCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error){
  console.warn(error);
  return null;
}

function getUserData(player){
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function(data){
    var profile = data[0];
    var repos = data[1];

    var data = {
      profile: profile,
      score: calculateScore(profile,repos)
    };

    return data;
  });
}

function sortPlayers(players){
  var ranking = players.sort(function(a,b){
     return b.score - a.score;
  });

  return ranking;
}

module.exports = {
  battle: function(players){
    return axios.all(players.map(getUserData)).then(sortPlayers).catch(handleError);
  },

  fetchPopularRepos: function(language){
    var encodedUri = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'
    + language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedUri).then(function(response){
      return response.data.items;
    });
  }
}
