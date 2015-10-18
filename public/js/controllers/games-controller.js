(function () {
    'use strict';

    angular.module('controllers').controller('GamesController', ['$scope',
        function ($scope) {
            $scope.tabAchievementsTemplate = '/views/achievements-partial.html';
        }]);

    angular.module('controllers').controller('AchievementsController', ['$scope', 'ApiServices', function ($scope, ApiServices) {

        ApiServices.getLatestAchievements(1).then(function (response) {
            $scope.achievements = response.data;
            $scope.selectedGame = $scope.achievements[0];

            console.log($scope.selectedGame);

            $scope.getAchievements();
        });

        $scope.getAchievements = function () {
            ApiServices.getAchievements($scope.selectedGame.permalink).then(function (response) {
                $scope.details = response.data;
            });
        };
    }]);

    angular.module('controllers').controller('LatestAchievementsController', ['$scope', 'ApiServices',
        function ($scope, ApiServices) {
            $scope.pageNumber = 1;

            ApiServices.getLatestAchievements().then(function (response) {
                $scope.achievements = response.data;
            });

            $scope.getLatestAchievements = function () {
                ApiServices.getLatestAchievements($scope.pageNumber).then(function (response) {
                    $scope.achievements = response.data;
                });
            }
        }]);
})();