const dashboard = angular.module('dashboard', ['ideUI', 'ideView']);

dashboard.controller('DashboardController', ['$scope', '$document', '$http', 'messageHub', function ($scope, $document, $http, messageHub) {
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

    $scope.today = new Date();

    const invoiceServiceUrl = "/services/ts/codbex-hestia/api/InvoiceService.ts/invoiceData";
    $http.get(invoiceServiceUrl)
        .then(function (response) {
            $scope.InvoiceData = response.data;
            calculateGrossProfit();
        });

    const orderServiceUrl = "/services/ts/codbex-hestia/api/OrderService.ts/orderData";
    $http.get(orderServiceUrl)
        .then(function (response) {
            $scope.OrderData = response.data;
            calculateGrossProfit();
        });

    function calculateGrossProfit() {
        if ($scope.InvoiceData && $scope.OrderData) {
            $scope.GrossProfit = ($scope.InvoiceData.SalesInvoiceTotal + $scope.OrderData.SalesOrderTotal) - ($scope.InvoiceData.PurchaseInvoiceTotal + $scope.OrderData.PurchaseOrderTotal);
        }
    }
}]);