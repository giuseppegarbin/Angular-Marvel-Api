'use strict'

app.factory('marvelService', ['$http', 'marvelEndpoints', 'marvelApiKeys', 'md5',

  function MarvelService($http, marvelEndpoints, marvelApiKeys, md5) {

    var self = this;
    var api = 'http://gateway.marvel.com/v1/public/';

    function request(url) {
      return $http.get(url).then(
        function resultHandler(response) {
          if (response.data.code !== 200) {
            // something goes wrong
            if (response.data.code === 429) {
              throw new Error('Rate limit has been surpassed! Webserver responded with HTTP STATUS: ' + response.data.code);
            } else {
              throw new Error('Webserver responded with HTTP STATUS: ' + response.data.code);
            }
          }
          return response.data;
        }
      );
    }

    function composeUrl(destination, offset, limit, id) {
      var sep = '/';
      var off = offset;
      var lim = limit;
      var ts = Date.now();
      var hash = md5.createHash(ts.toString() + marvelApiKeys.PRIVATE + marvelApiKeys.PUBBLIC);
      var url = api + destination;

      if (angular.isDefined(id)) {
        url += sep + id.toString();
      }

      url += '?ts=' + ts.toString();
      url += '&apikey=' + marvelApiKeys.PUBBLIC;
      url += '&hash=' + hash;
      url += '&offset=' + off.toString();
      url += '&limit=' + lim.toString();
      
      return url;
    }

    function getSpecificResource(destination, offset, limit, id) {
      var url = composeUrl(destination, offset, limit, id);
      return request(url);
    }

    function characters(offset, limit, id) {
      return getSpecificResource(marvelEndpoints.CHARACTERS, offset, limit, id);
    }

    function comics(offset, limit, id) {
      return getSpecificResource(marvelEndpoints.COMICS, offset, limit, id);
    }

    return {

      characters: characters,
      comics: comics

    };

}]);


app.factory('Page', function(){
  var title = 'Homepege';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});