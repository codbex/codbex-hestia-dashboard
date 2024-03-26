const dashboard = angular.module('dashboard', ['ideUI', 'ideView']);

dashboard.controller('DashboardController', ['$scope', '$document', 'messageHub', function ($scope, $document, messageHub) {
    $scope.state = {
        isBusy: true,
        error: false,
        busyText: "Loading...",
    };

    $scope.loadContents = function () {
        $scope.state.isBusy = false;
        //         $scope.state.error = true;
        // $scope.errorMessage = "The 'file' data parameter is missing.";
    };

    angular.element($document[0]).ready(function () {
        $scope.$apply(function () {
            $scope.loadContents();
        });
    });
}]);