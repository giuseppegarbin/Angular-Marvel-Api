'use strict'

app.controller('charactersController', ['$scope', 'marvelService', 'Page', 

    function($scope, marvelService, Page) {

        Page.setTitle('Characters');
        $scope.pageClass = 'page__characters';
        $scope.characters = {};
        var offset = 0;
        var limit = 20;

        getData(offset, limit);

        function getData(offset, limit){
          marvelService.characters(offset, limit).
            then(function(charactersData){
                console.log(charactersData);
                $scope.limit = charactersData.data.limit;
                $scope.offset = charactersData.data.offset;
                $scope.total_items = charactersData.data.total;
                $scope.total_pages = Math.ceil(charactersData.data.total / charactersData.data.limit);
                $scope.current_page = charactersData.data.offset / limit + 1;
                $scope.attribution = charactersData.attributionText;
                $scope.characters = charactersData.data.results;

                $scope.slider = {
                    value: $scope.current_page,
                    options: {
                      floor: 1,
                      ceil: $scope.total_pages,
                      id: 'page_slider',
                        onEnd: function(sliderId, modelValue) {
                          offset = modelValue * limit - limit;
                          getData(offset, limit);
                        }
                    }
                };
          });
        }

        $scope.goForward = function(currentPage) {
          offset = currentPage * limit;
          getData(offset, limit);
        }
        $scope.goBack = function(currentPage) {
          offset = currentPage * limit - limit;
          getData(offset, limit);
        }

    }
]);


