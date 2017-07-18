'use strict'

app.controller('homeController', ['$scope', 'marvelService', 'Page',

    function($scope, marvelService, Page) {

        $scope.Page = 'Homepage';
        $scope.pageClass = 'page__home';

    }
]);