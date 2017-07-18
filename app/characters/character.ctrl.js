'use strict'

app.controller('characterController', ['$scope', '$routeParams', 'marvelService', '$locale', 'Page',

    function($scope, $routeParams, marvelService, $locale, Page) {

        Page.setTitle('Character');
        $scope.pageClass = 'page__character';
        $locale.NUMBER_FORMATS.GROUP_SEP = '.';
        var offset = 0;
        var limit = 1;

        var characterId = $routeParams.id;
        $scope.character = {};

        if (typeof(characterId) == 'string') {
            marvelService.characters(offset, limit, characterId).
                then(function(characterData){
                    $scope.attribution = characterData.attributionText;
                    $scope.character = characterData.data.results[0];
                    console.log($scope.character);
                });
        }
    }
]);