const navigation = angular.module("launchpad", ["ngResource", "ideLayout", "ideUI"]);
navigation.controller("LaunchpadViewController", ["$scope", "messageHub", "$http", function ($scope, messageHub, $http) {
    $scope.currentViewId = 'dashboard';

    $scope.extraExtensionPoints = ['codbex-orders-dialog-window'];
    $scope.groups = [];

    $scope.switchView = function (id, event) {
        if (event) event.stopPropagation();
        $scope.currentViewId = id;
    };

    messageHub.onDidReceiveMessage('launchpad.switch.perspective', function (msg) {
        $scope.$apply(function () {
            $scope.switchView(msg.data.perspectiveId);
        });
    }, true)

    $scope.groupItems = [];
    $scope.groupItems["purchasing"] = [];
    $scope.groupItems["sales"] = [];
    $scope.groupItems["inventory"] = [];
    $scope.groupItems["finance"] = [];
    $scope.groupItems["products"] = [];
    $scope.groupItems["employees"] = [];
    $scope.groupItems["partners"] = [];
    $scope.groupItems["configurations"] = [];

    $scope.groups = [
        {
            "name": "Purchasing", "expanded": "purchasingExpanded", "icon": "credit-card",
            // "items": [
            //     // { "name": "Purchase Orders", "view": "purchase-orders" },
            //     // { "name": "Purchase Invoices", "view": "purchase-invoices" },
            //     // { "name": "Supplier Payments", "view": "supplier-payments" }
            // ]
        },
        {
            "name": "Sales", "expanded": "salesExpanded", "icon": "currency",
            // "items": [
            //     // { "name": "Sales Orders", "view": "sales-orders" },
            //     // { "name": "Sales Invoices", "view": "sales-invoices" },
            //     // { "name": "Customer Payments", "view": "customer-payments" },
            //     // { "name": "Debit Note", "view": "debit-note" },
            //     // { "name": "Credit Note", "view": "credit-note" }
            // ]
        },
        {
            "name": "Inventory", "expanded": "inventoryExpanded", "icon": "retail-store",
            // "items": [
            //     //     { "name": "Goods Receipts", "view": "goods-receipts" },
            //     //     { "name": "Goods Issues", "view": "goods-issues" },
            //     //     { "name": "Delivery Note", "view": "delivery-note" },
            //     //     { "name": "Stock Adjustments", "view": "stock-adjustments" },
            //     //     { "name": "Waste", "view": "waste" }
            // ]
        },
        {
            "name": "Finance", "expanded": "financeReportsExpanded", "icon": "area-chart",
            // "items": [
            //     // { "name": "Sales Orders", "view": "sales-orders-report" },
            //     // { "name": "Sales Orders Total", "view": "sales-orders-total-report" },
            //     // { "name": "Purchase Orders", "view": "purchase-orders-report" },
            //     // { "name": "Purchase Orders Total", "view": "purchase-orders-total-report" }
            // ]
        },
        {
            "name": "Products", "expanded": "productExpanded", "icon": "product",
            // "items": [
            //     // { "name": "Products", "view": "products" },
            //     // { "name": "Categories", "view": "categories" },
            //     // { "name": "Catalogue", "view": "catalogues" }
            // ]
        },
        {
            "name": "Employees", "expanded": "peopleExpanded", "icon": "company-view",
            // "items": [
            //     // { "name": "Organisations", "view": "organisations" },
            //     // { "name": "Employees", "view": "employees" }
            // ]
        },
        {
            "name": "Partners", "expanded": "partnersExpanded", "icon": "customer-and-contacts",
            // "items": [
            //     // { "name": "Customers", "view": "customers" },
            //     // { "name": "Suppliers", "view": "suppliers" },
            //     // { "name": "Manufacturers", "view": "manufacturers" }
            // ]
        },
        {
            "name": "Configurations", "expanded": "configurationsExpanded", "icon": "wrench",
            // "items": [
            //     // { "name": "Countries", "view": "countries" },
            //     // { "name": "Cities", "view": "cities" },
            //     // { "name": "Companies", "view": "companies" },
            //     // { "name": "Stores", "view": "stores" },
            //     // { "name": "Companies", "view": "companies" },
            //     // { "name": "Currencies", "view": "currencies" },
            //     // { "name": "Dimensions", "view": "dimensions" },
            //     // { "name": "Units of Measures", "view": "uoms" },
            //     // { "name": "Methods", "view": "methods" }
            // ]
        }
    ]
    $http.get("http://localhost:8080/services/js/codbex-hestia/api/NavigationService/NavigationService.js")
        .then(function (response) {
            $scope.navigationList = response.data;

            $scope.navigationList.forEach(e => addNavigationItem(e));
        })
        .catch(function (error) {
            console.error('Error fetching navigation list:', error);
            $scope.state.error = true;
            $scope.errorMessage = 'Failed to load navigation list';
        });

    function addNavigationItem(itemData) {
        if (!itemData || !itemData.name || !itemData.view || !itemData.group) {
            console.error('Invalid item data:', itemData);
            return;
        }

        const groupKey = itemData.group.toLowerCase();
        if (!$scope.groupItems[groupKey]) {
            console.error('Group key not found:', groupKey);
            return;
        }

        $scope.groupItems[itemData.group.toLowerCase()].push({
            "name": itemData.name,
            "view": itemData.view
        });
    }
}]);
