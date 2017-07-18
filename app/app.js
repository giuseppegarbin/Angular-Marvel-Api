'use strict'

var app = angular.module('MarvelApp', ['ngRoute', 'ngAnimate', 'angular-md5', 'rzModule']);

app.config(function($routeProvider) {
  $routeProvider

    .when('/', {
      templateUrl: 'app/home/home.html',
      controller: 'homeController'
    })

    .when('/characters', {
      templateUrl: 'app/characters/characters.html',
      controller: 'charactersController'
    })

    .when('/characters/:id', {
      templateUrl: 'app/characters/character.html',
      controller: 'characterController'
    })

    .when('/comics', {
      templateUrl: 'app/comics/comics.html',
      controller: 'comicsController'
    });
});



