const dashboard = angular.module('dashboard', ['ideUI', 'ideView']);

dashboard.controller('DashboardController', ['$scope', '$document', '$http', 'messageHub', function ($scope, $document, $http, messageHub) {
    $scope.state = {
        isBusy: true,
        error: false,
        busyText: "Loading...",
    };

    angular.element($document[0]).ready(async function () {
        const productData = await getProductData();
        // Doughnut Chart Data
        const doughnutData = {
            labels: ['Active Products', 'Inactive Products'],
            datasets: [{
                data: [productData.ActiveProducts, productData.InactiveProducts],
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
        } else if (perspective === 'products') {
            messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'products' }, true);
        } else if (perspective === 'sales-invoices') {
            messageHub.postMessage('launchpad.switch.perspective', { perspectiveId: 'sales-invoices' }, true);
        }
        ;
    }

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

    // const partnerServiceUrl = "/services/ts/codbex-hestia/api/PartnerService.ts/partnerData";
    // $http.get(partnerServiceUrl)
    //     .then(function (response) {
    //         $scope.PartnerData = response.data;
    //     });

    async function getProductData() {
        try {
            const response = await $http.get("/services/ts/codbex-hestia/api/ProductService.ts/productData");
            return response.data;
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    }

    function calculateGrossProfit() {
        if ($scope.InvoiceData && $scope.OrderData) {
            $scope.GrossProfit = (($scope.InvoiceData.SalesInvoiceTotal + $scope.OrderData.SalesOrderTotal) - ($scope.InvoiceData.PurchaseInvoiceTotal + $scope.OrderData.PurchaseOrderTotal)).toFixed(2);
        }
    }

    async function getOrderData() {
        try {
            const response = await $http.get("/services/ts/codbex-hestia/api/OrderService.ts/orderData");
            return response.data;
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    }

    async function getCustomerById(customerId) {
        try {
            const response = await $http.get(`/services/ts/codbex-hestia/api/PartnerService.ts/partnerData/customers/${customerId}`); // Making a GET request to the endpoint
            return response; // Returning the fetched data
        } catch (error) {
            console.error("Error fetching customer:", error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    angular.element($document[0]).ready(async function () {
        try {
            const orderData = await getOrderData();
            const topSalesOrders = orderData.TopSalesOrders;

            console.log(topSalesOrders); // Log topSalesOrders to the console

            const tableBody = document.getElementById('top_sales');
            const rows = [];

            for (const order of topSalesOrders) {
                rows.push(
                    (async () => {
                        try {
                            const customer = await getCustomerById(order.Customer);
                            console.log(customer);

                            // Create a new table row
                            const $row = $('<tr>');
                            // Insert order details into table cells
                            $row.html(`
                            <td class="fd-table__cell"><a class="fd-link"><span class="fd-link__content">${order.Number}</span></a></td>
                            <td class="fd-table__cell">${customer.Name}</td>
                            <td class="fd-table__cell">${order.Gross}</td>
                        `);
                            // Append the row to the table body
                            $(tableBody).append($row);
                        } catch (error) {
                            console.error("Error fetching customer:", error);
                            // Handle error
                        }
                    })()
                );
            }

            // Wait for all promises to resolve
            await Promise.all(rows);
        } catch (error) {
            console.error("Error fetching order data:", error);
            // Handle error
        }
    });

}]);