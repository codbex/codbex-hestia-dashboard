const dashboard = angular.module('dashboard', ['ideUI', 'ideView']);

dashboard.controller('DashboardController', ['$scope', '$document', '$http', 'messageHub', function ($scope, $document, $http, messageHub) {
    $scope.state = {
        isBusy: true,
        error: false,
        busyText: "Loading...",
    };

    // Sample data for cash flow over one year (monthly)
    // const cashFlowData = {
    //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //     datasets: [{
    //         label: "Cash Flow",
    //         data: [15000, 18000, 20000, 22000, 19000, 25000, 23000, 28000, 26000, 24000, 21000, 20000],
    //         borderColor: 'rgb(75, 192, 192)',
    //         fill: false
    //     }]
    // };

    // Doughnut Chart Data
    const doughnutData = {
        labels: ['Active Products', 'Inactive Products'],
        datasets: [{
            data: [75, 25], // Example data, replace with actual data
            backgroundColor: ['#36a2eb', '#ff6384']
        }]
    };

    // Doughnut Chart Configuration
    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Product Status'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    angular.element($document[0]).ready(function () {
        // Get the canvas element
        // const cashFlowChartCtx = $document[0].getElementById('cashFlowChart').getContext('2d');

        // Create the chart
        // const cashFlowChart = new Chart(cashFlowChartCtx, {
        //     type: 'line',
        //     data: cashFlowData,
        //     options: {
        //         responsive: true,
        //         scales: {
        //             x: {
        //                 display: true,
        //                 title: {
        //                     display: true,
        //                     text: 'Months'
        //                 }
        //             },
        //             y: {
        //                 display: true,
        //                 title: {
        //                     display: true,
        //                     text: 'Cash Flow'
        //                 }
        //             }
        //         }
        //     }
        // });

        // Initialize Doughnut Chart
        const doughnutChartCtx = $document[0].getElementById('doughnutChart').getContext('2d');
        const doughnutChart = new Chart(doughnutChartCtx, {
            type: 'doughnut',
            data: doughnutData,
            options: doughnutOptions
        });
        $scope.$apply(function () {
            $scope.state.isBusy = false;
        });
    });

    $scope.openPerspective = function (perspective) {
        if (perspective === 'sales-orders') {
            messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'sales-orders' }, true);
        }
    };

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

    const productServiceUrl = "/services/ts/codbex-hestia/api/ProductService.ts/productData";
    $http.get(productServiceUrl)
        .then(function (response) {
            $scope.ProductData = response.data;
        });

    function calculateGrossProfit() {
        if ($scope.InvoiceData && $scope.OrderData) {
            $scope.GrossProfit = ($scope.InvoiceData.SalesInvoiceTotal + $scope.OrderData.SalesOrderTotal) - ($scope.InvoiceData.PurchaseInvoiceTotal + $scope.OrderData.PurchaseOrderTotal);
        }
    }
}]);