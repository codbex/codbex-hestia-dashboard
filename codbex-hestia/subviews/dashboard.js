const dashboard = angular.module('dashboard', ['ideUI', 'ideView']);

dashboard.config(["messageHubProvider", function (messageHubProvider) {
    messageHubProvider.eventIdPrefix = 'app';
}]);

dashboard.controller('DashboardController', ['$scope', '$http', 'messageHub', function ($scope, $http, messageHub) {
    $scope.state = {
        isBusy: true,
        error: false,
        busyText: "Loading...",
    };

    // $scope.openPerspective = function (perspective) {
    //     if (perspective === 'sales-orders') {
    //         messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'sales-orders' }, true);
    //     } else if (perspective === 'products') {
    //         messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'products' }, true);
    //     } else if (perspective === 'sales-invoices') {
    //         messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'sales-invoices' }, true);
    //     } else {
    //         $http.get("google.com")
    //     }
    //     ;
    // }

    $scope.state.isBusy = false;


    messageHub.onDidReceiveMessage(
        "contextmenu",
        function (msg) {
            if (msg.data === 'sales-orders') {
                messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'sales-orders' }, true);
            } else if (msg.data === 'products') {
                messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'products' }, true);
            } else if (msg.data === 'sales-invoices') {
                messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'sales-invoices' }, true);
            }
        }
    );
}]);