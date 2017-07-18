# AngularJS & Marvel Api

I needed to make some practice with AngularJS and API. I wanted to create a simple app which get JSON data from an API response and structure the view to show multiple objects (index) or a single object (detail).

### Marvel API

I started to work woth the Marvel API. [Take a look](https://developer.marvel.com/).
I have developer my application using only to the Characters and the Comics endpoints.

### Getting data

To make the http request to the API server I have created a factory. This is the core of the app:

```js
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
```

Before to send the request we need to compose the url correctly:


```js
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
```

## Dependencies

* AngularJS (1.6.5)
* AngularJS Animate (1.6.5)
* Angular MD5 (0.1.10)
* Angular Route (1.6.5)
* AngularJS Slider (6.2.3),
* Bootstrap (3.3.7)
* JQuery (3.2.1)


## Author

* **Giuseppe Garbin** - *Web Marketing Specialist @ Garmin* - [Visit my website](https://www.giuseppegarbin.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
