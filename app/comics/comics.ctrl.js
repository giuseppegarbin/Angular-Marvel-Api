'use strict'

app.controller('comicsController', ['$scope', 'marvelService', 'Page',

    function($scope, marvelService, Page) {

        Page.setTitle('Comics');
        $scope.pageClass = 'page__comics';
        $scope.comics = {};
        var offset = 0;
        var limit = 100;

        getData(offset, limit);

        function getData(offset, limit){
          marvelService.comics(offset, limit).
            then(function(comicsData){
                console.log(comicsData);
                $scope.limit = comicsData.data.limit;
                $scope.offset = comicsData.data.offset;
                $scope.total_items = comicsData.data.total;
                $scope.total_pages = Math.ceil(comicsData.data.total / comicsData.data.limit);
                $scope.current_page = comicsData.data.offset / limit + 1;
                $scope.attribution = comicsData.attributionText;
                $scope.comics = comicsData.data.results;

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


