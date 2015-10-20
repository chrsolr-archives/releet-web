(function () {
    'use strict';

    angular.module('controllers').controller('GamesController', ['$scope', 'ApiServices',
        function ($scope, ApiServices) {
            $scope.tabs = [
                { id: 1, title:'Game Information', templateUrl:'/views/game-info-partial.html' },
                { id: 2, title:'Achievements', templateUrl:'/views/achievements-partial.html' },
                { id: 3, title:'Screenshots', templateUrl: '/views/screenshots-partial.html' }
            ];
            
            $scope.currentId = $scope.tabs[0].id;
            $scope.screenshotsPageNumber = 1;

            ApiServices.getLatestAchievements().then(function (response) {
                $scope.games = response.data;
                $scope.selectedGame = $scope.games[0];
                $scope.update(1);
            });

            function getAchievements() {
                $scope.achievements = undefined;
                
                ApiServices.getAchievements($scope.selectedGame.permalink).then(function (response) {
                    $scope.achievements = response.data;
                });
            };

            function getScreenshots() {
                $scope.screenshots = undefined;
                
                ApiServices.getScreenshots($scope.selectedGame.permalink, $scope.screenshotsPageNumber).then(function (response) {
                    $scope.screenshots = response.data;
                });
            };
            
            function getGameInfo() {
                $scope.gameInfo = undefined;
                
                ApiServices.getGameInfo($scope.selectedGame.permalink).then(function (response) {
                    $scope.gameInfo = response.data;
                });
            };

            $scope.update = function(id){
                $scope.currentId = id;
                
                switch (id) {
                    case 1:
                        getGameInfo();
                        break;
                    case 2:
                        getAchievements();
                        break;
                    case 3:
                        getScreenshots();
                        break;
                }
            };

        }]);

    angular.module('controllers').controller('LatestAchievementsController', ['ApiServices',
        function (ApiServices) {
            var vm = this;
            
            vm.pageNumber = 1;

            ApiServices.getLatestAchievements().then(function (response) {
                vm.achievements = response.data;
            });

            vm.getLatestAchievements = function () {
                ApiServices.getLatestAchievements(vm.pageNumber).then(function (response) {
                    vm.achievements = response.data;
                });
            }
        }]);
})();